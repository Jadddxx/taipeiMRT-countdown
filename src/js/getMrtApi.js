import { GET } from "../api/api.js";
// 包成一個function
export async function getApi() {
  let response = null;
  let copyResponse = null;
  let data = null;

  response = await GET("/arriveMRT");

  copyResponse = JSON.parse(JSON.stringify(response));

  data = addIdToArray(copyResponse);
  return data;
}

// 產出一個每一個物件都擁有不同id的data
function addIdToArray(array) {
  let id = 0;
  return array.map((item) => {
    id++;
    item.id = id;
    return item;
  });
}
