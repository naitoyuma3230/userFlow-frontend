<script setup lang="ts">
import { reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '@/store';
import TritrusH1 from '@/components/parts/TritrusH1.vue';
import TritrusH2 from '@/components/parts/TritrusH2.vue';
import TritrusH3 from '@/components/parts/TritrusH3.vue';
import TritrusButton from '@/components/parts/TritrusButton.vue';
import TritrusTextField from '@/components/parts/TritrusTextField.vue';
import SelectDataTable from '@/components/parts/SelectDataTable.vue';
import prefecture from '@/assets/prefecture';

const store = useStore();
const router = useRouter();

let company: Company = reactive({
  id: null,
  name: '',
  postCode: '',
  address: '',
});

const companies = computed<Array<Company>>(() => store.getters.getCompanies);
const currentCompany = store.getters.getCompany;
if (currentCompany.id === null) {
  company = currentCompany;
}

const searchCompanies = () => {
  store.dispatch('searchCompanies');
};

const selectCompany = (thisCompany: Company) => {
  store.dispatch('setCompany', thisCompany);
  router.push('/OfficeRegistration');
};

const saveCompany = () => {
  store.dispatch('setCompany', company);
  router.push('/OfficeRegistration');
};
</script>

<template>
  <div class="content">
    <TritrusH1 class="content__title">法人登録</TritrusH1>

    <div class="content-serch content__message">
      <p class="content-search__message">
        法人名のキーワードを入力して、検索するボタンを押してください。
      </p>

      <div class="content-search__form">
        <TritrusTextField label="法人名" required clearable />
        <TritrusButton btn-type="search" @click="searchCompanies"
          >検索</TritrusButton
        >
      </div>
    </div>

    <div v-if="companies">
      <div class="sub-content">
        <div v-if="companies.length >= 1">
          <TritrusH2 class="sub-content__title"
            >登録されている法人の選択</TritrusH2
          >

          <div class="sub-content__message">
            <p>ご自身の所属する法人を選択してください。</p>
            <p>表示されない場合、新規登録が必要になります。</p>
          </div>

          <SelectDataTable
            :itemData="companies"
            headerName="法人名"
            @selectItem="selectCompany"
          />
        </div>

        <div v-else-if="companies.length === 0" class="sub-content__message">
          <p>見つかりません</p>
          <p>表示されない場合、新規登録が必要になります。</p>
        </div>
      </div>

      <div class="sub-content">
        <TritrusH2 class="sub-content__title">新規登録</TritrusH2>

        <p class="sub-content__message">
          必要事項を全て入力して『次へ』を選択してください。
        </p>

        <TritrusH3 class="form-label"> 法人名 </TritrusH3>
        <TritrusTextField
          id="company-text-field"
          class="form-body"
          label="法人名"
          placeholder="社会福祉法人カナミックネットワーク"
          required
          v-model="company.name"
        />
        <v-tooltip activator="#company-text-field" location="bottom left">
          <p>正式名称で入力してください。</p>
          <p style="padding-left: 1rem">株式会社〇〇〇〇</p>
          <p style="padding-left: 1rem">社会福祉法人〇〇〇〇</p>
        </v-tooltip>

        <TritrusH3 class="form-label">住所</TritrusH3>
        <div class="form-body form-address">
          <TritrusTextField
            label="郵便番号"
            required
            v-model="company.postCode"
          />
          <TritrusButton btn-type="search">検索</TritrusButton>
          <v-select
            label="都道府県"
            :items="prefecture"
            variant="outlined"
            :hide-details="true"
          />
          <TritrusTextField label="住所" v-model="company.address" />
        </div>

        <div class="sub-content__btns">
          <TritrusButton
            btn-type="save"
            left-icon="null"
            right-icon="icon-Aarrow-right"
            class="ml-auto"
            @click="saveCompany"
            >次へ</TritrusButton
          >
        </div>
      </div>
    </div>
  </div>
</template>
