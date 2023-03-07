import { shallowMount } from '@vue/test-utils';
import SelectDataTable from '@/components/parts/SelectDataTable.vue';

type Item = Hospital | CareOffice | OtherOffice;

describe('プロップステスト', () => {
  it('プロップスでitemDataとheaderNameを渡すとテーブルに表示される', () => {
    const itemProps: Item[] = [
      {
        id: 10,
        nameKana: '田中',
        name: '太郎',
        code: '123456',
        postCode: '123-1234',
        address: '東京目黒',
        departments: ['デパート1', 'デパート2'],
      },
      {
        id: 12,
        nameKana: '斎藤',
        name: 'たかし',
        code: '111111',
        postCode: '123-456',
        address: '東京恵比寿',
        departments: ['デパート3', 'デパート4'],
      },
    ];

    const wrapper = shallowMount(SelectDataTable, {
      props: {
        itemData: itemProps,
        headerName: 'head',
      },
    });

    expect(wrapper.findAll('th').at(0)?.text()).toBe('head');
    expect(wrapper.findAll('td').at(0)?.text()).toBe('太郎');
    expect(wrapper.findAll('td').at(1)?.findAll('p').at(0)?.text()).toBe(
      '123-1234'
    );
    expect(wrapper.findAll('td').at(1)?.findAll('p').at(1)?.text()).toBe(
      '東京目黒'
    );
  });
  it('データ数が6以上では5件表示される', () => {
    const testData: Item[] = [];
    for (let i = 0; i < 20; i++) {
      const obj = {
        id: i,
        nameKana: `kana${i}`,
        name: `name${i}`,
        code: `code${i}`,
        postCode: `postCode${i}`,
        address: `address${i}`,
        departments: [`デパート1-${i}`, `デパート2-${i}`],
      };
    }
    const wrapper = shallowMount(SelectDataTable, {
      props: {
        itemData: testData,
        headerName: 'manyData',
      },
    });
    expect(wrapper.findAll('th').at(0)?.text()).toBe('head');
  });
});
