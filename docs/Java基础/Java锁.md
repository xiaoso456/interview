## 1 讲一下非公平锁和公平锁在 reetrantlock 里的实现

非公平锁: 当线程争夺锁的过程中，会先进行一次 CAS 尝试获取锁，若失败，则进入 acquire(1) 函数，进行一次 tryAcquire 再次尝试获取锁，若再次失败，那么就通过 addWaiter 将当前线程封装成 node 结点加入到 Sync 队列，这时候该线程只能乖乖等前面的线程执行完再轮到自己了。
公平锁: 当线程在获取锁的时候，会先判断 Sync 队列中是否有在等待获取资源的线程。若没有，则尝试获取锁，若有，那么就那么就通过 addWaiter 将当前线程封装成 node 结点加入到 Sync 队列中。

## 2 讲一下 synchronized，可重入怎么实现

通过计数器实现，每个锁关联一个线程持有者和一个计数器。

当计数器为 0 时表示该锁没有被任何线程持有， 那么任何线程都都可能获得该锁而调用相应方法。

当一个线程请求成功后，JVM 会记下持有锁的线程，并将计数器计为 1。此时其他线程请求该锁，则必须等待。而该持有锁的线程如果再次请求这个锁，就可以再次拿到这个锁，同时计数器会递增。

当线程退出一个 synchronized 方法/ 块时，计数器会递减，如果计数器为 0 释放该锁。

## 3 锁和同步的区别

用法上的不同：

synchronized 既可以加在方法上，也可以加载特定代码块上，而 lock 需要显示地指定起始位置和终止位置。

synchronized 是托管给 JVM 执行的，lock 的锁定是通过代码实现的，它有比 synchronized 更精确的线程语义。

性能上的不同： lock 接口的实现类 ReentrantLock，不仅具有和 synchronized 相同的并发性和内存语义， 还多了超时的获取锁、定时锁、等候和中断锁等。 在竞争不是很激烈的情况下，synchronized 的性能优于 ReentrantLock，竞争激烈的情况下 synchronized 的性能会下降的非常快，而 ReentrantLock 则基本不变。

锁机制不同： synchronized 由 JVM 自动释放锁，Lock 需要手动释放锁，容易造成死锁（synchronized 获取锁和释放锁的方式都是在块结构中，当获取多个锁时，必须以相反的顺序释放，并且是自动解锁。而 Lock 则需要开发人员手动释放，并且必须在 finally 中释放，否则会引起死锁。）

## 4 什么是死锁

多个线程互相等待其他线程释放资源，陷入无限等待，就是死锁。

### 5 如何确保 N 个线程可以访问 N 个资源同时又不导致死

破坏死锁条件（互斥条件不可破坏）：

1. 破坏请求和保持条件：允许程序初期获取所有资源再开始运行
2. 破坏不可抢占条件：申请不到资源时，一次性释放所有资源
3. 破坏循环等待条件：按序申请资源，例如资源 ABCD，每个线程都按 ABCD 顺序申请

