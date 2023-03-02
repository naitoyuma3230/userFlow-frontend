<script setup lang="ts">
import { reactive } from 'vue';
import { useStore } from '@/store';
import { useRouter } from 'vue-router';
import TritrusH1 from '@/components/parts/TritrusH1.vue';
import TritrusH3 from '@/components/parts/TritrusH3.vue';
import TritrusTextField from '@/components/parts/TritrusTextField.vue';
import TritrusButton from '@/components/parts/TritrusButton.vue';
import prefecture from '@/assets/prefecture';

const store = useStore();
const router = useRouter();

let office: OtherOffice = reactive({
  id: null,
  nameKana: '',
  name: '',
  postCode: '',
  address: '',
});

const currentCategory = store.getters.getOfficeCategory;
const currentOffice = store.getters.getOffice;
if (currentCategory === 'other' && currentOffice.id === null) {
  office = currentOffice;
}

const saveOffice = () => {
  store.dispatch('setOffice', { office, officeCategory: 'other' });
  router.push('/user');
};
</script>

<template>
  <div class="sub-content">
    <TritrusH1 class="sub-content__title">事業所新規登録</TritrusH1>

    <TritrusH3 class="form-label">事業所名</TritrusH3>
    <div class="form-body form-office-name">
      <TritrusTextField
        label="事業所名フリガナ"
        required
        v-model="office.nameKana"
      />
      <TritrusTextField label="事業所名" required v-model="office.name" />
    </div>

    <TritrusH3 class="form-label">住所</TritrusH3>
    <div class="form-body form-address">
      <TritrusTextField label="郵便番号" required v-model="office.postCode" />
      <TritrusButton btn-type="search">検索</TritrusButton>

      <v-select
        label="都道府県"
        :items="prefecture"
        variant="outlined"
        :hide-details="true"
      />
      <TritrusTextField label="住所" v-model="office.address" />
    </div>

    <div class="sub-content__btns">
      <TritrusButton btn-type="back" :to="{ name: 'CompanyRegistration' }"
        >戻る</TritrusButton
      >
      <TritrusButton
        btn-type="save"
        left-icon="null"
        right-icon="icon-Aarrow-right"
        @click="saveOffice"
        >次へ</TritrusButton
      >
    </div>
  </div>
</template>
