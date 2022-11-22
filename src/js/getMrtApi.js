import { GET } from "../api/api.js";
import { ref } from "vue";

const response = ref(null);
response.value = await GET("/arriveMRT");

export const data = ref(null);

data.value = JSON.parse(JSON.stringify(response.value));
