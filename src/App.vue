<template>
	<Header @toggle-sidebar="toggleSidebar" @save-dropped-items="saveDroppedItems" />
	<div class="pt-[4.5rem] sm:pt-[5.7rem] flex">
		<Sidebar :is-sidebar-open="isSidebarOpen" />
		<div class="sm:ml-56 py-8 w-full flex flex-col items-center relative justify-center">
			<HomePage ref="homePageRef" />
		</div>
	</div>
    <!-- Modal for displaying saved items -->
	<Modal :isOpen="isModalOpen" @update:isOpen="isModalOpen = $event">
		<template v-slot>
			<div class="text-center">
				<h2 class="text-xl font-semibold">Saved Items</h2>
				<ul class="mt-4 overflow-scroll max-h-64 ">
					{{ JSON.stringify(savedItems) }}
				</ul>
			</div>
		</template>
	</Modal>
</template>

<script>
	import Header from './components/layout/Header.vue'
	import Sidebar from './components/layout/Sidebar.vue'
	import HomePage from './components/pages/HomePage.vue'
	import Modal from './components/Modal/Modal.vue'
  
	export default {
		components: {
			Header,
			Sidebar,
			HomePage,
			Modal
		},
		data() {
			return {
				isSidebarOpen: false,
				savedItems: [],
				isModalOpen: false,
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
					this.savedItems = homePageRef.droppedItems;
					this.savedItems.forEach((item, index) => {
						this.savedItems[index].position = index;
						this.savedItems[index].id = index+1;
					});
					this.isModalOpen = true
					console.log('Saved dropped items:', this.savedItems)
				} else {
					console.log('Please add data first')
				}
			}
		}
	}
</script>
