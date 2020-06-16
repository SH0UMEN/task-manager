<template>
    <div class="editing-page">
        <span class="page-title">{{ id ? 'Редактирование' : 'Создание' }} заметки</span>

        <note-card :note-id="id"></note-card>
    </div>
</template>

<script>
    import NoteCard from "@/components/NoteCardEditable"

    export default {
        name: "Editing",
        components: {
            NoteCard
        },
        data() {
            return {
                id: parseInt(this.$route.params["id"]) || 0
            }
        }
    }
</script>

<style scoped>

</style>