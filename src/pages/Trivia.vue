<template>
   <div
      v-if="gameStatus === 'notStarted'"
      style="background-image: url('/confetti.png'); background-size: cover"
      class="w-full h-[94vh] text-xl px-4 py-2 flex flex-col justify-center items-start"
   >
      <Toast position="top-center" />
      <div class="mb-60">
         <h1 class="text-9xl font-bold">
            <TriviaTitle class="text-8xl" /> Quiz
         </h1>
         <div class="flex flex-row gap-4">
            <Button
               @click="
                  () => {
                     gameStatus = 'started'
                     isCategorized = false
                  }
               "
               severity="warn"
               class="mt-10"
               label="Flash Game"
            />
            <Button
               class="mt-10"
               label="Game Settings"
               @click="displaySettingDrawer = true"
            />
         </div>
      </div>
      <Drawer
         v-model:visible="displaySettingDrawer"
         header="Settings"
         position="bottom"
         style="height: 40vh"
      >
         <template #header>
            <div class="flex items-center gap-2">
               <Avatar shape="circle" class="pi pi-cog" />
               <span class="font-bold">Settings</span>
            </div>
         </template>
         <div class="mt-5 d-flex flex-row gap-10">
            <FloatLabel class="w-full mb-10">
               <Select
                  v-model="selectedCategory"
                  showClear
                  :loading="isCategoryLoading"
                  :options="categoryOptions"
                  optionLabel="name"
                  optionValue="id"
                  class="w-full"
                  id="category-select"
               />
               <label for="category-select">{{
                  selectedCategory ? 'Category' : 'Set Category'
               }}</label>
            </FloatLabel>
            <FloatLabel class="w-full mb-10">
               <Select
                  v-model="selectedDifficulty"
                  showClear
                  :options="difficultyOptions"
                  optionLabel="label"
                  optionValue="value"
                  class="w-full"
                  id="difficulty-select"
               />
               <label for="difficulty-select">{{
                  selectedDifficulty ? 'Difficulty' : 'Set Difficulty'
               }}</label>
            </FloatLabel>
         </div>

         <template #footer>
            <div class="flex items-center gap-2">
               <Button
                  :label="categorizedPlayLabel"
                  :loading="categorizedPlayLoading"
                  icon="pi pi-play"
                  class="flex-auto"
                  :outlined="settingPlayButtonOutline"
                  @click="playCategorizedGame"
               ></Button>
            </div>
         </template>
      </Drawer>
   </div>

   <div v-else-if="gameStatus === 'started'">
      <vue-countdown
         v-if="gameStatus === 'started' && !isLoading"
         :time="gameTimeRange"
         v-slot="{
            days,
            hours,
            minutes,
            seconds,
            totalSeconds,
            totalMilliseconds,
         }"
         @progress="
            (data) => (data.totalSeconds === 0 ? (gameStatus = 'over') : null)
         "
         @end="gameStatus = 'over'"
      >
         <ProgressBar
            :value="parseInt(gameTimeRange * 100)"
            :showValue="false"
            class="w-full"
            style="border-radius: 0px; height: 0.1rem"
         />
         <div class="w-full">
            <div class="flex justify-end items-center gap-2 w-11/12 my-2">
               <i class="pi-stopwatch pi"></i>
               {{ `${minutes}:${seconds}` }}
            </div>
         </div>
      </vue-countdown>

      <div v-if="isLoading" class="flex justify-center items-center h-[94vh]">
         <ProgressSpinner class=" "></ProgressSpinner>
      </div>
      <div v-else>
         <QuestionNavigation
            :data="data"
            :cursor="cursor"
            @question:clicked="moveCursor"
            :key="cursor + gameStatus"
            v-model:display="qNavVisible"
         />
         <div
            class="flex flex-col items-center relative h-[70vh] justify-center"
         >
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
   </div>
   <div
      v-else-if="gameStatus === 'over'"
      class="h-[94vh] flex justify-center items-start flex-col bg-purple-900 text-slate-100"
   >
      <div class="w-11/12 ml-3 mb-40">
         <h1 class="text-9xl font-bold text-slate-100">Game Over.</h1>
         <h1
            class="ml-2 text-5xl font-bold text-slate-100 flex items-center gap-4"
         >
            <i
               v-if="data.filter((item) => item.isAnsweredTrue).length >= 5"
               class="pi pi-star-fill text-yellow-500"
               style="font-size: 3rem"
            ></i>
            <div v-else class="text-5xl">🥶</div>
            Score:
            {{ score }}
         </h1>
         <div class="mt-10 flex flex-row gap-4">
            <Button label="Play Again" @click="restart" />
            <Button label="Show Answers" @click="answerDrawer = true" />
         </div>
         <div v-if="explode">
            <div v-confetti></div>
         </div>
      </div>
      <Drawer
         v-model:visible="answerDrawer"
         header="Answers"
         position="bottom"
         style="max-height: 100vh; min-height: 43vh; overflow-y: scroll"
      >
         <div
            class="flex flex-col gap-4 w-full justify-center items-center my-4"
         >
            <div class="w-11/12" v-for="item in data">
               <div>
                  {{ item.isAnsweredTrue ? '✔' : '✘' }} - {{ item.question }}
               </div>
               <div>
                  Correct answer:
                  {{ item.options.find((option) => option.isAnswer).text }}
               </div>
               <div>
                  {{
                     item.options.find((option) => option.isSelected)
                        ? ` Your answer: ${
                             item.options.find((option) => option.isSelected)
                                .text
                          }`
                        : ''
                  }}
               </div>
            </div>
         </div>
      </Drawer>
   </div>
</template>

<script setup>
import { useToast } from 'primevue/usetoast'
const toast = useToast()
import mockData from '../utils/MockData'
import { vConfetti } from '@neoconfetti/vue'
import axios from 'axios'
const qNavVisible = ref(false)
const gameTimeRange = ref(600 * 1000)
const displaySettingDrawer = ref(false)
const gameStatus = ref('notStarted')
const data = ref([])
const selectedDifficulty = ref()
const selectedCategory = ref()
const settingPlayButtonOutline = ref(true)
const isCategorized = ref(false)
const queryClient = useQueryClient()
const answerDrawer = ref(false)
const categorizedUrl = computed(() => [
   'https://the-trivia-api.com/api/questions?limit=10',
   {
      params: {
         difficulty: selectedDifficulty.value,
         category: selectedCategory.value,
      },
   },
])
const categorizedPlayLoading = ref(false)
const categorizedPlayLabel = ref('Play Categorized Game')

const fetchCategorizedData = async () => {
   const data = await queryClient.fetchQuery({
      queryKey: [
         'categorizedQuestions',
         selectedDifficulty.value,
         selectedCategory.value,
      ],
      queryFn: async () => {
         try {
            const response = await axios.get(...categorizedUrl.value)
            console.log(...categorizedUrl.value)
            const data = response.data
            const optimizedData = quizzify(data)
            console.log(data)
            return optimizedData
         } catch (err) {
            throw new Error(err.message)
         }
      },
      refetchOnWindowFocus: false,
   })
   return data
}
const playCategorizedGame = async () => {
   if (
      selectedCategory.value === undefined &&
      selectedDifficulty.value === undefined
   ) {
      toast.add({
         severity: 'info',
         summary: 'Hey!',
         detail:
            'If you do not want to select either difficulty or category, you can play a flash game.',
         life: 3000,
      })
      console.log('prohibited. please select a difficulty and category')
      return
   }
   isCategorized.value = true
   settingPlayButtonOutline.value = false
   categorizedPlayLoading.value = true
   categorizedPlayLabel.value = 'Loading...'
   data.value = await fetchCategorizedData()
   setTimeout(() => {
      settingPlayButtonOutline.value = true
      categorizedPlayLoading.value = false
      categorizedPlayLabel.value = 'Play Categorized Game'
      gameStatus.value = 'started'
   }, 1000)
}
const optionTypeOptions = ref([
   {
      label: 'Multiple Choice',
      value: 'multiple',
   },
   {
      label: 'True/False',
      value: 'boolean',
   },
])
const difficultyOptions = ref([
   {
      label: 'Easy',
      value: 'easy',
   },
   {
      label: 'Medium',
      value: 'medium',
   },
   {
      label: 'Hard',
      value: 'hard',
   },
])

const quizzify = (data) => {
   return data.map((item, index) => {
      const options_ = shuffle([...item.incorrectAnswers, item.correctAnswer])
      const options = options_.map((option, index) => {
         return {
            isAnswer: option === item.correctAnswer,
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
}
const {
   data: queryBaseData,
   isLoading,
   isError,
   error,
   refetch: refetchBaseQuestions,
} = useQuery({
   queryKey: ['questions'],
   queryFn: async () => {
      try {
         const response = await axios.get(
            'https://the-trivia-api.com/api/questions?limit=10'
         )
         const data = response.data
         const optimizedData = quizzify(data)

         return optimizedData
      } catch (error) {
         throw new Error(error.message)
      }
   },
   initialData: mockData,
   refetchOnWindowFocus: false,
})

const { data: categoryOptions, isLoading: isCategoryLoading } = useQuery({
   queryKey: ['categories'],
   queryFn: async () => {
      try {
         const response = await axios.get(
            'https://opentdb.com/api_category.php'
         )
         const data = response.data.trivia_categories
         return data
      } catch (error) {
         throw new Error(error.message)
      }
   },
})

watch(queryBaseData, () => {
   data.value = toRaw(queryBaseData.value ?? [])
})

watch(
   [gameStatus, isLoading],
   ([value, isLoadingVal], [oldValue, isLoadingOldVal]) => {
      if (oldValue !== 'started' && value === 'started' && !isLoadingVal) {
         console.log('isLoadingVal', isLoadingVal)
         setTimeout(() => {
            qNavVisible.value = true
         }, 1000)
      }
   },
   {
      immediate: true,
   }
)

const finishGame = () => {
   gameStatus.value = 'over'
}

const explode = ref(false)
const moveCursor = (navigation, currentIndex) => {
   if (data.value.every((item) => item.questionStatus === 'answered')) {
      console.log('All questions have been answered')
      gameStatus.value = 'over'
      data.value.filter((item) => item.isAnsweredTrue).length > 5 &&
         (explode.value = true)
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
   if (data.value.length === 0) return ''
   return data.value[cursor.value].question
})
const currentOptions = computed(() => {
   if (data.value.length === 0) return []
   return data.value[cursor.value].options
})

const restart = () => {
   console.log('Restarting...')
   if (isCategorized.value) {
      playCategorizedGame()
   } else {
      refetchBaseQuestions()
   }
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
   }, 600)
}
</script>

<style>
.p-progressbar {
   position: relative;
   overflow: hidden;
   height: var(--p-progressbar-height);
   background: none !important;
   border-radius: none;
}
.p-progressbar-value {
   color: red;
   background-color: yellow;
}
.p-progressbar-determinate {
   border-radius: none !important;
}
</style>
