import todo_button from '@/components/todo_button/todo_button.vue'
import { shallowMount } from '@vue/test-utils'
import { expect } from 'chai'

describe('todo_button', () => {
  it('should dispatch onClick event if button being click', () => {
    const wrapper = shallowMount(todo_button, {
      propsData: {
        icon: 'spinner'
      }
    })
    const button = wrapper.find('button')
    expect(button.exists()).to.be.true
    button.trigger('click')
    expect(wrapper.emitted().onClick).not.to.be.undefined
  })

  it('should render button with icon', () => {
    const wrapper = shallowMount(todo_button, {
      propsData: {
        icon: 'spinner'
      }
    })
  })
})