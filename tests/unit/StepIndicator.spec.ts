import { shallowMount } from '@vue/test-utils';
import StepIndicator from '@/components/parts/StepIndicator.vue';
import router from '@/router';
import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      step: {
        company: true,
        office: false,
        user: false,
        check: false,
      },
    };
  },
  mutations: {
    increment(state: any) {
      state.count += 1;
    },
  },
  getters: {
    getStep(state) {
      return state.step;
    },
  },
});

/* 現状の状態管理ではリロードなどでイレギュラーが発生 */

// 法人登録、所属機関、申請者情報、入力内容確認の順に手続きが進む
// StepIndicatorの状態を0～3の数字で表す(状態は4つでいい)
// vue-routerから現在のURLを取得し状態に当てはめる
// ナビゲーションガードを使用し、urlの直打ちリンクを防止する(ここではテストしない)
describe('vue-routerとstepの状態テスト。', () => {
  const wrapper = shallowMount(StepIndicator, {
    global: {
      plugins: [store],
    },
  });
  it('vue-routerの状態に対応してstepが0～3まで設定される', async () => {
    // step変数はroute.name:OfficeRegistrationもしくは path'/'の場合0
    router.push('/');
    await router.isReady();
    expect(wrapper.vm.step).toBe(0);

    // '/OfficeRegistration'の場合1
    router.push('/OfficeRegistration');
    await router.isReady();
    expect(wrapper.vm.step).toBe(1);

    // path '/OfficeRegistration/careOffice'などネストルートでも1
    // もしくはroute.name:HospitalRegistrationなどでも1
    router.push('/OfficeRegistration');
    await router.isReady();
    expect(wrapper.vm.step).toBe(1);

    // '/user'
    router.push('/OfficeRegistration');
    await router.isReady();
    expect(wrapper.vm.step).toBe(2);

    // '/complete'
    router.push('/OfficeRegistration');
    await router.isReady();
    expect(wrapper.vm.step).toBe(3);
  });
  it('stepの状態に応じてstep-itemのクラスにcompletionが追加される', async () => {
    // step1では最初の要素のみクラスcompletionが付く
    router.push('/');
    await router.isReady();

    expect(wrapper.findAll('.step-item').at(0)?.classes()).toContain(
      'completion'
    );
  });
});
