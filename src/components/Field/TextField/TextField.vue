<template>
    <div class="py-2">
        <input
            :id="id"
            :type="type"
            v-model="value"
            :placeholder="placeholder"
            :class="['w-full focus:outline-none first-letter:capitalize', item.textAlignment, item.textSize, item.fontWeight, item.fontStyle]"
        />
    </div>
</template>

<script>
    export default {
        name: "TextField",
        props: {
            id: {
                type: Number,
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
            modalValue: {
                type: String,
                default: "welcome to drag-drop builder",
            },
            placeholder: {
                type: String,
                default: "Enter text here...",
            },
            item: {
                type: Object,
                required: true,
            }
        },
        computed: {
            value: {
                get() {
                    return this.modalValue;
                },
                set(newValue) {
                    // Emit updated value along with associated properties
                    this.$emit("update:modalValue", { id: this.id, value: newValue });
                },
            },
        }
    };
</script>
