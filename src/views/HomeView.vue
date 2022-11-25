<script setup>
import { ref } from "vue";
import { getApi } from "@/js/getMrtApi.js";
import { computed } from "@vue/reactivity";

// api
const data = ref(null);

// 先打第一次
data.value = await getApi();

// 每隔五秒重打一次api
window.setInterval(async () => {
  data.value = await getApi();
}, 5000);

// 現在選到的是哪一站
let selectStation = ref(null);

// 把所有有包含這個站的物件拿出來存入
let currentStation = computed(() => {
  return data.value.filter(
    (station) => station.StationName === selectStation.value
  );
});

// 處理捷運各線各站

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
function eachStationName(line) {
  return line.map((station) => station.StationName);
}

// 完整的線
const xiangshanLine = ["象山站", ...eachXiangshan];
const wenhuLine = ["動物園站", ...eachZoo];
const bannanLine = [...eachDingpu, "頂埔站"];

const lostLuzhuoStation = compareLostStation(eachLuzhuo, eachHuilong);

const LuzhuoLine = [
  ...eachLuzhuo,
  "蘆洲站",
  "迴龍站",
  lostLuzhuoStation,
].flat();

const xinDianLine = ["新店站", ...eachXindian];
const circularLine = ["大坪林站", ...eachDapinglin];

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
</script>

<template>
  <main>
    <div class="container">
      <div class="information">
        <div class="select-board">
          <p>你所在的車站：</p>
          <select name="station" id="station" v-model="selectStation">
            <option value="choose">--choose--</option>
            <optgroup label="淡水信義線">
              <template
                v-for="station in xiangshanLine"
                wenhuStation
                :key="station"
              >
                <option :value="station">
                  {{ station }}
                </option>
              </template>
            </optgroup>
            <optgroup label="板南線">
              <template v-for="station in bannanLine" :key="station">
                <option :value="station">
                  {{ station }}
                </option>
              </template>
            </optgroup>
            <optgroup label="文湖線">
              <template v-for="station in wenhuLine" :key="station">
                <option :value="station">
                  {{ station }}
                </option>
              </template>
            </optgroup>
            <optgroup label="松山新店線">
              <template v-for="station in xinDianLine" :key="station">
                <option :value="station">
                  {{ station }}
                </option>
              </template>
            </optgroup>
            <optgroup label="中和新蘆站">
              <template v-for="station in LuzhuoLine" :key="station">
                <option :value="station">
                  {{ station }}
                </option>
              </template>
            </optgroup>
            <optgroup label="環狀線">
              <template v-for="station in circularLine" :key="station">
                <option :value="station">
                  {{ station }}
                </option>
              </template>
            </optgroup>
          </select>
        </div>
        <template v-if="selectStation">
          <div style="font-weight: bold; color: orange">
            現在時刻： {{ currentStation[0].NowDateTime }}
          </div>
          <div class="show-board">
            <div
              class="forward"
              v-for="station in currentStation"
              :key="station.id"
            >
              <span
                >往
                <span v-if="station.DestinationName" style="color: goldenrod">
                  {{ station.DestinationName }}</span
                >
                的車：
              </span>
              <span style="color: goldenrod">{{ station.CountDown }} </span>
              <span
                v-if="station.CountDown == '列車進站'"
                style="color: goldenrod"
                >中</span
              >
              <span v-else> 分鐘到站</span>
            </div>
          </div>
        </template>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 25.6px);
}
.information {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 500px;
  padding: 10px;
  font-size: 20px;

  select {
    font-size: 20px;
    padding: 3px 5px;
  }
}

.select-board {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  gap: 5px;
}
.show-board {
  line-height: 2;
  padding: 0 15px;
  border-left: 1px solid #f6f6f6ea;
  border-right: 1px solid #f6f6f6ea;
}
</style>
