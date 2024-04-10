# web
### Secrets
> My notes and secrets are stored in this secret vault. I'm sure no one can get them.


![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20240410224006.png)
一串可疑字符串,搜了下sdoc文件是三星笔记,但是这文件格式也不对啊
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20240410224047.png)

cookie可能存在目录穿越?实测../可以往上,但是读不到根目录,wapp说是nextjs 13.4.9版本,穿了几个创建的main.js/ts都没有,放弃...

### NextGPT
是chatgpt-next-web这个开源项目

![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20240411001952.png)

刚开始以为是大语言模型注入,突然来了一句不是misc是web题,搜了下存在ssrf,很好,与ip限制呼应.但是ssrf一直500

`http://chall.geekctf.geekcon.top:40525/api/cors/http/127.0.0.1`
试下默认端口3000一样
`http://chall.geekctf.geekcon.top:40525/api/cors/http/127.0.0.1:3000`
### YAJF
基于jq命令的注入

![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20240410232131.png)

会将命令注入到jq的后面,且args长度<=5

---
迷迷糊糊的出了???
```bash
json={"name":""}
&args=|jq&args='env'
```

根据官方文档
>   $ENV, env
       $ENV is an object representing the environment variables as set when the jq program started.
>
>       env outputs an object representing jq´s current environment.
> 
>        At the moment there is no builtin for setting environment variables.
> 
>            jq ´$ENV.PAGER´
>               null
>            => "less"
> 
>            jq ´env.PAGER´
>               null
>            => "less"

原来如此
### oauth
登录会跳oauth到上交的认证网页,需要绕过


# reverse

# pwn

# crypto

# Misc


---
# *相关wp*




2024-04-10   22:39