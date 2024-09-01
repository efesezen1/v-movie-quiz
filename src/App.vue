<script setup>
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
import { ref } from 'vue'
const visible = ref(false)
const header = ref([
   { letter: 'T', color: 'text-red-500' }, // Red
   { letter: 'R', color: 'text-orange-500' }, // Orange
   { letter: 'I', color: 'text-yellow-500' }, // Yellow
   { letter: 'V', color: 'text-green-500' }, // Green
   { letter: 'I', color: 'text-blue-500' }, // Blue
   { letter: 'A', color: 'text-indigo-500' }, // Indigo
])
</script>

<template>
   <Menubar>
      <template #start>
         <div
            :class="`text-2xl font-bold font-mono ${item.color}
            `"
            v-for="(item, index) in header"
            :key="index"
         >
            {{ item.letter }}
         </div>
      </template>
      <template #end>
         <Button
            icon="pi pi-bars"
            class="p-button-rounded mr-2"
            label=""
            @click="visible = !visible"
            severity="warn"
         />
      </template>
   </Menubar>
   <TriviaDrawer v-model:visible="visible" :header="header" />
   <RouterView />
   <VueQueryDevtools />
</template>
