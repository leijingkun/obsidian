```
function convertToDict(cookies) {
  const cookieDict = {};
  for (const cookie of cookies) {
    cookieDict[cookie.name] = {
      "domain": cookie.domain,
      "expirationDate": cookie.expirationDate,
      "hostOnly": cookie.hostOnly,
      "httpOnly": cookie.httpOnly,
      "path": cookie.path,
      "sameSite": cookie.sameSite,
      "secure": cookie.secure,
      "session": cookie.session,
      "storeId": cookie.storeId,
      "value": cookie.value
    };
  }
  return cookieDict;
}

const cookieDict = convertToDict(cookies);
console.log(cookieDict);
```