<template>
  <div class="absolute top-0 left-0 w-full h-full overflow-hidden">
      <div class="bubbles bottom-[5%] -translate-x-1/2 bg-gradient-to-br w-[60%] md:w-[35%]"></div>
      <div class="bubbles top-[5%] right-0 translate-x-1/3 bg-gradient-to-b w-[50%] md:w-1/3 "></div>
  </div>
</template>

<style>
.bubbles {
  @apply absolute from-white/[.03] to-transparent aspect-square rounded-full sm:w-[40%]
}
</style>