<template>
	<Header @toggle-sidebar="toggleSidebar" @save-dropped-items="saveDroppedItems" />
	<div class="pt-[4.5rem] sm:pt-[5.7rem] flex">
		<Sidebar :is-sidebar-open="isSidebarOpen" />
		<div class="sm:ml-56 py-8 w-full flex flex-col items-center relative justify-center">
			<HomePage ref="homePageRef" />
		</div>
	</div>
</template>
  
<script>
	import Header from './components/layout/Header.vue'
	import Sidebar from './components/layout/Sidebar.vue'
	import HomePage from './components/pages/HomePage.vue'
  
	export default {
		components: {
			Header,
			Sidebar,
			HomePage
		},
		data() {
			return {
				// Track the sidebar's visibility
				isSidebarOpen: false,
		
				// Create a ref to access the HomePage component
				savedItems: [],
			}
		},
		methods: {
			// Toggle sidebar visibility
			toggleSidebar() {
				this.isSidebarOpen = !this.isSidebarOpen
			},
			// Handle save button click in the Header component
			saveDroppedItems() {
				const homePageRef = this.$refs.homePageRef
				if (homePageRef && homePageRef.droppedItems.length > 0) {
					// Access the reactive dropped items and store them
					this.savedItems = homePageRef.droppedItems
					console.log('Saved dropped items:', this.savedItems)
				} else {
					console.log('Please add data first')
				}
			}
		}
	}
</script>