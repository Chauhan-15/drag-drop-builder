import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import BottomModal from '../src/components/Modal/BottomModal.vue';

describe('BottomModal.vue', () => {
    let wrapper;
    const mockItem = {
        component: 'TextField',
        textAlignment: 'text-left',
        textSize: 'text-base',
        fontWeight: 'font-normal',
        fontStyle: 'underline',
        verticalAlignment: 'items-start',
    };

    beforeEach(() => {
        wrapper = mount(BottomModal, {
            props: {
                isOpen: true,
                item: mockItem,
            },
        });
    });

    it('should toggle the modal expansion when the arrow is clicked', async () => {
        // Ensure the modal is initially expanded
        expect(wrapper.classes()).toContain('h-max');
        
        // Click the arrow to collapse the modal
        await wrapper.find('div[role="button"]').trigger('click');
        
        // Check that the modal is collapsed
        expect(wrapper.classes()).toContain('h-16');
        
        // Click the arrow to expand the modal again
        await wrapper.find('div[role="button"]').trigger('click');
        
        // Check that the modal is expanded again
        expect(wrapper.classes()).toContain('h-max');
    });

    it('should emit an update when a text alignment button is clicked', async () => {
        // Click the "center" button for text alignment
        await wrapper.findAll('button').at(1).trigger('click');

        // Ensure the emitted update is correct
        expect(wrapper.emitted()['update:item'][0]).toEqual([
            { ...mockItem, textAlignment: 'text-center' },
        ]);
    });

    it('should emit an update when a text size button is clicked', async () => {
        // Click the "large" button for text size
        await wrapper.findAll('button').at(5).trigger('click');

        // Ensure the emitted update is correct
        expect(wrapper.emitted()['update:item'][0]).toEqual([
            { ...mockItem, textSize: 'text-lg' },
        ]);
    });

    it('should emit an update when a font weight button is clicked', async () => {
        // Click the "bold" button for font weight
        await wrapper.findAll('button').at(10).trigger('click');

        // Ensure the emitted update is correct
        expect(wrapper.emitted()['update:item'][0]).toEqual([
            { ...mockItem, fontWeight: 'font-bold' },
        ]);
    });

    it('should emit an update when a font style button is clicked', async () => {
        // Click the "italic" button for font style
        await wrapper.findAll('button').at(12).trigger('click');

        // Ensure the emitted update is correct
        expect(wrapper.emitted()['update:item'][0]).toEqual([
            { ...mockItem, fontStyle: 'italic' },
        ]);
    });

    it('should emit an update when an image alignment button is clicked', async () => {
        // Change the component to "ImageField" to test image alignment
        await wrapper.setProps({ item: { component: 'ImageField', ...mockItem } });
        // Click the "center" button for image alignment
        await wrapper.findAll('button').at(12).trigger('click');

        // Ensure the emitted update is correct
        expect(wrapper.emitted()['update:item'][0]).toEqual([
            { verticalAlignment: 'items-center', ...mockItem },
        ]);
    });
});