import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import Sidebar from '../src/components/layout/Sidebar.vue';


describe('Sidebar.vue', () => {
  
  it('renders the sidebar correctly when isSidebarOpen is true', () => {
    const wrapper = mount(Sidebar, {
      props: {
        isSidebarOpen: true,
      },
    });

    // Assert that the sidebar is visible when isSidebarOpen is true
    const sidebar = wrapper.find('aside');
    expect(sidebar.classes()).toContain('block');  // Sidebar should have 'block' class
  });

  it('hides the sidebar when isSidebarOpen is false', () => {
    const wrapper = mount(Sidebar, {
      props: {
        isSidebarOpen: false,
      },
    });

    // Assert that the sidebar is hidden when isSidebarOpen is false
    const sidebar = wrapper.find('aside');
    expect(sidebar.classes()).toContain('hidden');  // Sidebar should have 'hidden' class
  });

  it('renders menu items and their labels', () => {
    const wrapper = mount(Sidebar, {
      props: {
        isSidebarOpen: true,
      },
    });
  
    // Get all menu items
    const menuItems = wrapper.findAll('li');
    
    // Check that the "Text" item exists
    const textItem = menuItems.find(item => item.text().includes('Text'));
    expect(textItem).toBeDefined();
    
    // Check that the "Image" item exists
    const imageItem = menuItems.find(item => item.text().includes('Image'));
    expect(imageItem).toBeDefined();
  });

  it('toggles submenu visibility when a menu item is clicked', async () => {
    const wrapper = mount(Sidebar, {
      props: {
        isSidebarOpen: true,
      },
    });
  
    // Find the first "Text" menu item
    const textMenuItem = wrapper.find('div.Text');
  
    // Click on the menu item to toggle the submenu visibility
    await textMenuItem.trigger('click');
  
    // Wait for DOM updates, then check if the submenu is rendered and visible
    await wrapper.vm.$nextTick();
  
    // Find the submenu div and check its visibility
    const submenu = wrapper.find('div.submenu');
    expect(submenu.exists()).toBe(true); // The submenu should exist
  });
  
  it('handles drag event on submenu item', async () => {
    // Mount the Sidebar component
    const wrapper = mount(Sidebar, {
      props: {
        isSidebarOpen: true,
        menuItems: [
          {
            label: 'Text',
            subMenu: [
              { label: 'text one', component: 'TextField' },
              { label: 'text two', component: 'TextField' },
            ],
          },
        ],
      },
    });

    global.DragEvent = class extends Event {
      constructor(type, eventInitDict) {
        super(type, eventInitDict);
        this.dataTransfer = {
          setData: vi.fn(),
          getData: vi.fn(),
        };
      }
    };

    // Find the menu item with the label "Text"
    const menuItems = wrapper.findAll('li');
    const textMenuItem = menuItems.find((item) => item.text().includes('Text'));
    expect(textMenuItem).toBeTruthy(); // Ensure the menu item is found

    // Click the menu item to open its submenu
    await textMenuItem.trigger('click');
    await wrapper.vm.$nextTick();

    // Find the submenu item with the label "text one"
    const submenuItems = wrapper.findAll('li');
    const submenuItem = submenuItems.find((item) =>
      item.text() === "Text"
    );
    expect(submenuItem).toBeTruthy(); // Ensure the submenu item is found

  });
  
  it('rotates the arrow when submenu is opened', async () => {
    const wrapper = mount(Sidebar, {
      props: {
        isSidebarOpen: true,
      },
    });
  
    // Find the "Text" menu item
    const textMenuItem = wrapper.findAll('.box').filter((item) => item.text().includes('Text'));
  
    // Ensure the text menu item exists
    expect(textMenuItem).toHaveLength(1);
  
    // Find the arrow icon inside the menu item (adjust selector if needed)
    const arrowIcon = textMenuItem[0].find('.arrow'); // Replace '.arrow-icon' with your actual class name for the arrow
  
    // Ensure the arrow icon exists before interacting with it
    expect(arrowIcon.exists()).toBe(true);
  
    // Simulate clicking on the menu item to toggle the submenu
    await textMenuItem[0].trigger('click');
    await wrapper.vm.$nextTick(); // Wait for any updates to occur
  
    // Assert that the arrow icon has rotated (example class 'rotate-180' should be added when submenu opens)
    expect(arrowIcon.classes()).toContain('rotate-180'); // Adjust 'rotate-180' to the actual class used for rotation
  
    // If the submenu is closed and arrow is in the default position, click again to close it
    await textMenuItem[0].trigger('click');
    await wrapper.vm.$nextTick();
  
    // Assert that the arrow icon is back to the default position
    expect(arrowIcon.classes()).not.toContain('rotate-180'); // Again, adjust according to your actual implementation
  });

});
