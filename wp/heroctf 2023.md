https://ctf.heroctf.fr/challenges
https://github.com/HeroCTF/HeroCTF_v5
# web
### Best Schools
一个投票网站,需要我们的投票数大于1337,也就是伪造投票人数,一般就是伪造ip这类
没搞懂后端逻辑,但是发现url里加上get参数就可以绕过时间限制
`http://dyn-06.heroctf.fr:10405/graphql?a=1`
然后就不停发包

![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20230514204233.png)

### Referrrrer

```js
const express = require("express")
const app = express()


app.get("/", (req, res) => {
    res.send("Hello World!");
})

app.get("/admin", (req, res) => {
    console.log(req.header("referer"));
    if (req.header("referer") === "YOU_SHOUD_NOT_PASS!") {
        return res.send("000");
    }

    res.send("Wrong header!");
})

app.listen(3000, () => {
    console.log("App listening on port 3000");
})
```

代码很简单,只需要实现referer头即可获取flag,但是在nginx.conf文件,又限制了referer头必须以
`https://admin.internal.com`开头
```json
        location /admin {
            if ($http_referer !~* "^https://admin\.internal\.com") {
                return 403;
            }
```

![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20230514212145.png)

注意http头的不同
`referrer` 与 `referer`
我搜索了如何在nodejs里获取referer头,stackoverflow里的[回答](https://stackoverflow.com/questions/7237262/how-do-i-find-the-a-referring-sites-url-in-node)是

> In express 4.x:
> 
>` req.get('Referrer')`
> This will also check both spellings of referrer so you do not have to do:
> 
`>  req.headers.referrer || req.headers.referer`

[MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referer)里也提到了其实`referer`是`referrer`的错误写法

### Drink from my Flask 1 & 2

一道flask
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20230514220418.png)
猜测应该是根据op来对应操作,且每次服务器都会set-cookie,应该是获取secret_key伪造session
0/0会直接500报错,没思路了,等wp了

---
#SSTI 
`{{cycler.__init__.__globals__.os.popen('id').read()}}`
提示payload 长度过长,但这是目前最短的

爆破jwt key得到 `key`
修改role为admin,发现页面回显admin,猜测ssti
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20230515102942.png)

访问`/adminPage` 


### Blogodogo 1/2


 







# reverse

# pwn

# crypto

# Misc


---
## *相关wp*
https://github.com/HeroCTF/HeroCTF_v5/tree/main/



2023-05-14   19:34