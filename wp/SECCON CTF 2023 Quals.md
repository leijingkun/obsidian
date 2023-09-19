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
返回函数的构造方法,
![image](https://i.imgur.com/8CnkB7o.png)
>TL;DR explanation: 
`const signature = algorithms[header.alg.toLowerCase()](data, secret);` is vulnerable to ["constructor"], calling the array constructor with the params -> results in an arr of dicts
const calculated_buf = Buffer.from(calculated_signature, 'base64'); casts everything to a primitive -> arr of dict gets "stringified"



# reverse

# pwn

# crypto

# Misc


---
# *相关wp*




2023-09-19   14:50