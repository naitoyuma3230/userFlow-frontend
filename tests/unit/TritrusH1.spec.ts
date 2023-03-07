import { shallowMount } from '@vue/test-utils';
import TritrusH1 from '@/components/parts/TritrusH1.vue';

describe('スロットテスト', () => {
  it('スロットに"HELLO"を渡すと<h1>タグに"HELLO"が描画される', () => {
    const wrapper = shallowMount(TritrusH1, {
      slots: {
        default: 'HELLO',
      },
    });

    expect(wrapper.get('h1').text()).toBe('HELLO');
  });
});
