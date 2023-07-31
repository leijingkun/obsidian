
# web
### FreeBee
前端模糊处理,打开元素,取消css属性即可
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20230611003026.png)

### CookieJar
修改cookie来伪造

![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20230611022708.png)
修改`name`为`John Johnsons`的base64
一直提示`You did not order 2 things`,改为json数组也不行
### Not Today
访问后提示`It is not time to be distributing flags 😱`
后端请求`/api`

![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20230611023426.png)

修改时间也没用,不知道怎么做捏

### BCAGPT
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20230611024050.png)

```node
    db.serialize(() => {
        db.get(`SELECT response_text FROM response WHERE response_keywds !='${kwds}' ORDER BY resp_order, RANDOM() LIMIT 1`, (err, row) => {
            if (err) {
                console.error(err.message);
                res.render('index', {error: err.message});
            } else {
                let resp = row?.response_text?.replace("{}",req.body.query) ?? "AI brain overheated";
                msgs.push({author: 'BCAGPT', message: resp});
                
                res.render('index', {
                    messages: msgs
                });
            }
            return;
        });
    });
```

![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20230611033321.png)
怎么注入不了

# reverse
### Interpreted Arduino I
```c
void setup() {
  Serial.begin(9600);
  Serial.println("bcactf{REDACTED flag}");
}

void loop() {
    //TODO
}
```
一个仿真终端arduino,看不懂要干嘛
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20230611022456.png)

# pwn

# crypto

# Misc


---
## *相关wp*




2023-06-10   23:12