import { shallowMount } from '@vue/test-utils';
import SelectDataTable from '@/components/parts/SelectDataTable.vue';

type Item = Hospital | CareOffice | OtherOffice;

describe('プロップステスト', () => {
  it('プロップスを渡す', () => {
    const hospitalProps: Item[] = [
      {
        id: 4,
        nameKana: 'test',
        name: 'hello',
        code: 'world',
        postCode: 'testcode',
        address: 'tsetaddress',
        departments: ['デパート1', 'デパート2'],
      },
      {
        id: 4,
        nameKana: '田中',
        name: '太郎',
        code: '123-123',
        postCode: '123-11111',
        address: '東京都123-123',
        departments: ['デパート3', 'デパート4'],
      },
    ];

    const wrapper = shallowMount(SelectDataTable, {
      props: {
        itemData: hospitalProps,
        headerName: 'HELLO',
      },
    });

    expect(wrapper.find('th').text()).toBe('HELLO');
  });
});
