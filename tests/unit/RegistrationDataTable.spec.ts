import { mount } from '@vue/test-utils';
import RegistrationDataTable from '@/components/parts/RegistrationDataTable.vue';
import { test, expect, describe } from 'vitest';

describe('プロップステスト', () => {
  test('プロップスを渡さないとtr,thは描画されない', () => {
    const wrapper = mount(RegistrationDataTable);
    expect(wrapper.find('table').exists()).toBe(true);
    expect(wrapper.find('th').exists()).toBe(false);
    expect(wrapper.find('tr').exists()).toBe(false);
  });

  test('プロップスregistrationDataを渡すとkey,valueがそれぞれth,tdに表示される', () => {
    const wrapper = mount(RegistrationDataTable, {
      props: {
        registrationData: {
          法人名: 'hello',
          郵便番号: 'hi',
          住所: 'WO',
        },
      },
    });

    expect(wrapper.findAll('th').at(0)?.text()).toBe('法人名');
    expect(wrapper.findAll('th').at(1)?.text()).toBe('郵便番号');
    expect(wrapper.findAll('td').at(0)?.text()).toBe('hello');
    expect(wrapper.findAll('td').at(1)?.text()).toBe('hi');
  });

  test('プロップスを渡さない場合,table要素のみ描画される', () => {
    const wrapper = mount(RegistrationDataTable);

    expect(wrapper.find('table').exists()).toBe(true);
    expect(wrapper.find('th').exists()).toBe(false);
    expect(wrapper.find('td').exists()).toBe(false);
  });
});
