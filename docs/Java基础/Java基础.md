## 1 为什么重写 equals 还要重写 hashcode？

HashMap 进行比较会先调用 hashcode() 方法，如果 hashcode() 不等，直接就判定为不相等，而 hashcode() 默认为内存地址。如果不重写，那么比如我们在修改 hashmap 的时候会创建一个新的 key，而不是去修改。

## 2 说一下 map 的分类和常见情况

Map 接口有四个常见实现类 Hashmap、Hashtable、LinkedHashMap、TreeMap

Hashmap 根据 key 的 Hashcode 存储数据，允许一条记录的 key 为 null，多线程操作可能会导致数据错误

Hashtable 不允许 key 为 null，方法使用 synchronized 修饰，一个时刻只允许一个线程

LinkedHashMap 是 HashMap 的一个子类，保存了记录的插入顺序，使用 Iterator 遍历时，先得到的就是先插入的

TreeMap 是根据 key 排序的 map

扩展：如何选择，一般选择最快的 hashmap，有多线程需求使用 ConcurrentHashMap，排序就用 TreeMap

## 3 Object 若不重写 hashCode() 的话，hashCode() 如何计算出来的？

Object 的 hashcode 方法是本地方法，也就是用 c 语言或 c++ 实现的，该方法直接返回对象的内存地址。

## 4 == 比较的是什么

如果是对象，比较的的是内存地址

如果是基本类型，比较的是值

## 5 若对一个类不重写，它的 equals() 方法是如何比较的？

比较的是对象的地址

注：Java 自带的类型大多重写了 equals 方法

## 6 Java8 新特性

Lambda 表达式：运行把函数作为参数传入

接口支持 default 默认方法

Stream API：流式编程

Date Time API：加强时间处理

Optional 类：解决空指针异常

## 7 说说 Lamda 表达式的优缺点

优点：1. 简洁。2. 非常容易并行计算。（默认使用 ForkJoinPool）

缺点：1.不使用并行计算时，比 for 循环慢。2.调试困难。

## 8 为啥有时会出现 4.0-3.6=0.40000001 这种现象？

2 进制的小数无法精确的表达 10 进制小数，计算机在计算 10 进制小数的过程中要先转换为 2 进制进行计算，这个过程中出现了误差。

如果要精确计算，需要使用 BigDecimal 之类的类

## 9 Java 支持的数据类型有哪些？什么是自动拆装箱？

Java 语言支持的 8 种基本数据类型是：

+ boolean  (取决于虚拟机)

+ byte 8

+ char 16

+ short 16

+ int 32

+ float 32

+ long 64

+ double 64

自动装箱是 Java 编译器在基本数据类型和对应的对象包装类型之间做的一个转化。比如： 把 int 转化成 Integer，double 转化成 Double，等等。反之就是自动拆箱。

## 11 什么是值传递和引用传递？

值传递传的是变量副本，引用传递传入的是变量地址。

一般认为 Java 都是值传递，但如果传入的是对象，值为地址，因此会修改到原内容

## 12 数组 (Array) 和列表 (ArrayList) 有什么区别？什么时候应该使用 Array 而不是 ArrayList？

Array 和 ArrayList 的不同点： Array 可以包含基本类型和对象类型，ArrayList 只能包含对象类型。

Array 大小是固定的，ArrayList 的大小是动态变化的。 ArrayList 提供了更多的方法和特性，比如：addAll()，removeAll()，iterator() 等等。

处理固定大小的基本类型时，优先使用 Array

## 13 String 和 StringBuffer 的区别

String 类被 final 修饰，不可修改。

StringBuffer 可以修改。

## 14 int 和 Integer 有什么区别？

int 为基本类型，Integer 为包装类型。

基本类型不需要在堆上分配内存，效率更高、

## 15 &和&&的区别？

& 是按位与，&& 是逻辑与

## 16 在 Java 中，如何跳出当前的多重嵌套循环？

使用 label 标记 for 循环，break 时带上 label

## 17 简述正则表达式及其用途。

正则表达式是描述符合特定规则字符串的工具，记录文本规则。

常用于匹配和处理文本。

## 18 String 为啥不可变

String 被 final 关键字修饰，内部 value 字节数组也被 final 修饰。

让 String 不可变可以保证同一字符串被多线程共享，提供缓存效率，减少安全问题。

