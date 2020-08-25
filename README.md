# 微信小程序-轻松天气

## 介绍

一个界面简洁美观的天气微信小程序。

本小程序已在微信中发布，目前也还在运营（其实就是偶尔更新下）。

在微信搜一搜里搜索“**轻松天气**”，出现的第一个小程序就是了：

![QRCode](https://gitee.com/ifaswind/image-storage/raw/master/repositories/miniprogram-easyweather/search.jpg)

如果此项目对你有帮助，请不要忘记 [![star](https://gitee.com/ifaswind/miniprogram-easyweather/badge/star.svg?theme=dark)](https://gitee.com/ifaswind/miniprogram-easyweather/stargazers)

> 如有使用上的问题，可以提 issue 或者添加我的微信 `im_chenpipi` 并留言。



## 截图

![screenshot](https://gitee.com/ifaswind/image-storage/raw/master/repositories/miniprogram-easyweather/screenshot.png)



## 开发环境

微信开发者工具 Stable 1.05.2110290



## 使用说明

### AppID

首次导入项目需要设置 AppID，没有的话可以直接使用测试号。

![](https://gitee.com/ifaswind/image-storage/raw/master/repositories/miniprogram-easyweather/guide-import.png)



### 天气数据

本小程序里使用的天气数据来源于第三方提供的 API。



#### 使用易源数据

我用的是阿里云云市场里面的**易源数据-全国天气预报查询**（这个 API 是有免费试用套餐的）：

![](https://gitee.com/ifaswind/image-storage/raw/master/repositories/miniprogram-easyweather/guide-market.png)

*传送门：[https://market.aliyun.com/products/57096001/cmapi010812.html](https://market.aliyun.com/products/57096001/cmapi010812.html)*



1. 购买成功后在**管理控制台**页面获取到你的 **AppCode**：

![](https://gitee.com/ifaswind/image-storage/raw/master/repositories/miniprogram-easyweather/guide-get-app-code.png)



2. 然后将你的 **AppCode** 填到 */pages/weather/api.js* 里的 `appCode` 属性中：

![](https://gitee.com/ifaswind/image-storage/raw/master/repositories/miniprogram-easyweather/guide-fill-app-code.png)



3. 另外还需要注意将 API 的域名添加到项目配置里的 **request 合法域名** 中，否则没有办法请求数据：

![](https://gitee.com/ifaswind/image-storage/raw/master/repositories/miniprogram-easyweather/guide-domain.png)

或者可以勾选 [ 本地设置 ] 下的 **不校验合法域名...** 选项来进行本地测试：

![](https://gitee.com/ifaswind/image-storage/raw/master/repositories/miniprogram-easyweather/guide-domain-2.png)



#### 其他数据来源

如果想要使用其他的 API 来获取天气数据也是可以的，只不过需要自行修改代码中的数据结构，问题不大~



---



# 菜鸟小栈

我是陈皮皮，这是我的个人公众号，专注但不仅限于游戏开发、前端和后端技术记录与分享。

每一篇原创都非常用心，你的关注就是我原创的动力！

> Input and output.

![](https://gitee.com/ifaswind/image-storage/raw/master/weixin/official-account.png)