import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import HomePage from '../src/components/pages/HomePage.vue';
import TextField from '../src/components/Field/TextField/TextField.vue';

describe('HomePage.vue', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(HomePage, {
            stubs: ['BottomModal'], // Stub BottomModal to focus on workspace behavior
        });
    });

    it('should render workspace with a placeholder if no items are dropped', () => {
        const placeholderImage = wrapper.find('img');
        expect(placeholderImage.exists()).toBe(true);
        expect(placeholderImage.attributes('src')).toBe('/icons/drag-drop.png');
        const placeholderText = wrapper.find('h1');
        expect(placeholderText.text()).toBe('Drag and drop items into the workspace');
    });

    it('should add a TextField to the workspace when dropped', async () => {
        const draggedItem = {
            component: 'TextField',
            id: 1,
            modalValue: 'Welcome to drag-drop builder',
        };

        const event = {
            preventDefault: vi.fn(),
            dataTransfer: {
                getData: () => JSON.stringify(draggedItem),
            },
        };

        // Simulate drop event
        await wrapper.find('.h-full').trigger('drop', event);

        // Check if the dropped item is added to the workspace
        expect(wrapper.vm.droppedItems).toHaveLength(1);
        expect(wrapper.vm.droppedItems[0]).toEqual(draggedItem);

        // Check if TextField component is rendered
        const textField = wrapper.findComponent(TextField);
        expect(textField.exists()).toBe(true);
    });

    it('should move the dropped item up when moveUp is clicked', async () => {
        // Drop a TextField item
        await wrapper.find('.h-full').trigger('drop', {
            preventDefault: vi.fn(),
            dataTransfer: { getData: () => JSON.stringify({ component: 'TextField', id: 1 }) },
        });

        // Drop another item to have at least two items
        await wrapper.find('.h-full').trigger('drop', {
            preventDefault: vi.fn(),
            dataTransfer: { getData: () => JSON.stringify({ component: 'ImageField', id: 2 }) },
        });

        const moveUpButton = wrapper.find('.group:nth-child(2) .move-up-button');
        await moveUpButton.trigger('click');

        // Check that the items have been swapped
        expect(wrapper.vm.droppedItems[0].id).toBe(2);
        expect(wrapper.vm.droppedItems[1].id).toBe(1);
    });

    it('should delete the dropped item when delete button is clicked', async () => {
        // Drop a TextField item
        await wrapper.find('.h-full').trigger('drop', {
            preventDefault: vi.fn(),
            dataTransfer: { getData: () => JSON.stringify({ component: 'TextField', id: 1 }) },
        });

        // Check that the item is added
        expect(wrapper.vm.droppedItems).toHaveLength(1);

        // Click on the delete button of the dropped item
        const deleteButton = wrapper.find('.group:nth-child(1) .delete-button');
        await deleteButton.trigger('click');

        // Check that the item was deleted
        expect(wrapper.vm.droppedItems).toHaveLength(0);
    });

    it('should open the edit modal for an item when clicked', async () => {
        const draggedItem = {
        component: 'TextField',
        id: 1,
        modalValue: 'Welcome to drag-drop builder',
        };

        // Drop the item
        await wrapper.find('.h-full').trigger('drop', {
        preventDefault: vi.fn(),
        dataTransfer: { getData: () => JSON.stringify(draggedItem) },
        });

        // Find the dropped item and simulate click to open edit modal
        const item = wrapper.find('.group');
        await item.trigger('click');

        // Check that the modal for the item is open
        expect(wrapper.vm.activeModalIndex).toBe(0);
    });

    it('should copy a dropped item when copy button is clicked', async () => {
      const draggedItem = {
        component: 'TextField',
        id: 1,
        modalValue: 'Welcome to drag-drop builder',
      };
    
      // Drop the item
      await wrapper.find('.h-full').trigger('drop', {
        preventDefault: vi.fn(),
        dataTransfer: { getData: () => JSON.stringify(draggedItem) },
      });
    
      // Find the copy button and simulate click
      const copyButton = wrapper.find('.group:nth-child(1) .copy-button');
      await copyButton.trigger('click');
    
      // Ensure a new ID is generated for the copied item
      const copiedItem = { ...draggedItem, id: 2 };
    
      // Check if the item was copied and has a new ID
      expect(wrapper.vm.droppedItems).toHaveLength(2);
      expect(wrapper.vm.droppedItems[1]).toEqual(copiedItem); // Make sure the ID is updated
    });
});
