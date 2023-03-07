<script setup lang="ts">
import { ref, computed, ComputedRef } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '@/store';
import TritrusH1 from '@/components/parts/TritrusH1.vue';
import TritrusH2 from '@/components/parts/TritrusH2.vue';
import TritrusTextField from '@/components/parts/TritrusTextField.vue';
import SelectDataTable from '@/components/parts/SelectDataTable.vue';

type CategoryText = '医療機関' | '介護事業所・介護施設' | 'その他';
type CategoryLabel = '医療機関' | '介護事業所・介護施設' | '事業所';

interface Label {
  text: CategoryText;
  value: OfficeCategory;
  label: CategoryLabel;
  pathName: string; // vue-router name
}

const store = useStore();
const router = useRouter();

// ofice一覧を更新
store.dispatch('getOffices');

const hospitals = computed<Hospital[]>(() => store.getters.getHospitals);
const careOffices = computed<CareOffice[]>(() => store.getters.getCareOffices);
const otherOffices = computed<OtherOffice[]>(
  () => store.getters.getOtherOffice
);

const labels: Label[] = [
  {
    text: '医療機関',
    value: 'medical',
    label: '医療機関',
    pathName: 'HospitalRegistration',
  },
  {
    text: '介護事業所・介護施設',
    value: 'care',
    label: '介護事業所・介護施設',
    pathName: 'CareOfficeRegistration',
  },
  {
    text: 'その他',
    value: 'other',
    label: '事業所',
    pathName: 'OtherOfficeRegistration',
  },
];

const selectedLabel = ref<Label>();

let selectedItems:
  | ComputedRef<Hospital[]>
  | ComputedRef<CareOffice[]>
  | ComputedRef<OtherOffice[]>;

// Labelのpath情報からRouterで表示
const selectCategory = (): void => {
  switch (selectedLabel.value?.value) {
    case 'medical':
      selectedItems = hospitals;
      break;

    case 'care':
      selectedItems = careOffices;
      break;

    default:
      selectedItems = otherOffices;
      break;
  }
  router.push({ name: selectedLabel.value?.pathName });
};

// globalな状態を更新
const selectOffice = (thisOffice: Office): void => {
  store.dispatch('setOffice', {
    office: thisOffice,
    officeCategory: selectedLabel.value?.value,
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
        :items="labels"
        item-title="text"
        item-value="value"
        v-model="selectedLabel"
        class="content-search__form"
        variant="outlined"
        @update:model-value="selectCategory"
        return-object
      />
    </div>

    <div v-if="selectedLabel">
      <div class="sub-content">
        <div v-if="selectedItems">
          <div>
            <TritrusH2 class="sub-content__title"
              >登録されている機関の選択</TritrusH2
            >

            <div class="sub-content__message">
              <p>
                ご自身の所属する{{ selectedLabel.label }}を選択してください。
              </p>
              <p>表示されない場合、新規登録が必要になります。</p>
            </div>

            <TritrusTextField
              :label="selectedLabel.label"
              prepend-inner-icon="icon-search"
              clearable
              :target="selectedLabel.value"
            />

            <SelectDataTable
              :itemData="selectedItems"
              :headerName="selectedLabel.label"
              @selectItem="selectOffice"
            />
          </div>
        </div>

        <div v-else class="sub-content__message">登録がありません。</div>
      </div>

      <router-view />
    </div>
  </div>
</template>
