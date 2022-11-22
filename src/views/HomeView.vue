<script setup>
import { ref } from "vue";
import { getApi } from "@/js/getMrtApi.js";
import { computed } from "@vue/reactivity";
import {
  eachXiangshan,
  eachZoo,
  eachXindian,
  eachDingpu,
  eachHuilong,
  eachDapinglin,
  allXiangshanLineStation,
} from "@/js/allLines.js";

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
                v-for="station in allXiangshanLineStation"
                :key="station"
              >
                <option :value="station">
                  {{ station }}
                </option>
              </template>
            </optgroup>
            <optgroup label="板南線">
              <template v-for="station in eachDingpu" :key="station">
                <option :value="station">
                  {{ station }}
                </option>
              </template>
            </optgroup>
            <optgroup label="文湖線">
              <template v-for="station in eachZoo" :key="station">
                <option :value="station">
                  {{ station }}
                </option>
              </template>
            </optgroup>
            <optgroup label="松山新店線">
              <template v-for="station in eachXindian" :key="station">
                <option :value="station">
                  {{ station }}
                </option>
              </template>
            </optgroup>
            <optgroup label="中和新蘆站">
              <template v-for="station in eachHuilong" :key="station">
                <option :value="station">
                  {{ station }}
                </option>
              </template>
            </optgroup>
            <optgroup label="環狀線">
              <template v-for="station in eachDapinglin" :key="station">
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
