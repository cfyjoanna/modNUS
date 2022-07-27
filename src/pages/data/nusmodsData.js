import axios from 'axios';

export let nusmodsData = axios.get("https://api.nusmods.com/v2/2021-2022/moduleInfo.json").then(res => {
  nusmodsData = res.data;
})