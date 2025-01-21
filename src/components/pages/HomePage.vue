<template>
	<div class="h-full border rounded-md w-1/2 p-4" :class="{'border-gray-400 border-dashed': droppedItems.length === 0, 'border-gray-200 shadow-md': droppedItems.length > 0}" @dragover="onDragOverWorkspace" @drop="onDropWorkspace">
		<div v-if="droppedItems.length > 0">
			<!-- Render the dynamically dropped components -->
			<div 
				v-for="(item, index) in droppedItems" 
				:key="index" 
				class="relative group p-2 rounded-md"
				@dragover="onDragOverItem(index, $event)" 
				@drop="onDropItem(index, $event)"
				:class="{'border border-gray-400 border-dashed': draggingOverIndex === index}" 
			>
				<!-- Render the component with dynamic props -->
				<component v-if="item.component === 'TextField'"
					:is="components[item.component]" 
					:id="'component-' + index" 
					v-bind="item"
					@update:modalValue="updateItemValue(index, $event)" 
				/>
				<component v-else
					:is="components[item.component]"
					:id="'component-' + index"
					v-bind="item"
					@update:imagePreview="updateItemValue(index, $event)"
				/>
				<!-- Hover Icons -->
				<div class="absolute -top-3 -right-8 hidden group-hover:flex space-x-2">
					<div 
						class="p-1 border border-sidebar-hover cursor-pointer shadow bg-white"
						@click="moveUp(index)"
						title="Move Up"
					>
						<img src="/icons/move-up.png" alt="move-up" class="w-5 h-5">
					</div>
					<div 
						class="p-1 border border-sidebar-hover cursor-pointer shadow bg-white"
						@click="moveDown(index)"
						title="Move Down"
					>
						<img src="/icons/move-down.png" alt="move-down" class="w-5 h-5">
					</div>
					<div 
						class="p-1 border border-sidebar-hover cursor-pointer shadow bg-white"
						@click="onDelete(index)"
						title="Delete"
					>
						<img src="/icons/delete.png" alt="delete" class="w-5 h-5">
					</div>
				</div>
			</div>
		</div>
		<div v-else class="flex flex-col justify-center items-center">
			<img class="w-28 h-28" src="/public/drag-drop.png" alt="drag-drop">
			<h1 class="text-gray-400">Drag and drop items into the workspace</h1>
		</div>
	</div>
</template>
  
<script setup>
	import { ref } from 'vue';
	
	// Import the draggable components
	import TextField from '../Field/TextField/TextField.vue';
	import ImageField from '../Field/ImageField/ImageField.vue';
	
	// Register the components
	const components = {
		TextField,
		ImageField,
	};
  
	// Track the dropped items
	const droppedItems = ref([]);
	
	// Track the index of the item being dragged over
	const draggingOverIndex = ref(null);
  
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
	};
	// Updated onDropWorkspace method
	const onDropWorkspace = (event) => {
		event.preventDefault();
		const data = event.dataTransfer.getData("application/json");
		if (data) {
			try {
				const droppedItem = JSON.parse(data);
				// Check if the component is valid and if it's a valid object for the component
				if (droppedItem && droppedItem.component && components[droppedItem.component]) {
					// Initialize the component with the correct data
					if (droppedItem.component === "ImageField" && droppedItem.imagePreview) {
						droppedItem.imagePreview = droppedItem.imagePreview || '/icons/placeholder-image.png';
					} else if (droppedItem.component === "TextField" && droppedItem.modalValue) {
						droppedItem.modalValue = droppedItem.modalValue || "Welcome to drag-drop builder";
					}
					// Avoid adding duplicate components
					const existingItemIndex = droppedItems.value.findIndex(item => item.component === droppedItem.component);
					if (existingItemIndex === -1) {
						droppedItems.value.push(droppedItem);
					}
				}
			} catch (e) {
				console.error("Error parsing dropped data:", e);
			}
		} else {
			console.error("No data found in drop event.");
		}
	};
	// Updated updateItemValue method
	const updateItemValue = (index, value) => {
		if (droppedItems.value[index]) {
			// Update the specific item with the new value
			const item = droppedItems.value[index];
			if (item.component === "TextField") {
				item.modalValue = value;
			} else if (item.component === "ImageField") {
				item.imagePreview = value;
			}
		}
	};
</script>
