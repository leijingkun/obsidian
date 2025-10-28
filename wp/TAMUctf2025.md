# web
### Impossible
提示玩2000年的flash游戏，打开发现浏览器不支持，下载.swf,和ffdec逆向，打开图片

### Aggie Bookstore
mongodb注入

```
{"title":{"$ne": "1"},"author":{"$ne": "1"}}
```

闭合后的，语义：title！=1&author！=1
```
{'$and': [{"title":{"$ne": "1"},"author":{"$ne": "1"}}]}
```
脚本
```
import re
import json


query = {"$and": []}
title={"$ne": "1"}
query["$and"].append({"title": title})

print((query))
print(json.dumps(title))
```

### 

# reverse

# pwn

# crypto

# Misc


---
# *相关wp*




2025-04-01   02:13