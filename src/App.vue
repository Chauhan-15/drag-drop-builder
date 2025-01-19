<template>
	<Header @toggle-sidebar="toggleSidebar" />
	<div class="pt-[4.6rem] sm:pt-[5.8rem] flex">
		<Sidebar :is-sidebar-open="isSidebarOpen" />
		<div class="sm:ml-56 py-8 w-full flex flex-col items-center justify-center">
			<HomePage />
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue'
import Header from './components/layout/Header.vue'
import Sidebar from './components/layout/Sidebar.vue'
import HomePage from './components/pages/HomePage.vue'

// Track the sidebar's visibility
const isSidebarOpen = ref(false)

// Toggle sidebar visibility
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}
</script>