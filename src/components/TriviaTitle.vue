<template>
   <div class="flex flex-row">
      <div
         v-bind="$attrs"
         :class="`${props.fontSize} font-bold font-mono ${item.color} `"
         v-for="(item, index) in header"
         :key="index"
      >
         {{ item.letter }}
      </div>
   </div>
</template>

<script setup>
const header = ref([
   { letter: 'T', color: 'text-red-500' }, // Red
   { letter: 'R', color: 'text-orange-500' }, // Orange
   { letter: 'I', color: 'text-yellow-500' }, // Yellow
   { letter: 'V', color: 'text-green-500' }, // Green
   { letter: 'I', color: 'text-blue-500' }, // Blue
   { letter: 'A', color: 'text-indigo-500' }, // Indigo
])

const props = defineProps({
   fontSize: {
      type: String,
      default: 'text-2xl',
   },
})
</script>

<style lang="scss" scoped></style>
