<template>
   <!-- <div class="right-0 absolute bg-slate-100 text-slate-900 rounded-l">
      <div class="text-xl px-4 py-2">Question {{ cursor }}</div>
   </div> -->

   <div class="w-full  text-xl px-4 py-2 flex flex-row">
      <div v-for="(item, index) in data" class="mx-auto">
         <div
            class="bg-white text-slate-900 rounded-full w-[30px] h-[30px] flex justify-center items-center transition-all duration-300 text-sm overflow-y-scroll"
            :class="{
               'border-4 border-green-500': item.isAnsweredTrue,
               'border-4 border-red-500 text-slate-900':
                  item.questionStatus === 'answered' && !item.isAnsweredTrue,
               'border-4 border-slate-300 text-slate-900':
                  item.questionStatus === 'unanswered',
               'opacity-80': cursor !== index,
               ...(gameOver
                  ? { 'cursor-default': true }
                  : { 'cursor-pointer': true }),
            }"
            @click="moveCursor('to', index)"
            :disabled="gameOver"
         >
            <small>{{
               item.questionStatus === 'unanswered'
                  ? index + 1
                  : item.questionStatus === 'answered' && !item.isAnsweredTrue
                  ? '✘'
                  : item.isAnsweredTrue && '✔'
            }}</small>
         </div>
      </div>
   </div>
   <div class="flex flex-col items-center relative h-[70vh] justify-center">
      <div v-html="currentQuestion" class="w-10/12"></div>
      <!-- {{ currentQuestion }} -->
      <div class="flex flex-col gap-4 w-full justify-center items-center my-4">
         <!-- v-for="option in currentOptions" -->

         <Button
            class="w-10/12"
            :outlined="!option.isSelected"
            v-for="option in currentOptions"
            :key="option.text"
            :disabled="option.isButtonDisabled"
            :label="option.text"
            @click="answer(data[cursor], option)"
            :severity="
               option.isSelected === true
                  ? option.isAnswer === false
                     ? 'danger'
                     : 'success'
                  : 'info'
            "
         />
         <!-- @click="answer(option)" -->
      </div>
      <div>
         <!-- {{ currentOptions }} -->
         <span class="underline">
            <!-- {{ currentQuestion.correct_answer }} -->
            <i class="pi pi-star-fill text-yellow-400"></i> {{ score }}
         </span>
      </div>
      <div class="w-10/12 flex justify-end">
         <Button
            severity="warn"
            class="text-slate-100"
            icon="pi pi-angle-double-right"
            label="Pass"
            @click="moveCursor('pass', cursor)"
         />
      </div>
      <div v-if="explode">
         <div v-confetti></div>
      </div>
   </div>
</template>

<script setup>
import mockData from '../utils/MockData'
import { vConfetti } from '@neoconfetti/vue'
let data = ref([])
const gameOver = ref(false)
const explode = ref(false)
const moveCursor = (navigation, currentIndex) => {
   if (data.value.every((item) => item.questionStatus === 'answered')) {
      console.log('All questions have been answered')
      gameOver.value = true
      data.value.filter((item) => item.questionStatus === 'answered').length >
         5 && (explode.value = true)
      return
   }
   if (navigation === 'next') {
      console.log(`Moving cursor to the ${navigation} question`)
      while (data.value[currentIndex].questionStatus === 'answered') {
         currentIndex = (currentIndex + 1) % data.value.length
      }
      console.log(`Moving to question ${currentIndex + 1}`)
      cursor.value = currentIndex
   }
   if (navigation === 'pass') {
      console.log(`Moving cursor to the next unanswered question`)
      currentIndex = (currentIndex + 1) % data.value.length
      while (data.value[currentIndex].questionStatus === 'answered') {
         currentIndex = (currentIndex + 1) % data.value.length
      }
      cursor.value = currentIndex
   }
   if (navigation === 'to') {
      cursor.value = currentIndex
   }
}

const score = computed(() => {
   return `${data.value.filter((item) => item.isAnsweredTrue).length}/${
      data.value.length
   }`
})
let cursor = ref(0)

const currentQuestion = computed(() => {
   return data.value[cursor.value].question
})
const currentOptions = computed(() => {
   return data.value[cursor.value].options
})

data.value = mockData.map((item) => {
   const options_ = shuffle([...item.incorrect_answers, item.correct_answer])
   const options = options_.map((option, index) => {
      return {
         isAnswer: option === item.correct_answer,
         text: option,
         isSelected: false,
         isButtonDisabled: false,
      }
   })
   return {
      isAnsweredTrue: false,
      question: item.question,
      options,
      questionStatus: 'unanswered',
   }
})

function shuffle(array) {
   let currentIndex = array.length
   // While there remain elements to shuffle...
   while (currentIndex != 0) {
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex--
      // And swap it with the current element.
      ;[array[currentIndex], array[randomIndex]] = [
         array[randomIndex],
         array[currentIndex],
      ]
   }
   return array
}

const answer = (currentQuestion_, selected) => {
   selected.isSelected = true
   currentQuestion_.questionStatus = 'answered'
   currentQuestion_.options = currentQuestion_.options.map((item) => {
      return {
         ...item,
         isButtonDisabled: item.isSelected !== selected.isSelected,
      }
   })
   if (selected.isAnswer) {
      currentQuestion_.isAnsweredTrue = true
   }

   setTimeout(() => {
      moveCursor('next', cursor.value)
   }, 500)
}

// useQuery({
//    queryKey: ['data'],
//    queryFn: async () => (await $http.get('')).data.results,
//    initialData: mockData,
// })
</script>

<style lang="scss" scoped></style>
