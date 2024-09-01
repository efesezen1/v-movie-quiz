<template>
   <div>
      <Toast />
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
      <RouterView v-slot="{ Component }">
         <Transition name="fade">
            <component :is="Component" />
         </Transition>
      </RouterView>
   </div>
</template>

<script setup>
const visible = ref(false)
</script>

<style>
.fade-enter-active,
.fade-leave-active {
   transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
   opacity: 0;
}
</style>
