import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest';
import Modal from '../src/components/Modal/Modal.vue'

describe('Modal.vue', () => {
  
  it('renders the modal when isOpen is true', () => {
    const wrapper = mount(Modal, {
      props: {
        isOpen: true,
      },
    });

    // Check if the modal is rendered
    expect(wrapper.exists()).toBe(true);
    // Ensure modal is visible (it should be rendered and not hidden)
    expect(wrapper.isVisible()).toBe(true);
  });

  it('does not render the modal when isOpen is false', () => {
    const wrapper = mount(Modal, {
      props: {
        isOpen: false,
      },
    });

    // Check if the modal is not rendered
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.isVisible()).toBe(false);
  });

  it('closes the modal when the close button is clicked', async () => {
    const wrapper = mount(Modal, {
      props: {
        isOpen: true,
      },
    });

    // Find the close button by its aria-label
    const closeButton = wrapper.find('button[aria-label="Close modal"]');
    
    // Simulate a click on the close button
    await closeButton.trigger('click');

    // Check if the 'update:isOpen' event was emitted with 'false' as the value
    expect(wrapper.emitted()['update:isOpen'][0]).toEqual([false]);
  });

  it('renders content inside the modal slot', () => {
    const wrapper = mount(Modal, {
      props: {
        isOpen: true,
      },
      slots: {
        default: '<p>Test content inside the modal</p>',
      },
    });

    // Check if the content inside the slot is rendered
    expect(wrapper.html()).toContain('<p>Test content inside the modal</p>');
  });

  it('has the correct classes and structure', () => {
    const wrapper = mount(Modal, {
      props: {
        isOpen: true,
      },
    });

    // Check if the modal has the correct structure and classes
    expect(wrapper.classes()).toContain('fixed');
    expect(wrapper.classes()).toContain('inset-0');
    expect(wrapper.classes()).toContain('z-50');
    expect(wrapper.classes()).toContain('flex');
    expect(wrapper.classes()).toContain('items-center');
    expect(wrapper.classes()).toContain('justify-center');
  });
});
