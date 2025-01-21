<template>
    <div v-if="isOpen" class="sm:ml-56 fixed bottom-0 left-0 w-screen bg-header p-4 transition-all duration-300" :class="{'h-24': !isExpanded, 'h-72': isExpanded}">
        <!-- Arrow Icon to drag the modal down -->
        <div @click="toggleModal" class="flex justify-center mb-4 cursor-pointer">
            <img v-if="isExpanded" src="/icons/down-arrow.png" alt="drag down" class="w-6 h-6">
            <img v-else src="/icons/up-arrow.png" alt="drag up" class="w-6 h-6">
        </div>
        <div v-if="isExpanded">
            <!-- for text -->
            <div v-if="item.component === 'TextField'" class="grid grid-cols-2 gap-4">
                <div class="space-y-2">
                    <h1 class="capitalize text-title font-bold">text alignment</h1>
                    <div class="space-x-6">
                        <button
                            :class="['border-gray-200', item.textAlignment === 'text-left' ? 'bg-gray-300' : '', 'py-2 px-6 border rounded-md']"
                            @click="updateAlignment('text-left')"
                        >left</button>
                        <button
                            :class="['border-gray-200', item.textAlignment === 'text-center' ? 'bg-gray-300' : '', 'py-2 px-6 border rounded-md']"
                            @click="updateAlignment('text-center')"
                        >center</button>
                        <button
                            :class="['border-gray-200', item.textAlignment === 'text-right' ? 'bg-gray-300' : '', 'py-2 px-6 border rounded-md']"
                            @click="updateAlignment('text-right')"
                        >right</button>
                    </div>
                </div>
                <div class="space-y-2">
                    <h1 class="capitalize text-title font-bold">text size</h1>
                    <div class="space-x-6">
                        <button
                            :class="['border-gray-200', item.textSize === 'text-sm' ? 'bg-gray-300' : '', 'py-2 px-6 border rounded-md']"
                            @click="updateSize('text-sm')"
                        >small</button>
                        <button
                            :class="['border-gray-200', item.textSize === 'text-base' ? 'bg-gray-300' : '', 'py-2 px-6 border rounded-md']"
                            @click="updateSize('text-base')"
                        >medium</button>
                        <button
                            :class="['border-gray-200', item.textSize === 'text-lg' ? 'bg-gray-300' : '', 'py-2 px-6 border rounded-md']"
                            @click="updateSize('text-lg')"
                        >large</button> 
                    </div>
                </div>
                <div class="space-y-2">
                    <h1 class="capitalize text-title font-bold">font weight</h1>
                    <div class="space-x-6">
                        <button
                            :class="['border-gray-200', item.fontWeight === 'font-normal' ? 'bg-gray-300' : '', 'py-2 px-6 border rounded-md']"
                            @click="updateFont('font-normal')"
                        >normal</button>
                        <button
                            :class="['border-gray-200', item.fontWeight === 'font-medium' ? 'bg-gray-300' : '', 'py-2 px-6 border rounded-md']"
                            @click="updateFont('font-medium')"
                        >medium</button>
                        <button
                            :class="['border-gray-200', item.fontWeight === 'font-semibold' ? 'bg-gray-300' : '', 'py-2 px-6 border rounded-md']"
                            @click="updateFont('font-semibold')"
                        >semibold</button>
                        <button
                            :class="['border-gray-200', item.fontWeight === 'font-bold' ? 'bg-gray-300' : '', 'py-2 px-6 border rounded-md']"
                            @click="updateFont('font-bold')"
                        >bold</button>
                    </div>
                </div>
                <div class="space-y-2">
                    <h1 class="capitalize text-title font-bold">font style</h1>
                    <div class="space-x-6">
                        <button
                            :class="['border-gray-200', item.fontStyle === 'underline' ? 'bg-gray-300' : '', 'py-2 px-6 border rounded-md']"
                            @click="updateStyle('underline')"
                        >underline</button>
                        <button
                            :class="['border-gray-200', item.fontStyle === 'italic' ? 'bg-gray-300' : '', 'py-2 px-6 border rounded-md']"
                            @click="updateStyle('italic')"
                        >italic</button>
                    </div>
                </div>
            </div>
            <!-- for image -->
            <div v-if="item.component === 'ImageField'" class="grid grid-cols-2 gap-4">
                <div class="space-y-2">
                    <h1 class="capitalize text-title font-bold">alignment</h1>
                    <div class="space-x-6">
                        <button
                            :class="['border-gray-200', item.verticalAlignment === 'items-start' ? 'bg-gray-300' : '', 'py-2 px-6 border rounded-md']"
                            @click="updateImageAlignment('items-start')"
                        >left</button>
                        <button
                            :class="['border-gray-200', item.verticalAlignment === 'items-center' ? 'bg-gray-300' : '', 'py-2 px-6 border rounded-md']"
                            @click="updateImageAlignment('items-center')"
                        >center</button>
                        <button
                            :class="['border-gray-200', item.verticalAlignment === 'items-end' ? 'bg-gray-300' : '', 'py-2 px-6 border rounded-md']"
                            @click="updateImageAlignment('items-end')"
                        >right</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup>
    import { ref } from 'vue';
    import { defineProps } from 'vue';

    // Define the props that are passed to the component
    const { item } = defineProps({
        item: {
            type: Object,
            required: true,
        },
        index: {
            type: Number,
            required: true,
        },
        isOpen: {
            type: Boolean,
            required: true
        }
    });
    const isOpen = ref(true);
    const isExpanded = ref(true);
    const toggleModal = () => {
        isExpanded.value = !isExpanded.value;
    };
    const openModal = () => {
        isOpen.value = true;
    };
    const closeModal = () => {
        isOpen.value = false;
    };
    defineExpose({
        openModal,
        closeModal
    });
    const emit = defineEmits();
    const updateAlignment = (alignment) => {
        if (!item) return;
        emit("update:modalValue", {textAlignment: alignment});
    };
    const updateSize = (size) => {
        if (!item) return;
        emit("update:modalValue", {textSize: size});
    };
    const updateFont = (weight) => {
        if (!item) return;
        emit("update:modalValue", {fontWeight: weight});
    };
    const updateStyle = (style) => {
        if (!item) return;
        emit("update:modalValue", {fontStyle: style});
    };
    const updateImageAlignment = (alignment) => {
        if (!item) return;
        emit("update:modalValue", {verticalAlignment: alignment});
    }
</script>

<style scoped>
    .transition-all {
        width: 100vw;
    }
    @media screen and (-webkit-min-device-pixel-ratio: 0) {
        .transition-all {
            width: -webkit-fill-available;
        }
    }
    .transition-transform {
        transition: transform 0.3s ease-in-out;
    }
</style>