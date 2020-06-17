<template>
    <form class="note" @submit.prevent="submit">
        <!-- Панель с кнопками -->
        <div class="note__manage-panel">
            <div class="note__manage-panel-left">
                <icon-button icon-class="fas fa-arrow-left"
                             title="Вернуться на главную"
                             @click="cancel"></icon-button>
            </div>
            <div class="note__manage-panel-right">
                <icon-button icon-class="fas fa-undo"
                             title="Отменить последнее действие"
                             @click="undo"></icon-button>
                <icon-button icon-class="fas fa-redo"
                             title="Повторить отменённое действие"
                             @click="redo"></icon-button>
                <icon-button v-if="noteId"
                             icon-class="fas fa-trash"
                             title="Удалить заметку"
                             color="error"
                             @click="deleteNote"></icon-button>
            </div>
        </div>

        <div class="note__title">
            <span class="note__title-label">Название</span>
            <input required type="text" placeholder="Введите название заметки*"
                   class="note__title-input" v-model.lazy="note.title">
        </div>

        <div class="note__tasks">
            <span class="note__tasks-label">Задачи</span>

            <div v-if="note.tasks.length == 0" class="note__tasks-placeholder">
                У заметки нет задач. <button class="note__tasks-placeholder-add" @click="addTask">Нажмите, чтобы создать</button>
            </div>

            <!-- Таски -->
            <div v-else class="note__tasks-container">
                <div class="note__task" v-for="task, i in note.tasks">
                    <custom-checkbox v-model="task.done"></custom-checkbox>
                    <input required class="note__task-title" type="text"
                           v-model.lazy="task.title" placeholder="Текст задачи*">
                    <icon-button title="Удалить" color="error"
                                 icon-class="fas fa-times"
                                 @click="removeTask(i)"></icon-button>
                </div>
                <div class="note__tasks-add">
                    <icon-button title="Добавить таск" color="success"
                                 icon-class="fas fa-plus"
                                 @click="addTask()"></icon-button>
                </div>
            </div>
        </div>

        <button type="submit" class="note__submit">
            Сохранить
        </button>
    </form>
</template>

<script>
    import IconButton from "@/components/ui/IconButton"
    import CustomCheckbox from "@/components/ui/CustomCheckbox"

    export default {
        name: "NoteCard",
        props: {
            noteId: {
                type: Number,
                default: 0
            }
        },
        components: {
            IconButton,
            CustomCheckbox
        },
        data() {
            return {
                note: {
                    title: "",
                    tasks: []
                },
                // История предыдущих действий
                actionHistory: [],
                // История отменённых действий
                canceledActionHistory: []
            }
        },
        mounted() {
            // Проверяем, страница открыта в режиме редактирования или создания
            if(this.noteId) {
                this.note = Object.assign({}, this.$store.getters.getNote(this.noteId));
            } else {
                this.rememberState(this.note);
            }
        },
        watch: {
            note: {
                deep: true,
                handler(val) {
                    this.rememberState(val);
                }
            }
        },
        methods: {
            // Удаление
            deleteNote() {
                if(confirm("Вы уверены, что хотите удалить заметку?")) {
                    this.$store.commit("deleteNote", this.noteId)
                    this.$router.push({ name: 'index' });
                }
            },
            // Отмена редактирования/создания
            cancel() {
                // Сначала проверка на наличие изменений
                if(JSON.stringify(this.note) != this.actionHistory[this.actionHistory.length-1]) {
                    if(confirm("Вы уверены? Изменения не сохранятся")) {
                        this.$router.push({ name: 'index' });
                    }
                } else {
                    this.$router.push({ name: 'index' });
                }
            },
            // Запись действия
            rememberState(state) {
                // Ставим ограничение количества запоминаемых действий
                if(this.actionHistory.length == 100) {
                    this.actionHistory.pop();
                }

                this.canceledActionHistory = [];
                this.actionHistory.unshift(JSON.stringify(state));
            },
            // Сохранение
            submit() {
                this.$store.commit("updateNoteList", {
                    note: this.note,
                    id: this.noteId || 0
                });
                this.$router.push({ name: "index" })
            },
            // Добавление нового таска
            addTask() {
                let temp = this.note.tasks.slice();
                temp.push({
                    done: false,
                    title: ""
                });
                this.note.tasks = temp;
            },
            // Удаление таска
            removeTask(index) {
                this.note.tasks = this.note.tasks.filter((el, i) => {
                    return index != i;
                });
            },
            // Отмена действия
            undo() {
                if(this.actionHistory.length > 1) {
                    let prevState = this.actionHistory.shift();
                    this.canceledActionHistory.unshift(prevState);
                    prevState = this.actionHistory.shift();
                    this.note = Object.assign({}, JSON.parse(prevState));
                }
            },
            // Повтор действия
            redo() {
                if(this.canceledActionHistory.length > 0) {
                    let canceledState = this.canceledActionHistory.shift();
                    this.note = Object.assign({}, JSON.parse(canceledState));
                }
            }
        }
    }
</script>

<style lang="sass">
    @import "../assets/sass/note"
</style>