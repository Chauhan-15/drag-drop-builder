<template>
	<div>
		<!-- Image Preview -->
		<div :class="['cursor-pointer group flex flex-col', item.verticalAlignment]" @click="openModal">
			<div class="w-28 h-28 overflow-hidden">
				<img v-if="modalValue" :src="modalValue" alt="Selected Preview" class="w-full h-full object-cover" />
				<img v-else :src="placeholderImage" alt="Placeholder" class="w-full h-full object-cover" />
			</div>
		</div>
		<!-- Modal Component -->
		<Modal :isOpen="isModalOpen" @update:isOpen="isModalOpen = $event">
			<h3 class="text-xl mb-4">Select an Image</h3>
			<div class="grid grid-cols-5 gap-8 mb-4">
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
	import Modal from '../../Modal/Modal.vue';

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
				default: '/icons/placeholder-image.png',
			},
			item: {
				type: Object,
				required: true,
			}
		},
		data() {
			return {
				isModalOpen: false,
				placeholderImage: '/icons/placeholder-image.png',
				uploadImage: null,
				predefinedImages: [
					'/images/pic1.png',
					'/images/pic2.png',
					'/images/pic3.png',
					'/images/pic4.png',
				],
				selectedIndex: null,
				temporarySelection: null,
			};
		},
		watch: {
			// Watch for changes to modalValue prop and update the selected index
			modalValue(newVal) {
				const index = this.predefinedImages.indexOf(newVal);
				this.selectedIndex = index !== -1 ? index : null;
			}
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
						// Emit the new modalValue value to parent
						this.$emit("update:modalValue", {id: this.id, value: e.target.result} );
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
				// Emit the updated modalValue value to parent
				this.$emit("update:modalValue", {id: this.id, value: this.predefinedImages[index]} );
			},
			finalizeSelection() {
				if (this.temporarySelection) {
					// Emit the finalized modalValue value to parent
					this.$emit("update:modalValue", {id: this.id, value: this.temporarySelection} );
				}
				this.isModalOpen = false;
			},
		},
		mounted() {
			// Initialize selectedIndex based on the initial modalValue prop
			this.selectedIndex = this.predefinedImages.indexOf(this.modalValue);
		},
	};
</script>