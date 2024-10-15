<template>
   <div
      v-if="gameStatus === 'notStarted'"
      style="background-image: url('./confetti.png'); background-size: cover"
      class="w-full h-[94vh] text-xl px-4 py-2 flex flex-col justify-center items-start md:items-center"
   >
      <Toast position="top-center" />
      <div class="mb-60">
         <h1 class="text-9xl font-bold md:text-center">
            <span class="text-8xl flex flex-row">
               <span class="text-red-500"> M </span>
               <span class="text-orange-500"> O </span>
               <span class="text-yellow-500"> V </span>
               <span class="text-green-500"> I </span>
               <span class="text-blue-500"> E </span>
            </span>
            Quiz
         </h1>
         <div class="flex flex-row gap-4 md:items-center md:justify-center">
            <Button
               @click="
                  () => {
                     gameStatus = 'started'
                  }
               "
               severity="warn"
               class="mt-10 w-full"
               label="Start Game"
            />
         </div>
      </div>
   </div>
   <div
      class="flex flex-col min-h-[94vh] items-center mx-auto justify-between"
      v-else-if="gameStatus === 'started'"
   >
      <div class="w-full">
         <div class="pt-[10%] md:pt-5 flex flex-col items-center">
            <div class="w-[90%] md:w-[70%] flex justify-between mb-2">
               <Button
                  icon="pi pi-arrow-left"
                  severity="success"
                  rounded
                  aria-label="Search"
                  @click="changeQuestion('previous')"
               />
               <Button
                  icon="pi pi-arrow-right"
                  severity="success"
                  rounded
                  aria-label="Search"
                  @click="changeQuestion('next')"
               />
            </div>
            <video
               v-if="currentMovie.download"
               loop
               autoplay
               controls
               :src="currentMovie.download"
               :key="currentMovie.clipID"
               type="video/mp4"
               class="w-[90%] md:w-[70%] lg:w-[50%] xl:w-[30%]"
            >
               Your browser does not support the video tag.
            </video>
            <ProgressSpinner v-else />
         </div>
         <div
            class="w-[90%] md:w-[70%] lg:w-[50%] xl:w-[30%] flex flex-col items-center justify-center mx-auto"
         >
            <span
               class="w-full mt-5"
               v-if="answerStatus !== 'idle' || answerStatus !== 'correct'"
            >
               <InputGroup>
                  <!-- . . . ANSWER INPUT SEC . . . -->
                  <!-- v-model="answer" -->
                  <AutoComplete
                     v-model="answer"
                     type="text"
                     :suggestions="suggestions"
                     optionLabel="label"
                     @complete="searchMovie"
                     class="w-[80%] m-auto my-5 !rounded-r-none"
                     :disabled="
                        answerStatus === 'over' || answerStatus === 'correct'
                     "
                     @keyup.enter="checkAnswer(answer, currentMovie)"
                  />

                  <!-- . . . SUBMIT SEC . . . -->
                  <div class="min-w-[30%] h-full">
                     <Button
                        class="!rounded-l-none w-full"
                        @click="checkAnswer(answer, currentMovie)"
                        :disabled="answerStatus !== 'idle'"
                     >
                        <p
                           v-if="answerStatus === 'idle'"
                           class="text-nowrap overflow-hidden"
                        >
                           Submit
                        </p>
                        <p
                           v-else-if="answerStatus === 'correct'"
                           class="text-nowrap overflow-hidden"
                        >
                           Correct ✓
                        </p>
                        <p
                           v-else-if="answerStatus === 'wrong'"
                           class="text-nowrap overflow-hidden"
                        >
                           Wrong ✕
                        </p>
                        <p v-else-if="answerStatus === 'over'">Over</p>
                     </Button>
                  </div>
               </InputGroup>
            </span>
            <!-- . . . ANSWERS SEC . . . -->
            <span class="w-[80%]">
               <TransitionGroup tag="ul" name="fade" class="list-container">
                  <li v-for="item in answers" class="w-full mb-1" :key="item">
                     {{
                        item.answerStatus === 'correct'
                           ? '✅'
                           : item.answerStatus === 'wrong'
                           ? '💥'
                           : item.answerStatus === 'passed'
                           ? '⚪️'
                           : ''
                     }}
                     <!-- {{ item.answerStatus }} -->
                     {{ item.answer }}
                  </li>
               </TransitionGroup>
            </span>
            <!-- . . . ANSWER REVEAL SEC . . . -->
            <Transition name="fade">
               <span
                  v-if="
                     answers.length >= replyNum ||
                     answerStatus === 'correct' ||
                     answerStatus === 'over'
                  "
                  class="relative my-4 text-center"
               >
                  <p>answer</p>
                  <p class="text-2xl">{{ currentMovie.movie_title }}</p>
               </span>
            </Transition>
         </div>
      </div>
      <div class="w-[90%] mb-3 flex flex-col gap-2 md:flex-row">
         <div
            class="w-full grid grid-cols-2 grid-flow-col md:grid-rows-2 md:grid-flow-col md:grid-cols-1"
            v-if="currentMovie.movie_director"
         >
            <ToggleButton
               v-model="displayDirector"
               onLabel="Director"
               offLabel="Director"
               onIcon="pi pi-lock"
               offIcon="pi pi-lock-open"
               class="text-nowrap m-1 w-full"
            />
            <Transition
               name="fade"
               v-show="!displayDirector"
               class="flex items-center justify-center w-full text-end pe-5"
            >
               <p class="w-full">
                  {{ currentMovie.movie_director }}
               </p>
            </Transition>
         </div>
         <div
            class="w-full grid grid-cols-2 grid-flow-col md:grid-rows-2 md:grid-flow-col md:grid-cols-1"
            v-if="currentMovie.movie_year"
         >
            <ToggleButton
               v-model="displayYear"
               onLabel="Year"
               offLabel="Year"
               onIcon="pi pi-lock"
               offIcon="pi pi-lock-open"
               class="text-nowrap m-1 w-full"
            />

            <Transition
               name="fade"
               v-show="!displayYear"
               class="flex items-center justify-center w-full text-end pe-5"
            >
               <p class="w-full">
                  {{ currentMovie.movie_year }}
               </p>
            </Transition>
         </div>
         <div
            class="w-full grid grid-cols-2 grid-flow-col md:grid-rows-2 md:grid-flow-col md:grid-cols-1"
            v-if="currentMovie.characters"
         >
            <ToggleButton
               v-model="displayMovieChars"
               onLabel="Characters"
               offLabel="Characters"
               onIcon="pi pi-lock"
               offIcon="pi pi-lock-open"
               class="text-nowrap m-1 w-full"
            />

            <Transition
               name="fade"
               v-show="!displayMovieChars"
               class="flex items-center justify-center w-full text-end pe-5"
            >
               <p class="w-full">
                  {{
                     currentMovie.characters
                        .split(',')
                        .filter((c) => c !== '')
                        .join(', ')
                  }}
               </p>
            </Transition>
         </div>
      </div>
   </div>

   <!-- <video
      controls
      autoplay
      src="https://api.clip.cafe/?api_key=0a2f7beaa247219281494aecabc9daad&key=e239624e4261b6fc51e8e979fd35afdc217fabe23330c69a1cef3d295c2ecf48&slug=if-its-not-the-crystal-in-the-sky"
   ></video> -->
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import canonizeText from '@/utils/CanonicalizeText'
import { useQuery, useQueryClient } from '@tanstack/vue-query'
import { _ } from 'lodash'
import axios from 'axios'
import { useRoute } from 'vue-router'
const gameStatus = ref('notStarted')
const displayDirector = ref(true)
const displayYear = ref(true)
const displayMovieChars = ref(true)
const video = ref()
const queryClient = useQueryClient()
const questionCursor = ref(0)
const suggestionLoading = ref('idle')
const suggestions = ref([])
const memo = ref({})
// . . . ANSWER . . .
const answer = ref('')
const answers = ref([
   /* { answer: 'There Will Be Blood', answerStatus: 'wrong' } */
])
const answerCursor = ref(0)
const answerStatus = ref('idle')
const showAnswer = ref(false)
const movieSession = ref([])
const url = `https://api.clip.cafe/?api_key=${import.meta.env.VITE_APP_API_KEY}`

onMounted(() => {
   gameStatus.value = 'notStarted'
})
const replyNum = ref(4)

const submitLabel = computed(() => {
   return label
})

// . . . SEARCH MOVIE . . .
const searchMovie = _.debounce(async () => {
   try {
      if (answer.value === '') return
      suggestions.value = []
      suggestionLoading.value = 'fetching'
      // console.log(answer.value)
      const res = await queryClient.ensureQueryData({
         queryKey: ['movie', answer.value],
         queryFn: async () =>
            axios.get(url + `&movie_title=${encodeURI(answer.value)}`),
      })

      suggestionLoading.value = 'fetched'
      const allSuggestions = res.data.hits.hits.map((item) => ({
         label: item._source.movie_title,
      }))
      const uniqSuggestions = _.uniqBy(allSuggestions, 'label')
      // console.log('Suggestions:', uniqSuggestions)
      suggestions.value = uniqSuggestions
   } catch (error) {
      suggestionLoading.value = 'error'
      console.error(error)
   }
}, 1000)

const router = useRoute()
// console.log(router)
const movieData = ref([])
const { data, refetch } = useQuery({
   queryKey: ['movie'],
   queryFn: async () => {
      const min = 6
      const max = 9.5
      const randomScore = (Math.random() * (max - min) + min).toFixed(1)
      const response = await axios.get(url + `&movie_imdbscore=${randomScore}`)
      const movies = response.data.hits.hits.map((x) => x._source)

      // console.log(movies)
      const uniqMovie = _.uniqBy(movies, 'movie_title')
      // console.log('uniqMovie', uniqMovie)
      movieSession.value = [...movieSession.value, ...uniqMovie]
      movieSession.value = _.uniqBy(movieSession.value, 'movie_title')
      // console.log('movieSession', movieSession.value)
      const data = movieSession.value.map((item) => {
         // console.log(item._source)
         video.value = item.download
         return item
      })

      movieData.value.push(...data)
      return data
   },
   initialData: [],
   refetchOnWindowFocus: false,
})
const currentMovie = computed(() => {
   if (movieData.value.length === 0) return []
   return movieData.value[questionCursor.value]
})

const setMemo = (questionCursor_, currentMovie_, answerStatus_, answers_) => {
   console.log('setMemo is working...', answerStatus_)
   if (answerStatus_ !== 'over' && answerStatus_ !== 'correct') return
   console.log('It has passed the guard clause...')
   if (memo.value[questionCursor_]) return
   memo.value[questionCursor_] = {
      ...currentMovie_,
      answerStatus: answerStatus_,
      answers: answers_,
   }

   console.log('MEMO', memo.value)
}

// watch(currentMovie, (val) => console.log('currentMovie', val))
// watch(data, (val) => console.log(val))

const checkAnswer = (answer_) => {
   console.log(answer_)
   console.log('answer_', canonizeText(answer_))
   console.log('movie_title', canonizeText(currentMovie.value.movie_title))
   const { movie_title: title } = currentMovie.value
   console.log(answer.value, title)
   const isAnswerTrue = canonizeText(answer_) === canonizeText(title)
   if (isAnswerTrue) {
      answer.value = ''
      answerStatus.value = 'correct'
      answers.value = [
         ...answers.value,
         {
            answer: answer_,
            answerStatus: 'correct',
         },
      ]

      setMemo(
         questionCursor.value,
         currentMovie.value,
         answerStatus.value,
         answers.value
      )

      setTimeout(() => {
         answerStatus.value = 'over'
         return
      }, 300)
   }
   if (!isAnswerTrue) {
      answers.value = [
         ...answers.value,
         {
            answer: answer_ === '' ? 'passed' : answer_,
            answerStatus: answer_ === '' ? 'passed' : 'wrong',
         },
      ]

      answer.value = ''
      answerStatus.value = 'wrong'

      answerCursor.value++
      setTimeout(() => {
         if (answerCursor.value >= replyNum.value) {
            answerStatus.value = 'over'
            setMemo(
               questionCursor.value,
               currentMovie.value,
               answerStatus.value,
               answers.value
            )

            return
         }
         answerStatus.value = 'idle'
      }, 300)
   }
}

watch(answer, (x) => {
   if (x === '') return
   if (typeof x === 'string') return
   if (typeof x === 'object') {
      answer.value = x.label
   }
})

const changeQuestion = (direction) => {
   setInitialState()
   console.log('questionCursor', questionCursor.value)
   if (direction === 'next') {
      if (questionCursor.value >= movieData.value.length - 2) {
         console.log('no other movies')
         refetch()
         console.log('refetching bc there is no more movie')
         return
      }
      console.log(
         'there are other movies, remaining movie:',
         movieData.value.length
      )
      questionCursor.value++
      if (movieData.value.length - 1 - questionCursor.value === 2) {
         console.log('refetching...')
         refetch()
      }
   }
   if (direction === 'previous') {
      if (questionCursor.value <= 0) return
      questionCursor.value--
   }
}

const setInitialState = () => {
   answer.value = ''
   answerStatus.value = 'idle'
   answers.value = []
   answerCursor.value = 0
   displayDirector.value = true
   displayYear.value = true
   displayMovieChars.value = true
   suggestions.value = []
   showAnswer.value = false
}
</script>

<style>
.list-container {
   position: relative;
   padding: 0;
   list-style-type: none;
}

/* 1. declare transition */
.fade-move,
.fade-enter-active,
.fade-leave-active {
   transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

/* 2. declare enter from and leave to state */
.fade-enter-from,
.fade-leave-to {
   opacity: 0;
   transform: scaleY(0.01) translate(30px, 0);
}

/* 3. ensure leaving items are taken out of layout flow so that moving
      animations can be calculated correctly. */
.fade-leave-active {
   position: absolute;
}
</style>
