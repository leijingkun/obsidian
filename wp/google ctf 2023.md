
# web
### UNDER-CONSTRUCTION
有flask和php两个服务,唯一的交互在注册时发送数据给php,插入数据库
```python
    requests.post(f"http://{PHP_HOST}:1337/account_migrator.php", 
        headers={"token": TOKEN, "content-type": request.headers.get("content-type")}, data=raw_request)
    return redirect(url_for('authorized.login'))
```

---
利用了flask与php在处理请求的不一致导致的`HTTP parameter pollution`
> A HTTP query like a=1&a=2 will be interpreted differently by Flask and PHP running on an Apache HTTP Server. In Flask, the parameter will be 1 (first occurence) while in PHP it will be 2 (last occurence).

*payload*
```payload
username=username&password=password&tier=blue&tier=gold
```
flask处理第一个tier而php处理第二个tier
然后访问php(也就是第二个链接)即可
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20230628121649.png)

### BIOHAZARD
#xss #原型链污染
有bot,猜测xss
可以根据提交的表单生成一个简历
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20230628143607.png)

猜测漏洞点可能在`YouTube video` 输入视频链接或者是下面的编辑器里

```js
const setHeaders = (res) => {
  const nonce = crypto.randomBytes(16).toString('base64');
  res.setHeader('Content-Security-Policy', `base-uri 'none'; script-src 'nonce-${nonce}' 'strict-dynamic' 'unsafe-eval'; require-trusted-types-for 'script';`);
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  return nonce;
}
```

设置了csp头

---
瞄了眼wp,好像...很难...就当个wp翻译官吧

Object.assign 通常不会受到原型链污染
```js
Object.assign({}, JSON.parse('{"__proto__":{"polluted": true}}'));
console.log(Object.prototype.polluted); // undefined
```
然而当第一个参数设置如下
```js
Object.assign(({})['__proto__'], JSON.parse('{"polluted": true}'));
console.log(Object.prototype.polluted); // true
```
在main.js里
```js
  interestObj = {"favorites":{}};
  const uuid = viewPath[1];
  const xhr = new XMLHttpRequest();
  xhr.addEventListener("load", () => {
    if (xhr.status === 200) {
      const json = JSON.parse(xhr.response);
      for (const key of Object.keys(json)) {
        if (interestObj[key] === undefined) {
          interestObj[key] = json[key];
        } else{
          Object.assign(interestObj[key], json[key]);
        }
      }
    } else {
      alert(xhr.response);
      location.href = '/';
    }
```
说明这里可以进行污染
后面的看不懂了


# reverse
### ZERMATT
给了一个lua脚本,本地是5.1版本跑不通,online是5.3可以跑,后面研究下环境
换了5.4也不行md
题目给的是一个lua混淆后的代码

# pwn

# crypto

# Misc


---
# *相关wp*
https://github.com/google/google-ctf/tree/master/2023



2023-06-24   16:34