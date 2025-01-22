<template>
    <div v-if="isOpen" class="sm:ml-56 fixed bottom-0 left-0 w-screen bg-modal p-4 transition-all duration-300" :class="{'h-16': !isExpanded, 'h-max': isExpanded}">
        <!-- Arrow Icon to drag the modal down -->
        <div @click="toggleModal" class="flex justify-center cursor-pointer" role="button">
            <img v-if="isExpanded" src="/icons/down-arrow.png" alt="drag down" class="w-6 h-6">
            <img v-else src="/icons/up-arrow.png" alt="drag up" class="w-6 h-6">
        </div>
        <div v-if="isExpanded" class="max-h-44 overflow-scroll">
            <!-- for text -->
            <div v-if="item.component === 'TextField'" class="sm:grid sm:grid-cols-2 sm:gap-4 py-4 space-y-2 sm:space-y-0">
                <div class="space-y-1 sm:space-y-2">
                    <h1 class="capitalize text-title font-bold">text alignment</h1>
                    <div class="grid grid-cols-2 lg:grid-cols-3 gap-4">
                        <button :class="[item.textAlignment === 'text-left' ? 'bg-primary-button text-white' : 'bg-select-button text-sidebar', 'py-2 px-6 rounded-md capitalize']" @click="updateAlignment('text-left')">left</button>
                        <button :class="[item.textAlignment === 'text-center' ? 'bg-primary-button text-white' : 'bg-select-button text-sidebar', 'py-2 px-6 rounded-md capitalize']" @click="updateAlignment('text-center')">center</button>
                        <button :class="[item.textAlignment === 'text-right' ? 'bg-primary-button text-white' : 'bg-select-button text-sidebar', 'py-2 px-6 rounded-md capitalize']" @click="updateAlignment('text-right')">right</button>
                    </div>
                </div>
                <div class="space-y-1 sm:space-y-2">
                    <h1 class="capitalize text-title font-bold">text size</h1>
                    <div class="grid grid-cols-2 lg:grid-cols-3 gap-4">
                        <button :class="[item.textSize === 'text-sm' ? 'bg-primary-button text-white' : 'bg-select-button text-sidebar', 'py-2 px-6 rounded-md capitalize']" @click="updateSize('text-sm')">small</button>
                        <button :class="[item.textSize === 'text-base' ? 'bg-primary-button text-white' : 'bg-select-button text-sidebar', 'py-2 px-6 rounded-md capitalize']" @click="updateSize('text-base')">medium</button>
                        <button :class="[item.textSize === 'text-lg' ? 'bg-primary-button text-white' : 'bg-select-button text-sidebar', 'py-2 px-6 rounded-md capitalize']" @click="updateSize('text-lg')">large</button> 
                        <button :class="[item.textSize === 'text-xl' ? 'bg-primary-button text-white' : 'bg-select-button text-sidebar', 'py-2 px-6 rounded-md capitalize']" @click="updateSize('text-xl')">extra large</button> 
                    </div>
                </div>
                <div class="space-y-1 sm:space-y-2">
                    <h1 class="capitalize text-title font-bold">font weight</h1>
                    <div class="grid grid-cols-2 lg:grid-cols-3 gap-4">
                        <button :class="[item.fontWeight === 'font-normal' ? 'bg-primary-button text-white' : 'bg-select-button text-sidebar', 'py-2 px-6 rounded-md capitalize']" @click="updateFont('font-normal')">normal</button>
                        <button :class="[item.fontWeight === 'font-medium' ? 'bg-primary-button text-white' : 'bg-select-button text-sidebar', 'py-2 px-6 rounded-md capitalize']" @click="updateFont('font-medium')">medium</button>
                        <button :class="[item.fontWeight === 'font-semibold' ? 'bg-primary-button text-white' : 'bg-select-button text-sidebar', 'py-2 px-6 rounded-md capitalize']" @click="updateFont('font-semibold')">semibold</button>
                        <button :class="[item.fontWeight === 'font-bold' ? 'bg-primary-button text-white' : 'bg-select-button text-sidebar', 'py-2 px-6 rounded-md capitalize']" @click="updateFont('font-bold')">bold</button>
                    </div>
                </div>
                <div class="space-y-1 sm:space-y-2">
                    <h1 class="capitalize text-title font-bold">font style</h1>
                    <div class="grid grid-cols-2 lg:grid-cols-3 gap-4">
                        <button :class="[item.fontStyle === 'underline' ? 'bg-primary-button text-white' : 'bg-select-button text-sidebar', 'py-2 px-6 rounded-md capitalize']" @click="updateStyle('underline')">underline</button>
                        <button :class="[item.fontStyle === 'italic' ? 'bg-primary-button text-white' : 'bg-select-button text-sidebar', 'py-2 px-6 rounded-md capitalize']" @click="updateStyle('italic')">italic</button>
                        <button :class="[item.fontStyle === '' ? 'bg-primary-button text-white' : 'bg-select-button text-sidebar', 'py-2 px-6 rounded-md capitalize']" @click="updateStyle('')">Normal</button>
                    </div>
                </div>
            </div>
            <!-- for image -->
            <div v-if="item.component === 'ImageField'" class="sm:grid sm:grid-cols-2 sm:gap-4 py-4 space-y-2 sm:space-y-0">
                <div class="space-y-1 sm:space-y-2">
                    <h1 class="capitalize text-title font-bold">alignment</h1>
                    <div class="grid grid-cols-2 lg:grid-cols-3 gap-4">
                        <button :class="[item.verticalAlignment === 'items-start' ? 'bg-primary-button text-white' : 'bg-select-button text-sidebar', 'py-2 px-6 rounded-md capitalize']" @click="updateImageAlignment('items-start')">left</button>
                        <button :class="[item.verticalAlignment === 'items-center' ? 'bg-primary-button text-white' : 'bg-select-button text-sidebar', 'py-2 px-6 rounded-md capitalize']" @click="updateImageAlignment('items-center')">center</button>
                        <button :class="[item.verticalAlignment === 'items-end' ? 'bg-primary-button text-white' : 'bg-select-button text-sidebar', 'py-2 px-6 rounded-md capitalize']" @click="updateImageAlignment('items-end')">right</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
    export default {
        name: "BottomModal",
        props: {
            isOpen: {
                type: Boolean,
                required: true,
            },
            item: {
                type: Object,
                required: true,
            },
        },
        data() {
            return {
                isExpanded: true,
            };
        },
        methods: {
            toggleModal() {
                this.isExpanded = !this.isExpanded;
            },
            updateAlignment(alignment) {
                this.item.textAlignment = alignment;
                this.$emit("update:item", this.item);
            },
            updateSize(size) {
                this.item.textSize = size;
                this.$emit("update:item", this.item);
            },
            updateFont(weight) {
                this.item.fontWeight = weight;
                this.$emit("update:item", this.item);
            },
            updateStyle(style) {
                this.item.fontStyle = style;
                this.$emit("update:item", this.item);
            },
            updateImageAlignment(alignment) {
                this.item.verticalAlignment = alignment;
                this.$emit("update:item", this.item);
            },
        },
    };
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