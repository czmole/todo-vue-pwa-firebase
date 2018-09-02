<template>
  <div class="todo-form todo-form__wrapper">
  <input
    @keydown.enter="onKeyPressEnter"
    v-model="name"
    class="textbox todo-form__textbox"
    placeholder="Enter job to be done"
  />
    <todo_button
      class="todo-form__button"
      icon="plus-circle"
      v-once
      v-if="name!==''"
      :onClick="onCreateTodo"
    >
      Add
    </todo_button>
  </div>
</template>

<script>
import todo_button from "../todo_button/todo_button";
export default {
  data() {
    return {
      name: ""
    };
  },
  methods: {
    onKeyPressEnter() {
      if (this.name !== "") {
        this.onCreateTodo();
      }
    },

    onCreateTodo() {
      /**
       * create todo event
       *
       * @event onCreate
       * @type {string} name of todo will be create
       */
      this.$emit("onCreate", name);
    }
  },

  components: {
    todo_button
  }
};
</script>

<style lang="scss">
.todo-form {
  position: relative;
  display: inline-block;
  &__textbox {
    &,
    &:active,
    &:hover,
    &:focus {
      padding-right: 75px;
    }
  }

  &__button {
    position: absolute;
    right: 12px;
    top: 7px;
  }
}
</style>