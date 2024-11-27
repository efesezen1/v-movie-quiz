<template>
   <div class="h-[94vh] flex gap-10 flex-col pt-[10%] items-center">
      <div
         class="w-8/12 flex flex-col gap-10 bg-slate-300 dark:bg-slate-900 p-10 rounded-lg"
      >
         <Button
            label="Sign Up With Google"
            @click="signInWithGoogle"
            severity="secondary"
         >
            <template #icon> <Image :src="googleIcon" width="20" /></template>
         </Button>
         <div>
            <p class="text-center p-0 m-0 flex items-center justify-center">
               or
            </p>
         </div>
         <FloatLabel>
            <InputText type="email" class="w-full" v-model="email" id="email" />
            <label for="email">Email</label>
         </FloatLabel>

         <FloatLabel>
            <InputText
               type="password"
               class="w-full"
               v-model="password"
               id="password"
            />
            <label for="password">Password</label>
         </FloatLabel>
         <Button
            label="Register"
            @click="register"
            severity="secondary"
            :loading="registering"
         />
         <small class=" "
            >Already have an account?
            <RouterLink
               to="/sign-in"
               class="text-blue-500 hover:underline cursor-pointer"
               >Sign In</RouterLink
            ></small
         >

         <div v-if="errMsg">{{ errMsg }}</div>
      </div>
   </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import googleIcon from '@/assets/google.svg'
const errMsg = ref()
const email = ref()
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'
const router = useRouter()
const password = ref()
const registering = ref(false)
const register = async () => {
   try {
      registering.value = true
      const auth = getAuth()
      await createUserWithEmailAndPassword(auth, email.value, password.value)
      registering.value = false
      errMsg.value = null
      console.log('User Registered', auth.currentUser)
      router.push('/feed')
   } catch (e) {
      registering.value = false
      console.log('An error occurred on registration', e)
      errMsg.value = ('An error occurred on registration', e)
   }
}

const signInWithGoogle = () => {}
</script>

<style lang="scss" scoped></style>
