<script setup>
import { ref } from "vue";
import { getApi } from "@/js/getMrtApi.js";
import { computed } from "@vue/reactivity";
import {
  eachXiangshan,
  eachZoo,
  eachXindian,
  eachNangangExhibition,
  eachHuilong,
  eachDapinglin,
} from "@/js/allLines.js";

// api
const data = ref(null);

data.value = await getApi();

// 每隔五秒重打一次api
window.setInterval(async () => {
  data.value = await getApi();
}, 5000);

let selectStation = ref(null);

let currentStation = computed(() => {
  return data.value.filter(
    (station) => station.StationName === selectStation.value
  );
});

// 倒數計時
// const time = ref(null);
// watch(
//   () => selectStation.value,
//   () => {
//     time.value = 15;
//     setInterval(() => {
//       if (time.value > 0) {
//         time.value = time.value - 1;
//       } else {
//         time.value = 15;
//       }
//     }, 1000);
//   }
// );
</script>

<template>
  <main>
    <div class="container">
      <div class="information">
        <!-- <span>距離下次更新： {{ time }}</span> -->

        <br />
        <div class="select-board">
          <p>你所在的車站：</p>
          <select name="station" id="station" v-model="selectStation">
            <option value="choose">--choose--</option>
            <optgroup label="淡水信義線">
              <template v-for="station in eachXiangshan" :key="station">
                <option :value="station">
                  {{ station }}
                </option>
              </template>
            </optgroup>
            <optgroup label="板南線">
              <template v-for="station in eachNangangExhibition" :key="station">
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
  width: 500px;
  height: 200px;
  border-radius: 5px;
  padding: 10px;
  font-size: 20px;

  select {
    font-size: 20px;
    padding: 3px 5px;
  }
}

.select-board {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  gap: 5px;
}
.show-board {
  margin-top: 1rem;
  line-height: 2;
}
</style>
