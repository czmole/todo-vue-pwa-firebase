import todo_form from '@/components/todo_form/todo_form'
import todo_button from '@/components/todo_button/todo_button'
import { shallowMount, mount } from '@vue/test-utils'
import {
  expect
} from 'chai'

describe('todo form', () => {
  it('dispatch onCreate when press enter and have text inside', () => {
    const wrapper = shallowMount(todo_form, {
      data() {
        return {
          name: 'test'
        }
      }
    })
    wrapper.find('input').trigger('keydown.enter')
    expect(wrapper.emitted().onCreate)
  })

  it('dispatch onCreate when press add button', () => {
    const wrapper = mount(todo_form, {
      data() {
        return {
          name: 'test'
        }
      }
    })
    const button = wrapper.find('button')
    button.trigger('click')
    expect(wrapper.emitted().onCreate)
  })

  it('not dispatch on create when pres enter and not have text inside', () => {
    const wrapper = shallowMount(todo_form, {
    })
    wrapper.find('input').trigger('keydown.enter')
    expect(wrapper.emitted().onCreate)
  })

  it('show add button if have text inside', () => {
    const wrapper = shallowMount(todo_form, {
      data() {
        return {
          name: 'test'
        }
      }
    })

    const button = wrapper.find(todo_button)
    expect(button.exists()).to.be.true
  })

  it('not show add button if not have text inside', () => {
    const wrapper = shallowMount(todo_form, {

    })
    const button = wrapper.find(todo_button)
    expect(button.exists()).to.be.false
  })
})