## 第二页
### Youngter-drive
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20230626170028.png)

```python
target="TOiZiZtOrYaToUwPnToBsOaOapsyS"
List="QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm"
for i in range(len(target)):
    if i%2!=0:

        if chr(List.find(target[i])+38).isalpha():
            print(chr(List.find(target[i])+38),end='')
        else:
            print(chr(List.find(target[i])+96),end='')
    else :
        print(target[i],end='')

```

### [MRCTF2020]hello_world_go
ida打开即可
### 相册
apk文件,jadx打开
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20230626174058.png)

跟进`C2.MAILSERVER`
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20230626174217.png)
`NativeMethod`代表的是调用java外部引用的代码,解包apk找到一个.so文件,使用ida打开
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20230626174929.png)
base64解码即可

### [WUSTCTF2020]level3
![image](https://i.imgur.com/8yU3wt5.png)
应该是魔改base64算法
感觉没啥问题啊

---
我测是换表,有个O_OLookAtYou
![image](https://i.imgur.com/JqEcFrN.png)

```python
string="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
string=list(string)
for i in range(10):
    string[i],string[19-i]=string[19-i],string[i]
print(''.join(string))
```


### [FlareOn4]IgniteMe
![image](https://i.imgur.com/YecGdnC.png)

动调得到v4的值为4
```c
__int16 num()
{
  return (unsigned __int16)__ROL4__(-2147024896, 4) >> 1;
}
```

```python
string=[  0x0D, 0x26, 0x49, 0x45, 0x2A, 0x17, 0x78, 0x44, 0x2B, 0x6C, 
  0x5D, 0x5E, 0x45, 0x12, 0x2F, 0x17, 0x2B, 0x44, 0x6F, 0x6E, 
  0x56, 0x09, 0x5F, 0x45, 0x47, 0x73, 0x26, 0x0A, 0x0D, 0x13, 
  0x17, 0x48, 0x42, 0x01, 0x40, 0x4D, 0x0C, 0x02, 0x69]
print(len(string))
value=4
for i in range(len(string)-1,-1,-1):
    string[i]=(string[i]^value)
    value=string[i]
    print(chr(string[i]),end='')

```

### xxor
![image](https://i.imgur.com/16UDk7A.jpeg)
精准的计算后还是错了,初中题已经败下阵来

---
![image](https://i.imgur.com/IukvPSS.png)
跟进unk_601060
![image](https://i.imgur.com/g1tNLWJ.png)
也就是 2,2,3,4
脑子晕掉了
![image](https://i.imgur.com/UAtynLq.png)
```python
num = [-548868226, 550153460, 3774025685, 1548802262, 2652626477, -2064448480]
key = [2, 2, 3, 4]
flag = [0] * 20
r = 0
l = 0
for j in range(0, 6, 2):
    l = num[j] % 2**32
    r = num[j + 1] % 2**32
    delta = 1166789954 * 64
    for i in range(0, 64):
        r = (r - ((l + delta + 20) ^ ((l << 6) + key[2]) ^ ((l >> 9) + key[3]) ^ 0x10)) % 2**32
        l = (l - ((r + delta + 11) ^ ((r << 6) + key[0]) ^ ((r >> 9) + key[1]) ^ 0x20)) % 2**32
        delta = (delta - 1166789954) % 2**32

    flag[j] = l
    flag[j + 1] = r
for i in flag:
    print(hex(i)[2:],end='')
```
### [WUSTCTF2020]Cr0ssfun
套娃题,每个函数里都有一部分flag
![image](https://i.imgur.com/JyXp3zr.png)


### [FlareOn6]Overlong
![image](https://i.imgur.com/kV1ZXoq.png)
动调修改传进去的参数从1c改为5f
![image](https://i.imgur.com/PytOCO5.png)
冒号后的部分也输出出来了

![image](https://i.imgur.com/1j3OTDf.png)

### [UTCTF2020]basic-re
打开ida搜索字符串即可
### [FlareOn3]Challenge1
变表base64
![image](https://i.imgur.com/4Y3IRhh.png)

### 特殊的 BASE64
变表base64

![image](https://i.imgur.com/Jctsu2V.png)

### [ACTF新生赛2020]Oruga
迷宫题...又没看出来
[wp](https://blog.csdn.net/qaq517384/article/details/123460051)
### [BJDCTF2020]BJD hamburger competition
一个unity游戏
根据wp,unity由c#开发,需要一个[dnspy](https://github.com/dnSpy/dnSpy/releases)的工具
需要反编译的文件路径`\Managed\Assembly-CSharp.dll`
使用dnspy打开后找到`ButtonSpawnFruit`类
![image](https://i.imgur.com/8DZc5SR.png)
根据sha1获取到原文为1001,在求md5值,但是需要注意到这里的md5函数定义不同,只返回前20位且字母为大写

### [ACTF新生赛2020]Universe_final_answer
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20230720173657.png)
解方程题,,,
需要用到z3库
```python
from z3 import *

v1,v2,v3,v4,v5,v6,v7,v8,v9,v11=Ints('v1 v2 v3 v4 v5 v6 v7 v8 v9 v11')
s=Solver()
s.add(-85 * v9 + 58 * v8 + 97 * v6 + v7 + -45 * v5 + 84 * v4 + 95 * v2 - 20 * v1 + 12 * v3 == 12613)
s.add(30 * v11 + -70 * v9 + -122 * v6 + -81 * v7 + -66 * v5 + -115 * v4 + -41 * v3 + -86 * v1 - 15 * v2 - 30 * v8 == -54400)
s.add(-103 * v11 + 120 * v8 + 108 * v7 + 48 * v4 + -89 * v3 + 78 * v1 - 41 * v2 + 31 * v5 - (v6 *64) - 120 * v9 == -10283)
s.add(71 * v6 + (v7 *128) + 99 * v5 + -111 * v3 + 85 * v1 + 79 * v2 - 30 * v4 - 119 * v8 + 48 * v9 - 16 * v11 == 22855)
s.add(5 * v11 + 23 * v9 + 122 * v8 + -19 * v6 + 99 * v7 + -117 * v5 + -69 * v3 + 22 * v1 - 98 * v2 + 10 * v4 == -2944)
s.add(-54 * v11 + -23 * v8 + -82 * v3 + -85 * v2 + 124 * v1 - 11 * v4 - 8 * v5 - 60 * v7 + 95 * v6 + 100 * v9 == -2222)
s.add(-83 * v11 + -111 * v7 + -57 * v2 + 41 * v1 + 73 * v3 - 18 * v4 + 26 * v5 + 16 * v6 + 77 * v8 - 63 * v9 == -13258)
s.add(81 * v11 + -48 * v9 + 66 * v8 + -104 * v6 + -121 * v7 + 95 * v5 + 85 * v4 + 60 * v3 + -85 * v2 + 80 * v1 == -1559)
s.add(101 * v11 + -85 * v9 + 7 * v6 + 117 * v7 + -83 * v5 + -101 * v4 + 90 * v3 + -28 * v1 + 18 * v2 - v8 == 6308)
s.add(99 * v11 + -28 * v9 + 5 * v8 + 93 * v6 + -18 * v7 + -127 * v5 + 6 * v4 + -9 * v3 + -93 * v1 + 58 * v2 == -1697)
#必须先check
if s.check() == sat:
    print(s.model())
```

### [Zer0pts2020]easy strcmp
根据题目名
![image](https://i.imgur.com/jAxe5BY.png)
发现是一个简单的字符串比较,根据题目名猜到是`strcmp`函数有问题
![image](https://i.imgur.com/RkAENAK.png)
初始化时调用了这个函数,跟进`sub_795`看一下
```c
int (**sub_795())(const char *s1, const char *s2)
{
  int (**result)(const char *, const char *); // rax

  result = &strcmp;
  qword_201090 = (__int64 (__fastcall *)(_QWORD, _QWORD))&strcmp;
  off_201028 = sub_6EA;
  return result;
}
```
发现strcmp被修改为`sub_6EA`函数

```c
__int64 __fastcall sub_6EA(__int64 a1, __int64 a2)
{
  int i; // [rsp+18h] [rbp-8h]
  int v4; // [rsp+18h] [rbp-8h]
  int j; // [rsp+1Ch] [rbp-4h]

  for ( i = 0; *(_BYTE *)(i + a1); ++i )
    ;
  v4 = (i >> 3) + 1;
  for ( j = 0; j < v4; ++j )
    *(_QWORD *)(8 * j + a1) -= qword_201060[j];
  return qword_201090(a1, a2);
}
```

![image](https://i.imgur.com/8xZBDQq.png)

```python
data='zer0pts{********CENSORED********}'
data2=[0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x42, 0x09,
  0x4A, 0x49, 0x35, 0x43, 0x0A, 0x41, 0xF0, 0x19, 0xE6, 0x0B,
  0xF5, 0xF2, 0x0E, 0x0B, 0x2B, 0x28, 0x35, 0x4A, 0x06, 0x3A,
  0x0A, 0x4F, 0x00]
#进位标志符
f=0

for i in range(len(data)):
    if f!=0:
        tem = ord(data[i]) + data2[i]+f
        f=0
    else:
        tem=ord(data[i])+data2[i]
    if tem>0xff:
        f=1
    tem&=0xff
    print(chr((tem)),end='')
```

### [WUSTCTF2020]level4

---
![image](https://i.imgur.com/l2RZGUM.png)
看到`data structure`就应该想到数据结构的...
type1是中序遍历
type2是后序遍历

```c
#include <stdlib.h>
#include <stdio.h>
#include <string.h>

char post[] = "20f0Th{2tsIS_icArE}e7__w"; //后序遍历结果
char mid[] = "2f0t02T{hcsiI_SwA__r7Ee}"; //中序遍历结果

void f(int root,int start,int end)
{
    if(start > end)
        return ;
    int i = start;
    while(i < end && mid[i] != post[root])
        i++;   //定位根在中序的位置
    printf("%c",mid[i]);
    f(root - 1-(end - i),start,i - 1);  //递归处理左子树
    f(root-1,i + 1,end);  //递归处理右子树
}

int main()
{

    f(24,0,24);
    return 0;
}

```


### [网鼎杯 2020 青龙组]singal
#vm
```c
//opcode==7时,会将输入的字符与下一个字符比较,也就是比较flag
  case 7:
	if ( Str[v7 + 100] != string[v9 + 1] )
	{
	  printf("what a shame...");
	  exit(0);
	}
	++v7;
	v9 += 2;
	break;
```

先把所有opcode搞出来

### crackme




### findKey

![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20231205193743.png)
`0x8003u`是win32的md5

还有一个简单的异或,
```python
string="0kk`d1a`55k222k2a776jbfgd`06cjjb"
xor = "SS"

for i in range(len(string)):
    print(chr(ord(string[i])^ord(xor[i%2])),end='')

string=[  0x57, 0x5E, 0x52, 0x54, 0x49, 0x5F, 0x01, 0x6D, 0x69, 0x46, 
  0x02, 0x6E, 0x5F, 0x02, 0x6C, 0x57, 0x5B, 0x54, 0x4C]

for i in range(len(string)):
    print(chr(string[i]^ord('123321'[i%6])),end='')
```

### [GUET-CTF2019]number_game

创建结构体

```text
shiftF1
c语言形式创建结构体
example:

struct student {
  char name[16];
  int age;
}

shift+F9
右键insert

```