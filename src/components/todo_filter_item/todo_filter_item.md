```vue
<script>
  export default {
    data () {
      return {
        filterItems: ['a', 'b', 'c'],
        current: 'a'
      }
    },
    methods: {
      onClick (newState) {
        this.current = newState
      }
    }
  }
</script>

<template>
  <div>
    <todo_filter_item v-for="filterItem in filterItems" :text="filterItem" :current="current" @onClick="onClick" />
  </div>
</template>
```