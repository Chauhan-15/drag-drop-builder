<template>
    <div class="bg-header text-title p-4 z-50 sm:p-6 flex justify-between items-center fixed w-screen shadow-md">
        <div class="flex items-center space-x-2">
            <!-- Toggle Button Visible on Small Screens -->
            <img 
                class="w-6 h-6 cursor-pointer block sm:hidden" 
                src="/icons/menu.png" 
                @click="$emit('toggle-sidebar')"
            />
            <div class="italic font-bold sm:text-xl">
                Drag Drop Builder
            </div>
        </div>
        <div>
            <button @click="$emit('save-dropped-items')" class="bg-primary-button sm:text-xl rounded-md px-6 text-center py-2 first-letter:capitalize tracking-wider font-semibold">
                save
            </button>
        </div>
   </div>
</template>

<script>
    export default {
        name: "Header",
    };
</script>
