<template>
    <div class="index-page">
        <span class="page-title">Все заметки</span>
        <router-link class="index-page__create-link" :to="{ name: 'create' }">Создать заметку</router-link>

        <div class="index-page__notes">
            <note-card class="index-page__note" v-for="note in notes" :note="note">
            </note-card>
        </div>
    </div>
</template>

<script>
    import NoteCard from "@/components/NoteCardStatic"

    export default {
        name: "Index",
        components: {
            NoteCard
        },
        computed: {
            notes() {
                return this.$store.getters.getNoteList;
            }
        }
    }
</script>

<style lang="sass">
    @import "../assets/sass/index"
</style>