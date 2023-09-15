# web
#xss 
#header 
以下是常见的Content-Type：
text开头
text/html： HTML格式
text/plain：纯文本格式
text/xml： XML格式
图片格式
image/gif ：gif 图片格式
image/jpeg ：jpg 图片格式
image/png：png 图片格式
application开头
application/xhtml+xml：XHTML 格式
application/xml：XML 数据格式
application/atom+xml：Atom XML 聚合格式
application/json：JSON 数据格式
application/pdf：pdf 格式
application/msword：Word 文档格式
application/octet-stream：二进制流数据（如常见的文件下载）
application/x-www-form-urlencoded：表单发送默认格式
媒体文件
audio/x-wav：wav文件
audio/x-ms-wma：w文件
audio/mp3：mp3文件
video/x-ms-wmv：wmv文件
video/mpeg4：mp4文件
video/avi：avi文件
### typographer
```php
<?php
/*
FROM php:apache-bullseye

RUN a2dismod status

COPY ./files/index.php /var/www/html


*/
$message = isset($_GET['message']) ? $_GET['message'] : 'hello, world';
$type = isset($_GET['type']) ? $_GET['type'] : die(highlight_file(__FILE__));
header("Content-Type: text/$type");

//第一次输出,会被转义
if($type == "plain"){
    die("the message is: $message");
}


?>
<html>
<h1>The message is:</h1>
<hr/>
<pre>
//第二次输出,过滤了"
    <input type="text" value="<?php echo preg_replace('/"/','',$message);?>">
</pre>
</html> 1
```

- type需要为text/html才能被正确解析
- 过滤了",需要逃逸


# reverse

# pwn

# crypto

# Misc


---
# *相关wp*




2023-09-15   20:07