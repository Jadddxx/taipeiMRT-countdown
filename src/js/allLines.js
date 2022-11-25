import { ref } from "vue";
import { getApi } from "./getMrtApi.js";

// 打api
// const data = ref(copyData);

// data.value = await getApi();

// getApi().then((value) => {
//   data.value = value;
// });

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

const allLines = {
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

const eachXiangshan = eachStationName(allLines["toXiangshan"]);
const eachZoo = eachStationName(allLines["toZoo"]);
const eachXindian = eachStationName(allLines["toXindian"]);
const eachNangangExhibition = eachStationName(allLines["toNangangExhibition"]);
const eachDingpu = eachStationName(allLines["toDingpu"]);
//環狀線
const eachDapinglin = eachStationName(allLines["toDapinglin"]);
const eachNewTaipeiPark = eachStationName(allLines["toNewTaipeiPark"]);
//蘆洲
const eachLuzhuo = eachStationName(allLines["toLuzhuo"]);
const eachHuilong = eachStationName(allLines["toHuilong"]);

// 直接用allLines去 map 讓新的陣列一樣有key是線，然後裡面都是站名
async function eachStationName(line) {
  return line.map((station) => station.StationName);
}

// 完整的線
export const xiangshanLine = ["象山站", ...eachXiangshan];
export const wenhuLine = ["動物園站", ...eachZoo];
export const bannanLine = [...eachDingpu, "頂埔站"];

const lostLuzhuoStation = compareLostStation(eachLuzhuo, eachHuilong);

export const LuzhuoLine = [
  ...eachLuzhuo,
  "蘆洲站",
  "迴龍站",
  lostLuzhuoStation,
].flat();

export const xinDianLine = ["新店站", ...eachXindian];
export const circularLine = ["大坪林站", ...eachDapinglin];

// 比較沒有的站
function compareLostStation(mainArray, compareArray) {
  const lost = [];
  for (const item of compareArray) {
    if (mainArray.indexOf(item) === -1) {
      lost.push(item);
    }
  }

  return lost;
}
