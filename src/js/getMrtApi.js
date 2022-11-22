import { GET } from "../api/api.js";
import { ref } from "vue";

const response = ref(null);
response.value = await GET("/arriveMRT");

export const copyResponse = ref(null);

copyResponse.value = JSON.parse(JSON.stringify(response.value));

// 產出一個每一個物件都擁有不同id的data
function addIdToArray(array) {
  let id = 0;
  return array.map((item) => {
    id++;
    item.id = id;
    return item;
  });
}

export const data = ref(null);
data.value = addIdToArray(copyResponse.value);
