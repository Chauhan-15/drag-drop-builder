<template>
    <div class="flex relative w-max py-2">
        <!-- Label with Upload Area -->
        <label :for="id" class="cursor-pointer group flex flex-col items-center">
            <!-- Image Preview -->
            <div class="w-28 h-28 flex items-center justify-center overflow-hidden" :class="{'border bg-gray-200 rounded': !imagePreview}">
                <img v-if="imagePreview" :src="imagePreview" alt="Selected Preview" class="w-full h-full object-cover" />
            </div>
            <!-- Hidden File Input -->
            <input
                :id="id"
                type="file"
                class="hidden"
                accept="image/*"
                @change="onFileChange"
            />
        </label>
    </div>
  </template>
  
  <script>
  export default {
    name: "ImageField",
    props: {
        id: {
            type: String,
            required: true,
        },
        label: {
            type: String,
            default: "Upload Image",
        },
    },
    data() {
      return {
            imagePreview: '/icons/placeholder-image.png', // Default: No image preview
      };
    },
    methods: {
        onFileChange(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.imagePreview = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        },
    },
  };
  </script>
  