<script setup lang="ts">
import { reactive } from 'vue';
import { useStore } from '@/store';
import { useRouter } from 'vue-router';
import TritrusH1 from '@/components/parts/TritrusH1.vue';
import TritrusH3 from '@/components/parts/TritrusH3.vue';
import TritrusTextField from '@/components/parts/TritrusTextField.vue';
import TritrusButton from '@/components/parts/TritrusButton.vue';
import hospitalDepartments from '@/assets/hospitalDepartments';
import prefecture from '@/assets/prefecture';

const router = useRouter();
const store = useStore();

let hospital: Hospital = reactive({
  id: null,
  nameKana: '',
  name: '',
  code: '',
  postCode: '',
  address: '',
  departments: [],
});

const currentCategory = store.getters.getOfficeCategory;
const currentOffice = store.getters.getOffice;
if (currentCategory === 'medical' && currentOffice.id === null) {
  hospital = currentOffice;
}

const saveHospital = () => {
  store.dispatch('setOffice', { office: hospital, officeCategory: 'medical' });
  router.push('/user');
};
</script>

<template>
  <div class="sub-content">
    <TritrusH1 class="sub-content__title">医療機関新規登録</TritrusH1>

    <TritrusH3 class="form-label">医療機関名</TritrusH3>
    <div class="form-office-name form-body">
      <TritrusTextField label="フリガナ" required v-model="hospital.nameKana" />
      <TritrusTextField label="医療機関名" required v-model="hospital.name" />
    </div>

    <TritrusH3 class="form-label">医療機関コード</TritrusH3>
    <TritrusTextField
      label="医療機関コード"
      required
      v-model="hospital.code"
      class="form-body"
    />

    <TritrusH3 class="form-label">住所</TritrusH3>
    <div class="form-body form-address">
      <TritrusTextField label="郵便番号" required v-model="hospital.postCode" />
      <TritrusButton btn-type="search">検索</TritrusButton>
      <v-select
        label="都道府県"
        :items="prefecture"
        variant="outlined"
        :hide-details="true"
      />
      <TritrusTextField label="住所" v-model="hospital.address" />
    </div>

    <TritrusH3 class="form-label">診療科目</TritrusH3>
    <div class="form-body form-department">
      <v-checkbox
        v-for="department in hospitalDepartments"
        :key="department.value"
        :label="department.text"
        :value="department.value"
        v-model="hospital.departments"
        color="#fb8c00"
        :hide-details="true"
      />
    </div>

    <div class="sub-content__btns">
      <TritrusButton btn-type="back" :to="{ name: 'CompanyRegistration' }"
        >戻る</TritrusButton
      >

      <TritrusButton
        btn-type="save"
        left-icon="null"
        right-icon="icon-Aarrow-right"
        @click="saveHospital"
        >次へ</TritrusButton
      >
    </div>
  </div>
</template>

<style scoped lang="stylus">
.form-department
  display: grid
  // stylelint-disable-next-line plugin/no-unsupported-browser-features
  grid-template-columns: repeat(4, 1fr)
</style>
