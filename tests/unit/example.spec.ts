import { shallowMount } from '@vue/test-utils'
import NotFound from "@/views/NotFound.vue";

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(NotFound, {
      props: { msg }
    })
    // expect(wrapper.vm.$data.isModalVisible).toBe(true)
    expect(wrapper.element).toMatchSnapshot();
  })
})
