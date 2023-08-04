VSEC(vehicle sec)车辆安全,玩一玩
# GET START
总结来说就是candump命令的使用
### find interface
获取can的接口
`ip link`
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20230804200153.png)
`vcan0`
### Arbitration
使用candump监听vcan0接口
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20230804200323.png)
`vcan0 59E [2] 9E 10`
接口名 Arbitration(仲裁)ID bytes(总字节数) data(发送的数据)

# Vehicle OSINT
### Finding a VIN
VIN(Vehicle Identification Number)汽车唯一标识码
>[!info]
>Here's a license plate "DCR 660", it is registered in Michigan. Can you find the VIN?

google到这个[网站](https://vincheck.info/license-plate-search.php?error=e1008)输入车牌号`DCR660`和`Michigan`的简称`MI`即可获得到VIN
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20230804203742.png)

### Make and Model
>[!info]
>Here's a license plate "DCR 660", it is registered in Michigan. What is the make and model?
Format: year-make-model

`2017-VOLVO-XC90`

### Manufactured at?
*Format: City, Country*

![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20230804205919.png)

### Imported when?
查询车辆的进口时间


# web

# reverse

# pwn

# crypto

# Misc


---
# *相关wp*




2023-08-04   18:58