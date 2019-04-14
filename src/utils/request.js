import Taro from "@tarojs/taro";

export default options => {
  const { url, payload, method = "GET", showToast = true } = options;
  const header = {};
  if (method === "POST") {
    header["content-type"] = "application/json";
  }

  return Taro.request({
    url,
    method,
    data: payload,
    header
  })
    .then(res => {
      // 在这里对code进行分析
      // const { code, data } = res.data;
      return res;
    })
    .catch(err => {
      const defaultMsg = "请求异常";
      if (showToast) {
        Taro.showToast({
          title: (err && err.errorMsg) || defaultMsg,
          icon: "none"
        });
      }
      // 跳转逻辑
      // if (err.code === CODE_AUTH_EXPIRED && autoLogin) {
      //   Taro.navigateTo({
      //     url: "/pages/user-login/user-login"
      //   });
      // }

      return Promise.reject({ message: defaultMsg, ...err });
    });
};
