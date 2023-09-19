# web
### BadJwt
#nodejs
传入jwt,token为输入,secret为服务器随机生成36位密钥.下面这个函数负责计算secret
```js

const createSignature = (header, payload, secret) => {
	const data = `${stringifyPart(header)}.${stringifyPart(payload)}`;
	const signature = algorithms[header.alg.toLowerCase()](data, secret);
	return signature;
}

const algorithms = {
	hs256: (data, secret) => 
		base64UrlEncode(crypto.createHmac('sha256', secret).update(data).digest()),
	hs512: (data, secret) => 
		base64UrlEncode(crypto.createHmac('sha512', secret).update(data).digest()),
}
```

当传入特殊的属性如`constructor`时,`algorithms[header.alg.toLowerCase()](data, secret);`
只会返回第一个参数
![image](https://i.imgur.com/8CnkB7o.png)

# reverse

# pwn

# crypto

# Misc


---
# *相关wp*




2023-09-19   14:50