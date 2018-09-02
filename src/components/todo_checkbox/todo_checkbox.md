```jsx
let globalChecked = false
<todo_checkbox
  :text="globalChecked.toString()"
  :checked=globalChecked
  @onToggle="globalChecked=!globalChecked">
</todo_checkbox>
```

