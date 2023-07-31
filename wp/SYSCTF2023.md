
# web
### CarelessPy
eval路由读取文件列表 `/app/__pycache__/part.cpython-311.pyc`
```python
#!/usr/bin/env python
# visit https://tool.lu/pyc/ for more information
# Version: Python 3.11

import os
import random
import hashlib
from flask import *
from lxml import etree
app = Flask(__name__)
app.config['SECRET_KEY'] = 'o2takuXX_donot_like_ntr'
```

伪造session后登录

`eyJpc2xvZ2luIjp0cnVlfQ.ZIP3EA.4of_mpJ5-lpIKyRQeTrRUR26rcg`

发现回显了xml,存在XXE,web标签有回显,直接读文件
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20230610122450.png)

### Confronting robot

![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20230610154648.png)
`http://47.108.165.60:30220/?myname=1' union select group_concat(username) from name --+`

访问后发现可以执行mysql命令,game.php可以猜拳,但是数据库里值为NULL,无法比较

``
### tasks
项目地址

### 4号的罗纳尔多
```php
<?php
error_reporting(0);
highlight_file(__FILE__);
class evil{
    public $cmd;
    public $a;
    public function __destruct(){
        if('VanZZZZY' === preg_replace('/;+/','VanZZZZY',preg_replace('/[A-Za-z_\(\)]+/','',$this->cmd))){
            eval($this->cmd.'givemegirlfriend!');
        } else {
            echo 'nonono';
        }
    }
}
//第一处限制
if(!preg_match('/^[Oa]:[\d]+|Array|Iterator|Object|List/i',$_GET['Pochy'])){
    unserialize($_GET['Pochy']);
} else {
    echo 'nonono';
}
```

### noob_J4thon


# reverse

# pwn

# crypto

# Misc


---
## *相关wp*




2023-06-10   12:24