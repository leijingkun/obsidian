
### w1r3s
ip:
`192.168.36.129`

![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20231025134356.png)

#### user
- 21 ftp
#ftp 匿名登录
```bash
ftp <IP>
>anonymous
>anonymous
>ls -a # List all files (even hidden) (yes, they could be hidden)
>binary #Set transmission to binary instead of ascii
>ascii #Set transmission to ascii instead of binary
>bye #exit
```

下载所有文件

```bash
wget -m ftp://anonymous:anonymous@10.10.10.98 #Donwload all
wget -m --no-passive ftp://anonymous:anonymous@10.10.10.98 #Download all
```

- 80
扫描得到目录
/administrator
访问查看源码发现是cuppa cms
`searchexploit cuppa`
存在任意文件包含漏洞,读取/etc/shadow,`john`爆破密码,登录用户属于sodu组,直接sudo bash




### billu
`192.168.36.130`
#### user
- 22

- 80
目录扫描
`gobuster dir -u http://192.168.36.130 -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt`

![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20231107133729.png)

其中test存在任意文件读取,读取网站源码,存在sql注入

```php
<?php
$pass="' or 1=1#\\";
$uname="admin";

$uname=str_replace('\'','',$uname);
    $pass=str_replace('\'','',$pass);

$run='select * from auth where  pass=\''.$pass.'\' and uname=\''.$uname.'\'';
echo($run);

//

```
大体过滤,直接万能密码 `' or 1=1#\`

存在文件上传+文件包含,上传图片马
弹shell出了点问题,选择curl+bash
```python
from http.server import HTTPServer, BaseHTTPRequestHandler

# 创建自定义的请求处理类
class MyRequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        # 设置响应状态码
        self.send_response(200)
        # 设置响应头部
        self.send_header('Content-type', 'text/html')
        self.end_headers()
        # 设置响应内容
        response_content = b"Hello, World!"  # 以字节形式返回内容
        self.wfile.write(response_content)

# 创建HTTP服务器实例，并指定请求处理类
port=80
server_address = ('', port)  # 指定服务器地址和端口
httpd = HTTPServer(server_address, MyRequestHandler)
print('Server running at http://localhost:'+str(port))
httpd.serve_forever()
```

拿到shell,存在phpmy目录
里面的`config.inc.php`有root密码
也可内核提权

