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
[oauth](https://book.hacktricks.xyz/v/cn/pentesting-web/oauth-to-account-takeover)流程与原理
发现`redirect_url`即授权的url为`http://chall.geekctf.geekcon.top:40521/code.php`
直接访问提示输入code参数

`http://chall.geekctf.geekcon.top:40521/code.php?code=whoami`
提示 Log saved
访问
`http://chall.geekctf.geekcon.top:40521/log` 给出了log页面,根据admin的code可以直接登录


得到log内容
> The flag content is: sha1(sha256($account)), where $account stands for the SSO account name (consists of less than 10 letters) of the admin user.
This website doesn't display username, so only I know the <u>secret</u> flag!

获取admin的用户名,首先排除admin....好吧其实我也尝试了Admin,,,secret也不对

http://chall.geekctf.geekcon.top:40521/sitemap.xml/
提示网站只有一个文本是粗体,是`log`
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20240411015924.png)

好吧,还以为是用户名,原来是上面猜到的log路径,想多了...

secret带下划线一定有鬼,试了下web路径也不对
- [ ] 58986b1f3ca5f57ea4e897986f6e93f32ad8a006
- [ ] 

# reverse

# pwn

# crypto

# Misc


---
# *相关wp*




2024-04-10   22:39