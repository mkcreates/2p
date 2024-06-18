<template>
  <!--container that displays when files are dragged over-->
  <div id="dragFilesContainer" class="overlay hidden">
    <div class="w-full h-full border-4 border-dashed border-[--main-color] rounded-3xl animate-pulse"></div>
  </div>
</template>

<style>
.overlay {
  @apply absolute top-0 right-0 z-20 w-full h-full bg-black/40 p-10
}
</style>