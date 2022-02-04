import { shallowMount } from '@vue/test-utils'
import Tasks from '@/views/Tasks.vue'

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(Tasks, {
      props: { msg }
    })
    expect(wrapper.vm.$data.isModalVisible).toBe(true)
  })
})
