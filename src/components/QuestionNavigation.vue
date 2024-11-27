<template>
   <div>
      <SpeedDial
         v-if="selectedQuestionNum <= 10"
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
         style="position: absolute; left: calc(50% - 1.2rem)"
      >
         <template #item="{ item, toggleCallback }">
            <div
               class="dark:bg-slate-900 dark:text-white rounded-full w-[40px] h-[40px] flex justify-center items-center transition-all duration-300 text-sm overflow-y-scroll question-indicator"
               :class="questionsStyling(item, item.index)"
               :disabled="gameStatus"
               @click="
                  (e) =>
                     (gameStatus === 'started' || item.index !== cursor) &&
                     toggleCallback(e)
               "
            >
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
      <div
         v-else
         class="absolute bottom-4 w-full h-[4rem] overflow-x-auto flex justify-center items-center"
      >
         <Paginator
            :totalRecords="items.length"
            @update:first="
               (e) => {
                  emit('question:clicked', 'to', e)
               }
            "
            :rows="1"
            :pageLinkSize="5"
            :first="cursor"
            :template="'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink'"
         >
         </Paginator>
      </div>
   </div>
</template>

<script setup>
import Paginator from 'primevue/paginator'
import { ref, watch, toRefs, computed } from 'vue'

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
   'bg-green-500 text-white': item.isAnsweredTrue,
   'bg-red-500 text-white': item.questionStatus === 'answered' && !item.isAnsweredTrue,
   'bg-slate-100 text-slate-900': item.questionStatus === 'unanswered',
   'opacity-80': cursor.value !== index,
   'hover:opacity-100': cursor.value !== index,
   'shadow-md': true,
   ...(gameStatus.value === 'over'
      ? { 'cursor-default': true }
      : { 'cursor-pointer': true }),
})

const items = computed(() =>
   data.value
      .map((item, index) => ({
         ...item,
         index,
         label: item.question,
         command: () => {
            emit('question:clicked', 'to', index)
         },
      }))
      .reverse()
)
</script>

<style>
.question-indicator {
   transition: all 0.3s ease;
}

.question-indicator:hover {
   transform: translateY(-2px);
}

.question-indicator.opacity-80 {
   filter: saturate(0.8);
}

.question-indicator.opacity-80:hover {
   filter: saturate(1);
}
</style>
