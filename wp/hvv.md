1. 给你一个登录界面，凭经验它可能存在哪些漏洞?
sql注入,xss,弱口令,
2. 常见sql注入类型
```
报错注入,联合查询,堆叠注入,布尔盲注,时间盲注
```
3. 宽字节注入编码
```
GBK。因为GBK编码是一种双字节编码，所以我们提交%df' 后会被转义成%df%5c%27，而%df%5c在GBK
编码下就会转换成特殊字符，于是单引号就逃逸了出来，形成了闭合
```
4. 防御sql注入攻击
```
预编译
关键字过滤

```
5. 后台getshell
```
文件上传
命令执行

```
6. 拿到exe样本文件，怎么快速提取出回连地址？
```
使用虚拟机，在虚拟机上运行，并监听端口链接情况
使用在线沙箱分析平台，例如：微步在线云沙箱
```

7. 一台服务器出现了大量的id为4625的日志，可能出现了什么攻击？
```
事件ID 4625 是 Windows 操作系统中的登录失败事件，表示尝试登录系统的用戶未能成功验证其凭据
造成的原因有：错误的用戶名或密码，账戶被锁定，账戶过期或禁用，远程连接。
所以有可能出现的攻击有：登录账号，密码爆破
```

8. 介绍windows常用的应急响应工具？
```
Process Explorer，Autoruns，TCPView，火绒剑，PChunter,Fiddler
```

9. weblogic攻击面
```
```

10. 流量特征
```
蚁剑
@ini_set("display_errors","0");@set_time_limit(0)
并且响应体的返回结果是base64编码发混淆字符
冰蝎2.0
使用AES加密 + base64编码，AES使用动态密钥对通信进行加密，进行请求时内置了十几个User-Agent头，每次请求时会随机选择其中的一个。因此当发现一个ip的请求头中的user-agent在频繁变换，就可能是冰蝎
冰蝎3.0

使用AES加密 + base64编码,取消了2.0的动态获取密钥，使用固定的连接密钥，AES加密的密钥为webshell连接密码的MD5的前16位，默认连接密码是"rebeyond"(即密钥是md5('rebeyond')[0:16]=e45e329feb5d925b)。进行请求时内置了十几个User-Agent头，每次请求时会随机选择其中的一个。因此当发现一个ip的请求头中的user-agent在频繁变换，就可能是冰蝎。
3.0连接jsp的webshell的请求数据包中的content-type字段常见为application/octet-stream

冰蝎4.0

提供了传输协议自定义的功能，让用户对流量的加密和解密进行自定义，实现流量加解密协议的去中心化。v4.0版本不再有连接密码的概念，自定义传输协议的算法就是连接密码。
Accept字段（弱特征），通常是Accept: application/json, text/javascript, /; q=0.01 意思是浏览器可接受任何文件，但最倾向application/json 和 text/javascript。
Content-Type字段（弱特征），通常是Content-type: Application/x-www-form-urlencoded
与冰蝎的前述版本相似，进行请求时内置了十几个User-Agent头，每次请求时会随机选择其中的一个。
连接的端口有一定的特征，冰蝎与webshell建立连接的同时，java也与目的主机建立tcp连接，每次连接使用本地端口在49700左右(就是比较大的端口)，每连接一次，每建立一次新的连接，端口就依次增加。
使用长连接，避免了频繁的握手造成的资源开销。默认情况下，请求头和响应头里会带有 Connection：Keep-Alive
有固定的请求头和响应头，请求字节头：dFAXQV1LORcHRQtLRlwMAhwFTAg/M ，响应字节头：TxcWR1NNExZAD0ZaAWMIPAZjH1BFBFtHThcJSlUXWEd
默认时，冰蝎 webshell都有“e45e329feb5d925b” 一串密钥，与冰蝎3.0相同。

```

11. shiro漏洞分哪几种，有哪些区别？
```
分为：shiro550和shiro721。
区别：shiro550使用已知密钥碰撞，只要有足够密钥库，不需要Remember cookie。shiro721的aes
加密key系统随机生成，需要通过Remember cookie来进行破解。
```


12. 现在有一台windowsServer2008，对它进行提权有什么思路吗？针对上面内核漏洞能说几个吗？
```
利用系统内核溢出漏洞，利用数据库提取，WEB中间件漏洞提取，错误系统配置提取
```

13. weblogic和redis的端口
```
WebLogic的默认端口是7001（HTTP）和7002（HTTPS），可以在config.xml文件中进行配置。
Redis的默认端口是6379，可以在redis.conf文件中进行配置
```
