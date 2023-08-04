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
![image.png|850](https://gitee.com/leiye87/typora_picture/raw/master/20230804203742.png)

`YV4A22PK1H1184823`
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
free available check你收我费,test your code
![image.png](https://gitee.com/leiye87/typora_picture/raw/master/20230804220227.png)

找不到了,next

### Mac Track!
>[!info]
>We've managed to identify the MAC address of a vehicle of interest, can you help us track down where it was located on December 8'th, 2022? We need the latitude and longitude to two decimal places.
MAC: 2A:38:5C:91:E5:27
Hint: format XX.XX,XX.XX

google到了可以使用google cloud api,研究配置一番

# web

# reverse

# pwn

# crypto

# Misc


---
# *相关wp*




2023-08-04   18:58