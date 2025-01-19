<template>
  <div class="focus:outline-none py-2">
    <input
      :id="id"
      :type="type"
      v-model="value"
      :placeholder="placeholder"
      class="w-full focus:outline-none first-letter:capitalize"
    />
  </div>
</template>

<script>
export default {
  name: "TextField",
  props: {
    id: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: "Label",
    },
    type: {
      type: String,
      default: "text",
    },
    modelValue: {
      type: String,
      default: "welcome to drag-drop builder", // Allow default value for the text field
    },
    placeholder: {
      type: String,
      default: "Enter text here...", // Default placeholder text
    },
  },
  computed: {
    value: {
      get() {
        return this.modelValue;
      },
      set(newValue) {
        this.$emit("update:modelValue", newValue);
      },
    },
  },
};
</script>
