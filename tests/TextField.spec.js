import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import TextField from '../src/components/Field/TextField/TextField.vue';

describe('TextField.vue', () => {
  const mockItem = {
    textAlignment: 'text-center',
    textSize: 'text-lg',
    fontWeight: 'font-bold',
    fontStyle: 'italic',
  };

  it('renders correctly with given props', () => {
    const wrapper = mount(TextField, {
      props: {
        id: 1,
        label: 'Test Label',
        type: 'text',
        modalValue: 'Test Value',
        placeholder: 'Enter your text',
        item: mockItem,
      },
    });

    // Check if the input element is rendered
    const input = wrapper.find('input');
    expect(input.exists()).toBe(true);
    expect(input.attributes('placeholder')).toBe('Enter your text');
    expect(input.classes()).toContain('w-full');
    expect(input.classes()).toContain('text-center');
    expect(input.classes()).toContain('text-lg');
    expect(input.classes()).toContain('font-bold');
    expect(input.classes()).toContain('italic');
  });

  it('binds modalValue correctly with v-model', async () => {
    const wrapper = mount(TextField, {
      props: {
        id: 2,
        modalValue: 'Test Value',
        item: mockItem,
      },
    });

    // Check initial modalValue binding
    const input = wrapper.find('input');
    expect(input.element.value).toBe('Test Value');

    // Simulate changing the input value
    await input.setValue('New Test Value');

    // Check that the updated value is emitted with the correct id
    expect(wrapper.emitted()['update:modalValue'][0]).toEqual([
      { id: 2, value: 'New Test Value' },
    ]);
  });

  it('updates the value correctly when the input changes', async () => {
    const wrapper = mount(TextField, {
      props: {
        id: 3,
        modalValue: 'Initial Value',
        item: mockItem,
      },
    });

    const input = wrapper.find('input');

    // Change the input value
    await input.setValue('Updated Value');
    expect(wrapper.emitted()['update:modalValue'][0]).toEqual([
      { id: 3, value: 'Updated Value' },
    ]);

    // Check that the input value updates correctly
    expect(input.element.value).toBe('Updated Value');
  });

  it('applies the default placeholder when no placeholder is provided', () => {
    const wrapper = mount(TextField, {
      props: {
        id: 4,
        modalValue: 'Some Value',
        item: mockItem,
      },
    });

    const input = wrapper.find('input');
    expect(input.attributes('placeholder')).toBe('Enter text here...');
  });
});
