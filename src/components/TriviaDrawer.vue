<template>
   <Drawer v-model:visible="visible">
      <template #container="{ closeCallback }">
         <div class="flex flex-col h-full">
            <div class="flex items-center justify-between px-6 pt-4 shrink-0">
               <span class="inline-flex items-center">
                  <!-- INSERT LOGO -->

                  <TriviaTitle />
               </span>
            </div>
            <div class="overflow-y-auto">
               <ul class="list-none p-4 m-0">
                  <!-- Iterate through main menu items -->
                  <li v-for="(item, index) in menuItems" :key="index">
                     <div
                        class="p-4 flex items-center justify-between text-surface-500 dark:text-surface-400 cursor-pointer p-ripple"
                     >
                        <span class="font-medium">{{ item.title }}</span>
                     </div>
                     <ul class="list-none p-0 m-0 overflow-hidden">
                        <!-- Iterate through sub-items -->
                        <li
                           v-for="(subItem, subIndex) in item.subItems"
                           :key="subIndex"
                        >
                           <RouterLink
                              @click="
                                 () => {
                                    closeCallback()
                                    subItem?.fn?.()
                                 }
                              "
                              :to="subItem.route"
                              class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
                           >
                              <i :class="subItem.icon + ' mr-2'"></i>
                              <span class="font-medium">{{
                                 subItem.name
                              }}</span>
                           </RouterLink>
                        </li>
                     </ul>
                  </li>
               </ul>
            </div>
            <div class="mt-auto" v-if="isLoggedIn">
               <hr
                  class="mb-4 mx-4 border-t border-0 border-surface-200 dark:border-surface-700"
               />
               <a
                  class="m-4 flex items-center cursor-pointer p-4 gap-2 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
               >
                  <Avatar
                     v-if="profilePhotoURL"
                     :image="profilePhotoURL"
                     shape="circle"
                  />
                  <Avatar
                     v-else
                     icon="pi pi-user"
                     class="mr-2"
                     size="large"
                     shape="circle"
                  />

                  <span class="font-bold">{{ email }}</span>
               </a>
            </div>
         </div>
      </template>
   </Drawer>
</template>

<script setup>
import { inject, watch, ref, computed } from 'vue'
import TriviaTitle from './TriviaTitle.vue'
import { getAuth } from 'firebase/auth'

const isLoggedIn = inject('isLoggedIn')
const logout = inject('logout')

// Define visibility for the drawer
const visible = defineModel('visible')
const email = ref()
const profilePhotoURL = ref()
watch(
   isLoggedIn,
   (isLoggedIn) => {
      if (isLoggedIn) {
         console.log('getAuth().currentUser', getAuth().currentUser)
         email.value = getAuth().currentUser.email
         profilePhotoURL.value = getAuth().currentUser.photoURL
      } else {
         email.value = null
      }
   },
   { immediate: true }
)

// Define the menu items with their sub-items
const menuItems = computed(() => [
   {
      title: 'APP',
      subItems: [{ name: 'Home', route: '/', icon: 'pi pi-home' }],
   },
   {
      title: 'QUIZZES',
      subItems: [
         { name: 'Trivia Quiz', route: '/trivia', icon: 'pi pi-trophy' },
         { name: 'Guess The Movie', route: '/movie', icon: 'pi pi-video' },
         { name: 'Feed', route: '/feed', icon: 'pi pi-table' },
         isLoggedIn.value
            ? {
                 name: 'Logout',
                 fn: logout,
                 icon: 'pi pi-sign-out',
                 route: '#',
              }
            : {
                 name: 'Register',
                 route: '/register',
                 icon: 'pi pi-sign-in',
              },
      ],
   },
])

// watch(
//    isLoggedIn,
//    () => {
//       const index = menuItems.findIndex((item) => item.title === 'QUIZZES')
//       if (isLoggedIn.value) {
//          menuItems[index].subItems.push({
//             name: 'Logout',
//             fn: logout,
//             icon: 'pi pi-sign-out',
//             route: '#',
//          })
//       } else {
//          menuItems[index].subItems.push({
//             name: 'Register',
//             route: '/register',
//             icon: 'pi pi-sign-in',
//          })
//       }
//    },
//    {
//       immediate: true,
//    }
// )
</script>
