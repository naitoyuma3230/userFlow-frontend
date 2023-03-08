import { shallowMount, mount } from '@vue/test-utils';
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
});
describe('データを渡してテーブルの表示をチェックする', () => {
  it('データ数が4件未満ではデータ数分のテーブルと、補完のダミーを合わせて5件表示される', () => {
    const testData: Item[] = [];

    const dataCount = 3;
    for (let i = 0; i < dataCount; i++) {
      const obj = {
        id: i,
        nameKana: `kana${i}`,
        name: `name${i}`,
        code: `code${i}`,
        postCode: `postCode${i}`,
        address: `address${i}`,
        departments: [`デパート1-${i}`, `デパート2-${i}`],
      };
      testData.push(obj);
    }
    const wrapper = shallowMount(SelectDataTable, {
      props: {
        itemData: testData,
        headerName: 'manyData',
      },
    });
    // 総データ
    expect(wrapper.find('.item-list__body').findAll('tr').length).toBe(5);
    // 空データ
    expect(
      wrapper.find('.item-list__body').findAll('tr').at(3)?.find('td').text()
    ).toBe('');
    expect(
      wrapper.find('.item-list__body').findAll('tr').at(4)?.find('td').text()
    ).toBe('');
  });

  it('データ数が6以上では5件表示される。', () => {
    const testData: Item[] = [];

    const dataCount = 20;
    for (let i = 0; i < dataCount; i++) {
      const obj = {
        id: i,
        nameKana: `kana${i}`,
        name: `name${i}`,
        code: `code${i}`,
        postCode: `postCode${i}`,
        address: `address${i}`,
        departments: [`デパート1-${i}`, `デパート2-${i}`],
      };
      testData.push(obj);
    }
    const wrapper = shallowMount(SelectDataTable, {
      props: {
        itemData: testData,
        headerName: 'manyData',
      },
    });
    expect(wrapper.findAll('th').at(0)?.text()).toBe('manyData');
    const tablesTr = wrapper.find('.item-list__body').findAll('tr');
    expect(tablesTr.length).toBe(5);
  });
});

describe('テーブルクリックのエミットテスト', () => {
  it('データテーブルをクリックすると,tdのitem情報がselectItemに渡りemitされる', async () => {
    const dataCount = 24;
    const testData: Item[] = [];
    for (let i = 0; i < dataCount; i++) {
      const obj = {
        id: i,
        nameKana: `kana${i}`,
        name: `name${i}`,
        code: `code${i}`,
        postCode: `postCode${i}`,
        address: `address${i}`,
        departments: [`デパート1-${i}`, `デパート2-${i}`],
      };
      testData.push(obj);
    }
    const wrapper = shallowMount(SelectDataTable, {
      props: {
        itemData: testData,
        headerName: 'manyData',
      },
    });
    // tdクリック
    await wrapper
      .findAll('.item-list__body')
      .at(0)
      ?.find('tr')
      .trigger('click');
    // エミット情報の取得
    const emit = wrapper.emitted('selectItem')!;

    // 最初のtdを押したときのエミットデータ
    // ネストされたデータの一致はtoStrictEqual
    expect(emit[0][0]).toStrictEqual({
      id: 0,
      nameKana: `kana0`,
      name: `name0`,
      code: `code0`,
      postCode: `postCode0`,
      address: `address0`,
      departments: [`デパート1-0`, `デパート2-0`],
    });
  });
  it('空のテーブルをクリックしてもエミットされない', async () => {
    const dataCount = 2;
    const testData: Item[] = [];
    for (let i = 0; i < dataCount; i++) {
      const obj = {
        id: i,
        nameKana: `kana${i}`,
        name: `name${i}`,
        code: `code${i}`,
        postCode: `postCode${i}`,
        address: `address${i}`,
        departments: [`デパート1-${i}`, `デパート2-${i}`],
      };
      testData.push(obj);
    }
    const wrapper = shallowMount(SelectDataTable, {
      props: {
        itemData: testData,
        headerName: 'manyData',
      },
    });
    // tdクリック
    await wrapper
      .findAll('.item-list__body')
      .at(0)!
      .findAll('tr')
      .at(4)!
      .trigger('click');
    // エミット情報の取得
    const emit = wrapper.emitted('selectItem')!;

    // 最後のダミーtdを押したときのエミットは発生しない
    expect(emit).toBe(undefined);
  });
});

describe('pageに応じた算出プロパティitemsのテスト', () => {
  const dataCount = 22;
  const testData: Item[] = [];
  for (let i = 0; i < dataCount; i++) {
    const obj = {
      id: i,
      nameKana: `kana${i}`,
      name: `name${i}`,
      code: `code${i}`,
      postCode: `postCode${i}`,
      address: `address${i}`,
      departments: [`デパート1-${i}`, `デパート2-${i}`],
    };
    testData.push(obj);
  }
  const wrapper = mount(SelectDataTable, {
    props: {
      itemData: testData,
      headerName: 'manyData',
    },
  });
  it('pageの値が1の時、itemsの最初の一件はitemData全体の最初の1件と一致する', () => {
    const firstitem: Item[] = wrapper.vm.items;
    expect(firstitem[0]).toStrictEqual({
      id: 0,
      nameKana: `kana0`,
      name: `name0`,
      code: `code0`,
      postCode: `postCode0`,
      address: `address0`,
      departments: [`デパート1-0`, `デパート2-0`],
    });
  });
  it('pageNationのv-modelの参照先pageを4に変更した時、itemDataの最初の1件がitems16件目と一致する', async () => {
    wrapper.vm.page = 4;
    const firstitem: Item[] = wrapper.vm.items;
    expect(firstitem[0]).toStrictEqual({
      id: 15,
      nameKana: `kana15`,
      name: `name15`,
      code: `code15`,
      postCode: `postCode15`,
      address: `address15`,
      departments: [`デパート1-15`, `デパート2-15`],
    });
  });
});
