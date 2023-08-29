
# Buu
## 第一页
### easyre
```c
int __cdecl main(int argc, const char **argv, const char **envp)
{
  int b; // [rsp+28h] [rbp-8h] BYREF
  int a; // [rsp+2Ch] [rbp-4h] BYREF

  _main();
  scanf("%d%d", &a, &b);
  if ( a == b )
    printf("flag{this_Is_a_EaSyRe}");
  else
    printf("sorry,you can't get flag");
  return 0;
}
``` 
### reverse1
注意到
```c
  for ( j = 0; ; ++j )
  {
    v10 = j;
    if ( j > j_strlen(Str2) )
      break;
    if ( Str2[j] == 111 )
      Str2[j] = 48;
  }
```
将o替换为0
### reverse2
跟上一题差不多
```python
string="hacking_for_fun}"
for i in string:
    if ord(i)==105 or ord(i)==114:
        print(chr(49),end='')
    else:
        print(i,end='')
       
```
### 内涵的软件
ida打开即可

### 新年快乐
#upx
不会做,一堆看不懂的代码

---
原来是有壳,使用exeinfope查看发现是upx壳
使用工具脱壳

---
学习一下手工脱
##### 依据esp定律找oep


### xor
```c
int __cdecl main(int argc, const char **argv, const char **envp)
{
  int i; // [rsp+2Ch] [rbp-124h]
  char input[264]; // [rsp+40h] [rbp-110h] BYREF

  memset(input, 0, 0x100uLL);
  printf("Input your flag:\n");
  get_line(input, 0x100u);
  if ( strlen(input) != 33 )
    goto LABEL_7;
  for ( i = 1; i < 33; ++i )
    input[i] ^= input[i - 1];
  if ( !strncmp(input, global, 0x21uLL) )
    printf("Success");
  else
LABEL_7:
    printf("Failed");
  return 0;
}
```

逻辑很简单,就是再异或一遍
```python
string="f\nk\fw&O.@\x11x\rZ;U\x11p\x19F\x1Fv\"M"
print(len(string))
print(string[0],end='')
for i in range(1,len(string)):
    print(chr(ord(string[i])^ord(string[i-1])),end='')
```
但是我的字符好像没复制完,研究下怎么搞出来

`Shift+e` export

### hello world
下载得到一个apk文件,使用apkiller打开,可以看到flag

### reverse3

```c
  sub_41132F("please enter the flag:", v7);
  sub_411375("%20s", (char)Str);
  v3 = j_strlen(Str);
  v4 = (const char *)sub_4110BE((int)Str, v3, (int)v14);// 对输入的字符处理
  strncpy(Destination, v4, 0x28u);              // 复制到dest变量
  v11 = j_strlen(Destination);
  for ( j = 0; j < v11; ++j )
    Destination[j] += j;                        // 遍历字符,逐个加上j
  v5 = j_strlen(Destination);
  if ( !strncmp(Destination, Str2, v5) )
    sub_41132F("rigth flag!\n", v8);
  else
    sub_41132F("wrong flag!\n", v8);
  return 0;
}
```

难点在判断sub_4110BE函数,根据字符串推断出是base64编码
```c
void *__cdecl sub_411AB0(char *a1, unsigned int a2, int *a3)
{
  int v4; // [esp+D4h] [ebp-38h]
  int v5; // [esp+D4h] [ebp-38h]
  int v6; // [esp+D4h] [ebp-38h]
  int v7; // [esp+D4h] [ebp-38h]
  int i; // [esp+E0h] [ebp-2Ch]
  unsigned int v9; // [esp+ECh] [ebp-20h]
  int v10; // [esp+ECh] [ebp-20h]
  int v11; // [esp+ECh] [ebp-20h]
  void *v12; // [esp+F8h] [ebp-14h]
  char *v13; // [esp+104h] [ebp-8h]

  if ( !a1 || !a2 )
    return 0;
  v9 = a2 / 3;
  if ( (int)(a2 / 3) % 3 )
    ++v9;
  v10 = 4 * v9;
  *a3 = v10;
  v12 = malloc(v10 + 1);
  if ( !v12 )
    return 0;
  j_memset(v12, 0, v10 + 1);
  v13 = a1;
  v11 = a2;
  v4 = 0;
  while ( v11 > 0 )
  {
    byte_41A144[2] = 0;
    byte_41A144[1] = 0;
    byte_41A144[0] = 0;
    for ( i = 0; i < 3 && v11 >= 1; ++i )
    {
      byte_41A144[i] = *v13;
      --v11;
      ++v13;
    }
    if ( !i )
      break;
    switch ( i )
    {
      case 1:
        *((_BYTE *)v12 + v4) = aAbcdefghijklmn[(int)(unsigned __int8)byte_41A144[0] >> 2];
        v5 = v4 + 1;
        *((_BYTE *)v12 + v5) = aAbcdefghijklmn[((byte_41A144[1] & 0xF0) >> 4) | (16 * (byte_41A144[0] & 3))];
        *((_BYTE *)v12 + ++v5) = aAbcdefghijklmn[64];
        *((_BYTE *)v12 + ++v5) = aAbcdefghijklmn[64];
        v4 = v5 + 1;
        break;
      case 2:
        *((_BYTE *)v12 + v4) = aAbcdefghijklmn[(int)(unsigned __int8)byte_41A144[0] >> 2];
        v6 = v4 + 1;
        *((_BYTE *)v12 + v6) = aAbcdefghijklmn[((byte_41A144[1] & 0xF0) >> 4) | (16 * (byte_41A144[0] & 3))];
        *((_BYTE *)v12 + ++v6) = aAbcdefghijklmn[((byte_41A144[2] & 0xC0) >> 6) | (4 * (byte_41A144[1] & 0xF))];
        *((_BYTE *)v12 + ++v6) = aAbcdefghijklmn[64];
        v4 = v6 + 1;
        break;
      case 3:
        *((_BYTE *)v12 + v4) = aAbcdefghijklmn[(int)(unsigned __int8)byte_41A144[0] >> 2];
        v7 = v4 + 1;
        *((_BYTE *)v12 + v7) = aAbcdefghijklmn[((byte_41A144[1] & 0xF0) >> 4) | (16 * (byte_41A144[0] & 3))];
        *((_BYTE *)v12 + ++v7) = aAbcdefghijklmn[((byte_41A144[2] & 0xC0) >> 6) | (4 * (byte_41A144[1] & 0xF))];
        *((_BYTE *)v12 + ++v7) = aAbcdefghijklmn[byte_41A144[2] & 0x3F];
        v4 = v7 + 1;
        break;
    }
  }
  *((_BYTE *)v12 + v4) = 0;
  return v12;
}
```
decode
```python
import base64

string="e3nifIH9b_C@n@dH"
flag=""
for i in range(len(string)):
    flag+=chr(ord(string[i])-i)
print(base64.b64decode(flag))
```

### 不一样的flag


```c
int __cdecl __noreturn main(int argc, const char **argv, const char **envp)
{
  _BYTE v3[29]; // [esp+17h] [ebp-35h] BYREF
  int v4; // [esp+34h] [ebp-18h]
  int v5; // [esp+38h] [ebp-14h] BYREF
  int i; // [esp+3Ch] [ebp-10h]
  _BYTE v7[12]; // [esp+40h] [ebp-Ch] BYREF

  __main();
  v3[26] = 0;
  *(_WORD *)&v3[27] = 0;
  v4 = 0;
  strcpy(v3, "*11110100001010000101111#");
  while ( 1 )
  {
    puts("you can choose one action to execute");
    puts("1 up");
    puts("2 down");
    puts("3 left");
    printf("4 right\n:");
    scanf("%d", &v5);
    if ( v5 == 2 )
    {
      ++*(_DWORD *)&v3[25];
    }
    else if ( v5 > 2 )
    {
      if ( v5 == 3 )
      {
        --v4;
      }
      else
      {
        if ( v5 != 4 )
LABEL_13:
          exit(1);
        ++v4;
      }
    }
    else
    {
      if ( v5 != 1 )
        goto LABEL_13;
      --*(_DWORD *)&v3[25];
    }
    for ( i = 0; i <= 1; ++i )
    {
      if ( *(_DWORD *)&v3[4 * i + 25] >= 5u )
        exit(1);
    }
    if ( v7[5 * *(_DWORD *)&v3[25] - 41 + v4] == 49 )
      exit(1);
    if ( v7[5 * *(_DWORD *)&v3[25] - 41 + v4] == 35 )
    {
      puts("\nok, the order you enter is the flag!");
      exit(0);
    }
  }
}
```

迷宫题
```c
*1111
01000
01010
00010
1111#
```
走0不走1
`flag{2224411144222}`


### SimpleRev
主要加密函数
*Decry*
```c
unsigned __int64 Decry()
{
  char v1; // [rsp+Fh] [rbp-51h]
  int v2; // [rsp+10h] [rbp-50h]
  int v3; // [rsp+14h] [rbp-4Ch]
  int i; // [rsp+18h] [rbp-48h]
  int v5; // [rsp+1Ch] [rbp-44h]
  char src[8]; // [rsp+20h] [rbp-40h] BYREF
  __int64 v7; // [rsp+28h] [rbp-38h]
  int v8; // [rsp+30h] [rbp-30h]
  __int64 v9[2]; // [rsp+40h] [rbp-20h] BYREF
  int v10; // [rsp+50h] [rbp-10h]
  unsigned __int64 v11; // [rsp+58h] [rbp-8h]

  v11 = __readfsqword(0x28u);
  *(_QWORD *)src = 0x534C43444ELL;
  v7 = 0LL;
  v8 = 0;
  v9[0] = 0x776F646168LL;
  v9[1] = 0LL;
  v10 = 0;
  text = (char *)join(key3, v9);
  strcpy(key, key1);
  strcat(key, src);
  v2 = 0;
  v3 = 0;
  getchar();
  v5 = strlen(key);
  for ( i = 0; i < v5; ++i )
  {
    if ( key[v3 % v5] > 64 && key[v3 % v5] <= 90 )
      key[i] = key[v3 % v5] + 32;
    ++v3;
  }
  printf("Please input your flag:");
  while ( 1 )
  {
    v1 = getchar();
    if ( v1 == 10 )
      break;
    if ( v1 == 32 )
    {
      ++v2;
    }
    else
    {
      if ( v1 <= 96 || v1 > 122 )
      {
        if ( v1 > 64 && v1 <= 90 )
        {
          str2[v2] = (v1 - 39 - key[v3 % v5] + 97) % 26 + 97;
          ++v3;
        }
      }
      else
      {
        str2[v2] = (v1 - 39 - key[v3 % v5] + 97) % 26 + 97;
        ++v3;
      }
      if ( !(v3 % v5) )
        putchar(32);
      ++v2;
    }
  }
  if ( !strcmp(text, str2) )
    puts("Congratulation!\n");
  else
    puts("Try again!\n");
  return __readfsqword(0x28u) ^ v11;
}
```

```python
text = 'killshadow'
key = 'adsfkndcls'
key_ = ''
v3=0
ans = ''
for i in range(len(key)):
        for j in range(0,10):
                tmp=chr(ord(text[i]) - 97 + 26*j - 97 + ord(key [v3%len(key)]) + 39)
                if ord(tmp)>64 and ord(tmp) <91:
                        ans+=tmp
                        break
        v3=v3+1
print(ans)

```

### java逆向解密
使用jadx打开

```python
key=[180, 136, 137, 147, 191, 137, 147, 191, 148, 136, 
        133, 191, 134, 140, 129, 135, 191, 65 ]
for i in range(len(key)):
    key[i]=(key[i]^0x20)-64
    print(chr(key[i]),end='')
```

### [GXYCTF2019]luck_guy
前半段
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20230609194733.png)

`GXY{do_not_`

```python
key="icug`of\x7f"
for i in range(len(key)):
    if i%2==1:
        print(chr(ord(key[i])-2),end='')
    else:
        print(chr(ord(key[i])-1),end='')

```

`hate_me}`

### [BJDCTF2020]JustRE

```c
INT_PTR __stdcall DialogFunc(HWND hWnd, UINT a2, WPARAM a3, LPARAM a4)
{
  CHAR String[100]; // [esp+0h] [ebp-64h] BYREF

  if ( a2 != 272 )
  {
    if ( a2 != 273 )
      return 0;
    if ( (_WORD)a3 != 1 && (_WORD)a3 != 2 )
    {
      sprintf(String, &Format, ++dword_4099F0);
      if ( dword_4099F0 == 19999 )
      {
        sprintf(String, " BJD{%d%d2069a45792d233ac}", 19999, 0);
        SetWindowTextA(hWnd, String);
        return 0;
      }
      SetWindowTextA(hWnd, String);
      return 0;
    }
    EndDialog(hWnd, (unsigned __int16)a3);
  }
  return 1;
}
```

`flag{1999902069a45792d233ac}`


### 刮开有奖

关键函数
```c
if ( strlen(String) == 8 )
    {
      v7[0] = 90;
      v7[1] = 74;
      v8 = 83;
      v9 = 69;
      v10 = 67;
      v11 = 97;
      v12 = 78;
      v13 = 72;
      v14 = 51;
      v15 = 110;
      v16 = 103;
      sub_4010F0(v7, 0, 10);   //v7会变化,而且地址连续,这一串应该是v7[10] "ZJSECaNH3ng" => "3CEHJNSZagn"
      memset(v18, 0, 0xFFFFu);
      v18[0] = String[5];
      v18[2] = String[7];
      v18[1] = String[6];
      v4 = (const char *)sub_401000(v18, strlen(v18));  //base64编码
      memset(v18, 0, 0xFFFFu);
      v18[1] = String[3];
      v18[0] = String[2];
      v18[2] = String[4];
      v5 = (const char *)sub_401000(v18, strlen(v18));
      if ( String[0] == v7[0] + 34
        && String[1] == v10
        && 4 * String[2] - 141 == 3 * v8
        && String[3] / 4 == 2 * (v13 / 9)
        && !strcmp(v4, "ak1w")
        && !strcmp(v5, "V1Ax") )
      {
        MessageBoxA(hDlg, "U g3t 1T!", "@_@", 0);
      }
    }
    return 0;
  }
```

`flag{UJWP1jMp}`


### 简单注册器
主要加密函数
```java
            public void onClick(View v) {
                int flag = 1;
                String xx = editview.getText().toString();
                flag = (xx.length() == 32 && xx.charAt(31) == 'a' && xx.charAt(1) == 'b' && (xx.charAt(0) + xx.charAt(2)) + (-48) == 56) ? 0 : 0;
                if (flag == 1) {
                    char[] x = "dd2940c04462b4dd7c450528835cca15".toCharArray();
                    x[2] = (char) ((x[2] + x[3]) - 50);
                    x[4] = (char) ((x[2] + x[5]) - 48);
                    x[30] = (char) ((x[31] + x[9]) - 48);
                    x[14] = (char) ((x[27] + x[28]) - 97);
                    for (int i = 0; i < 16; i++) {
                        char a = x[31 - i];
                        x[31 - i] = x[i];
                        x[i] = a;
                    }
                    String bbb = String.valueOf(x);
                    textview.setText("flag{" + bbb + "}");
                    return;
                }
                textview.setText("输入注册码错误");
            }

```

可以直接正向伪造注册码来得到flag

### [GWCTF 2019]pyre
pyc文件反编译
```python
#!/usr/bin/env python
# visit https://tool.lu/pyc/ for more information
# Version: Python 2.7

print 'Welcome to Re World!'
print 'Your input1 is your flag~'
l = len(input1)
for i in range(l):
    num = ((input1[i] + i) % 128 + 128) % 128
    code += num

for i in range(l - 1):
    code[i] = code[i] ^ code[i + 1]

print code
code = [
    '%1f',
    '%12',
    '%1d',
    '(',
    '0',
    '4',
    '%01',
    '%06',
    '%14',
    '4',
    ',',
    '%1b',
    'U',
    '?',
    'o',
    '6',
    '*',
    ':',
    '%01',
    'D',
    ';',
    '%',
    '%13']

```


```python

code=[]
for i in range(len(code)-2,-1,-1):
    code[i]=chr(ord(code[i])^ord(code[i+1]))
print("".join(code))
for i in range(len(code)):
    code[i]=chr((ord(code[i])-i)%128)
print("".join(code))


```


### easyre
打开只有两个函数,,说明存在壳,使用exeinfo查询,发现是upx

```python
string = '~}|{zyxwvutsrqponmlkjihgfedcba`_^]\[ZYXWVUTSRQPONMLKJIHGFEDCBA@?>=<;:9876543210/.-,+*)(\'&%$# !"'

v4="*F'\"N,\"(I?+@"

v6=[65,67,84,70,123]
for i in v6:
    print(chr(i),end="")

for i in range(len(v4)):
    print(chr(string.find(v4[i])+1),end='')

print(chr(125))
```

### findit
jadx打开
```java
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Button btn = (Button) findViewById(R.id.widget3);
        final EditText edit = (EditText) findViewById(R.id.widget2);
        final TextView text = (TextView) findViewById(R.id.widget1);
        final char[] a = {'T', 'h', 'i', 's', 'I', 's', 'T', 'h', 'e', 'F', 'l', 'a', 'g', 'H', 'o', 'm', 'e'};
        final char[] b = {'p', 'v', 'k', 'q', '{', 'm', '1', '6', '4', '6', '7', '5', '2', '6', '2', '0', '3', '3', 'l', '4', 'm', '4', '9', 'l', 'n', 'p', '7', 'p', '9', 'm', 'n', 'k', '2', '8', 'k', '7', '5', '}'};
        btn.setOnClickListener(new View.OnClickListener() { // from class: com.example.findit.MainActivity.1
            @Override // android.view.View.OnClickListener
            public void onClick(View v) {
                char[] x = new char[17];
                char[] y = new char[38];
                for (int i = 0; i < 17; i++) {
                    if ((a[i] < 'I' && a[i] >= 'A') || (a[i] < 'i' && a[i] >= 'a')) {
                        x[i] = (char) (a[i] + 18);
                    } else if ((a[i] >= 'A' && a[i] <= 'Z') || (a[i] >= 'a' && a[i] <= 'z')) {
                        x[i] = (char) (a[i] - '\b');
                    } else {
                        x[i] = a[i];
                    }
                }
                String m = String.valueOf(x);
                if (m.equals(edit.getText().toString())) {
                    for (int i2 = 0; i2 < 38; i2++) {
                        if ((b[i2] >= 'A' && b[i2] <= 'Z') || (b[i2] >= 'a' && b[i2] <= 'z')) {
                            y[i2] = (char) (b[i2] + 16);
                            if ((y[i2] > 'Z' && y[i2] < 'a') || y[i2] >= 'z') {
                                y[i2] = (char) (y[i2] - 26);
                            }
                        } else {
                            y[i2] = b[i2];
                        }
                    }
                    String n = String.valueOf(y);
                    text.setText(n);
                    return;
                }
                text.setText("答案错了肿么办。。。不给你又不好意思。。。哎呀好纠结啊~~~");
            }
        });
    }

```

只逆向第一段得到密钥
```python
a=['T', 'h', 'i', 's', 'I', 's', 'T', 'h', 'e', 'F', 'l', 'a', 'g', 'H', 'o', 'm', 'e']
b=['p', 'v', 'k', 'q', '{', 'm', '1', '6', '4', '6', '7', '5', '2', '6', '2', '0', '3', '3', 'l', '4', 'm', '4', '9', 'l', 'n', 'p', '7', 'p', '9', 'm', 'n', 'k', '2', '8', 'k', '7', '5', '}']

print(len(a))
for i in a:
    if (i<'I' and i>='A') or (i<'i' and i>='a'):
        print(chr(ord(i)+18),end='')
    elif (i>='A' and i <='Z') or (i>='a' and i<='z'):
        print(chr(ord(i)-ord('\b')),end='')
    else:
        print(i,end='')
```


### [ACTF新生赛2020]rome


```python
v12="Qsw3sj_lz4_Ujw@l"
print(len(v12))
for i in range(len(v12)):
    for k in range(0,127):
        z=k
        if k>64 and k<=90:
            k=(k-51)%26+65
        if k>96 and k<=122:
            k=(k-79)%26+97
        if(chr(k)==v12[i]):
            print(chr(z),end='')


```

### rsa
给了两个文件 flag.enc和pub.key
放错了位置的crypto捏
### [FlareOn4]login

```js
            document.getElementById("prompt").onclick = function () {
                var flag = document.getElementById("flag").value;
                var rotFlag = flag.replace(/[a-zA-Z]/g, function(c){return String.fromCharCode((c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);});
                if ("PyvragFvqrYbtvafNerRnfl@syner-ba.pbz" == rotFlag) {
                    alert("Correct flag!");
                } else {
                    alert("Incorrect flag, rot again");
                }
```

rot13算法

### crackRTF
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20230617235237.png)
第一个加密函数
```python
import hashlib
sha1=hashlib.sha1()
for i in range(100000,999999):
    flag=str(i)+"@DBApp"
    hexflag=hashlib.sha1(flag.encode())
    hexflag=hexflag.hexdigest()
    if hexflag=="6e32d0943418c2c33385bc35a1470250dd8923a9":
        print(flag)

```
采用暴力破解方式

下一个哈希是md5,但是六位没有数字限制所以无法爆破
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20230618003058.png)
使用`resource hacker`打开即可看到AAA内容


后面先放一放

### [WUSTCTF2020]level1
```python
with open(r"C:\Users\20925\Downloads\attachment (1)\level1\output.txt",'r') as f:
    for i in range(1,20):
        num=int(f.readline())
        if i&1 !=0:
            print(chr(num>>i),end='')
        else:
            print(chr(num//i),end='')
```

### [GUET-CTF2019]re
- upx脱壳
根据字符串找到main函数
加密逻辑很简单,就是简单的乘除法
但是把数据提取出来很麻烦
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20230619155355.png)

gpt做的不是很完美,只能手撸了
```python
flag=[]
flag.append(166163712//1629056)
flag.append(731332800//6771600)
flag.append(357245568//3682944)
flag.append(1074393000//10431000)
flag.append(489211344//3977328)
flag.append(518971936//5138336)
flag.append(32)
flag.append(406741500//7532250)
flag.append(294236496//5551632)
flag.append(177305856//3409728)
flag.append(650683500//13013670)
flag.append(298351053//6088797)
########
print(''.join(chr(i) for i in flag))
```


### [2019红帽杯]easyRE
第一段异或
```python
string="Iodl>Qnb(ocy.y.i.d`3w}wek9{iy=~yL@EC"
print(len(string))
for i in range(36):
    print(chr(ord(string[i])^i),end='')
#result,前四位为flag
```


```c
 if ( ((unsigned __int8)v1 ^ enc[0]) == 102 && (HIBYTE(v4) ^ (unsigned __int8)byte_6CC0A3) == 103 )// enc[0]=f,enc[3]=g
  {
    for ( j = 0; j <= 24; ++j )
      sub_410E90((unsigned __int8)(enc[j] ^ *((_BYTE *)&v4 + j % 4)));// 依次与v4数组里的值循环异或
  }
```

```python
string="@5 V]\x18\"E\x17/$nb<'THl$nr<2E["
key=[]
key2='flag'
for i in range(4):
    for j in range(126):
        if chr(j^ord(string[i]))==key2[i]:
            key.append(j)
print(key)#得到key值
for i in range(len(string)):
    print(chr(ord(string[i])^key[i%4]),end='')

```

### [MRCTF2020]Transform
```c
int __cdecl main(int argc, const char **argv, const char **envp)
{
  char input[104]; // [rsp+20h] [rbp-70h] BYREF
  int j; // [rsp+88h] [rbp-8h]
  int i; // [rsp+8Ch] [rbp-4h]

  sub_402230(argc, argv, envp);
  sub_40E640("Give me your code:\n");
  sub_40E5F0("%s", input);
  if ( strlen(input) != 33 )
  {
    sub_40E640("Wrong!\n");
    system("pause");
    exit(0);
  }
  for ( i = 0; i <= 32; ++i )
  {
    input_2[i] = input[dword_40F040[i]];        // 相当于给数组打乱
    input_2[i] ^= LOBYTE(dword_40F040[i]);      // 再异或一下
  }
  for ( j = 0; j <= 32; ++j )
  {
    if ( byte_40F0E0[j] != input_2[j] )         // 与目标字符串比较
    {
      sub_40E640("Wrong!\n");
      system("pause");
      exit(0);
    }
  }
  sub_40E640("Right!Good Job!\n");
  sub_40E640("Here is your flag: %s\n", input);
  system("pause");
  return 0;
```

```python
target="gy{\x7Fu+<RSyW^]B{-*fB~LWyAk~e<\\EobM"
string=[9,10,15,23,7,24,12,6,1,16,3,17,32,29,11,30,27,22,4,13,19,20,21,2,25,5,31,8,18,26,28,14,0]
# print(len(string))
#异或
for i in range(len(target)):
    print(chr(ord(target[i])^string[i]),end='')
print()
#复原
result="nsthr30TRiTO}_p31pFs_ClCr{z4N_slM"
flag=[0]*33
print(len(flag))
for i in range(len(string)):
    flag[string[i]]=result[i]
print(''.join(flag))
```

### [WUSTCTF2020]level2
upx脱壳,用工具做的
### [SUCTF2019]SignIn
#rsa
```c
__int64 __fastcall main(int a1, char **a2, char **a3)
{
  char mod[16]; // [rsp+0h] [rbp-4A0h] BYREF
  char exp[16]; // [rsp+10h] [rbp-490h] BYREF
  char result[16]; // [rsp+20h] [rbp-480h] BYREF
  char v7[16]; // [rsp+30h] [rbp-470h] BYREF
  char input[112]; // [rsp+40h] [rbp-460h] BYREF
  char v9[1000]; // [rsp+B0h] [rbp-3F0h] BYREF
  unsigned __int64 v10; // [rsp+498h] [rbp-8h]

  v10 = __readfsqword(0x28u);
  puts("[sign in]");
  printf("[input your flag]: ");
  __isoc99_scanf("%99s", input);
  sub_96A(input, v9);
  __gmpz_init_set_str(v7, "ad939ff59f6e70bcbfad406f2494993757eee98b91bc244184a377520d06fc35", 16LL);
  __gmpz_init_set_str(result, v9, 16LL);
  __gmpz_init_set_str(mod, "103461035900816914121390101299049044413950405173712170434161686539878160984549", 10LL);
  __gmpz_init_set_str(exp, "65537", 10LL);
  __gmpz_powm(result, result, exp, mod);
  if ( (unsigned int)__gmpz_cmp(result, v7) )
    puts("GG!");
  else
    puts("TTTTTTTTTTql!");
  return 0LL;
}
```
真没看出来算法是`RSA`,
```python
import gmpy2
import binascii

p = 282164587459512124844245113950593348271
q = 366669102002966856876605669837014229419
e = 65537
c = 0xad939ff59f6e70bcbfad406f2494993757eee98b91bc244184a377520d06fc35
n = p * q
d = gmpy2.invert(e, (p-1) * (q-1))
m = gmpy2.powmod(c, d, n)

print(binascii.unhexlify(hex(m)[2:]).decode(encoding="utf-8"))

```
### [ACTF新生赛2020]usualCrypt
base64变表+大小写互换

### [HDCTF2019]Maze
根据题目名,应该是个迷宫题
#去花
nop掉第一个指令,再按`c`将后面指令识别为代码,选中代码按`p`识别为函数

![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20230626005905.png)
修补后
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20230626005958.png)
然后就可以使用f5了
main
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20230626010113.png)

很明显`asc_408078`就是迷宫,wasd来控制方向
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20230626010226.png)
格式化一下
```text
*******+**
******* **
****    **
**   *****
** **F****
**    ****
**********
```

### [MRCTF2020]Xor
```python
string="MSAWB~FXZ:J:`tQJ\"N@ bpdd}8g"
print(len(string))
for i in range(len(string)):
    print(chr(ord(string[i])^i),end='')
```
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





# ctfshow
### re2
![[Pasted image 20230604234625.png]]
主要加密函数
- sub_401069(str,str1)
```cpp
{
  char v3; // [esp+0h] [ebp-E4h]
  signed int i; // [esp+D0h] [ebp-14h]
  signed int v5; // [esp+DCh] [ebp-8h]

  __CheckForDebuggerJustMyCode(&unk_40B027);
  v5 = strlen(Str);
  for ( i = 0; i < v5; ++i )
    Str1[i] += Str[i] ^ 0x1F;
  if ( !strcmp(Str1, "DH~mqqvqxB^||zll@Jq~jkwpmvez{") )
    sub_401037((char *)&byte_406B80, v3);
  else
    sub_401037("Error!\n", v3);
  return *Str1;
}
```

用来判断输入密钥的[正确性](http://www.baidu.com)

```python
string="DH~mqqvqxB^||zll@Jq~jkwpmvez{"
for i in string:
    print(chr(ord(i)^0x1F),end='')
#[Warnning]Access_Unauthorized
```

---
后面不会了,看了一眼wp,下一个函数rc4加密,flag.txt是待加密文件,enflag.txt是加密后的文件,根据rc4加密的特性,我们得到密钥后只需要复制一个flag.txt内容为给出的enflag,然后运行一遍就可以了

`flag{RC4&->ENc0d3F1le}`

### [2019红帽杯]easyRE


### re3
> 提交最小解即可，4位值

```c
v7 = 80;
  v8 = 64227;
  v9 = 226312059;
  v10 = -1540056586;
  v11 = 5;
  v12 = 16;
  v13 = 3833;
  v5 = 0;
  puts("plz input the key:");
  __isoc99_scanf("%s", s);                      // 获取输入
  v3 = strlen(s);
  strncpy(dest, v19, v3 - 6);
  dest[strlen(s) - 6] = 0;
  __isoc99_sscanf(dest, "%x", &v5);             // 取输入的前六位
  v17[0] = v7;                                  // 80
  v17[1] = v8;                                  // 64227
  v17[2] = v9;                                  // 226312059
  v17[3] = v10;                                 // -1540056586
  v17[4] = (v11 << 12) + v12;                   // 20496
  v17[5] = v13;                                 // 3833
  v17[6] = v5;                                  // hex(input)
  v16 = 0LL;
  for ( i = 0; i <= 6; ++i )
  {
    for ( v16 += (unsigned int)v17[i]; v16 > 0xFFFF; v16 = v15 + (unsigned int)(unsigned __int16)v16 )
    {
      v14 = (unsigned __int16)v16;
      v15 = v16 >> 16;
    }
  }
  if ( v16 == 0xFFFF )
    puts("OK");
  else
    puts("Error");
```

对应c代码
```c
#include<stdio.h>
int main() {
	int v15 = 0;
	unsigned __int64 v16 = 0LL;
	int v17[7] = {80, 64227, 226312059, -1540056586, 20496, 3833, 888};

	for (int i = 0 ; i <= 6; ++i ) {
		for ( v16 += (unsigned int)v17[i]; v16 > 0xFFFF; v16 = v15 + (unsigned int)(unsigned __int16)v16 )
			v15 = v16 >> 16;
	}

	if ( v16 == 0xFFFF )
		puts("OK");
	else
		puts("Error");

	return 0;
}

```

打断点到最后一次加上v17[6],发现此时v16=58720,则取值应该为`0xffff-58720`=6815=0x1a9f

### re4
```c
int __cdecl __noreturn main(int argc, const char **argv, const char **envp)
{
  __int64 v3; // rdx
  char *v4; // [rsp+20h] [rbp-18h] BYREF

  qword_140004618 = (__int64)malloc(0x10ui64);
  qword_140004620 = qword_140004618;
  *(_QWORD *)(qword_140004618 + 8) = 0i64;
  sub_140001020((char *)&Format);
  sub_140001080("%lld", &v4);                   // 输入
  sub_1400010E0(v4, v3);                        // 加密函数,v3没有初始化
}
```

- sub_1400010E0
```c
void __fastcall __noreturn encode(char *input, __int64 a2)
{
  int v2; // r9d
  __int64 input1; // r8
  char *v4; // r10
  char v5; // al
  __int64 v6; // rbx
  char v7; // cl
  char v8; // [rsp+1Fh] [rbp-3F9h]
  char v9; // [rsp+20h] [rbp-3F8h] BYREF

  v2 = 0;
  input1 = (__int64)input;
  if ( input )
  {
    v4 = &v9;
    do
    {
      ++v4;
      ++v2;
      v5 = string[input1 + -26 * (input1 / 26)];// input1%26
      input1 /= 26i64;
      *(v4 - 1) = v5;
    }
    while ( input1 );
  }
  v6 = v2;
  while ( v6 )
  {
    v7 = *(&v8 + v6--);
    sub_1400011E0(v7 ^ 7);
  }
  check();
}
```

*gpt   orz*
>[!info]
>首先，变量 v2 被初始化为 0，变量 input1 被赋值为输入字符串的地址。然后对输入字符串进行遍历，从最后一个字符开始每次取出一位，将其转化为一个新的字符并存储到变量 v9 中。这里采用了一种类似于进制转换的算法，将每一位字符转化为一个 0-25 之间的数字，然后将其转化为一个新的字符（由一个字符串 string 给出）。具体转化的过程是将 input1 对 26 取余得到一个数字，然后将 input1 除以 26，继续处理下一位字符，直到 input1 变成 0。最后得到的编码后的字符串存储在变量 v9 中


- sub_140001220
>其中flag和lose是改过名的

*真没看出来这个函数是对比字符串的*
```c
void __noreturn sub_140001220()
{
  __int64 v0; // r9
  int v1; // ecx
  __int64 v2; // rdx
  char v3; // al
  int v4; // r8d
  __int64 v5; // r9
  char v6; // cl
  int v7; // eax 记录对的字符数

  v0 = qword_140004620;
  v1 = 0;
  v2 = 0i64;
  while ( 1 )
  {
    v3 = *(_BYTE *)v0;                          // 取当前字符
    v4 = v1 + 1;                                // 1
    v5 = *(_QWORD *)(v0 + 8);                   // 指向下一位
    if ( v3 != str[v2 - 1] )                    // ..v4p$$!>Y59-
      v4 = v1;
    qword_140004620 = v5;
    if ( !v5 )
      break;                                    // 表示字符结尾
    v6 = *(_BYTE *)v5;
    v7 = v4 + 1;
    v0 = *(_QWORD *)(v5 + 8);
    if ( v6 != str[v2] )
      v7 = v4;
    qword_140004620 = v0;
    if ( v0 )
    {
      v2 += 2i64;                               // 计数器,2为步进
      v1 = v7;
      if ( v2 < 14 )
        continue;
    }
    goto LABEL_11;
  }
  v7 = v4;
LABEL_11:
  if ( v7 == 14 )
    flag();
  lose();
}
```

```python
string="/..v4p$$!>Y59-"
string2=")(*&^%489$!057@#><:2163qwe"

index=[]
flag=0
def rev_check():
    for i in string:
        print(chr(ord(i)^7),end='')
d="())q3w##&9^2>*"

def rev_encode():
    flag=0
    for i in d:
        index.append(string2.index(i))
    print(index)
    for i in index:
        flag*=26
        flag+=i
    print(flag)
rev_encode()
```

>[!总结]
>就是一个简单的26进制变表+异或,看了这么久



---
我的ida怎么结果和别人不一样,,,printf也没识别出来😥


### 逆向5
给了两个文件 `1.ddl` 和 `call_1.exe`

od动态调试修改标志寄存器里的值为1,使函数流程跳转到输出flag的函数
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20230609003146.png)



# NSS
### 简简单单的解密
```python
import base64,urllib.parse
key = "HereIsFlagggg"
flag = "xxxxxxxxxxxxxxxxxxx"

s_box = list(range(256))
j = 0
for i in range(256):
    j = (j + s_box[i] + ord(key[i % len(key)])) % 256
    s_box[i], s_box[j] = s_box[j], s_box[i]
res = []
i = j = 0
for s in flag:
    i = (i + 1) % 256
    j = (j + s_box[i]) % 256
    s_box[i], s_box[j] = s_box[j], s_box[i]
    t = (s_box[i] + s_box[j]) % 256
    k = s_box[t]
    res.append(chr(ord(s) ^ k))
cipher = "".join(res)
crypt = (str(base64.b64encode(cipher.encode('utf-8')), 'utf-8'))
enc = str(base64.b64decode(crypt),'utf-8')
print(enc)
# enc = %C2%A6n%C2%87Y%1Ag%3F%C2%A01.%C2%9C%C3%B7%C3%8A%02%C3%80%C2%92W%C3%8C%C3%BA
```

异或,decode函数与encode函数相同
`decode(urllib.parse.unquote(enc))`



### re2

```python
import base64,urllib.parse

string='ylqq]aycqyp{'
for i in string:
    res=[]
    if (ord(i)<=96 or ord(i)>98) and (ord(i)<=64 or ord(i)>66):
        res.append(chr(ord(i)+2))
    else:
        res.append(chr(ord(i)-24))
    print(''.join(res),end='')
```


### 非常简单的逻辑题

```python
flag = 'xxxxxxxxxxxxxxxxxxxxx'
s = 'wesyvbniazxchjko1973652048@$+-&*<>'
result = ''
for i in range(len(flag)):
    s1 = ord(flag[i])//17
    s2 = ord(flag[i])%17
    result += s[(s1+i)%34]+s[-(s2+i+1)%34]
# print(result)
result = 'v0b9n1nkajz@j0c4jjo3oi1h1i937b395i5y5e0e$i'


def decode(result):
    for i in range(0,len(result),2):
        s1=s.find(result[i])-(i)//2
        s2=34-s.find(result[i+1])- 1-i//2
        res=s1*17+s2
        print(chr(res),end='')
decode(result)
```

### wordy
第一次见花指令


# [ctflearn](https://ctflearn.com/)
开刷
### Basic Android re 1
jadx 打开
```java
    public void submitPassword(View view) {
  
        EditText editText = (EditText) findViewById(R.id.editText2);
  
        if (DigestUtils.md5Hex(editText.getText().toString()).equalsIgnoreCase("b74dec4f39d35b6a2e6c48e637c8aedb")) {
  
            ((TextView) findViewById(R.id.textView)).setText("Success! CTFlearn{" + editText.getText().toString() + "_is_not_secure!}");
  
        }
  
    }
```

可以看到校验md5,cmd5需要收费,换了一个[网站](https://md5decrypt.net/)  解出 `Spring2019`

### Pin
```c
_BOOL8 __fastcall cek(int a1)
{
  return a1 == valid;
}
```

追踪vaild变量  `valid dd 51615h`
转换为10进制  `333333`

