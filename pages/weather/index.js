import { formatTime } from '../../utils/util.js';
import AppInfo from '../../app-info';
import API from './api';

const page = {

  /** 数据 */
  data: {

    /** 日期 */
    date: '',

    /** 天气数据 */
    weatherInfo: {},

    /** 输入框内容 */
    inputContent: '',

  },

  /** 本地城市 */
  localCity: null,

  /** 当前查看的城市 */
  currentCity: null,

  /**
   * 生命周期回调—监听页面加载
   * @param {{ city:string } | undefined} options 
   */
  onLoad(options) {
    // 检查版本
    this.checkVersion();
    // 更新时间
    this.updateTime();
    // 获取天气
    if (options && options.city) {
      this.searchByCity(options.city);
    } else {
      this.showLocalCityWeather();
    }
  },

  /**
   * 更新时间
   */
  updateTime() {
    const time = new Date(),                        // 时间戳
      date = formatTime(time).split(' ')[0],   // 日期
      weekday = this.formatWeekday(time.getDay());  // 星期数
    this.setData({
      date: `${date} ${weekday}`,
    });
  },

  /**
   * 展示当前城市天气数据
   */
  showLocalCityWeather() {
    wx.showToast({ title: '正在定位...', icon: 'loading', duration: 2000000, });
    // 获取当前经纬度
    wx.getLocation({
      success: (res) => {
        this.searchByLocation(res.latitude, res.longitude);
      },
      fail: () => {
        wx.hideToast();
        wx.showModal({ title: '定位失败', content: '无法获取本地天气', showCancel: false, });
      },
    });
  },

  /**
   * 通过经纬度查询天气
   * @param {number} latitude 纬度
   * @param {number} longitude 经度
   */
  searchByLocation(latitude, longitude) {
    wx.showToast({ title: '正在查询...', icon: 'loading', duration: 2000000 });
    // 更新时间
    this.updateTime();
    // 通过经纬度获取天气数据
    API.requestByLocation({
      latitude,
      longitude,
      onSuccess: (res) => {
        wx.hideToast();
        const data = res.data.showapi_res_body;
        this.localCity = data.cityInfo.c3;
        this.currentCity = data.cityInfo.c3;
        this.setData({
          weatherInfo: this.convertData(data),
        });
      },
      onFail: (error) => {
        wx.hideToast();
        if (error) {
          wx.showModal({ title: '请求失败', content: error.message, showCancel: false });
        } else {
          wx.showModal({ title: '请求超时', content: '请检查网络设置', showCancel: false });
        }
      },
    })
  },

  /**
   * 通过城市名查询天气
   * @param {string} city 
   */
  searchByCity(city) {
    wx.showToast({ title: '正在加载...', icon: 'loading', duration: 2000000 });
    // 更新时间
    this.updateTime();
    // 通过城市名获取天气数据
    API.requestByCity({
      city,
      onSuccess: (res) => {
        wx.hideToast();
        const data = res.data.showapi_res_body;
        if (data.ret_code == 0) {
          this.currentCity = data.cityInfo.c3;
          this.setData({
            weatherInfo: this.convertData(data),
          });
        } else {
          wx.showModal({ title: '查询失败', content: '输入的城市名称有误，请重新输入', showCancel: false });
        }
      },
      onFail: (error) => {
        wx.hideToast();
        if (error) {
          wx.showModal({ title: '请求失败', content: error.message, showCancel: false });
        } else {
          wx.showModal({ title: '请求超时', content: '请检查网络设置', showCancel: false });
        }
      },
    });
  },

  /**
   * 处理天气数据
   * @param {object} data 数据
   */
  convertData(data) {
    const info = {};
    // 城市信息
    info.city = {};
    info.city.id = data.cityInfo.c1;
    info.city.name_en = data.cityInfo.c2;
    info.city.name = data.cityInfo.c3;
    // 天气信息
    info.now = data.now;
    info.today = data.f1;
    info.forecast1 = [data.f2, data.f3, data.f4];
    info.forecast2 = [data.f5, data.f6, data.f7];
    // 处理星期数
    info.forecast1[0].weekday = '明天';
    info.forecast1[1].weekday = '后天';
    info.forecast1[2].weekday = this.formatWeekday(info.forecast1[2].weekday);
    for (let i = 0; i < info.forecast2.length; i++) {
      info.forecast2[i].weekday = this.formatWeekday(info.forecast2[i].weekday);
    }
    return info;
  },

  /**
   * 格式化星期数
   * @param {number} index 星期数
   */
  formatWeekday(index) {
    const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六', '周日'];
    return weekdays[index];
  },

  /**
   * 刷新
   */
  refresh() {
    this.searchByCity(this.currentCity);
  },

  /**
   * 清除输入框内容
   */
  clearInputContent() {
    this.setData({ inputContent: '' });
  },

  /**
   * 搜索栏输入变化回调
   * @param {*} event 
   */
  onSearchInputChanged(event) {
    // 更新数据
    this.setData({
      inputContent: event.detail.value,
    });
  },

  /**
   * 搜索按钮点击回调
   */
  onSearchBtnClick() {
    // 输入是否为空
    if (this.data.inputContent.length > 0) {
      // 调用搜索函数
      this.searchByCity(this.data.inputContent);
      // 清空输入
      this.clearInputContent();
    } else {
      wx.showToast({ title: '请输入要查询的城市！', icon: 'none', duration: 1000 });
    }
  },

  /**
   * 清除按钮点击回调
   */
  onClearBtnClick() {
    this.clearInputContent();
  },

  /**
   * 刷新按钮点击回调
   */
  onRefreshBtnClick() {
    this.refresh();
  },

  /**
   * 定位按钮点击回调
   */
  onLocalBtnClick() {
    this.clearInputContent();
    if (this.localCity) {
      this.searchByCity(this.localCity);
    } else {
      this.showLocalCityWeather();
    }
  },

  /**
   * 下拉回调
   */
  onPullDownRefresh() {
    // 刷新当前天气
    this.refresh();
    // 取消下拉
    wx.stopPullDownRefresh();
  },

  /**
   * 分享给好友回调
   */
  onShareAppMessage() {
    const city = this.data.weatherInfo.city.name,
      now = this.data.weatherInfo.now;
    return {
      title: `${city}当前天气：${now.weather} | ${now.temperature}℃`,
      path: `/pages/weather/index?city=${city}`,
    };
  },

  /**
   * 分享至朋友圈回调
   */
  onShareTimeline() {
    const city = this.data.weatherInfo.city.name,
      now = this.data.weatherInfo.now;
    return {
      title: `${city}当前天气：${now.weather} | ${now.temperature}℃`,
      path: `city=${city}`,
    };
  },

  /**
   * 检查版本
   */
  checkVersion() {
    const localVersion = wx.getStorageSync('version');
    if (localVersion === AppInfo.version) {
      return;
    }
    wx.showModal({
      title: `${AppInfo.name} ${AppInfo.version}`,
      content: `${AppInfo.versionDate}\n${AppInfo.versionDetail}`,
      showCancel: false,
      confirmText: '我知道了',
      success: (res) => {
        wx.setStorage({
          key: 'version',
          data: AppInfo.version,
        });
      },
    });
  },

};

Page(page);
