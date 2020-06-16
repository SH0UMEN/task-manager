<template>
    <label class="custom-checkbox" :class="{ 'custom-checkbox--disabled': disabled }" :title="title">
        <input :disabled="disabled" type="checkbox" v-model="tValue" class="custom-checkbox__input">

        <span class="custom-checkbox__box">
            <i v-if="tValue" class="fas fa-check"></i>
        </span>
    </label>
</template>

<script>
    export default {
        name: "CustomCheckbox",
        props: {
            value: {
                type: Boolean,
                default: false
            },
            title: {
                type: String,
                default: ""
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            tValue: {
                get() {
                    return this.value;
                },
                set(val) {
                    this.$emit("input", val);
                }
            }
        }
    }
</script>

<style lang="sass">
    @import "../../assets/sass/ui/custom-checkbox"
</style>