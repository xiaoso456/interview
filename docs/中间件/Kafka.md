## 题目

### Kafka为什么这么快

1. 写磁盘时使用页缓存，再由操作系统写入文件系统
2. 持久化消息日志数据数据时，使用追加的方式写入数据，顺序写速度快
3. 使用零拷贝，网络数据持久化到磁盘，磁盘文件发送到网卡，减少内核态读写时无用IO
4. 批处理，一次处理多条信息
5. pull模式，消费端根据消费能力拉取消息

### Kafka采用push还是pull模式

消费端采用pull模式，pull可以让消费者根据消费能力和消费策略拉取消息

### Kafka 生产者写数据时，ACK为0，1，01分别代表什么？

1（默认）：发送数据leader接收消息后就算消息发送成功

0：生产者发送消息后就不管了

-1：生产者等待所有follower都确认后消息才算完成

### 为什么需要消息队列

削峰、解耦、异步、可恢复

## 消息积压怎么解决

Kafka一个partition只能由一个消费者消费，如果消费者不足，考虑增加partition数量，让partition数=消费者数

如果下游支持批处理，提高pull时消息数量

## 如何实现消息最少消费一次

1. 设置生产者ack为-1，让生产者等待所有副本响应

2. 创建Topic时，副本数>=2
3. broker设置ISR最小应答数>=2

## 如何实现消息最多消费一次

设置生产者ack为0

### 如何精确消费一次

生产者：

1. 实现最少消费一次

2. 开启幂等性

   保证单个paritition内重复数据不落盘，消息重复依据是`<PID，Partition，SeqNumber>`

3. 开启事务

   幂等性只能保证单分区单会话精确一次，开启事务能保证多分区精确一次。开启事务后，PID由事务协调节点生成

## 参考

[docs/Kafka/Kafka中级面试题汇总及答案（2021年Kafka面试题及答案大全）.md · 鹏磊/NewDevBooks - 码云 - 开源中国 (gitee.com)](https://gitee.com/souyunku/NewDevBooks/blob/master/docs/Kafka/Kafka中级面试题汇总及答案（2021年Kafka面试题及答案大全）.md)

[Kafka核心原理之精准一次性投递_kafka at least once-CSDN博客](https://blog.csdn.net/csdn_demo_java/article/details/133897387)

[社招 - 话题 - 牛客网 (nowcoder.com)](https://www.nowcoder.com/creation/subject/6747cb838c2440f3a8058501fba6b209)