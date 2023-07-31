[thinkphp框架](https://blog.csdn.net/qq_53079406/article/details/127826862)
```
①方法/变量值进行传参
http://domainName/index.php/模块/控制器/操作/方法/变量值
 
eg:访问www.xxx.com/index.php/index/index/index
为application目录下的index模块下的从contraller目录下的index文件下的index函数
 
②变量传参
http://tp5.com/index.php?s=/index/Index/index
```
[[beescms]]






能触发phar协议的函数

- fimeatime / filectime / filemtime
- stat / fileinode / fileowner / filegroup / fileperms
- file / file_get_contents / readfile / fopen
- file_exists / is_dir / is_executable / is_file / is_link / is_readable / is_writeable
- parse_ini_file
- unlink
- copy

SSRF 触发函数
```
file_get_contents
fsockopen
curl_exec
get_headers
fopen
readfile
```

变量覆盖
```text
extract
parse_str
import_request_variables
mb_parse_str
$$

```

