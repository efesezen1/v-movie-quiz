<template>
   <Drawer v-model:visible="visible">
      <template #container="{ closeCallback }">
         <div class="flex flex-col h-full">
            <div class="flex items-center justify-between px-6 pt-4 shrink-0">
               <span class="inline-flex items-center">
                  <!-- INSERT LOGO -->

                  <div
                     :class="`text-2xl font-bold font-mono ${item.color}
            `"
                     v-for="(item, index) in header"
                     :key="index"
                  >
                     {{ item.letter }}
                  </div>
               </span>
               <!-- <span>
                  <Button
                     type="button"
                     @click="closeCallback"
                     icon="pi pi-times"
                     rounded
                     outlined
                     severity="warn"
                  ></Button>
               </span> -->
            </div>
            <div class="overflow-y-auto">
               <ul class="list-none p-4 m-0">
                  <li>
                     <div
                        class="p-4 flex items-center justify-between text-surface-500 dark:text-surface-400 cursor-pointer p-ripple"
                     >
                        <span class="font-medium">APP</span>
                     </div>
                     <ul class="list-none p-0 m-0 overflow-hidden">
                        <li>
                           <a
                              class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
                           >
                              <i class="pi pi-home mr-2"></i>
                              <span class="font-medium">Home</span>
                           </a>
                        </li>
                     </ul>
                  </li>
               </ul>
               <ul class="list-none p-4 m-0">
                  <li>
                     <div
                        class="p-4 flex items-center justify-between text-surface-500 dark:text-surface-400 cursor-pointer p-ripple"
                     >
                        <span class="font-medium">QUIZZES</span>
                     </div>
                     <ul class="list-none p-0 m-0 overflow-hidden">
                        <li>
                           <RouterLink
                              to="/trivia-quiz"
                              class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
                           >
                              <i class="pi pi-folder mr-2"></i>
                              <span class="font-medium">Trivia Quiz</span>
                           </RouterLink>
                        </li>
                        <li>
                           <RouterLink
                              to="/movie-quiz"
                              class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
                           >
                              <i class="pi pi-chart-bar mr-2"></i>
                              <span class="font-medium">Movie Quiz</span>
                           </RouterLink>
                        </li>
                     </ul>
                  </li>
               </ul>
            </div>
            <div class="mt-auto">
               <hr
                  class="mb-4 mx-4 border-t border-0 border-surface-200 dark:border-surface-700"
               />
               <a
                  v-ripple
                  class="m-4 flex items-center cursor-pointer p-4 gap-2 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
               >
                  <Avatar
                     image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
                     shape="circle"
                  />
                  <span class="font-bold">Amy Elsner</span>
               </a>
            </div>
         </div>
      </template>
   </Drawer>
</template>

<script setup>
const visible = defineModel('visible')
const props = defineProps(['header'])
</script>

<style lang="scss" scoped></style>
