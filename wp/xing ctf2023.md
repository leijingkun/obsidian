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
# reverse

# pwn

# crypto

# Misc


---
# *相关wp*




2023-07-31   18:44
