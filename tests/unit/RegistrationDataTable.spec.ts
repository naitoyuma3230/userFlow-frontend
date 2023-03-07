import { shallowMount } from '@vue/test-utils';
import RegistrationDataTable from '@/components/parts/RegistrationDataTable.vue';

describe('プロップステスト', () => {
  it('プロップスのオブジェクトを渡す', () => {
    const companyData = {
      法人名: 'text',
      郵便番号: 'HELLO',
      住所: 'Hi',
    };

    const wrapper = shallowMount(RegistrationDataTable, {
      props: {
        registrationData: companyData,
      },
    });

    expect(wrapper.findAll('th').at(0)?.text()).toBe('法人名');
    expect(wrapper.findAll('th').at(1)?.text()).toBe('郵便番号');
    expect(wrapper.findAll('td').at(0)?.text()).toBe('text');
    expect(wrapper.findAll('td').at(1)?.text()).toBe('HELLO');
  });

  it('プロップスを渡さない場合,table要素のみ描画される', () => {
    const wrapper = shallowMount(RegistrationDataTable);

    expect(wrapper.find('table').exists()).toBe(true);
    expect(wrapper.find('th').exists()).toBe(false);
    expect(wrapper.find('td').exists()).toBe(false);
  });
});
