## 1 介绍一下 Syncronized 锁，如果用这个关键字修饰一个静态方法，锁住了什么？如果修饰成员方法，锁住了什么？

synchronized 修饰静态方法以及同步代码块的 synchronized (类.class) 锁的是类，线程想要执行对应同步代码，需要获得类锁。

synchronized 修饰成员方法，线程获取的是当前调用该方法的对象实例（this）的对象锁。

## 2 介绍一下 volatile

volatile 关键字是用来保证有序性和可见性的。防止编译器、CPU 重排序。

volatile 如何保证有序性：通过插入内存屏障实现

volatile  如何保证可见性：Java 内存模型分为主内存和工作内存，使用 volatile 关键字保证主内存工作内存同步。

volatile 如何保证多核 CPU 数据问题：加了 volatile 关键字的汇编代码会添加一个 lock 指令，或者通过缓存一致协议，保证 CPU 多核数据不一致问题。

## 3 锁有了解嘛，说一下 Synchronized 和 lock

synchronized 是 Java 的关键字，当它用来修饰一个方法或者一个代码块的时候，能够保证 在同一时刻最多只有一个线程执行该段代码。JDK1.5 以后引入了自旋锁、锁粗化、轻量级锁， 偏向锁来有优化关键字的性能。synchronized 的底层是使用操作系统的 mutex lock 实现的。

Lock 是一个接口，而 synchronized 是 Java 中的关键字，synchronized 是内置的语言实现；

Lock 发生异常时，需要通过 unLock() 释放锁；synchronized 在发生异常时，会自动释放线程占有的锁。

Lock 可以让等待锁的线程响应中断，而 synchronized 等待线程会一直等待。

Lock 可以有任意数据的 Condition 对象，Condition 对象与 Lock 绑定，可以实现公平锁和非公平锁。

## 4 讲一讲 Java 里 final 关键字怎么用？

final 修饰一个类时，表明这个类不能被继承。

final 修饰一个基本类型时，初始化后不可在修改；修饰引用类型时，指向不会再改变。

final 修饰一个方法时，防止继承类修改它的含义，也可以提高效率（Java 新版本不需要显式用 final 修饰）

