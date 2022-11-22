import axios from "axios";

const dataAPI = axios.create({
  baseURL: "https://taipeimrt-369113.de.r.appspot.com/",
});

dataAPI.interceptors.response.use(
  function (response) {
    const { data: data } = response;
    const [splitData] = data.split('<?xml version="1.0" encoding="utf-8"?>');
    const result = JSON.parse(splitData);
    return result;
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export async function GET(url) {
  try {
    const response = await dataAPI.get(url);
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
}
