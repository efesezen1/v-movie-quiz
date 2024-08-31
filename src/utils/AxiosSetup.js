import axios from 'axios'

const $http = axios.create({
   //    baseURL: `https://api.clip.cafe`,
   //    headers: {
   //       'Content-Type': 'application/json',
   //       'Access-Control-Allow-Origin': '*',
   //       Accept: '*/*',
   //    },
   //    params: {
   //       api_key: import.meta.env.VITE_APP_API_KEY,
   //    },
   baseURL: 'https://opentdb.com/api.php?amount=10',
})
export default $http
