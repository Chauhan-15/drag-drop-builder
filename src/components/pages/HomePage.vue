<template>
	<div
		class="h-full border rounded-md w-11/12 sm:w-1/2 p-2 sm:p-4"
		:class="{
			'border-gray-400 border-dashed': droppedItems.length === 0,
			'border-gray-200 shadow-md': droppedItems.length > 0
		}"
		@dragover="onDragOverWorkspace"
		@drop="onDropWorkspace"
	>
		<div v-if="droppedItems.length > 0">
			<!-- Render the dynamically dropped components -->
			<div
				v-for="(item, index) in droppedItems"
				:key="index"
				class="relative group p-2 rounded-md transition-all duration-300"
				@dragover="onDragOverItem(index, $event)"
				@drop="onDropItem(index, $event)"
				@click="openEditModal(index)"
				:class="[{ 'border border-gray-400 border-dashed': draggingOverIndex === index }]"
			>
			<!-- Render the component with dynamic props -->
			<component
				:is="components[item.component]"
				:id="'component-' + index"
				v-bind="item"
				@update:modalValue="updateItemValue(index, $event)"
				:item="item"
				:key="index"
			/>
				<!-- Hover Icons -->
				<div class="absolute -top-6 sm:-top-3 -right-[0.4rem] md:-right-[5.8rem] hidden group-hover:flex space-x-2">
					<div
						class="p-1 border border-sidebar-hover cursor-pointer shadow bg-white move-up-button"
						@click="moveUp(index)"
						title="Move Up"
						aria-label="Move item up"
					>
						<img src="/icons/form/move-up.png" alt="move-up" class="w-5 h-5">
					</div>
					<div
						class="p-1 border border-sidebar-hover cursor-pointer shadow bg-white"
						@click="moveDown(index)"
						title="Move Down"
						aria-label="Move item down"
					>
						<img src="/icons/form/move-down.png" alt="move-down" class="w-5 h-5">
					</div>
					<div
						class="p-1 border border-sidebar-hover cursor-pointer shadow bg-white"
						@click="openEditModal(index)"
						title="Edit"
						aria-label="Edit item"
					>
						<img src="/icons/form/edit.png" alt="edit" class="w-5 h-5">
					</div>
					<div
						class="p-1 border border-sidebar-hover cursor-pointer shadow bg-white copy-button"
						@click="copyItem(index)"
						title="Copy"
						aria-label="Copy item"
					>
						<img src="/icons/form/copy.png" alt="copy" class="w-5 h-5">
					</div>
					<div
						class="p-1 border border-sidebar-hover cursor-pointer shadow bg-white delete-button"
						@click="onDelete(index)"
						title="Delete"
						aria-label="Delete item"
					>
						<img src="/icons/form/delete.png" alt="delete" class="w-5 h-5">
					</div>
				</div>
			</div>
	  </div>
		<div v-else class="flex flex-col justify-center items-center">
			<img class="w-28 h-28" src="/icons/drag-drop.png" alt="drag-drop">
			<h1 class="text-gray-400">Drag and drop items into the workspace</h1>
		</div>
	</div>
	<!-- Bottom Modal for each item -->
	<BottomModal
		v-if="droppedItems.length > 0 && activeModalIndex !== null"
		:key="activeModalIndex"
		:index="activeModalIndex"
		:item="droppedItems[activeModalIndex]"
		:isOpen="activeModalIndex !== null"
		@update:modalValue="updateItemStyleValue(activeModalIndex, $event)"
		ref="modal"
	/>
  </template>
  
  <script>
	import { markRaw } from 'vue';
	import TextField from '../Field/TextField/TextField.vue';
	import ImageField from '../Field/ImageField/ImageField.vue';
	import BottomModal from '../Modal/BottomModal.vue';
  
	export default {
		name: 'HomePage',
		components: {
			TextField,
			ImageField,
			BottomModal
		},
		data() {
			return {
				droppedItems: [],
				draggingOverIndex: null,
				activeModalIndex: null,
				components: {
					TextField: markRaw(TextField),  // Mark as raw to prevent reactivity
					ImageField: markRaw(ImageField),  // Mark as raw to prevent reactivity
					BottomModal: markRaw(BottomModal)  // Mark as raw to prevent reactivity
				}
			};
		},
		methods: {
			onDragOverWorkspace(event) {
				event.preventDefault();
			},
			onDragOverItem(index, event) {
				event.preventDefault();
				this.draggingOverIndex = index;
			},
			onDropItem(index, event) {
				event.preventDefault();
				if (this.draggingOverIndex !== null) {
				const draggedData = event.dataTransfer.getData("application/json");
				const draggedItem = JSON.parse(draggedData);
				this.droppedItems.splice(this.draggingOverIndex, 0, draggedItem);
				this.draggingOverIndex = null;
				}
			},
			moveUp(index) {
				if (index > 0) {
				const temp = this.droppedItems[index];
				this.droppedItems[index] = this.droppedItems[index - 1];
				this.droppedItems[index - 1] = temp;
				}
			},
			moveDown(index) {
				if (index < this.droppedItems.length - 1) {
				const temp = this.droppedItems[index];
				this.droppedItems[index] = this.droppedItems[index + 1];
				this.droppedItems[index + 1] = temp;
				}
			},
			onDelete(index) {
				this.droppedItems.splice(index, 1);
				this.activeModalIndex = null;
			},
			onDropWorkspace(event) {
				event.preventDefault();
				const data = event.dataTransfer.getData('application/json');
				if (data) {
					try {
						const droppedItem = JSON.parse(data);
						if (droppedItem && droppedItem.component && this.components[droppedItem.component]) {
							if (droppedItem.component === 'ImageField' && !droppedItem.imagePreview) {
								droppedItem.imagePreview = '/icons/placeholder-image.png';
							} else if (droppedItem.component === 'TextField' && !droppedItem.modalValue) {
								droppedItem.modalValue = 'Welcome to drag-drop builder';
							}
							const existingItemIndex = this.droppedItems.findIndex(item => item.component === droppedItem.component && item.id === droppedItem.id);
							if (existingItemIndex === -1) {
								this.droppedItems.push(droppedItem);
							}
						}
					} catch (e) {
						console.error('Error parsing dropped data:', e);
					}
				} else {
					console.error('No data found in drop event.');
				}
			},
			updateItemValue(index, value) {
				if (this.droppedItems[index]) {
				const item = this.droppedItems[index];
				item.id = value.id;
				item.modalValue = value.value;
				}
			},
			updateItemStyleValue(index, value) {
				if (this.droppedItems[index]) {
				const updatedItem = { ...this.droppedItems[index], ...value };
				this.droppedItems[index] = updatedItem;
				}
			},
			openEditModal(index) {
				if (index >= 0 && index < this.droppedItems.length) {
				this.activeModalIndex = index;
				}
			},
			copyItem(index) {
				const itemToCopy = { ...this.droppedItems[index] };
				this.droppedItems.splice(index + 1, 0, itemToCopy);
			}
		}
	};
</script>