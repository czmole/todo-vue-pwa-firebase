<template>
  <div class="todo-filter-item">
    <button :class="computedButtonClass" @click="onClick">
      {{text}}
    </button>
    <span class="todo-filter-item__divider">|</span>
  </div>
</template>

<script>
export default {
  props: {
    text: String,
    /**
     * If text equal string it will add active class to button
     */
    current: String
  },
  computed: {
    computedButtonClass () {
      return [
        'btn btn-link',
        this.text === this.current ? 'font-weight-bold' : ''
      ]
    }
  },
  methods: {
    onClick () {
      /**
       * para: new filterState
       *
       * @event onClick
       * @type {string}
       */
      this.$emit('onClick', this.text)
    }
  }
};
</script>

<style lang="scss">
  .todo-filter-item {
    display: inline-block;
    &__divider {
      color: white;
    }

    &:last-child &__divider {
      display: none;
    }
  }
</style>
