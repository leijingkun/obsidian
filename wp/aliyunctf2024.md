# web
### 签到
命令执行,dig命令-f参数读取文件,type参数无过滤,注意参数和文件名之间没有空格
![image.png|900](https://gitee.com/leiye87/typora_picture/raw/master/20240323171605.png)


### chain17

### Pastbin
所有接口捋一遍
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20240323191816.png)

静态页面排除掉
*r.Post("/login", loginHandler)*
输入账号密码登录,用户名必须符合正则`^[a-zA-Z0-9_]{7,20}$`,且密码的长度<8(数组绕过?)
根据用户名查询数据库里的密码
```go
	var dbPassword string
	err = c.DBCon.QueryRow("SELECT password FROM users WHERE username = ?", username).Scan(&dbPassword)
```
通过指针将查询到的密码存储到dbPassword变量里,然后一个hash对比操作,若成功则给token
*r.Post("/register", registerHandler)*
输入账号密码,同样需要用户名正则与密码长度,然后hash输入的密码,预编译存储到users表里,

*r.Post("/paste/create", needAuth, createPasteHandler)*
post里传title和content,其中len(title)在0-31,len(content)在0-511,
为paste生成一个id,预编译写入数据库
*r.Get("/paste/view", addCSPHeaders, needAuth, pasteView)*
```go
	var paste Paste
	err := c.DBCon.QueryRow("SELECT title,content FROM pastes WHERE user = ?", username).Scan(&paste.Title, &paste.Content)
```
从token里获取用户名,然后从库里查询paste,并渲染到html
*r.Get("/paste/del", needAuth, delPasteHandler)*
get传入id,从token里获取用户名,调用delete,删除


*r.Get("/flag", adminOnly, flagHandler)*
拿到flag,需要adminonly,即token伪造为admin,那我们需要获取secret

```go
func verifyJWTToken(tokenString string) (string, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
		}
		return mySigningKey, nil
	})
	if err != nil {
		return "", err
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok {
		return claims["username"].(string), nil
	}
	return "", nil
}
```
注意到verifyJWTToken会赋值key到token里,但是没有返回的地方

---
wp是条件竞争
[[go#切片(slice)的数据竞争]]
> Pastbin

```go
func (rtr *Router) Handle(method string, pattern string, handlers []Handler) {
    rtr.handle(method, pattern, func(resp http.ResponseWriter, req *http.Request) {
       c := rtr.m.createContext(resp, req)
       for _, h := range handlers {
          c.mws = append(c.mws, getMWFromHandler(h))
       }
       c.run()
    })
}
```
slice数据竞争，同个底层数组的情况下，可能会出现c.mws被其他goroutine的append数据覆盖

用三个请求，使得第一个非/flag请求的后续两个handler被/flag路由覆盖，再由第三个请求覆盖/flag的第一个handler取消adminOnly
# reverse

# pwn

# crypto

# Misc


---
# *相关wp*




2024-03-23   17:15