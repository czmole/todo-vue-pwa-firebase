Completed todo :
```jsx
  let todo = {
    key: '123',
    completed: true,
    name: 'test'
  }

  function onUpdate (newTodoData) {
    todo.completed = newTodoData.completed
    todo.name = newTodoData.name
  }

  <todo_item
    :todo=todo
    @onUpdate="onUpdate"
  />
```