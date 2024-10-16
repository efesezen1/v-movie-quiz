<template>
   <div>
      <!-- v-if="selectedQuestionNum <= 9" -->
      <SpeedDial
         :model="items"
         :radius="150"
         :visible="qNavVisible ? true : false"
         @show="qNavVisible = true"
         :hide-on-click-outside="false"
         type="semi-circle"
         show-icon="pi pi-question"
         :buttonProps="{ severity: 'warn', rounded: true }"
         :rotate-animation="false"
         direction="up"
         class="absolute bottom-4"
         style="position: absolute; left: calc(50% - 2rem)"
      >
         <template #item="{ item, toggleCallback }">
            <div
               class="dark:bg-slate-900 dark:text-white bg-slate-100 text-slate-900 rounded-full w-[40px] h-[40px] flex justify-center items-center transition-all duration-300 text-sm overflow-y-scroll"
               :class="questionsStyling(item, item.index)"
               :disabled="gameStatus"
               @click="
                  (e) =>
                     (gameStatus === 'started' || item.index !== cursor) &&
                     toggleCallback(e)
               "
            >
               <!-- @click="console.log(item)" -->
               <!-- @click="emit('question:clicked', 'to', index)" -->
               <small>{{
                  item.questionStatus === 'unanswered'
                     ? item.index + 1
                     : item.questionStatus === 'answered' &&
                       !item.isAnsweredTrue
                     ? '✘'
                     : item.isAnsweredTrue && '✔'
               }}</small>
            </div>
         </template>
      </SpeedDial>
      <!-- <div v-else class="absolute bottom-4 w-full bg-red-300 h-[4rem]">
         
      </div> -->
   </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, toRefs } from 'vue'
const currentItemIndex = ref(0)
const props = defineProps({
   data: Array,
   cursor: Number,
   gameStatus: String,
   selectedQuestionNum: Number,
})

const { data, cursor, gameStatus, selectedQuestionNum } = toRefs(props)
const qNavVisible = defineModel('display')
const emit = defineEmits(['question:clicked'])
const questionsStyling = (item, index) => ({
   'border-4 border-green-500 text-white': item.isAnsweredTrue,
   'border-4 border-red-500 text-slate-900':
      item.questionStatus === 'answered' && !item.isAnsweredTrue,
   'border-4 border-slate-300 text-slate-900':
      item.questionStatus === 'unanswered',
   'opacity-80': cursor !== index,
   ...(gameStatus === 'over'
      ? { 'cursor-default': true }
      : { 'cursor-pointer': true }),
})

const items = ref([
   ...data.value.map((item, index) => ({
      ...item,
      index,
      label: item.question,
      command: () => {
         // console.log('clicked')
         currentItemIndex.value = index
         emit('question:clicked', 'to', index)
      },
   })),
])
</script>

<style lang="scss" scoped></style>
