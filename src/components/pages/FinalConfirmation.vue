<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '@/store';
import TritrusH1 from '@/components/parts/TritrusH1.vue';
import TritrusH3 from '@/components/parts/TritrusH3.vue';
import TritrusButton from '@/components/parts/TritrusButton.vue';
import registrationDataTable from '@/components/parts/RegistrationDataTable.vue';

const router = useRouter();
const store = useStore();

const { company, office, users } = store.getters.getInputData;

interface DataObj {
  [key: string]: string;
}

const companyData = reactive<DataObj>({
  法人名: company.name,
  郵便番号: company.postCode,
  住所: company.address,
});

// TODO: 配列情報表示
const officeData = reactive<DataObj>({
  事業所名: office.name,
  郵便番号: office.postCode,
  住所: office.address,
});

const usersData = computed<Array<DataObj>>(() =>
  users.map((user: User) => ({
    '氏名(かな)': `${user.firstNameKana} ${user.lastNameKana}`,
    氏名: `${user.firstName} ${user.lastName}`,
    メールアドレス: user.email,
    職種: user.occupation,
  }))
);

const cancelDialog = ref<boolean>(false);
const deleteRegistration = () => {
  // TODO: 本番環境でどこに飛ぶか不明
  window.location.href = '/';
};

const saveNewUser = () => {
  store.dispatch('saveNewUser');
  router.push('/complete');
};
</script>

<template>
  <div class="content">
    <TritrusH1 class="content__title">入力内容の確認</TritrusH1>

    <TritrusH3 class="form-label">法人情報</TritrusH3>
    <div class="data-body form-body">
      <registrationDataTable :registrationData="companyData" />
    </div>

    <TritrusH3 class="form-label">所属事業所情報</TritrusH3>
    <div class="data-body form-body">
      <registrationDataTable :registrationData="officeData" />
    </div>

    <TritrusH3 class="form-label">
      申込者様情報
      <span v-if="users.length >= 2">({{ users.length }}名)</span>
    </TritrusH3>
    <div
      v-for="(userData, i) in usersData"
      :key="i"
      class="data-body form-body"
    >
      <registrationDataTable :registrationData="userData" />
    </div>

    <div class="content__btns">
      <TritrusButton btn-type="cansel" @click="cancelDialog = true">
        キャンセル
      </TritrusButton>
      <TritrusButton btn-type="save" @click="saveNewUser"
        >申し込む</TritrusButton
      >
    </div>

    <!-- キャンセルダイアログ -->
    <v-dialog v-model="cancelDialog" width="auto">
      <v-card>
        <v-card-text>
          <p>入力したデータはすべて失われます。</p>
          <p>本当によろしいですか？</p>
        </v-card-text>

        <div class="dialog-btns">
          <TritrusButton btn-type="cancel" @click="cancelDialog = false"
            >いいえ</TritrusButton
          >
          <TritrusButton btn-type="delete" @click="deleteRegistration"
            >はい</TritrusButton
          >
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<style lang="stylus">
.data-body
  padding: 0 0.5rem

.dialog-btns
  display: flex
  align-items: center
  justify-content: space-between
  padding: 1rem
</style>
