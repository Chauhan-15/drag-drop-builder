<template>
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white rounded-lg p-6 shadow-lg relative">
            <!-- Close Button -->
            <button
                class="absolute top-3 right-4 text-gray-500 hover:text-gray-800"
                @click="$emit('update:isOpen', false)"
                aria-label="Close modal"
            >✕</button>
            <!-- Modal Content -->
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Modal",
        props: {
            isOpen: {
                type: Boolean,
                required: true,
            },
        },
        methods: {
            closeModal() {
                this.$emit("update:isOpen", false);
            },
        },
    };
</script>
