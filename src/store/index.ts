import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store } from 'vuex';
import axios from '../plugins/axios';

interface State {
  step: Step;
  companies: Array<Company> | null;
  company: Company;
  hospitals: Array<Hospital> | null;
  careOffices: Array<CareOffice> | null;
  otherOffices: Array<OtherOffice> | null;
  officeCategory: OfficeCategory;
  office: Office | null;
  users: Array<User> | null;
}

export const key: InjectionKey<Store<State>> = Symbol('InjectionKey');

export const store = createStore<State>({
  state: {
    step: {
      company: true,
      office: false,
      user: false,
      check: false,
    },
    companies: null,
    company: {
      id: null,
      name: '',
      postCode: '',
      address: '',
    },
    hospitals: null,
    careOffices: null,
    otherOffices: null,
    officeCategory: null,
    office: null,
    users: null,
  },
  getters: {
    getStep(state) {
      return state.step;
    },
    getCompanies(state) {
      return state.companies;
    },
    getCompany(state) {
      return state.company;
    },
    getHospitals(state) {
      return state.hospitals;
    },
    getCareOffices(state) {
      return state.careOffices;
    },
    getOtherOffices(state) {
      return state.otherOffices;
    },
    getOfficeCategory(state) {
      return state.officeCategory;
    },
    getOffice(state) {
      return state.office;
    },
    getUsers(state) {
      return state.users;
    },
    getInputData(state) {
      const { company, office, users } = state;
      return { company, office, users };
    },
  },
  mutations: {
    setCompanies(state, companies) {
      state.companies = companies;
    },
    setCompany(state, company) {
      state.company = company;
      state.step.office = true;
    },
    setHospitals(state, hospitals) {
      state.hospitals = hospitals;
    },
    setCareOffices(state, careOffices) {
      state.careOffices = careOffices;
    },
    setOtherOffices(state, otherOffices) {
      state.otherOffices = otherOffices;
    },
    setOffice(state, { office, officeCategory }) {
      state.office = office;
      state.officeCategory = officeCategory;
      state.step.user = true;
    },
    setUsers(state, users) {
      state.users = users;
      state.step.check = true;
    },
  },
  actions: {
    // TODO: 文字列検索機能追加
    async searchCompanies({ commit }, keyword: string) {
      try {
        if (keyword === '') {
          // キーワードなしで全件取得
          const allCompany = await axios.get(`/company`);
          commit('setCompanies', allCompany.data);
        } else {
          // キーワードありで条件一致で取得
          const searchedCompanies = await axios.get(
            `/company/search/${keyword}`
          );
          commit('setCompanies', searchedCompanies.data);
        }
      } catch (e) {
        // TODO エラー時の処理
        console.log(e);
      }
    },
    setCompany({ commit }, company: Company) {
      commit('setCompany', company);
    },
    // 施設一覧をapiから取得
    async getOffices({ commit }) {
      // 各３種のstateへcommit
      try {
        const hospital = await axios.get('/hospital');
        const carehome = await axios.get('/carehome');

        commit('setHospitals', hospital.data);
        commit('setCareOffices', carehome.data);
        // commit('setOtherOffices', others?.data);
      } catch (e) {
        // TODO エラー時の処理
        console.log(e);
      }
    },
    setOffice(
      { commit },
      {
        office,
        officeCategory,
      }: { office: Office; officeCategory: OfficeCategory }
    ) {
      commit('setOffice', { office, officeCategory });
    },
    async searchCarehome({ commit }, keyword?: string) {
      try {
        if (!keyword) {
          // キーワードなしで全件取得
          const allCarehome = await axios.get(`/carehome`);
          commit('setCareOffices', allCarehome.data);
        } else {
          // キーワードありで条件一致で取得
          const searchedCarehome = await axios.get(
            `/carehome/search/${keyword}`
          );
          commit('setCareOffices', searchedCarehome.data);
        }
      } catch (e) {
        // TODO エラー時の処理
        console.log(e);
      }
    },
    async searchHospital({ commit }, keyword?: string) {
      try {
        if (!keyword) {
          // キーワードなしで全件取得
          const allCarehome = await axios.get(`/hospital`);
          commit('setHospitals', allCarehome.data);
        } else {
          // キーワードありで条件一致で取得
          const searchedCarehome = await axios.get(
            `/hospital/search/${keyword}`
          );
          commit('setHospitals', searchedCarehome.data);
        }
      } catch (e) {
        // TODO エラー時の処理
        console.log(e);
      }
    },

    setUsers({ commit }, users: Array<User>) {
      commit('setUsers', users);
    },
    async saveNewUser({ state }) {
      const { company, office, users } = state;
      const newUsers = {
        users,
        company,
        office,
      };
      try {
        await axios.post('/user', newUsers);
      } catch (e) {
        // TODO エラー時の処理
        console.log(e);
      }
    },
  },
});

export const useStore = () => baseUseStore(key);
