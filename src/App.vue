<template>
	<Header @toggle-sidebar="toggleSidebar" @save-dropped-items="saveDroppedItems" />
	<div class="pt-[4.5rem] sm:pt-[5.7rem] flex">
		<Sidebar :is-sidebar-open="isSidebarOpen" />
		<div class="sm:ml-56 py-8 w-full flex flex-col items-center relative justify-center">
			<HomePage ref="homePageRef" />
		</div>
	</div>
</template>

<script setup>
	import { ref } from 'vue'
	import Header from './components/layout/Header.vue'
	import Sidebar from './components/layout/Sidebar.vue'
	import HomePage from './components/pages/HomePage.vue'

	// Track the sidebar's visibility
	const isSidebarOpen = ref(false);

	// Create a ref to access the HomePage component
	const homePageRef = ref(null)
	const savedItems = ref([])

	// Toggle sidebar visibility
	const toggleSidebar = () => {
		isSidebarOpen.value = !isSidebarOpen.value
	}
	// Handle save button click in the Header component
	const saveDroppedItems = () => {
		if (homePageRef.value && homePageRef.value.droppedItems.length >0) {
			// Access the reactive dropped items and store them
			savedItems.value = homePageRef.value.droppedItems
			console.log('Saved dropped items:', savedItems.value)
		} else {
			console.log('plesae add data first')
		}
	}
</script>