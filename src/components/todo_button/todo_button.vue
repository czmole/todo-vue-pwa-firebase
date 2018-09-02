<template>
  <button class="todo-btn" @click="onClick">
    <font-awesome-icon class="fa-fw mr-1" :icon="icon"></font-awesome-icon>
     <!-- @slot text -->
    <slot class="text-light"></slot>
  </button>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
export default {
  name: "todo_button",
  props: {
    icon: String
  },
  components: {
    FontAwesomeIcon
  },
  methods: {
    onClick() {
      /**
       * click button event
       *
       * @event onClick
       * @type {undefined}
       */
      this.$emit("onClick");
    }
  }
};
</script>

<style lang="scss">
.todo-btn {
  &:hover,
  &:active {
    border-bottom: 1px solid;
    margin-bottom: -1px;
  }
  background: transparent;
  color: rgba(255, 255, 255, 0.85);
  border: white;
  cursor: pointer;
}
</style>