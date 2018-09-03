import todo_item from '@/components/todo_item/todo_item'

// Setup testing library
import {
  shallowMount, mount
} from '@vue/test-utils'
import {
  expect
} from 'chai'
import Vue from 'vue';

// Setup fontawesome library
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faTrash,
  faEdit,
  faWindowClose,
  faPlusCircle,
} from '@fortawesome/free-solid-svg-icons'
library.add(
  faTrash,
  faEdit,
  faWindowClose,
  faPlusCircle,
)

const mockedTodo = {
  name: 'test',
  completed: true,
  key: 123
}

describe('todo item', () => {
  describe('computed text class', () => {
    it('add textClass: ["todo-item__checkbox-text", "todo-item__checkbox-text--completed"] when todo completed', () => {
      const wrapper = shallowMount(todo_item, {
        propsData: {
          todo: mockedTodo
        }
      })

      expect(wrapper.vm.computedTextClass).to.equal([
        'todo-item__checkbox-text',
        'todo-item__checkbox-text--completed'
      ].join(' '))
    })

    it('add textClass: todo-item__checkbox-text when todo not completed', () => {
      const wrapper = shallowMount(todo_item, {
        propsData: {
          todo: {
            name: 'test',
            completed: false,
            key: 123
          }
        }
      })
      expect(wrapper.vm.computedTextClass.trim()).to.eql([
        'todo-item__checkbox-text'
      ].join(' '))
    })
  })

  describe('delete', () => {
    it('call onDelete when click delete', () => {
      const wrapper = mount(todo_item, {
        propsData: {
          todo: mockedTodo
        }
      })

      const deleteButton = wrapper.find('button.todo-item__btn-delete')
      expect(deleteButton.exists()).to.be.true
      deleteButton.trigger('click')
      expect(wrapper.emitted('onDelete')[0]).to.eql([123])
    })

    it('dispatch event onDelete when click button:rename in edit mode and have no text in input', () => {
      // Go to edit mode
      const wrapper = mount(todo_item, {
        propsData: {
          todo: mockedTodo
        }
      })
      const editButton = wrapper.find('button.todo-item__btn-edit')
      expect(editButton.exists()).to.be.true
      editButton.trigger('click')

      // Change the text
      wrapper.setData({
        isEditMode: true,
        updateTodoName: ""
      })


      // Press edit buttoon
      const updateButton = wrapper.find('button.todo-item__btn-update')
      updateButton.trigger('click')

      // Expect it to emit update wit todo name
      expect(wrapper.emitted('onDelete')).not.to.be.undefined
    })

    it('dispatch event onDelete when press enter in edit mode and have no text in input', () => {
      // Go to edit mode
      const wrapper = mount(todo_item, {
        propsData: {
          todo: mockedTodo
        }
      })
      const editButton = wrapper.find('button.todo-item__btn-edit')
      expect(editButton.exists()).to.be.true
      editButton.trigger('click')

      // Change the text
      wrapper.setData({
        isEditMode: true,
        updateTodoName: ""
      })

      // Press enter
      const input = wrapper.find('input[type="text"]')
      input.trigger('keydown.enter')

      // Expect it to emit update when new todo name
      expect(wrapper.emitted('onDelete')).not.to.be.undefined
    })
  })

  describe('update', () => {
    it('set update todo name when enter edit mode', () => {
      // Click edit button
      const wrapper = mount(todo_item, {
        propsData: {
          todo: mockedTodo
        }
      })

      const editButton = wrapper.find('button.todo-item__btn-edit')
      expect(editButton.exists()).to.be.true
      editButton.trigger('click')

      // Expect update todo name to be todo.name
      expect(wrapper.vm.updateTodoName).to.equal('test')
    })

    it('dispatch event onUpdate with todo being toggle when click input:checkbox', () => {
      // Init
      const wrapper = mount(todo_item, {
        propsData: {
          todo: mockedTodo
        }
      })

      // Find and press check box
      const checkbox = wrapper.find('input[type="checkbox"]')
      expect(checkbox.exists()).to.be.true
      checkbox.trigger('click')

      // Expect to emit update when completed being toggle
      expect(wrapper.emitted('onUpdate')[0]).to.eql([
        Object.assign({}, mockedTodo, {
          completed: false
        })
      ])
    })

    it('dispatch event onUpdate and set data editMode to false with new name when click button:rename in edit mode', () => {
      // Go to edit mode
      const wrapper = mount(todo_item, {
        propsData: {
          todo: mockedTodo
        }
      })
      const editButton = wrapper.find('button.todo-item__btn-edit')
      expect(editButton.exists()).to.be.true
      editButton.trigger('click')

      // Change the text
      wrapper.setData({
        isEditMode: true,
        updateTodoName: "new name"
      })


      // Press edit buttoon
      const updateButton = wrapper.find('button.todo-item__btn-update')
      updateButton.trigger('click')

      // Expect it to emit update wit todo name
      expect(wrapper.emitted('onUpdate')[0][0]).to.be.eql({
        name: 'new name',
        completed: true,
        key: 123
      })
    })

    it('dispatch event onUpdate and set data editMode to false with new name when press enter in edit mode', () => {
      // Go to edit mode
      const wrapper = mount(todo_item, {
        propsData: {
          todo: mockedTodo
        }
      })
      const editButton = wrapper.find('button.todo-item__btn-edit')
      expect(editButton.exists()).to.be.true
      editButton.trigger('click')

      // Change the text
      wrapper.setData({
        isEditMode: true,
        updateTodoName: "new name"
      })

      // Press enter
      const input = wrapper.find('input[type="text"]')
      input.trigger('keydown.enter')

      // Expect it to emit update when new todo name
      expect(wrapper.emitted('onUpdate')[0][0]).to.eql({
        name: 'new name',
        completed: true,
        key: 123
      })
    })
  })

  describe('misc', () => {
    it('start with editMode = false', () => {
      const wrapper = shallowMount(todo_item, {
        propsData: {
          todo: mockedTodo
        }
      })
      expect(wrapper.vm.isEditMode).to.be.false
    })

    it('set editMode = true when click edit button', async () => {
      const wrapper = mount(todo_item, {
        propsData: {
          todo: mockedTodo
        }
      })
      const editButton = wrapper.find('button.todo-item__btn-edit')
      expect(editButton.exists()).to.be.true
      editButton.trigger('click')
      await Vue.nextTick()
      expect(wrapper.vm.isEditMode).to.be.true
    })

    it('set editMode = false when click goBack button', async () => {
      const wrapper = mount(todo_item, {
        propsData: {
          todo: mockedTodo
        },
        data () {
          return {
            updateTodoName: '',
            isEditMode: true
          }
        } 
      })

      const goBackButton = wrapper.find('button.todo-item__btn-goBack')
      goBackButton.trigger('click')
      await Vue.nextTick()
      expect(wrapper.vm.isEditMode).to.be.false
    })
  })
})
