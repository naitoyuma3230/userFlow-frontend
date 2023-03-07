import { shallowMount } from '@vue/test-utils';
import RegistrationComplete from '@/components/pages/RegistrationComplete.vue';

describe('プロップステスト', () => {
  it('props', () => {
    const wrapper = shallowMount(RegistrationComplete, {
      slots: {
        default: 'HELLO',
      },
    });

    expect(wrapper.get('h1').text()).toBe('HELLO');
  });
});
