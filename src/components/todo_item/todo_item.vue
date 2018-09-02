<template>
  <div class="todo-item">
    <div v-show="isEditMode">
      <input ref="textbox" class="todo-item__textbox" v-model="updateTodoName" type="text" @keydown.enter="renameTodo">
      <div class="todo-item__buttons-wrapper">
        <todo_button class="todo-item__btn-update" icon="edit" @onClick="renameTodo">Update</todo_button>
        <todo_button class="todo-item__btn-goBack" icon="window-close" @onClick="exitEditMode">Go back</todo_button>
      </div>
    </div>
    <div v-show="!isEditMode">
      <todo_checkbox
        modifierClass="white"
        @onToggle="toggleTodo"
        :text="todo.name"
        :checked="todo.completed"
        class="d-inline"
        :textClass="computedTextClass">
      </todo_checkbox>
      <div class="todo-item__buttons-wrapper">
        <todo_button class="todo-item__btn-edit" icon="edit" @onClick="enterEditMode">Edit</todo_button>
        <todo_button class="todo-item__btn-delete" icon="trash" @onClick="deleteTodo">Delete</todo_button>
      </div>
    </div>
  </div>
</template>

<script>
import todo_button from "../todo_button/todo_button";
import todo_checkbox from "../todo_checkbox/todo_checkbox";

export default {
  props: {
    /**
     * Todo object - schema: {key:string, name:string, complete:boolean}
     */
    todo: {
      type: Object
    }
  },
  data() {
    return {
      isEditMode: false,
      updateTodoName: ""
    };
  },
  components: {
    todo_button,
    todo_checkbox
  },
  methods: {
    enterEditMode() {
      this.updateTodoName = this.todo.name;
      this.isEditMode = true;
      setTimeout(() => {
        this.$refs.textbox.focus;
      }, 1);
    },
    exitEditMode() {
      this.isEditMode = false;
    },
    deleteTodo() {
      /**
     * Delete todo event. Parameter: todo string
     *
     * @event onDelete
     * @type {string}
     */
      this.$emit("onDelete", this.todo.key);
    },
    renameTodo() {
      if (this.updateTodoName==='') {
        this.$emit("onDelete", this.todo.key);
      }

      /**
     * Update todo event. Parameter: new todo object
     *
     * @event onUpdate
     * @type {object}
     */
      this.$emit("onUpdate", { ...this.todo, name: this.updateTodoName });
      this.isEditMode = false
    },
    toggleTodo() {
      this.$emit("onUpdate", { ...this.todo, completed: !this.todo.completed });
    }
  },
  computed: {
    computedTextClass () {
      return ['todo-item__checkbox-text', this.todo.completed ? 'todo-item__checkbox-text--completed' : ''] .join(' ')
    }
  }
};
</script>

<style lang="scss">
.todo-item {
  position: relative;
  padding: 10px;
  color: rgba(255, 255, 255, 0.85);
  &__buttons-wrapper {
    position: absolute;
    display: inline-flex;
    right: 0;
  }
  &__textbox {
    background: transparent;
    border: 0px;
    color: white;
    outline: 0px;
    width: 100%;
    padding-right: 190px;
  }
  &__checkbox-text {
    &,
    &:hover,
    &:active,
    &:focus {
      color: rgba(255, 255, 255, 0.85);
      
    }

    &--completed {
      text-decoration: line-through !important;
    }

  }
  border-bottom: 1px solid rgba(255, 255, 255, 0.85);
}
</style>
