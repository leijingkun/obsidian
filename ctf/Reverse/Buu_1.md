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