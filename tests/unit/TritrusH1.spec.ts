import { shallowMount } from '@vue/test-utils';
import TritrusH1 from '@/components/atoms/TritrusH1.vue';

describe('TritrusH1.vue', () => {
  it('見出し文字表示', () => {
    const text = 'headline 1';
    const wrapper = shallowMount(TritrusH1, {
      slots: {
        default: text,
      },
    });
    expect(wrapper.text()).toMatch(text);
  });
});
