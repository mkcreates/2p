<template>
    <div class="keyb text-justify mt-5">
        <h1 class="text-base text-[text-color] text-sm font-semibold mb-2">Keyboard Commands:</h1>
        <div>
            <button>Ctrl O</button> To select audio files.
        </div>
        <div>
            <button>Space</button> To pause/play playback.
        </div>
        <div>
            <button>Right</button><span>or</span><button>Down</button> To move to next track.
        </div>
        <div>
            <button>Left</button><span>or</span><button>Up</button> To move to previous track.
        </div>
        <div>
            <button>Ctrl</button> To toggle 'repeat' or 'play-by-order.'
        </div>
    </div>
</template>

<style scoped>
.keyb div {
    @apply flex items-center mb-3
}
.keyb button {
    @apply bg-black/20 text-xs text-[text-color] rounded-full border border-white/10 px-2 py-0.5 mr-2 cursor-default
}
.keyb span {
    @apply mr-2
}
</style>