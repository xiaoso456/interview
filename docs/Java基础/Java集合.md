## 1 HashMap 和 ConcurrentHashMap 的区别？

hashmap 是线程不安全的，put 时在多线程情况下，会形成环从而导致死循环 (jdk1.7)。

CoucurrentHashMap 是线程安全的，采用分段锁机制，减少锁的粒度。

## 2 hashMap 内部是如何实现的

hashmap 基于数组实现的，通过对 key 的 hashcode & 数组的长度得到在数组中位置，如果有冲突就用拉链法形成链表解决冲突，如果链表长度 >= 8，会转化为红黑树，<=6 时，转化为链表。hashmap 数组长度为 2^n，利于扩容时迁移，扩容后要么在原位置，要么在原位置+n 的位置（二进制左边多 1）

为什么长度是 8：链表平均查找长度为 8/2=4,红黑树为$log_28=3$，红黑树效率高

为什么选择 6 转化回链表：有 7 作缓存，防止链表和树频繁转化。



## 3 如果 hashmap 的 key 是一个自定义类，有什么要注意？

该类必须重写 hashcode() 和 equals()

## 4 ArrayList 和 LinkedList 的区别，如果一直在 list 的尾部添加元素，用哪 个效率高？

ArrayList 采用数组数组实现的，查找效率比 LinkedList 高。

LinkedList 采用双向链表实现的，插入和删除的效率比 ArrayList 要高。

一直在 list 的尾部添加元素，LinkedList 效率要高

## 5 hashmap 扩容机制，负载因子是多少，容量为什么是 2^n

负载因子是 0.75

2^n 是为了散列更均匀。在 2^n，计算下标求余运算可以简化为 (n-1)&hash，速度更快。以及扩容迁移方便。

## 6 ConcurrentHashMap 锁加在了哪些地方

1.7 用 ReentrantLock 加在每个 segment 上面

1.8 加在 node 节点，采用节点锁

## 7 TreeMap 底层

TreeMap 的实现就是红黑树数据结构，也就说是一棵自平衡的排序二叉树，这样就可以保证当需要快速检索指定节点。 红黑树的插入、删除、遍历时间复杂度都为 O(lgN)，所以性能上低于哈希表。但是哈希表 无法提供键值对的有序输出，红黑树因为是排序插入的，可以按照键的值的大小有序输出。

### 8 concurrenthashmap 有啥优势，1.7，1.8 区别

1.8 中放弃了 Segment 臃肿的设计，取而代之的是采用 Node + CAS + Synchronized 来 保证并发安全进行实现

CAS：在判断数组中当前位置为 null 的时候，使用 CAS 来把这个新的 Node 写入数组中对应的位置，整个判断是个大循环，cas 操作成功会退出，cas 失败会进入下一次循环，即 synchronized 的情况

synchronized ：当数组中的指定位置不为空时，通过加锁来添加这个节点进入数组 (链表 <8) 或者是红黑树（链表>=8）

1.8 中使用一个 volatile 类型的变量 baseCount 记录元素的个数，当 插入新数据或则删除数据时，会通过 addCount() 方法更新 baseCount，通过累加 baseCount 和 CounterCell 数组中的数量，即可得到元素的总个数

## 9 ArrayList 是否会越界

并发 add 操作时，会发生数组越界

## 10 Java 集合类框架的基本接口有哪些？

Collection：代表一组对象，每一个对象都是它的子元素。

Set：不包含重复元素的 Collection。

List：有顺序的 collection，并且可以包含重复元素。

Map：可以把键 (key) 映射到值 (value) 的对象，键不能重复

## 11 什么是迭代器

Iterator 提供了统一遍历操作集合元素的统一接口

## 12 快速失败 (fail-fast) 和安全失败 (fail-safe) 的区别是什么？

快速失败：迭代时，对集合内容作了增删改快抛出 Concurrent Modification Exception 快速失败。（检查 modCount 变量值是否改变）

安全失败：迭代时，迭代的是集合副本，不会读取到修改的内容。

## 13 HashMap 和 Hashtable 有什么区别？

HashMap 允许键和值是 null，而 Hashtable 不允许键或者值是 null

Hashtable 是同步的，而 HashMap 不是。 一般认为 Hashtable 是一个遗留的类。

## 14 ArrayList,Vector,LinkedList 的存储性能和特性是什么？

ArrayList 和 Vector 都是使用数组方式存储数据，LinkedList　以链表方式实现。

Vector 线程安全，效率较低。