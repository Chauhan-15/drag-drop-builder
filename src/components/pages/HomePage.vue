<template>
	<div class="border border-dashed border-gray-400 h-full rounded-md w-1/2 p-4" @dragover="onDragOverWorkspace" @drop="onDropWorkspace">
		<div v-if="droppedItems.length > 0">
			<!-- Render the dynamically dropped components -->
			<div 
				v-for="(item, index) in droppedItems" 
				:key="index" 
				class="relative group p-2 rounded-md"
				@dragover="onDragOverItem(index, $event)" 
				@drop="onDropItem(index, $event)"
				:class="{'bg-gray-100': draggingOverIndex === index}" 
			>
				<!-- Render the component with dynamic props -->
				<component 
					:is="components[item.component]" 
					:id="'component-' + index" 
				/>
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
  
	// Handle the drop event for the workspace
	const onDropWorkspace = (event) => {
		event.preventDefault();

		const data = event.dataTransfer.getData("application/json");

		if (data) {
			try {
			const droppedItem = JSON.parse(data);

			// Check if the component is already in the droppedItems
			if (droppedItem && droppedItem.component && components[droppedItem.component]) {
				// Avoid adding the same component if it's already in the droppedItems
				const existingItemIndex = droppedItems.value.findIndex(item => item.component === droppedItem.component);
				if (existingItemIndex === -1) {
					droppedItems.value.push(droppedItem);
				}
			} else {
				console.error("Invalid component data in drop event:", droppedItem);
			}
			} catch (e) {
				console.error("Error parsing dropped data:", e);
			}
		} else {
			console.error("No data found in drop event.");
		}
	};
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
</script>
  