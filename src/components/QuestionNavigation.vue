<template>
   <!-- <div class="w-full text-xl px-4 py-2 flex flex-row">
      <div v-for="(item, index) in data" class="mx-auto">
         <div
            class="bg-white text-slate-900 rounded-full w-[30px] h-[30px] flex justify-center items-center transition-all duration-300 text-sm overflow-y-scroll"
            :class="questionsStyling(item, index)"
            @click="emit('question:clicked', 'to', index)"
            :disabled="gameStatus"
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
   </div> -->

   <!-- @hide="qNavVisible = false" -->
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
            @click="toggleCallback"
         >
            <!-- @click="console.log(item)" -->
            <!-- @click="emit('question:clicked', 'to', index)" -->
            <small>{{
               item.questionStatus === 'unanswered'
                  ? item.index + 1
                  : item.questionStatus === 'answered' && !item.isAnsweredTrue
                  ? '✘'
                  : item.isAnsweredTrue && '✔'
            }}</small>
         </div>
      </template>
   </SpeedDial>
</template>

<script setup>
const currentItemIndex = ref(0)
const props = defineProps({
   data: Array,
   cursor: Number,
   gameStatus: String,
})

const { data, cursor, gameStatus } = toRefs(props)
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
         console.log('clicked')
         currentItemIndex.value = index
         emit('question:clicked', 'to', index)
      },
   })),
])
</script>

<style lang="scss" scoped></style>
