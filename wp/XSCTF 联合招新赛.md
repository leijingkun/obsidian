# web

# reverse
### easyEZbaby_app
```java
//检测函数,只需要满足checkUsername和checkPass
    public void onClick(View view) {
        String obj = this.username.getText().toString();
        String obj2 = this.password.getText().toString();
        if (checkUsername(obj) && checkPass(obj2)) {
            Toast.makeText(this, "登录成功", 0).show();
            Toast.makeText(this, "flag{" + obj + obj2 + "}", 0).show();
            return;
        }
        Toast.makeText(this, "登录失败", 0).show();
    }
//md5后步进设为2
    public boolean checkUsername(String str) {
        if (str != null) {
            try {
                if (str.length() != 0 && str != null) {
                    MessageDigest messageDigest = MessageDigest.getInstance("MD5");
                    messageDigest.reset();
                    messageDigest.update("zhishixuebao".getBytes());
                    String hexString = toHexString(messageDigest.digest(), "");
                    StringBuilder sb = new StringBuilder();
                    for (int i = 0; i < hexString.length(); i += 2) {
                        sb.append(hexString.charAt(i));
                    }
                    String sb2 = sb.toString();
                    return (sb2).equals(str);
                }
                return false;
            } catch (NoSuchAlgorithmException e) {
                e.printStackTrace();
            }
        }
        return false;
    }
//对ascii做加减
    public boolean checkPass(String str) {
        if (str != null) {
            char[] charArray = str.toCharArray();
            if (charArray.length != 15) {
                return false;
            }
            for (int i = 0; i < charArray.length; i++) {
                charArray[i] = (char) ((((255 - i) + 2) - 98) - charArray[i]);
                if (charArray[i] != '0' || i >= 15) {
                    return false;
                }
            }
            return true;
        }
        return false;
    }

```
*solve*
```python
string="7da5fec345fecde5fdcd641f68e0b6d1"
for i in range(0,len(string),2):
    print(string[i],end='')
password='0'*15
for i in range(len(password)):
    print(chr(255-98+2-i-48),end='')

```
### easyxor
```python
r = [0x35, 0x2F, 0x2F, 0x32, 0x28, 0x14, 0x27, 0x3B, 0x3D, 0x70,
     0x3C, 0x0A, 0x3D, 0x73, 0x3A, 0x0A, 0x1F, 0x73, 0x3D, 0x66,
     0x21, 0x1C, 0x6D, 0x28]
key="SCNU"
for i in range(len(r)):
    print(chr(r[i]^ord(key[i%4])),end='')

```

# pwn

# crypto

# Misc


---
# *相关wp*




2023-07-10   00:51