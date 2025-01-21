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
					:item="droppedItems[index]"
				/>
				<!-- Hover Icons -->
				<div class="absolute -top-6 sm:-top-3 -right-[0.4rem] md:-right-[5.8rem] hidden group-hover:flex space-x-2">
					<div
						class="p-1 border border-sidebar-hover cursor-pointer shadow bg-white"
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
						class="p-1 border border-sidebar-hover cursor-pointer shadow bg-white"
						@click="copyItem(index)"
						title="Copy"
						aria-label="Copy item"
					>
						<img src="/icons/form/copy.png" alt="copy" class="w-5 h-5">
					</div>
					<div
						class="p-1 border border-sidebar-hover cursor-pointer shadow bg-white"
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
  
  <script setup>
	import { ref, defineExpose } from 'vue';
	
	// Import the draggable components
	import TextField from '../Field/TextField/TextField.vue';
	import ImageField from '../Field/ImageField/ImageField.vue';
	import BottomModal from '../Modal/BottomModal.vue';
	
	// Register the components
	const components = {
		TextField,
		ImageField,
		BottomModal
	};
  
	// Track the dropped items
	const droppedItems = ref([]);
	const draggingOverIndex = ref(null);
	const activeModalIndex = ref(null);

	// Expose droppedItems to parent component (App.vue)
	defineExpose({
		droppedItems
	})
	// Allow the drop by preventing the default behavior
	const onDragOverWorkspace = (event) => {
		event.preventDefault(); // Necessary to allow dropping
	};
	// Handle when dragging over an item (this will set the hover index)
	const onDragOverItem = (index, event) => {
		event.preventDefault(); // Necessary to allow dropping
		draggingOverIndex.value = index; // Set the index of the item being hovered over
	};
	// Handle dropping an item at a specific index
	const onDropItem = (index, event) => {
		event.preventDefault();
		if (draggingOverIndex.value !== null) {
			const draggedData = event.dataTransfer.getData("application/json");
			const draggedItem = JSON.parse(draggedData);
		
			// Insert the dragged item at the hovered position
			droppedItems.value.splice(draggingOverIndex.value, 0, draggedItem);
			draggingOverIndex.value = null; // Reset hover state
		}
	};
	// Handle moving an item up in the sequence
	const moveUp = (index) => {
		if (index > 0) {
			const temp = droppedItems.value[index];
			droppedItems.value[index] = droppedItems.value[index - 1];
			droppedItems.value[index - 1] = temp;
		}
	};
	// Handle moving an item down in the sequence
	const moveDown = (index) => {
		if (index < droppedItems.value.length - 1) {
			const temp = droppedItems.value[index];
			droppedItems.value[index] = droppedItems.value[index + 1];
			droppedItems.value[index + 1] = temp;
		}
	};
	// Handle deleting an item
	const onDelete = (index) => {
		droppedItems.value.splice(index, 1);
		activeModalIndex.value = 0;
	};
	// Handle the workspace drop action
	const onDropWorkspace = (event) => {
		event.preventDefault();
		const data = event.dataTransfer.getData('application/json');
		if (data) {
			try {
				const droppedItem = JSON.parse(data);
				if (droppedItem && droppedItem.component && components[droppedItem.component]) {
					if (droppedItem.component === 'ImageField' && !droppedItem.imagePreview) {
						droppedItem.imagePreview = '/icons/placeholder-image.png';
					} else if (droppedItem.component === 'TextField' && !droppedItem.modalValue) {
						droppedItem.modalValue = 'Welcome to drag-drop builder';
					}
					const existingItemIndex = droppedItems.value.findIndex(item => item.component === droppedItem.component && item.id === droppedItem.id);
					if (existingItemIndex === -1) {
						droppedItems.value.push(droppedItem);
					}
				}
			} catch (e) {
				console.error('Error parsing dropped data:', e);
			}
		} else {
			console.error('No data found in drop event.');
		}
	};
	const updateItemValue = (index, value) => {
		if (droppedItems.value[index]) {
			const item = droppedItems.value[index];
			item.id = value.id;
			item.modalValue = value.value;
		}
	};
	const updateItemStyleValue = (index, value) => {
		if (droppedItems.value[index]) {
			const updatedItem = { ...droppedItems.value[index], ...value };
			droppedItems.value[index] = updatedItem;
		}
	};
	const openEditModal = (index) => {
		if (index >= 0 && index < droppedItems.value.length) {
			activeModalIndex.value = index;
		}
	};
	// Copy an item and add it below the original one
	const copyItem = (index) => {
		const itemToCopy = { ...droppedItems.value[index] }; // Clone the item to keep the original data
		droppedItems.value.splice(index + 1, 0, itemToCopy); // Insert the copied item below the original
	};
  </script>