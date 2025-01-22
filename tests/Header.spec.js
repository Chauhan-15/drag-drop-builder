import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import Header from '../src/components/layout/Header.vue';

describe('Header.vue', () => {
  
    it('renders the title "Drag Drop Builder"', () => {
        const wrapper = mount(Header);
        // Assert that the title "Drag Drop Builder" is rendered in the component
        expect(wrapper.text()).toContain('Drag Drop Builder');
    });

    it('emits toggle-sidebar event when the toggle button is clicked', async () => {
        const wrapper = mount(Header);
        const toggleButton = wrapper.find('img'); // Find the menu button (img element)
        await toggleButton.trigger('click'); // Trigger a click on the toggle button

        // Assert that the "toggle-sidebar" event was emitted once
        expect(wrapper.emitted('toggle-sidebar')).toHaveLength(1);
    });

    it('emits save-dropped-items event when the save button is clicked', async () => {
        const wrapper = mount(Header);
        const saveButton = wrapper.find('button'); // Find the save button
        await saveButton.trigger('click'); // Trigger a click on the save button

        // Assert that the "save-dropped-items" event was emitted once
        expect(wrapper.emitted('save-dropped-items')).toHaveLength(1);
    });

    it('renders the menu icon image correctly', () => {
        const wrapper = mount(Header);
        const menuIcon = wrapper.find('img[src="/icons/menu.png"]');
        
        // Check that the menu icon is correctly rendered
        expect(menuIcon.exists()).toBe(true);
    });

    it('applies the correct classes to the save button', () => {
        const wrapper = mount(Header);
        const saveButton = wrapper.find('button');
        
        // Check if the save button has the correct classes
        expect(saveButton.classes()).toContain('bg-primary-button');
        expect(saveButton.classes()).toContain('sm:text-xl');
        expect(saveButton.classes()).toContain('rounded-md');
        expect(saveButton.classes()).toContain('px-6');
        expect(saveButton.classes()).toContain('py-2');
        expect(saveButton.classes()).toContain('font-semibold');
    });

    it('has the toggle button visible on small screens only', () => {
        const wrapper = mount(Header);
        const toggleButton = wrapper.find('img');

        // Check if the toggle button is visible on small screens only
        expect(toggleButton.classes()).toContain('sm:hidden'); // It should be hidden on small screens
    });
});
