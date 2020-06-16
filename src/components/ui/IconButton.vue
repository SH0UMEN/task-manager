<template>
    <button :type="type" @click="$emit('click')" :title="title" class="icon-button">
        <i class="icon-button__icon" :class="[ iconClass, color ? 'icon-button__icon--'+color : '' ]"></i>
    </button>
</template>

<script>
    export default {
        name: "IconButton",
        props: {
            iconClass: {
                type: String,
                required: true
            },
            title: {
                type: String,
                default: ""
            },
            type: {
                type: String,
                default: "button"
            },
            color: {
                type: String,
                default: ""
            }
        }
    }
</script>

<style lang="sass">
    @import "../../assets/sass/ui/icon-button"
</style>