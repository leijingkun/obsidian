
# web
### Safe Locker
#js
完了easy题已经看不懂了
![[Pasted image 20230508010917.png]]

在转动后会发送一个请求,请求一份wasm,每次请求之间也没有什么区别,前端就一个长长的password.js怎么做?做不了一点

--- 
前端调试,学到了
根据`password_checker`判断密码政务,使用暴力穷举
- 打断点到`password_checker`函数后,并运行
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20230516110535.png)

- 控制台穷举

```js
c = password_checker
for (let i = 99999999; i >= 77777777; i--) {
    if (c(i.toString().padStart(8, '0'))) {
        console.log(i);
        break;
    }
}
```

### Bring BACK The Time
#sql 

# reverse

# pwn

# crypto

# Misc


---
## *相关wp*
https://github.com/sahuang/my-ctf-challenges/tree/main/cryptoversectf-2023/Web



2023-05-08   01:02