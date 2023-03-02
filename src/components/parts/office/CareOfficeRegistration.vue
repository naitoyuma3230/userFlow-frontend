<script setup lang="ts">
import { reactive } from 'vue';
import { useStore } from '@/store';
import { useRouter } from 'vue-router';
import TritrusH1 from '@/components/parts/TritrusH1.vue';
import TritrusH3 from '@/components/parts/TritrusH3.vue';
import TritrusTextField from '@/components/parts/TritrusTextField.vue';
import TritrusButton from '@/components/parts/TritrusButton.vue';
import prefecture from '@/assets/prefecture';
import classifications from '@/assets/careOfficeClassification';
import regionalAdditions from '@/assets/regionalAddition';
import careServiceTypes from '@/assets/careServiceType';

const store = useStore();
const router = useRouter();

let careOffice: CareOffice = reactive({
  id: null,
  nameKana: '',
  name: '',
  code: '',
  postCode: '',
  address: '',
  classification: '',
  regionalAddition: '',
  specialRegionalAddition: '',
  careServiceTypes: [],
});

const currentCategory = store.getters.getOfficeCategory;
const currentOffice = store.getters.getOffice;
if (currentCategory === 'care' && currentOffice.id === null) {
  careOffice = currentOffice;
}

const saveCareOffice = () => {
  store.dispatch('setOffice', { office: careOffice, officeCategory: 'care' });
  router.push('/user');
};
</script>

<template>
  <div class="sub-content">
    <TritrusH1 class="sub-content__title"
      >介護事業所・介護施設新規登録</TritrusH1
    >

    <TritrusH3 class="form-label">介護事業所・介護施設名</TritrusH3>
    <div class="form-body form-office-name">
      <TritrusTextField
        label="フリガナ"
        required
        v-model="careOffice.nameKana"
      />
      <TritrusTextField
        label="介護事業所・介護施設名"
        required
        v-model="careOffice.name"
      />
    </div>

    <TritrusH3 class="form-label">介護事業所・介護施設コード</TritrusH3>
    <TritrusTextField
      label="介護事業所・介護施設コード"
      required
      v-model="careOffice.code"
      class="form-body"
    />

    <TritrusH3 class="form-label">住所</TritrusH3>
    <div class="form-body form-address">
      <TritrusTextField
        label="郵便番号"
        required
        v-model="careOffice.postCode"
      />
      <TritrusButton btn-type="search">検索</TritrusButton>
      <v-select
        label="都道府県"
        :items="prefecture"
        variant="outlined"
        :hide-details="true"
      />
      <TritrusTextField label="住所" v-model="careOffice.address" />
    </div>

    <TritrusH3 class="form-label">事業所・施設区分</TritrusH3>
    <v-radio-group v-model="careOffice.classification" class="form-body">
      <v-radio
        v-for="classification in classifications"
        :key="classification.value"
        :label="classification.text"
        :value="classification.value"
        color="#fb8c00"
      />
    </v-radio-group>

    <TritrusH3 class="form-label">地域加算</TritrusH3>
    <v-radio-group class="form-body" v-model="careOffice.regionalAddition">
      <v-radio
        v-for="regionalAddition in regionalAdditions"
        :key="regionalAddition.value"
        :label="regionalAddition.text"
        :value="regionalAddition.value"
        color="#fb8c00"
      />
    </v-radio-group>

    <TritrusH3 class="form-label">特別地域加算</TritrusH3>
    <v-radio-group
      class="form-body"
      v-model="careOffice.specialRegionalAddition"
    >
      <v-radio label="あり" value="true" color="#fb8c00" />
      <v-radio label="なし" value="false" color="#fb8c00" />
    </v-radio-group>

    <TritrusH3 class="form-label">サービス種類</TritrusH3>
    <div class="form-body">
      <v-checkbox
        v-for="careServiceType in careServiceTypes"
        :key="careServiceType.value"
        :label="careServiceType.text"
        :value="careServiceType.value"
        v-model="careOffice.careServiceTypes"
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
        @click="saveCareOffice"
        >次へ</TritrusButton
      >
    </div>
  </div>
</template>
