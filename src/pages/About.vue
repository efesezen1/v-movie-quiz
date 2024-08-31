<template>
   <div>About</div>
</template>

<script setup>
import axios from 'axios'

const fetchData = async () => {
   const { data } = await axios.get(
      `https://api.clip.cafe/?api_key=${import.meta.env.VITE_APP_API_KEY}&duration=3&movie_title=matrix&actors=keanu+reeves`
   )
   console.log(data)
   // https://api.clip.cafe/?api_key=YOUR_API_KEY&duration=3&movie_title=matrix&actors=keanu+reeves
}
onMounted(async () => {
   try {
      await fetchData()
   } catch (err) {
      throw new Error(err.message)
   }
})
</script>

<style lang="scss" scoped></style>
