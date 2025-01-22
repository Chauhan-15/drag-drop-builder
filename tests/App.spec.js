import { mount } from '@vue/test-utils'
import App from '../src/App.vue'
import { beforeEach, describe, expect, it, vi } from 'vitest';
import HomePage from '../src/components/pages/HomePage.vue'
import Header from '../src/components/layout/Header.vue';
import Sidebar from '../src/components/layout/Sidebar.vue';

describe('App.vue', () => {
    let wrapper

    beforeEach(() => {
        wrapper = mount(App, {
            global: {
                stubs: {
                    Header,
                    Sidebar,
                    HomePage: {
                        template: '<div></div>',
                        data() {
                            return {
                                droppedItems: [{ id: 1, component: 'TextField' }]
                            }
                        },
                        methods: {
                            saveDroppedItems() {
                                this.$emit('save-dropped-items')
                            }
                        }
                    },
                },
            },
        })
    })

    it('should render the Header, Sidebar, and HomePage components', () => {
        expect(wrapper.findComponent(Header).exists()).toBe(true)
        expect(wrapper.findComponent(Sidebar).exists()).toBe(true)
        expect(wrapper.findComponent(HomePage).exists()).toBe(true)
    })

    it('should toggle the sidebar visibility when toggleSidebar is called', async () => {
        expect(wrapper.vm.isSidebarOpen).toBe(false)

        // Simulate the toggle-sidebar event from Header
        await wrapper.findComponent(Header).vm.$emit('toggle-sidebar')

        expect(wrapper.vm.isSidebarOpen).toBe(true)

        // Simulate the toggle-sidebar event again
        await wrapper.findComponent(Header).vm.$emit('toggle-sidebar')

        expect(wrapper.vm.isSidebarOpen).toBe(false)
    })

    it('should save dropped items when save-dropped-items is triggered', async () => {
        // Mock the droppedItems in HomePage component
        const droppedItems = [{ id: 1, component: 'TextField', "position": 0 }]
        const consoleSpy = vi.spyOn(console, 'log')

        // Trigger the saveDroppedItems method by emitting the save-dropped-items event from the Header component
        await wrapper.findComponent(Header).vm.$emit('save-dropped-items')
    
        // Assert that savedItems contains the correct data
        expect(wrapper.vm.savedItems).toEqual(droppedItems)
        
        // Prevent console logs during tests and verify the correct log is called
        expect(consoleSpy).toHaveBeenCalledWith('Saved dropped items:', droppedItems)
    })
  
    it('should log a message when no items are dropped', async () => {
        const consoleSpy = vi.spyOn(console, 'log')

        // Mock the droppedItems as an empty array
        wrapper = mount(App, {
            global: {
                stubs: {
                    Header,
                    Sidebar,
                    HomePage: {
                        template: '<div></div>',
                        data() {
                            return {
                                droppedItems: []
                            }
                        },
                        methods: {
                            saveDroppedItems() {
                                this.$emit('save-dropped-items')
                            }
                        }
                    },
                },
            },
        })

        // Trigger the saveDroppedItems method
        await wrapper.findComponent(Header).vm.$emit('save-dropped-items')
        expect(consoleSpy).toHaveBeenCalledWith('Please add data first')
    })

});
