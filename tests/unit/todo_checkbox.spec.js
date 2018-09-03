import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import Checkbox from '../../src/components/todo_checkbox/todo_checkbox'

let wrapper = null
let onClicked = null

describe('Checkbox.vue', () => {
  it('should generate random id if not provide', () => {
    wrapper = shallowMount(Checkbox, {
      propsData: {
        checked: true
      }
    })

    const id = wrapper.vm.computedId
    // If not generate computedId will be some string that is not null/undefined/empty
    expect(id).to.not.equal('undefined')
  })

  it('should use id if provide', async () => {
    wrapper = shallowMount(Checkbox, {
      propsData: {
        checked: true,
        id: '123'
      }
    })

    // ^ Same as above
    const id = wrapper.vm.computedId
    // If not generate computedId will be some string that is not null/undefined/empty
    expect(id).to.equal('123')
  })

  it('should emmit toggle event when click text', () => {
    wrapper = shallowMount(Checkbox, {
      propsData: {
        checked: true,
        id: 'test',
        textClass: 'test',
        text: 'test'
      }
    })

    const anchor = wrapper.find('a')
    expect(anchor.exists()).to.be.true
    anchor.trigger('click')
    expect(wrapper.emitted('onToggle')).not.to.be.undefined
  })

  it('should emmit toggle event when click on checkbox', () => {
    wrapper = shallowMount(Checkbox, {
      propsData: {
        checked: true,
        id: 'test',
        textClass: 'test',
        text: 'test'
      }
    })

    const checkbox = wrapper.find('input[type="checkbox"]')
    expect(checkbox.exists()).to.be.true
    checkbox.trigger('click')
    expect(wrapper.emitted('onToggle')).not.to.be.undefined
  })
  
  it('should assign textClass add text props to span', () => {
    wrapper = shallowMount(Checkbox, {
      propsData: {
        checked: true,
        id: 'test',
        textClass: 'test',
        text: 'test'
      }
    })

    const a = wrapper.find('a')
    expect(a.exists()).to.equal(true)
    expect(a.classes(['.bounce__text', 'test']))
    expect(a.text()).to.equal('test')
  })

  it('should assign containerClass to innerDiv', () => {
    wrapper = shallowMount(Checkbox, {
      propsData: {
        checked: true,
        onClicked: onClicked,
        id: 'test',
        containerClass: 'test'
      }
    })

    const div = wrapper.find('div')
    expect(div.exists()).to.equal(true)
    expect(div.classes(['.bouncechk', 'test']))
  })

  it('should assign modifierClass to label', () => {
    wrapper = shallowMount(Checkbox, {
      propsData: {
        checked: true,
        onClicked: onClicked,
        id: 'test',
        modifierClass: 'pink'
      }
    })

    const label = wrapper.find('label')
    expect(label.classes(['.bounce__label', 'bounce__label--pink']))
  })

  it('should use blue as default modifier if not provide', () => {
    wrapper = shallowMount(Checkbox, {
      propsData: {
        checked: true,
        onClicked: onClicked,
        id: 'test'
      }
    })

    const label = wrapper.find('label')
    expect(label.classes(['.bounce__label', 'bounce__label--blue']))
  })
})
