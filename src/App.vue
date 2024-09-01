<script setup>
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
import { ref } from 'vue'
import TriviaTitle from './components/TriviaTitle.vue'
const visible = ref(false)
</script>

<template>
   <Menubar>
      <template #start>
         <TriviaTitle />
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
   <TriviaDrawer v-model:visible="visible" />
   <RouterView />
   <VueQueryDevtools />
</template>
