https://developer.android.com/codelabs/basic-android-kotlin-compose-first-app?continue=https%3A%2F%2Fdeveloper.android.com%2Fcourses%2Fpathways%2Fandroid-basics-compose-unit-1-pathway-2&hl=zh-cn#4

函数
```kotlin
fun hello(name: String = "Rover", age: Int):Int {
//可变变量
    var count: Int=2
//不可变
	val num=1
    count=12
    println(count)
    return count
}
```
when语句
```kotlin
when(value){
"a"->{}
//使用英文逗号 (,) 处理多个条件
"a","b"->{}
//使用 in 关键字处理一系列条件
in 1..10 -> println("x is a number between 1 and 10, but not a prime number.")
//使用 is 关键字检查数据类型
is Int -> println("x is an integer number, but not between 1 and 10.")

}
```

```kotlin
fun main() {
    val trafficLightColor = "Black"

    val message =
      if (trafficLightColor == "Red") "Stop"
      else if (trafficLightColor == "Yellow") "Slow"
      else if (trafficLightColor == "Green") "Go"
      else "Invalid traffic-light color"
}
```

null变量
```kotlin
fun main() {
    val favoriteActor = null
    println(favoriteActor)
}
//重新赋值
fun main() {
    var favoriteActor: String? = "Sandra Oh"
    println(favoriteActor)

    favoriteActor = null
    println(favoriteActor)
}

//操作
fun main() {
    var favoriteActor: String? = "Sandra Oh"
    //不加?会报错,编译时防止值为null  ?.为安全运算符
    println(favoriteActor?.length)
}
```

类与对象
```kotlin

```