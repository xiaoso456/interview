import{_ as h,M as s,p as t,q as i,R as e,t as r,N as n,a1 as d}from"./framework-96b046e1.js";const o={},c=d('<h1 id="题目" tabindex="-1"><a class="header-anchor" href="#题目" aria-hidden="true">#</a> 题目</h1><h2 id="_1-es-如何保证不丢数据" tabindex="-1"><a class="header-anchor" href="#_1-es-如何保证不丢数据" aria-hidden="true">#</a> 1 ES 如何保证不丢数据?</h2><p>ES 的索引和文档都是以分片和副本的形式存在在集群中的，ES 在写操作时，会将写操作 (写操作日志) 发送给集群中的多个节点，这些节点会将写操作复制到其他节点，从而保证数据不丢失。</p><h2 id="_2-说一下-es-索引文档过程" tabindex="-1"><a class="header-anchor" href="#_2-说一下-es-索引文档过程" aria-hidden="true">#</a> 2 说一下 ES 索引文档过程</h2><p>单文档：客户端请求 ES 节点，ES 节点根据文档 ID 把请求转发到其它节点，等待结果返回</p><p><code>1shard = hash(_routing也就是文档id) % (num_of_primary_shards)</code></p><h2 id="_3-并发情况下-es-如何保证读写一致" tabindex="-1"><a class="header-anchor" href="#_3-并发情况下-es-如何保证读写一致" aria-hidden="true">#</a> 3 并发情况下 ES 如何保证读写一致？</h2><p>这里读写一致应该指的是多个副本时的一致，有几种方法：</p><ol><li>应用层使用乐观锁版本号控制，请求REST API时带上文档version，多个请求修改只会有一个成功</li><li>配置索引设置 <code>index.write.wait_for_active_shards</code>，可以设置为 <code>all</code>、<code>one</code>、<code>quorum</code>，等待一定数量分片响应才返回请求</li><li>读一致性可以设置 replication 为 sync，使主分片和副本分片都完成才返回。如果为 async，可以请求时添加 _preference 为 primary 指定查询主分片，确保文档为最新版本</li></ol><h2 id="_4-es-如何实现-master-选举" tabindex="-1"><a class="header-anchor" href="#_4-es-如何实现-master-选举" aria-hidden="true">#</a> 4 ES 如何实现 master 选举</h2><p>节点配置 master 为 true 的参与选举，首先确认候选主节点数量是否达标 <code>discovery.zen.minimum_master_nodes</code>，防止脑裂</p><p>如果达标，取 id 小的作为主节点</p><h2 id="_5-es-更新和删除文档过程" tabindex="-1"><a class="header-anchor" href="#_5-es-更新和删除文档过程" aria-hidden="true">#</a> 5 ES 更新和删除文档过程</h2><p>对 ES 来说，删除和更新也是写操作，因为 ES 文档不可变</p><p>磁盘每个段会有一个.del 文件，删除请求发送后，在这个文件中标记文档已删除，文档依然能够匹配，但会在结果中过滤，段合并时，被删除文档不会写入新段。更新的话会给文档标记一个新的版本号，其他和删除一致</p><h2 id="_6-说说段以及段合并" tabindex="-1"><a class="header-anchor" href="#_6-说说段以及段合并" aria-hidden="true">#</a> 6 说说段以及段合并</h2><p>ES 索引数据是以段（Segment）为单位存储的，每个段对应索引的一部分数据</p><p>段合并：把多个小段合并为一个大段，能释放内存、提高查询效率</p><p>合并过程：选取多个段，把数据拷贝到新的段中，删除源数据段，更新段映射表，把查询请求指向新段</p><h2 id="_7-es-节点类型" tabindex="-1"><a class="header-anchor" href="#_7-es-节点类型" aria-hidden="true">#</a> 7 ES 节点类型</h2><p>Master 节点：管理节点类型和元数据</p><p>Data 节点：存储数据</p><p>Client 节点（Coordinator 协调节点）：将集群请求转发到主节点、数据节点，查询涉及多节点的场合负责临时协调数据</p><p>ingest 节点：负责数据预处理，可有可无</p><h2 id="_8-如何理解-es-的近实时性" tabindex="-1"><a class="header-anchor" href="#_8-如何理解-es-的近实时性" aria-hidden="true">#</a> 8 如何理解 ES 的近实时性</h2><p>文档写入到索引后需要在副本同步等待响应保证数据一致性，而且 ES 是定期刷新使得数据可见</p><h2 id="_9-什么是-es-脑裂-如何避免" tabindex="-1"><a class="header-anchor" href="#_9-什么是-es-脑裂-如何避免" aria-hidden="true">#</a> 9 什么是 ES 脑裂，如何避免？</h2><p>脑裂：由于网络或其他问题，ES 集群分裂为多个，出现多个 Master 节点</p><p>避免：ES7.0 前需要通过设置最少投票通过数量（discovery.zen.minimum_master_nodes）超过所有候选节点一半以上，来解决脑裂问题。ES7.0 后节点离开加入会自动调整选主选票数，自动避免脑裂</p><h2 id="_10-如何实现深度分页" tabindex="-1"><a class="header-anchor" href="#_10-如何实现深度分页" aria-hidden="true">#</a> 10 如何实现深度分页</h2><p>使用 scroll 或者 after search</p><h2 id="_11-es倒排索引是什么" tabindex="-1"><a class="header-anchor" href="#_11-es倒排索引是什么" aria-hidden="true">#</a> 11 ES倒排索引是什么？</h2><p>简单来说就是 分词:文档id 的键值对，记录哪些词出现在哪些文档</p><h2 id="_12-es-部署如何优化" tabindex="-1"><a class="header-anchor" href="#_12-es-部署如何优化" aria-hidden="true">#</a> 12 ES 部署如何优化</h2><p>集群部署优化，调整内存，最大31G</p><p>部署磁盘使用SSD，不使用网络磁盘</p><p>合理调整数据节点、Client节点数</p><p>对linux系统调优，禁止swap</p><h1 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h1>',39),l={href:"https://blog.csdn.net/wlei0618/article/details/125060635",target:"_blank",rel:"noopener noreferrer"},p={href:"https://zhuanlan.zhihu.com/p/443724132?utm_id=0",target:"_blank",rel:"noopener noreferrer"},_={href:"https://www.cnblogs.com/gered/p/14647219.html#_label8_2",target:"_blank",rel:"noopener noreferrer"},u={href:"https://tech.meituan.com/2022/11/17/elasicsearch-optimization-practice-based-on-run-length-encoding.html",target:"_blank",rel:"noopener noreferrer"};function m(f,E){const a=s("ExternalLinkIcon");return t(),i("div",null,[c,e("p",null,[e("a",l,[r("ES 写入过程和写入原理调优及如何保证数据的写一致性 _es 如何保证与数据库的一致性 -CSDN 博客"),n(a)])]),e("p",null,[e("a",p,[r("110 道 ES 面试题及答案整理（持续更新） - 知乎 (zhihu.com)"),n(a)])]),e("p",null,[e("a",_,[r("（0.12）elasticsearch 分布式集群原理（ES7.9） - 郭大侠 1 - 博客园 (cnblogs.com)"),n(a)])]),e("p",null,[e("a",u,[r("美团外卖搜索基于Elasticsearch的优化实践 - 美团技术团队 (meituan.com)"),n(a)])])])}const b=h(o,[["render",m],["__file","Elasticsearch.html.vue"]]);export{b as default};
