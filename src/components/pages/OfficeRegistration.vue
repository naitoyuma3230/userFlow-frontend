<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '@/store';
import TritrusH1 from '@/components/parts/TritrusH1.vue';
import TritrusH2 from '@/components/parts/TritrusH2.vue';
import TritrusTextField from '@/components/parts/TritrusTextField.vue';
import SelectDataTable from '@/components/parts/SelectDataTable.vue';

type CategoryText = '医療機関' | '介護事業所・介護施設' | 'その他';
type CategoryLabel = '医療機関' | '介護事業所・介護施設' | '事業所';

interface CategoryObj {
  text: CategoryText;
  value: OfficeCategory;
  label: CategoryLabel;
  officeList: Array<Hospital | CareOffice | OtherOffice>;
  pathName: string; // vue-router name
}

const store = useStore();
const router = useRouter();

store.dispatch('getOffices');
const categoryItems = computed<Array<CategoryObj>>(() => [
  {
    text: '医療機関',
    value: 'medical',
    label: '医療機関',
    officeList: store.getters.getHospitals,
    pathName: 'HospitalRegistration',
  },
  {
    text: '介護事業所・介護施設',
    value: 'care',
    label: '介護事業所・介護施設',
    officeList: store.getters.getCareOffices,
    pathName: 'CareOfficeRegistration',
  },
  {
    text: 'その他',
    value: 'other',
    label: '事業所',
    officeList: store.getters.getOtherOffices,
    pathName: 'OtherOfficeRegistration',
  },
]);

// TODO: 表示はされるが時間がかかる
const officeCategory: OfficeCategory = store.getters.getOfficeCategory;

const selectedItem = categoryItems.value.find(
  (item) => item.value === officeCategory
);

const categoryObj = ref<CategoryObj | null>(selectedItem || null);

const selectCategory = (): void => {
  router.push({ name: categoryObj.value?.pathName });
};

const selectOffice = (thisOffice: Office): void => {
  store.dispatch('setOffice', {
    office: thisOffice,
    officeCategory: categoryObj.value?.value,
  });
  router.push('/user');
};
</script>

<template>
  <div class="content">
    <TritrusH1 class="content__title">所属機関登録</TritrusH1>

    <div class="content-search content__message">
      <p class="content-search__message">所属機関の種類を選択してください。</p>
      <v-select
        label="所属機関"
        :items="categoryItems"
        item-title="text"
        item-value="value"
        v-model="categoryObj"
        class="content-search__form"
        variant="outlined"
        @update:model-value="selectCategory"
        return-object
      />
    </div>

    <div v-if="categoryObj !== null">
      <div class="sub-content">
        <div v-if="categoryObj.officeList.length >= 1">
          <TritrusH2 class="sub-content__title"
            >登録されている機関の選択</TritrusH2
          >

          <div class="sub-content__message">
            <p>ご自身の所属する{{ categoryObj.label }}を選択してください。</p>
            <p>表示されない場合、新規登録が必要になります。</p>
          </div>

          <!-- TODO: 絞り込み機能 -->
          <TritrusTextField
            :label="categoryObj.label"
            prepend-inner-icon="icon-search"
            clearable
          />

          <SelectDataTable
            :itemData="categoryObj.officeList"
            :headerName="categoryObj.label"
            @selectItem="selectOffice"
          />
        </div>

        <div
          v-else-if="categoryObj.officeList.length == 0"
          class="sub-content__message"
        >
          登録がありません。
        </div>
      </div>

      <router-view />
    </div>
  </div>
</template>
