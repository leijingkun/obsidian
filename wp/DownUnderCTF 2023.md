# web
### static file server
```python
app = web.Application()
app.add_routes([
    web.get('/', index),

    # this is handled by https://github.com/aio-libs/aiohttp/blob/v3.8.5/aiohttp/web_urldispatcher.py#L654-L690
    web.static('/files', './files', follow_symlinks=True)
])
web.run_app(app)
```
目录穿越也不行

### xxd-server
允许上传php文件但是会xxd(file)
让php代码长度<16即可解析
`<?= $_GET[1]`

### actually-proxed
go
有俩个服务,一个proxy,一个web
```go
		if ip != "31.33.33.7" {
			message := fmt.Sprintf("untrusted IP: %s", ip)
			http.Error(w, message, http.StatusForbidden)
			return
		} else {
			w.Write([]byte(os.Getenv("FLAG")))
		}
```
不知道怎么伪造


# reverse

# pwn

# crypto

# Misc


---
# *相关wp*




2023-09-03   14:51