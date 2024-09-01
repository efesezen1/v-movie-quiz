<template>
   <div
      v-if="gameStatus === 'notStarted'"
      style="background-image: url('/confetti.png'); background-size: cover"
      class="w-full h-[94vh] text-xl px-4 py-2 flex flex-col justify-center items-start"
   >
      <div class="mb-56">
         <h1 class="text-9xl font-bold">
            <TriviaTitle class="text-8xl" /> Quiz
         </h1>

         <Button
            @click="() => (gameStatus = 'started')"
            severity="warn"
            class="mt-10 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
            >Start game</Button
         >
      </div>
   </div>

   <div v-else-if="gameStatus === 'started'">
      <QuestionNavigation
         :data="data"
         :cursor="cursor"
         @question:clicked="moveCursor"
         :key="cursor"
         v-model:display="qNavVisible"
      />
      <div class="flex flex-col items-center relative h-[70vh] justify-center">
         <div v-html="currentQuestion" class="w-10/12"></div>

         <div
            class="flex flex-col gap-4 w-full justify-center items-center my-4"
         >
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
         </div>
         <div>
            <span class="underline">
               <i class="pi pi-star-fill text-yellow-500"></i> {{ score }}
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
      </div>
   </div>
   <div
      v-else-if="gameStatus === 'over'"
      class="h-[94vh] flex justify-center items-start flex-col bg-purple-900 text-slate-100"
   >
      <div class="w-11/12 ml-3 mb-40">
         <h1 class="text-9xl font-bold text-slate-100">Game Over.</h1>
         <h1 class="ml-2 text-5xl font-bold text-slate-100">
            <i
               class="pi pi-star-fill text-yellow-500"
               style="font-size: 2rem"
            ></i>
            Score:
            {{ score }}
         </h1>
         <div class="mt-10 flex flex-row gap-4">
            <Button label="Play Again" @click="restart" />
            <Button label="Show Answers" />
         </div>
         <div v-if="explode">
            <div v-confetti></div>
         </div>
      </div>
   </div>
</template>

<script setup>
import { ref } from 'vue'
import TriviaTitle from '../components/TriviaTitle.vue'
import mockData from '../utils/MockData'
import { vConfetti } from '@neoconfetti/vue'
const qNavVisible = ref(false)
let data = ref([])
const gameStatus = ref('started')

watch(gameStatus, (value, oldValue) => {
   if (oldValue !== 'started' && value === 'started') {
      setTimeout(() => {
         qNavVisible.value = true
      }, 500)
   }
})

const finishGame = () => {
   gameStatus.value = 'over'
}

const explode = ref(false)
const moveCursor = (navigation, currentIndex) => {
   if (data.value.every((item) => item.questionStatus === 'answered')) {
      console.log('All questions have been answered')
      gameStatus.value = 'over'
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

const initData = () =>
   mockData.map((item) => {
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
data.value = initData()

const restart = () => {
   console.log('Restarting...')
   data.value = initData()
   cursor.value = 0
   qNavVisible.value = false
   gameStatus.value = 'started'
}
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
</script>

<style lang="scss" scoped></style>
