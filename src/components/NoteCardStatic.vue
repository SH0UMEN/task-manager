<template>
    <div class="note note--static">
        <!-- Панель с кнопками -->
        <div class="note__manage-panel">
            <div class="note__manage-panel-left">
            </div>
            <div class="note__manage-panel-right">
                <icon-button icon-class="fas fa-pencil-alt"
                             title="Редактировать"
                             color="handle"
                             @click="$router.push({ name: 'edit', params: { id: note.id } })"></icon-button>
                <icon-button icon-class="fas fa-trash"
                             title="Удалить"
                             color="error"
                             @click="deleteNote"></icon-button>
            </div>
        </div>

        <div class="note__title">
            <span class="note__title-label">{{ note.title }}</span>
        </div>

        <div class="note__tasks">
            <div v-if="note.tasks.length == 0" class="note__tasks-placeholder">
                У заметки нет задач.
            </div>

            <!-- Таски -->
            <div v-else-if="note.tasks.length <= 3" class="note__tasks-container">
                <div class="note__task" v-for="task, i in note.tasks">
                    <custom-checkbox disabled v-model="task.done"></custom-checkbox>
                    <span class="note__task-title">{{ task.title }}</span>
                </div>
            </div>

            <div v-else class="note__tasks-container">
                <div class="note__task" v-for="i in 3">
                    <custom-checkbox disabled v-model="note.tasks[i-1].done"></custom-checkbox>
                    <span class="note__task-title">{{ note.tasks[i-1].title }}</span>
                </div>
                ...
            </div>
        </div>
    </div>
</template>

<script>
    import IconButton from "@/components/ui/IconButton"
    import CustomCheckbox from "@/components/ui/CustomCheckbox"

    export default {
        name: "NoteCard",
        components: {
            IconButton,
            CustomCheckbox
        },
        props: {
            note: {
                type: Object,
                default: () => {}
            }
        },
        methods: {
            deleteNote() {
                if(confirm("Вы уверены, что хотите удалить заметку?")) {
                    this.$store.commit("deleteNote", this.note.id)
                }
            }
        }
    }
</script>

<style lang="sass">
    @import "../assets/sass/note"
</style>