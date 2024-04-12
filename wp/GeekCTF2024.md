# web
### Secrets
> My notes and secrets are stored in this secret vault. I'm sure no one can get them.


![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20240410224006.png)
一串可疑字符串,搜了下sdoc文件是三星笔记,但是这文件格式也不对啊
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20240410224047.png)

cookie可能存在目录穿越?实测../可以往上,但是读不到根目录,wapp说是nextjs 13.4.9版本,穿了几个创建的main.js/ts都没有,放弃...

我的锅,是flask,读取app.py

```python
import os

from flask import (
    Flask,
    jsonify,
    redirect,
    render_template,
    request,
    send_from_directory,
    session,
)
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text

app = Flask(
    __name__, static_folder="assets/js", template_folder="templates", static_url_path=""
)

app.config["SQLALCHEMY_DATABASE_URI"] = "mysql+pymysql://ctf:114514@db/secrets"
app.secret_key = os.environ.get("SECRET_KEY", os.urandom(128).hex())
app.url_map.strict_slashes = False

db = SQLAlchemy(app)


class Notes(db.Model):
    table_name = "notes"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), nullable=False)
    message = db.Column(db.Text, nullable=False)
    type = db.Column(db.String(80), nullable=False, default="notes")

    def __repr__(self):
        return f"<Note {self.message}>"


@app.route("/")
def index():
    if not session.get("logged_in"):
        return redirect("/login")
    with db.engine.connect() as con:
        character_set_database = con.execute(
            text("SELECT @@character_set_database")
        ).fetchone()
        collation_database = con.execute(text("SELECT @@collation_database")).fetchone()
    assert character_set_database[0] == "utf8mb4"
    assert collation_database[0] == "utf8mb4_unicode_ci"
    type = request.args.get("type", "notes").strip()
    if ("secrets" in type.lower() or "SECRETS" in type.upper()) and session.get(
        "role"
    ) != "admin":
        return render_template(
            "index.html",
            notes=[],
            error="You are not admin. Only admin can view secre<u>ts</u>.",
        )
    q = db.session.query(Notes)
    q = q.filter(Notes.type == type)
    notes = q.all()
    return render_template("index.html", notes=notes)


@app.route("/login", methods=["GET", "POST"])
def login():
    if session.get("logged_in"):
        return redirect("/")

    def isEqual(a, b):
        return a.lower() != b.lower() and a.upper() == b.upper()

    if request.method == "GET":
        return render_template("login.html")
    username = request.form.get("username", "")
    password = request.form.get("password", "")
    if isEqual(username, "alice") and isEqual(password, "start2024"):
        session["logged_in"] = True
        session["role"] = "user"
        return redirect("/")
    elif username == "admin" and password == os.urandom(128).hex():
        session["logged_in"] = True
        session["role"] = "admin"
        return redirect("/")
    else:
        return render_template("login.html", error="Invalid username or password.")


@app.route("/logout")
def logout():
    session.pop("logged_in", None)
    session.pop("role", None)
    return redirect("/")


@app.route("/redirectCustomAsset")
def redirectCustomAsset():
    asset = request.cookies.get("asset", "assets/css/pico.azure.min.css")
    if not asset.startswith("assets/css/"):
        return "Hacker!", 400
    return send_from_directory("", asset)


@app.route("/setCustomColor")
def setCustomColor():
    color = request.args.get("color", "azure")
    if color not in [
        "amber",
        "azure",
        "blue",
        "cyan",
        "fuchsia",
        "green",
        "grey",
        "indigo",
        "jade",
        "lime",
        "orange",
        "pink",
        "pumpkin",
        "purple",
        "red",
        "sand",
        "slate",
        "violet",
        "yellow",
        "zinc",
    ]:
        return jsonify({"error": "Invalid color."}), 400
    asset = f"assets/css/pico.{color}.min.css"
    return (
        jsonify({"success": asset}),
        200,
        {"Set-Cookie": f"asset={asset}; SameSite=Strict"},
    )


if __name__ == "__main__":
    app.run()
```

登录发现需要`isEqual(username, "alice") and isEqual(password, "start2024"):`

python的upper特殊处理
### NextGPT
是chatgpt-next-web这个开源项目

![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20240411001952.png)

刚开始以为是大语言模型注入,突然来了一句不是misc是web题,搜了下存在ssrf,很好,与ip限制呼应.但是ssrf一直500

`http://chall.geekctf.geekcon.top:40525/api/cors/http/127.0.0.1`
试下默认端口3000一样
`http://chall.geekctf.geekcon.top:40525/api/cors/http/127.0.0.1:3000`
### YAJF
基于jq命令的注入

![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20240410232131.png)

会将命令注入到jq的后面,且args长度<=5

---
迷迷糊糊的出了???
```bash
json={"name":""}
&args=|jq&args='env'
```

根据官方文档
>   $ENV, env
       $ENV is an object representing the environment variables as set when the jq program started.
>
>       env outputs an object representing jq´s current environment.
> 
>        At the moment there is no builtin for setting environment variables.
> 
>            jq ´$ENV.PAGER´
>               null
>            => "less"
> 
>            jq ´env.PAGER´
>               null
>            => "less"

原来如此
### oauth
登录会跳oauth到上交的认证网页,需要绕过
[oauth](https://book.hacktricks.xyz/v/cn/pentesting-web/oauth-to-account-takeover)流程与原理
发现`redirect_url`即授权的url为`http://chall.geekctf.geekcon.top:40521/code.php`
直接访问提示输入code参数

`http://chall.geekctf.geekcon.top:40521/code.php?code=whoami`
提示 Log saved
访问
`http://chall.geekctf.geekcon.top:40521/log` 给出了log页面,根据admin的code可以直接登录


得到log内容
> The flag content is: sha1(sha256($account)), where $account stands for the SSO account name (consists of less than 10 letters) of the admin user.
This website doesn't display username, so only I know the <u>secret</u> flag!

获取admin的用户名,首先排除admin....好吧其实我也尝试了Admin,,,secret也不对

http://chall.geekctf.geekcon.top:40521/sitemap.xml/
提示网站只有一个文本是粗体,是`log`
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20240411015924.png)

好吧,还以为是用户名,原来是上面猜到的log路径,想多了...

secret带下划线一定有鬼,试了下web路径也不对
- [ ] 58986b1f3ca5f57ea4e897986f6e93f32ad8a006    secret
- [ ] e424af1995f69a6e74acaa591fd9959f7d192a03    admin
难道要读取session文件/tmp/<session_id>,也没有
# reverse

# pwn

# crypto

# Misc
### 2024-WhereIsMyFlag
py代码藏了一段base64,用github能直接看到
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20240411030515.png)
不断解压,发现是个gzip炸弹,使用grep查找flag
-a表示强制查找,不然会当作二进制文件
`grep -a 'flag' test`

---
# *相关wp*




2024-04-10   22:39