<template>
    <div class="focus:outline-none py-2">
        <input
            :id="id"
            :type="type"
            v-model="value"
            :placeholder="placeholder"
            :class="classData" 
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
            modalValue: {
                type: String,
                default: "welcome to drag-drop builder",
            },
            placeholder: {
                type: String,
                default: "Enter text here...",
            },
            classData: {
                type: String,
                default: "w-full focus:outline-none first-letter:capitalize",
            }
        },
        computed: {
            value: {
                get() {
                    return this.modalValue;
                },
                set(newValue) {
                    // Emit updated value
                    this.$emit("update:modalValue", {id: this.id, value: newValue, class: this.classData});
                },
            },
        },

    };
</script>
