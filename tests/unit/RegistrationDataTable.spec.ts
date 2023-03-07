import { shallowMount } from '@vue/test-utils';
import RegistrationComplete from '@/components/pages/RegistrationComplete.vue';

describe('プロップステスト', () => {
  it('keyを文字列として取得できるオブジェクトを渡す', () => {
    interface DataObj {
      [key: string]: string;
    }

    const companyData: DataObj = {
      法人名: 'text',
      郵便番号: 'HELLO',
      住所: 'Hi',
    };

    const wrapper = shallowMount(RegistrationComplete, {
      props: {
        registrationData: companyData,
      },
    });

    expect(wrapper.find('th').exists()).toBeTruthy();
  });
});
