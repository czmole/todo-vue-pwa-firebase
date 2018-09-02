import todo_filter_item from '@/components/todo_filter_item/todo_filter_item'
import {
  expect
} from 'chai'
import {
  shallowMount
} from '@vue/test-utils'


describe('todo filter item', () => {
  it('should dispatch onClick event when click button', () => {
    const wrapper = shallowMount(todo_filter_item)
    const button = wrapper.find('button')
    expect(button.exists()).to.be.true
    button.trigger('click')
    expect(wrapper.emitted('onClick')).not.to.be.undefined
  })

  it('should add font-weight-bold when text equal props', () => {
    const expectedClasses = ['btn btn-link', 'font-weight-bold']
    const wrapper = shallowMount(todo_filter_item, {
      propsData: {
        text: 'equal',
        current: 'equal'
      }
    })
    const button = wrapper.find('button')
    expect(button.attributes().class.trim()).to.equal(expectedClasses.join(' '))
  })

  it('should not add font-weight-bold when text not equal props', () => {
    const expectedClasses = ['btn btn-link']
    const wrapper = shallowMount(todo_filter_item, {
      propsData: {
        text: 'equal',
        current: 'not_equal'
      }
    })
    const button = wrapper.find('button')
    expect(button.attributes().class.trim()).to.equal(expectedClasses.join(' '))
  })
})