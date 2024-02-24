## 题目

### Kafka为什么这么快

1. 写磁盘时使用页缓存，再由操作系统写入文件系统
2. 持久化消息日志数据数据时，使用追加的方式写入数据，顺序写速度快
3. 使用零拷贝，网络数据持久化到磁盘，磁盘文件发送到网卡，减少内核态读写时无用IO
4. 批处理，一次处理多条信息
5. pull模式，消费端根据消费能力拉取消息

### Kafka采用push还是pull模式

消费端采用pull模式，pull可以让消费者根据消费能力和消费策略拉取消息

### Kafka 生产者写数据时，ACK为0，1，-1分别代表什么？

1（默认）：发送数据leader接收消息后就算消息发送成功

0：生产者发送消息后就不管了

-1：生产者等待所有follower都确认后消息才算完成

### 为什么需要消息队列

削峰、解耦、异步、可恢复

### 消息积压怎么解决

Kafka一个partition只能由一个消费者消费，如果消费者不足，考虑增加partition数量，让partition数=消费者数

如果下游支持批处理，提高pull时消息数量

### 如何实现消息最少消费一次

1. 设置生产者ack为-1，让生产者等待所有副本响应

2. 创建Topic时，副本数>=2
3. broker设置ISR最小应答数>=2

### 如何实现消息最多消费一次

设置生产者ack为0

### 如何精确消费一次

生产者：

1. 实现最少消费一次

2. 开启幂等性

   保证单个paritition内重复数据不落盘，消息重复依据是`<PID，Partition，SeqNumber>`

3. 开启事务

   幂等性只能保证单分区单会话精确一次，开启事务能保证多分区精确一次。开启事务后，PID由事务协调节点生成

### ISR 是什么，如果Leader Crash了，ISR为空怎么办

ISR（In-Sync Replicas）指同步副本，ISR列表保存了一个分区Leader+Follower副本，只有处于ISR内副本才可以当选Leader

Leader Crash ISR为空：

1. 等待旧leader恢复
2. 人工更改当前分区所有副本成为ISR，但可能出现数据不是最新的问题

### Kafka为什么不支持读写分离？

读写分离的场景一般都是写少读多，读实时性或者数据一致性没有很高的要求

kafka是分布式日志系统，一般情况是读写对等的

涉及同步，如果要保持一致性，消息延迟可能加加大，吞吐量降低

Kafka本身提供多partition架构，数据分布在多个broker上，可以支持数据量拓展，在读写对等的情况下，读写分离必要性很低

### Broker 的rebalance是什么？

rebalance规定了消费者组的消费者如何分配一个topic的partition

消费者成员数、topic分区数、订阅的topic数发生变化都会触发rebalance

重平衡过程中，消费者是不能从kafka消费消息的

### 如何避免rebalance？

主要就是避免消费者发生故障，设置kafka消费者心跳发送的频率、超时时间等

## 参考

[docs/Kafka/Kafka中级面试题汇总及答案（2021年Kafka面试题及答案大全）.md · 鹏磊/NewDevBooks - 码云 - 开源中国 (gitee.com)](https://gitee.com/souyunku/NewDevBooks/blob/master/docs/Kafka/Kafka中级面试题汇总及答案（2021年Kafka面试题及答案大全）.md)

[Kafka核心原理之精准一次性投递_kafka at least once-CSDN博客](https://blog.csdn.net/csdn_demo_java/article/details/133897387)

[社招 - 话题 - 牛客网 (nowcoder.com)](https://www.nowcoder.com/creation/subject/6747cb838c2440f3a8058501fba6b209)

[kafka重平衡 - 掘金 (juejin.cn)](https://juejin.cn/post/7012453534754947102)