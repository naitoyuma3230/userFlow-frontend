import { mount } from '@vue/test-utils';
import TritrusH1 from '@/components/parts/TritrusH1.vue';
import { test, expect, describe } from 'vitest';

describe('スロットテスト', () => {
  test('スロットに"HELLO"を渡すと<h1>タグに"HELLO"が描画される', () => {
    const wrapper = mount(TritrusH1, {
      slots: {
        default: 'HELLO',
      },
    });

    expect(wrapper.get('h1').text()).toBe('HELLO');
  });
});
