import { ref } from "vue";
import { data } from "./getMrtApi.js";

// 去整理每個線的位置
const DestinationName = function (Destination) {
  return data.value.filter((item) => item.DestinationName === Destination);
};

// 淡水信義線
const toXiangshan = DestinationName("象山站");
const toTamsui = DestinationName("淡水站");
const toDaan = DestinationName("大安站");
const toBeitou = DestinationName("北投站");

// 文湖線
const toZoo = DestinationName("動物園站");
const toNangangSoftwarePark = DestinationName("南港軟體園區站");

// 松山新店線
const toXindian = DestinationName("新店站");
const toSongshan = DestinationName("松山站");
const toTaipowerBuilding = DestinationName("台電大樓站");

// 板南線
const toNangangExhibition = DestinationName("南港展覽館站");
const toDingpu = DestinationName("頂埔站");
const toFarEastHospital = DestinationName("亞東醫院站");

// 中和新蘆站
const toHuilong = DestinationName("迴龍站");
const toLuzhuo = DestinationName("蘆洲站");
const toNanshigijiao = DestinationName("南勢角站");

// 環狀線
const toDapinglin = DestinationName("大坪林站");
const toNewTaipeiPark = DestinationName("新北產業園區站");

export const allLines = {
  toXiangshan: toXiangshan,
  toTamsui: toTamsui,
  toDaan: toDaan,
  toBeitou: toBeitou,
  toZoo: toZoo,
  toNangangSoftwarePark: toNangangSoftwarePark,
  toXindian: toXindian,
  toSongshan: toSongshan,
  toTaipowerBuilding: toTaipowerBuilding,
  toNangangExhibition: toNangangExhibition,
  toDingpu: toDingpu,
  toFarEastHospital: toFarEastHospital,
  toHuilong: toHuilong,
  toLuzhuo: toLuzhuo,
  toNanshigijiao: toNanshigijiao,
  toDapinglin: toDapinglin,
  toNewTaipeiPark: toNewTaipeiPark,
};

// 直接用allLines去 map 讓新的陣列一樣有key是線，然後裡面都是站名
// 範例
// const array = { 'toXiangshan': ['象山站', '信義安和站',], 'toZoo': ['動物園站', '木柵站'...] }

function eachStationName(line) {
  return line.map((station) => station.StationName);
}

export const eachXiangshan = eachStationName(allLines["toXiangshan"]);

// const eachTamsui = eachStationName(allLines["toTamsui"]);
// const eachDaan = eachStationName(allLines["toDaan"]);
// const eachBeitou = eachStationName(allLines["toBeitou"]);

export const eachZoo = eachStationName(allLines["toZoo"]);
// const eachNangangSoftwarePark = eachStationName(
//   allLines["toNangangSoftwarePark"]
// );

export const eachXindian = eachStationName(allLines["toXindian"]);

export const eachNangangExhibition = eachStationName(
  allLines["toNangangExhibition"]
);

export const eachHuilong = eachStationName(allLines["toHuilong"]);

export const eachDapinglin = eachStationName(allLines["toDapinglin"]);

// 一個function來把一條線的各種方向比對
