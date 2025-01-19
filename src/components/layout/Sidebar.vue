<template>
    <div>
        <!-- Main Sidebar -->
        <aside :class="{'block': isSidebarOpen, 'hidden': !isSidebarOpen}" class="lg:block w-48 sm:w-56 fixed bg-sidebar text-title h-screen py-4 transition-all duration-300">
            <ul class="space-y-2">
                <li v-for="(item, index) in menuItems" :key="index" class="cursor-pointer group relative hover:bg-sidebar-hover">
                    <!-- Item Content -->
                    <div @click="toggleSubMenu(index)" class="p-4 flex space-x-4 justify-between items-center">
                        <div class="flex space-x-2 sm:space-x-4 items-center">
                            <img class="w-6 sm:w-8 h-6 sm:h-8" :src="item.icon" :alt="item.label" />
                            <div class="first-letter:capitalize sm:text-xl">{{ item.label }}</div>
                        </div>
                        <div>
                            <!-- Arrow rotation based on submenu state -->
                            <img class="w-4 sm:w-6 h-4 sm:h-6 cursor-pointer transition-transform" :class="{ 'rotate-180': openedSubMenuIndex === index }" src="/icons/down-arrow.png" alt="arrow"/>
                        </div>
                    </div>
                    <!-- Submenu (Appears below the menu item with animation) -->
                    <transition name="submenu">
                        <div v-if="openedSubMenuIndex === index" class="w-full bg-sidebar text-title">
                            <!-- Submenu List -->
                            <ul class="">
                                <li v-for="(submenu, subIndex) in item.subMenu" :key="subIndex" class="p-4 cursor-pointer">
                                    <div class="first-letter:capitalize text-xl">{{ submenu.label }}</div>
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
export default {
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
                        { label: "Submenu 1" },
                        { label: "Submenu 2" },
                    ],
                },
                {
                    label: "Image",
                    icon: "/icons/image.png",
                    subMenu: [
                        { label: "Submenu A" },
                        { label: "Submenu B" },
                    ],
                },
            ],
        };
    },
    methods: {
        toggleSubMenu(index) {
            this.openedSubMenuIndex = this.openedSubMenuIndex === index ? null : index;
        },
    },
};
</script>
