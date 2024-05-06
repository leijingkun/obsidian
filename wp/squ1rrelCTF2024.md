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

切片,拼接在mongodb查询里也不能用...

# reverse

# pwn

# crypto

# Misc


---
# *相关wp*




2024-05-05   22:39