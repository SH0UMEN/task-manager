import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // Счётчик id для заметок
    idCounter: localStorage.getItem("id-counter") || 1,
    notes: localStorage.getItem("notes") ? JSON.parse(localStorage.getItem("notes")) : []
  },
  getters: {
    getNoteList(state) {
      return state.notes;
    },
    // Выборка по ID
    getNote(state) {
      return (id) => {
        return state.notes.find((el) => {
          return el.id == id;
        });
      }
    }
  },
  mutations: {
    // Удаление заметки
    deleteNote(state, id) {
      state.notes = state.notes.filter((el) => {
        return el.id != id;
      })

      localStorage.setItem("notes", JSON.stringify(state.notes));
    },
    // Обновление существующей заметки или создание новой
    updateNoteList(state, data) {
      if(data.id) {
        // Обнавляем заметку
        state.notes = state.notes.map((el) => {
          if(el.id == data.id) {
            return data.note;
          } else {
            return el;
          }
        })
      } else {
        // Создаём
        state.notes.push(Object.assign({ id: state.idCounter }, data.note));
        // Обновляем счётчик id
        localStorage.setItem("id-counter", ++state.idCounter);
      }

      // Сохраняем стейт
      localStorage.setItem("notes", JSON.stringify(state.notes));
    }
  },
  actions: {
  },
  modules: {
  }
})
