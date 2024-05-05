# web
### babylogin

| 路由 | 作用 |
| ---- | ---- |
| app.get("/", (req, res) => | 一个简单的静态页面 |
| app.post("/", (req, res) => | 登录,强校验参数类型,随机一个生成一个用户id,然后push一个用户类,返回一个cookie |
| app.get("/dashboard/:user_id", checkCookie, (req, res, next) => | 根据用户id查看用户名,但需要满足<br>req.connection.remoteAddress \=== "127.0.0.1"<br>req.socket.remoteAddress === "127.0.0.1" |
| app.get("/let_me_in_please", (req, res, next) => | 为cookie增加allowed:true这个字段 |
| app.get("/search", (req, res, next) => | 需要满足:<br>req.socket.remoteAddress != "127.0.0.1"<br>根据get username返回用户是否存在,<br>`users.find(user => user.username.startsWith(username));` |
| app.get("/report", checkCookie, (req, res) => | 需要满足:<br>req.connection.remoteAddress === "127.0.0.1"<br>传入一个url,然后要接收验证码(hcaptcha官方),接着admin会访问这个url |
已知flag就是admin账户的用户名
```js
let users = [{
    // admin account
    id: crypto.randomBytes(64).toString("hex"),
    username: FLAG,
    password: crypto.randomBytes(64).toString("hex"),
}]
```
几乎所有地方都限制了127.0.0.1,应该需要bypass
且search路由是按照startWith匹配的,只需要传入cr3{,即可得到username
也就是说只需要
`req.socket.remoteAddress != "127.0.0.1"`


或者获取到admin的用户id,然后还是需要

---



# reverse

# pwn

# crypto

# Misc


---
# *相关wp*




2024-04-26   21:08