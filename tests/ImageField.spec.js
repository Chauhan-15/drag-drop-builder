import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest';
import ImageField from '../src/components/Field/ImageField/ImageField.vue'
import Modal from '../src/components/Modal/Modal.vue'

describe('ImageField.vue', () => {
  const mockItem = {
    verticalAlignment: 'items-center',
  };

  it('renders correctly with the provided props', () => {
    const wrapper = mount(ImageField, {
      props: {
        id: 1,
        modalValue: '/icons/placeholder-image.png',
        item: mockItem,
      },
    });

    // Check if the image preview is rendered correctly
    const image = wrapper.find('img');
    expect(image.attributes('src')).toBe('/icons/placeholder-image.png');
  });

  it('opens the modal when the image preview is clicked', async () => {
    const wrapper = mount(ImageField, {
      props: {
        id: 2,
        modalValue: '/icons/placeholder-image.png',
        item: mockItem,
      },
    });

    // Simulate a click on the image preview
    await wrapper.find('div.w-28.h-28').trigger('click');

    // Check if the modal is opened
    expect(wrapper.vm.isModalOpen).toBe(true);
    const modal = wrapper.findComponent(Modal);
    expect(modal.props('isOpen')).toBe(true);
  });

  it('selects a predefined image and updates modalValue', async () => {
    const wrapper = mount(ImageField, {
      props: {
        id: 3,
        modalValue: '/images/pic1.png',
        item: mockItem,
      },
    });

    // Open modal
    await wrapper.find('div.w-28.h-28').trigger('click');

    // Select a predefined image
    await wrapper.findAll('.predefined-image').at(1).trigger('click'); // Click on the second predefined image

    // Check that the modal value was updated
    expect(wrapper.emitted()['update:modalValue'][0]).toEqual([
      { id: 3, value: '/images/pic2.png' },
    ]);
  });

  it('displays the correct placeholder when no modalValue is provided', () => {
    const wrapper = mount(ImageField, {
      props: {
        id: 5,
        modalValue: '',
        item: mockItem,
      },
    });

    // Check that the placeholder image is displayed
    const image = wrapper.find('img');
    expect(image.attributes('src')).toBe('/icons/placeholder-image.png');
  });

  it('sets selectedIndex correctly based on modalValue', () => {
    const wrapper = mount(ImageField, {
      props: {
        id: 6,
        modalValue: '/images/pic3.png',
        item: mockItem,
      },
    });

    // Check that the selected image index is correct based on modalValue
    expect(wrapper.vm.selectedIndex).toBe(2); // /images/pic3.png is the third image in predefinedImages
  });
});
