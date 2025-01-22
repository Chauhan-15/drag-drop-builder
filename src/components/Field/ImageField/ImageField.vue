<template>
	<div>
		<!-- Image Preview -->
		<div :class="['group flex flex-col', item.verticalAlignment]">
			<div class="w-28 h-28 overflow-hidden cursor-pointer" @click="openModal">
				<img v-if="modalValue" :src="modalValue" alt="Selected Preview" class="w-full h-full object-cover" />
				<img v-else :src="placeholderImage" alt="Placeholder" class="w-full h-full object-cover" />
			</div>
		</div>
		<!-- Modal Component -->
		<Modal :isOpen="isModalOpen" @update:isOpen="isModalOpen = $event">
			<h3 class="sm:text-xl mb-4 text-sidebar">Select an Image</h3>
			<div class="grid grid-cols-2 gap-2 sm:grid-cols-5 sm:gap-8 mb-4">
				<!-- Predefined Images Section -->
				<div v-for="(image, index) in predefinedImages" :key="index" @click="selectPredefinedImage(index)" 
					class="relative cursor-pointer flex flex-col items-center w-20 h-20 overflow-hidden rounded-md border-2 p-1"
					:class="{ 'border-primary-button shadow-lg': selectedIndex === index, 'border-gray-300': selectedIndex !== index }">
					<img :src="image" alt="Predefined Image" class="w-full h-full object-cover" />
				</div>
				<!-- Upload Option -->
				<label :for="id" class="cursor-pointer flex flex-col justify-center items-center border border-dashed rounded-md border-gray-400 p-1 w-20 h-20">
					<img v-if="uploadImage" :src="uploadImage" alt="Predefined Image" class="w-full h-full object-cover" />
					<img v-else class="w-6 h-6" src="/icons/form/plus.png" alt="plus" />
					<input :id="id" type="file" accept="image/*" @change="onFileChange" class="hidden" />
				</label>
			</div>
		</Modal>
	</div>
</template>

<script>
	import Modal from "../../Modal/Modal.vue";

	export default {
		name: "ImageField",
		components: {
			Modal,
		},
		props: {
			id: {
				type: String,
				required: true,
			},
			modalValue: {
				type: String,
				default: "/icons/placeholder-image.png",
			},
			item: {
				type: Object,
				required: true,
			},
		},
		data() {
			return {
				isModalOpen: false,
				placeholderImage: "/icons/placeholder-image.png",
				uploadImage: null,
				predefinedImages: [
					"/images/pic1.png",
					"/images/pic2.png",
					"/images/pic3.png",
					"/images/pic4.png",
				],
				selectedIndex: null,
				temporarySelection: null,
			};
		},
		watch: {
			modalValue(newVal) {
				const index = this.predefinedImages.indexOf(newVal);
				this.selectedIndex = index !== -1 ? index : null;
			},
		},
		methods: {
			onFileChange(event) {
			const file = event.target.files[0];
				if (file) {
					const reader = new FileReader();
					reader.onload = (e) => {
						this.temporarySelection = e.target.result;
						this.uploadImage = e.target.result;
						this.selectedIndex = null;
						this.$emit("update:modalValue", { id: this.id, value: e.target.result });
					};
					reader.readAsDataURL(file);
				}
			},
			openModal() {
				this.isModalOpen = true;
			},
			selectPredefinedImage(index) {
				this.selectedIndex = index;
				this.temporarySelection = this.predefinedImages[index];
				this.$emit("update:modalValue", { id: this.id, value: this.predefinedImages[index] });
			},
		},
		mounted() {
			this.selectedIndex = this.predefinedImages.indexOf(this.modalValue);
		},
	};
</script>