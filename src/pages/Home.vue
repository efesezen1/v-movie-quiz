<template>
   <div
      style="background-image: url('./confetti.png'); background-size: cover"
      class="w-full h-[94vh] text-xl px-4 py-2 flex flex-col justify-center items-start md:items-center"
   >
      <Toast position="top-center" />
      <div class="mb-60">
         <h1 class="text-7xl font-bold">
            <TriviaTitle class="text-8xl" />
         </h1>
         <div class="flex flex-row gap-4 mt-10">
            <Transition name="fade">
               <Button
                  @click="router.push('/trivia')"
                  severity="warn"
                  class="w-[30vw] h-[30vw] md:w-full md:h-full"
                  label="Trivia Quiz"
               />
            </Transition>
            <Transition name="fade">
               <Button
                  @click="router.push('/movie')"
                  severity="danger"
                  class="w-[30vw] h-[30vw] md:w-full md:h-full"
                  label="Movie Quiz"
               />
            </Transition>
         </div>
      </div>
   </div>
</template>

<script setup>
import TriviaTitle from '../components/TriviaTitle.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
console.log(router)
</script>

<style lang="scss" scoped></style>
