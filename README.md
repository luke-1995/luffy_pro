# 程序开发环境
* vue (2.5.2)
# 程序实现功能
1.  前后端完全分离，前端基于Vue框架，后端使用Django, 用restful API交互
2.  前端展示课程，允许用户购买
3.  学员角色功能: 注册、登录、购买课程、支付宝接入,在线视频播放、评价、提问题、交作业
4.  导师角色功能: 对学员进行跟进、上传批改作业过程、回复学员问题
5.  管理员角色功能:  查看用户注册趋势图、订单量报表,增删改查课程, 为学员分配导师,创建、管理资讯文章,追踪学员学习进度,导师跟进管理,订单管理
# 程序的启动方式
1. 进入luffy_pro目录下
2. 安装依赖文件和包,命令行输入:npm install
3. 安装好后,接着启动redis服务和django服务
4. 启动前端的服务,命令:npm run dev
# 项目地址
* 前端:[https://github.com/luke-1995/luffy_pro](https://github.com/luke-1995/luffy_pro "前端地址")
* 后端:[https://github.com/luke-1995/luffy_rest_pro](https://github.com/luke-1995/luffy_rest_pro "后端地址")
# 登录用户信息
* 需要用户登录用户名和密码进行验证
* 超级用户(用户名:alex,密码:alex1234,角色:超级管理员)
* 超级用户(用户名:a,密码123,角色:超级管理员,普通管理员,学生,讲师)
* 普通用户(用户名:b,密码123,角色:讲师)
* 普通用户(用户名:c,密码123,角色:普通管理员)
* 普通用户(用户名:d,密码123,角色:讲师)
* 普通用户(用户名:f,密码123,角色:学生)
# 程序的运行效果
## 1 管理员平台功能

### 1.1 查看用户注册趋势图、订单量报表

![Image text](https://m.qpic.cn/psc?/V13PfEOv3RfKHG/N6ix9ropXhYRy3eob.4AqzLKLtXfXY9d4GlRAHBSaiNbmod6PlZIjetEhQJ6yeTkyobiZueYxKMZ.VdA08eNyA!!/b&bo=cweAAQAAAAADB9c!&rf=viewer_4)


### 1.2 增删改查课程
![Image text](https://m.qpic.cn/psc?/V13PfEOv3RfKHG/N6ix9ropXhYRy3eob.4AqwGno3m4ZO420QFPd*lj8VzCLY1zG4Vj.1PL2dApWZOFKoWDAWXuoGbVZ7WLRgtWcA!!/b&bo=5gQCAQAAAAADB8M!&rf=viewer_4)

![Image text](https://m.qpic.cn/psc?/V13PfEOv3RfKHG/N6ix9ropXhYRy3eob.4Aq9VR95.XxS..OsKpF27pCF6dH4gzSMkxjCebtZ*H0Ht3q0NRtt2e0CcDv73D6g8FzQ!!/b&bo=gAdPAwAAAAADB.k!&rf=viewer_4)

![Image text](https://m.qpic.cn/psc?/V13PfEOv3RfKHG/N6ix9ropXhYRy3eob.4Aq.zSZivME32vsEQZ*T5buYjTO*BkGEGUi8oSZJqPya6hTZPJh9UrdCoYxN.SkuXQDg!!/b&bo=CwQFAQAAAAADByk!&rf=viewer_4)

### 1.3 为学员分配导师

![Image text](https://m.qpic.cn/psc?/V13PfEOv3RfKHG/N6ix9ropXhYRy3eob.4Aq3CK0l3O6V430so377OfCZQI3NKjeR4sgH.f7kNTSgrxsguSntW6PJWdIFHeujZ1zA!!/b&bo=gAdpAQAAAAADB80!&rf=viewer_4)



### 1.4 创建、管理资讯文章

![Image text](https://m.qpic.cn/psc?/V13PfEOv3RfKHG/N6ix9ropXhYRy3eob.4Aq5VZUI7*9YxC5i0kf2wOH9lfte9eaFr9uWpqXdb4t0Xbnh5nzEW.pHuW9XLOcPcnUA!!/b&bo=8wQuAQAAAAADB*o!&rf=viewer_4)



### 1.5 追踪学员学习进度

![Image text](https://m.qpic.cn/psc?/V13PfEOv3RfKHG/N6ix9ropXhYRy3eob.4Aq8jdiTnUpeBoTSFUrRdq2pLNYR0uvVNc8DCyii1fJ1u3Rq*Lw8QhVba4vTOKIqhuqg!!/b&bo=owbjAAAAAAADB2Q!&rf=viewer_4)



### 1.6 导师跟进管理

![Image text](https://m.qpic.cn/psc?/V13PfEOv3RfKHG/N6ix9ropXhYRy3eob.4Aqx0okvTtdcaevCK.FFYoy0HoYksgAXryen15J4qAVsqcMFGkMCDKRtYENE33*qDD0A!!/b&bo=sARSAQAAAAADB8U!&rf=viewer_4)


### 1.7 订单管理

![Image text](https://m.qpic.cn/psc?/V13PfEOv3RfKHG/N6ix9ropXhYRy3eob.4Aq.dDkjbgfbOCBb5QLXu4fLhCZmpScvYzhTPrmnDlemlW5PVLdxD1ZTLjSkg3Lo26ag!!/b&bo=eQQ1AQAAAAADB2s!&rf=viewer_4)


## 2 导师平台功能

### 2.1 对学员进行跟进

![Image text](https://m.qpic.cn/psc?/V13PfEOv3RfKHG/N6ix9ropXhYRy3eob.4Aq4BQYHQCficH.SDjlHa*w4uoKllfGosUxGza6Fj4279K**9puAchMn*HpxMxValpCw!!/b&bo=tgSlAAAAAAADBzU!&rf=viewer_4)

### 2.2 上传批改作业过程

![Image text](https://m.qpic.cn/psc?/V13PfEOv3RfKHG/N6ix9ropXhYRy3eob.4Aq80MGFudLRkRgM*Z*Jzdg2xcuMHL5BESK70VezmqR8UyZHu*1HVFT8yQTw99OO9LEg!!/b&bo=OAYVAQAAAAADBwg!&rf=viewer_4)

### 2.3 回复学员问题

![Image text](https://m.qpic.cn/psc?/V13PfEOv3RfKHG/N6ix9ropXhYRy3eob.4AqyvL1a76*6xGI7xrQH9coZLYeD1FutHx4JT9NJ4*ScNXHL*PQ*3tYRWgB1vbAJqxFw!!/b&bo=tga*AAAAAAADBy0!&rf=viewer_4)


## 3 学生平台功能

### 3.1 注册

![Image text](http://m.qpic.cn/psc?/V13PfEOv3RfKHG/UEyoh0SDzKiAwcrP9ANXSvRtGohlYulbLDAkMkCEorpDSOASPhnO8Vpg2A6JzhLMQLhoaNqakDvR38YnRuxGeVxWrO4DI8CvYBrjMkww4YQ!/b&bo=9QNEAgAAAAADF4I!&rf=viewer_4)

### 3.2 登录

![Image text](https://m.qpic.cn/psc?/V13PfEOv3RfKHG/N6ix9ropXhYRy3eob.4Aq.rElQsBswfU*nr7AMaP7aPoFahSiO28w324FFPjQZ7NugzplZHeGN7.QP*URVDq3g!!/b&bo=gAdcAwAAAAADB*o!&rf=viewer_4)

### 3.3 加入购物车

![Image text](https://m.qpic.cn/psc?/V13PfEOv3RfKHG/N6ix9ropXhYRy3eob.4AqxmS66NcpNQeaqwQ0ZDKdrsxMRTynvcDicRhv1lllHyn9BffZHuDTIyYlp9rFTU9Pw!!/b&bo=MgZFAgAAAAADB1E!&rf=viewer_4)

### 3.4 加入结算中心

![Image text](https://m.qpic.cn/psc?/V13PfEOv3RfKHG/N6ix9ropXhYRy3eob.4Aq3ZcpSs2mnas4ip4*QX6Mm*dKAV6zgBeh0qCySAg*3Hgou6Xbe6Uyeh36vkUuBqPMA!!/b&bo=fwYSAgAAAAADB0s!&rf=viewer_4)

### 3.5 购买

![Image text](https://m.qpic.cn/psc?/V13PfEOv3RfKHG/N6ix9ropXhYRy3eob.4Aq1WhBlJmJ2gFUFVyvAzDLP0CenVq8slfv7yBJwnT2vr35rQCTCHkJzi.5hwD2h1Uww!!/b&bo=TwZnAgAAAAADBw4!&rf=viewer_4)

### 3.6 模拟第三方支付接入

![Image text](https://m.qpic.cn/psc?/V13PfEOv3RfKHG/N6ix9ropXhYRy3eob.4Aqwqii5p*Ts6b7yqWDbPAYQkgjdbEdlNLs*CLRo63qcxBhVutD2I2CDr19Ukxcla2vg!!/b&bo=ZgVnAgAAAAADByQ!&rf=viewer_4)

### 3.7 在线视频播放

![Image text](https://m.qpic.cn/psc?/V13PfEOv3RfKHG/N6ix9ropXhYRy3eob.4Aq3degr6a32eErfDDwamwFEOfv5yk.FdKvjIugrL3mAjeEWYZ4j*iISwG12HWJBvW6g!!/b&bo=SAadAgAAAAADB*M!&rf=viewer_4)

### 3.8 评价(需要有成绩)

![Image text](https://m.qpic.cn/psc?/V13PfEOv3RfKHG/N6ix9ropXhYRy3eob.4AqyUZEPxxnbFRmrrO*9yE.MV75Q0J99yh4j0zshkK3x0zP2nFzYVTeUH6rJrFVlX3VA!!/b&bo=WAb.AAAAAAADB4I!&rf=viewer_4)

### 3.9 提问题

![Image text](https://m.qpic.cn/psc?/V13PfEOv3RfKHG/N6ix9ropXhYRy3eob.4Aq3OPR*zYNt6I1GDLuqXNBJhrh1NwjncCBVZJXGmdYrZ.mZ5qngLMUYcQWOul45JXQA!!/b&bo=gAdcAwAAAAADB*o!&rf=viewer_4)

### 3.10 交作业

![Image text](https://m.qpic.cn/psc?/V13PfEOv3RfKHG/N6ix9ropXhYRy3eob.4Aq5CpWce6S3Uu4IaE*kQSl.dMOtV36pgNQnzthfnG7b5VprU*zQ3fJt.O.rvyXVYICQ!!/b&bo=PwYJAQAAAAADBxM!&rf=viewer_4)



