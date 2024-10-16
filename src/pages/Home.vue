<template>
   <div
      style="background-image: url('./confetti.png'); background-size: cover"
      class="w-full h-[94vh] text-xl px-4 py-2 flex flex-col justify-center items-start md:items-center"
   >
      <div class="mb-60 w-full md:w-auto">
         <h1 class="text-7xl font-bold">
            <TriviaTitle class="text-8xl flex justify-center" />
         </h1>
         <div class="flex flex-row gap-4 mt-10 justify-center">
            <Transition name="fade">
               <Button
                  @click="router.push('/trivia')"
                  severity="warn"
                  class="w-[34vw] sm:w-[25vw] h-[34vw] sm:h-[25vw] md:w-full md:h-full"
                  label="Trivia Quiz"
               />
            </Transition>
            <Transition name="fade">
               <Button
                  @click="router.push('/movie')"
                  severity="danger"
                  class="w-[34vw] sm:w-[25vw] h-[34vw] sm:h-[25vw] md:w-full md:h-full"
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
