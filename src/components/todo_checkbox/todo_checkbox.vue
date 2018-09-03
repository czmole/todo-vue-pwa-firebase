<template>
  <div :class="computedContainerClass">
    <div class="bouncechk__wrapper">
      <input
        ref="input"
        @input="toggleCheckbox"
        @click="toggleCheckbox"
        :checked='checked'
        type='checkbox'
        class="bouncechk__input"
        :id="computedId" />
      <label class="bouncechk__label" :for="computedId" />
    </div>
    <a href="#" @click.prevent="toggleCheckbox" :class="computedTextClass">{{text}}</a>
  </div>
</template>

<script>
function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

export default {
  props: {
    /**
     * Automatically generate if not provide
     */
    id: {
      type: String
    },
    containerClass: {
      type: String
    },
    /**
     * Configure checkbox theme by add modifierClass to BEM class: bouncechk__label--{modifierClass}
     */
    textClass: {
      type: String
    },

    /**
     * Add text to checkbox
     */
    text: {
      type: String
    },
    checked: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    computedContainerClass () {
      return ['bouncechk', this.containerClass || '']
    },

    computedTextClass () {
      return ['bouncechk__text', this.textClass || '']
    },

    computedId () {
      return this.id || makeid()
    }
  },
  methods: {
    /**
       * toggle checkbox event. para: new checkbox checked state
       *
       * @event onCreate
       * @type {Boolean} name of todo will be create
       */
    toggleCheckbox () {
      this.$emit('onToggle', !this.value)
    },
  }
}
</script>

<style lang="sass" src="./todo_checkbox.sass">

</style>

