4045
```php
//简易的sql防注入
$username=addslashes($username);
$password=addslashes($password);

//替换
$blacklist = [">",";","|","union","select","or","#","--+","%","'"," "];
$username = str_replace($blacklist,"",$username);
$password = str_replace($blacklist,"",$password);

//通防
function wafrce($str){
	return !preg_match("/openlog|syslog|readlink|symlink|popepassthru|stream_socket_server|scandir|assert|pcntl_exec|fwrite|curl|system|eval|assert|flag|passthru|exec|chroot|chgrp|chown|shell_exec|proc_open|proc_get_status|popen|ini_alter|ini_restore/i", $str);
}
//通防
function wafsqli($str){
	return !preg_match("/select|and|\*|\x09|\x0a|\x0b|\x0c|\x0d|\xa0|\x00|\x26|\x7c|or|into|from|where|join|sleexml|extractvalue|+|regex|copy|read|file|create|grand|dir|insert|link|server|drop|=|>|<|;|\"|\'|\^|\|/i", $str);
}

function wafxss($str){
	return !preg_match("/\'|http|\"|\`|cookie|<|>|script/i", $str);
}

```



*赛题笔记-[CISCN2022]总决赛-第一天 _ 远离尘世的幻想乡*
- create_function代码注入就可以RCE
*虎符CTF2022 总决赛部分题解 _ Eki's blog*
- go eval代码注入
- redis 主从复制
- tornado ssti
*某ciscn分区两个题解*
- 文件上传,user.ini

*CISCN西南复赛AWDPlus Web – fushulingのblog*

```

```

## fix



```
tar -czvf fix.tar justDeserialize-1.0-SNAPSHOT.jar repair.sh
```

update.sh

```bash
#尝试删掉flag
touch flag;cp -f flag /flag
ps -ef | grep <服务名> | grep -v grep | awk '{print $2}' | xargs kill -9
jar -jar <>.jar &
```



c#启动
```
#!/bin/sh

pkill -9 dotnet
rm /app/RazorCor.dll
mv RazorCor.dll /app/RazorCor.dll
nohup dotnet /app/RazorCor.dll &
```