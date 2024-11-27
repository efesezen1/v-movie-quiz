<script setup>
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { ref, onMounted, provide } from 'vue'
import router from './router'
const isLoggedIn = ref(false)
let auth
onMounted(() => {
   auth = getAuth()
   console.log('auth', auth)
   onAuthStateChanged(auth, (user) => {
      if (user) {
         // User is signed in, see docs for a list of available properties
         // https://firebase.google.com/docs/reference/js/firebase.User
         // let uid = user.uid;
         // ...
         isLoggedIn.value = true
      } else {
         // User is signed out
         // ...
         isLoggedIn.value = false
      }
   })
})

const logout = async () => {
   await signOut(auth)
   router.push('/')
}

provide('isLoggedIn', isLoggedIn)
provide('logout', logout)
</script>

<template>
   <RouterView />
   <!-- <VueQueryDevtools /> -->
</template>
