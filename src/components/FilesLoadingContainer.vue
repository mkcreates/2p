<template>
  <div class="overlay flex flex-col items-center justify-center text-center">
    
      <div class="loader scale-150"></div>
      <h1 class="text-xl text-[--main-color] mt-10">Processing selected files.</h1>
    
  </div>
</template>

<style>
/* Line CSS loader by:
  Temani Afif (https://github.com/Afif13)
  https://css-loaders.com/line/
*/
.loader {
  width:50px;
  aspect-ratio: 1;
  display: grid;
}
.loader:before,
.loader:after {
  content: "";
  grid-area: 1/1;
  --c:#0000 calc(100%/3),var(--main-color) 0 calc(2*100%/3),#0000 0;
  --c1:linear-gradient(90deg,var(--c));
  --c2:linear-gradient( 0deg,var(--c));
  background: var(--c1),var(--c2),var(--c1),var(--c2);
  background-size: 300% 4px,4px 300%;
  background-repeat: no-repeat;
  animation: l11 1s infinite linear;
}
.loader:after {
  margin: 10px;
  transform: scaleX(-1);
  animation-delay: -.25s;
}
@keyframes l11 {
  0%   {background-position: 50%  0,100% 100%,0    100%,0 0}
  25%  {background-position: 0    0,100% 50% ,0    100%,0 0}
  50%  {background-position: 0    0,100% 0   ,50%  100%,0 0}
  75%  {background-position: 0    0,100% 0   ,100% 100%,0 50%}
 75.01%{background-position: 100% 0,100% 0   ,100% 100%,0 50%}
  100% {background-position: 50%  0,100% 0   ,100% 100%,0 100%}
}
</style>