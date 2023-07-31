
# web
### BUY THE FLAG
给了两个账户,一个普通一个管理员,获取flag需要两个条件
```node
router.post("/buy-flag", urlencodedParser, async (req, res) => {
    var isLoggedin = verifyLogin(req);

    if (isLoggedin) {
        const id = req.body.id;
        if (!id) {
            return res.status(400).json({ error: "Invalid ID" });
        }
        if (verifyManager(req.cookies.token)[0]) { //manager==true
            if (verifyManager(req.cookies.token)[1] && id == verifyManager(req.cookies.token)[1]) { //credntial里没有id,需要污染
                res.json({ flag: "BSidesIndore{fake_flag}" });
            } else {
                res.send("<script>alert('Invalid ID!')</script>");
            }
        } else {
            res.send("<script>alert('Only Manager can perform this action!')</script>");
        }
    }
     else {
        securityIncident(req.body, isLoggedin);
        return res.status(403).json({ error: "Unauthorized Action" });
    }
});
```

原型链污染,不会啊
# reverse
### Flag Generator

不会

---

# pwn

# crypto

# Misc


---
## *相关wp*




2023-06-17   19:37