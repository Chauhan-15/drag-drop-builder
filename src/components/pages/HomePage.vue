<template>
	<div class="border border-dashed border-gray-400 h-full rounded-md w-1/2 p-4" @drop="onDrop" @dragover="onDragOver" >
		<div v-if="droppedItems.length > 0">
			<!-- Render the dynamically dropped components -->
			<div v-for="(item, index) in droppedItems" :key="index">
				<component :is="components[item.component]" />
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

// Handle the drop event
const onDrop = (event) => {
    event.preventDefault();
    const data = event.dataTransfer.getData("application/json");
    const droppedItem = JSON.parse(data);

    // Ensure the component exists before adding
    if (components[droppedItem.component]) {
        droppedItems.value.push(droppedItem);
    }
};

// Allow the drop by preventing the default behavior
const onDragOver = (event) => {
    event.preventDefault();
};
</script>
