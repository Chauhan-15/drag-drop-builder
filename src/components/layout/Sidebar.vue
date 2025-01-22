<template>
    <div>
        <!-- Main Sidebar -->
        <aside :class="{'block': isSidebarOpen, 'hidden': !isSidebarOpen}" class="sm:block w-48 sm:w-56 z-40 fixed bg-sidebar text-title h-screen py-4 transition-all duration-300">
            <ul class="space-y-2">
                <li v-for="(item, index) in menuItems" :key="index" class="cursor-pointer group relative hover:bg-sidebar-hover">
                    <!-- Item Content -->
                    <div @click="toggleSubMenu(index)" :class="['p-4 flex space-x-4 justify-between items-center box', item.label]">
                        <div class="flex space-x-2 sm:space-x-4 items-center">
                            <img class="w-6 sm:w-8 h-6 sm:h-8" :src="item.icon" :alt="item.label" />
                            <div class="first-letter:capitalize sm:text-xl">{{ item.label }}</div>
                        </div>
                        <div>
                            <!-- Arrow rotation based on submenu state -->
                            <img class="w-4 sm:w-5 h-4 sm:h-5 cursor-pointer transition-transform arrow" :class="{ 'rotate-180': openedSubMenuIndex === index }" src="/icons/down-arrow.png" alt="arrow"/>
                        </div>
                    </div>
                    <!-- Submenu (Appears below the menu item with animation) -->
                    <transition name="submenu" class="submenu">
                        <div v-if="openedSubMenuIndex === index" class="w-full bg-sidebar text-title submenu">
                            <!-- Submenu List -->
                            <ul>
                                <li 
                                    v-for="(submenu, subIndex) in item.subMenu" 
                                    :key="subIndex" 
                                    class="px-4 py-2 cursor-pointer label"
                                    @dragstart="onDragStart(submenu)"
                                    draggable="true"
                                >
                                    <div class="space-y-1">
                                        <h1 class="first-letter:capitalize text-sm second">{{ submenu.label }}</h1>
                                        <div class="bg-header rounded-md p-2">
                                            <!-- Render the submenu component -->
                                            <component :is="submenu.component" />
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </transition>
                </li>
            </ul>
        </aside>
    </div>
</template>

<script>
    import TextField from "../Preview/Text/TextField.vue";
    import ImageField from "../Preview/Image/ImageField.vue";

    export default {
        components: {
            TextField,
            ImageField,
        },
        props: {
            isSidebarOpen: {
                type: Boolean,
                default: false,
            },
        },
        data() {
            return {
                openedSubMenuIndex: null, 
                menuItems: [
                    {
                        label: "Text",
                        icon: "/icons/text.png",
                        subMenu: [
                            { label: "text one", component: "TextField" },
                        ],
                    },
                    {
                        label: "Image",
                        icon: "/icons/image.png",
                        subMenu: [
                            { label: "image one", component: "ImageField" },
                        ],
                    },
                ],
            };
        },
        methods: {
            toggleSubMenu(index) {
                this.openedSubMenuIndex = this.openedSubMenuIndex === index ? null : index;
            },
            onDragStart(submenu) {
                const dragData = JSON.stringify({
                    component: submenu.component,
                });
                event.dataTransfer.setData("application/json", dragData);
            },
        },
    };
</script>
