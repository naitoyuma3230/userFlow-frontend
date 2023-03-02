<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '@/store';
import TritrusH1 from '@/components/parts/TritrusH1.vue';
import TritrusH3 from '@/components/parts/TritrusH3.vue';
import TritrusTextFieldVue from '@/components/parts/TritrusTextField.vue';
import TritrusButton from '@/components/parts/TritrusButton.vue';

const router = useRouter();
const store = useStore();

// TODO: Vue Devtoolsに表示されない？(使用はできている)
let users = reactive<Array<User>>([
  {
    firstName: '',
    lastName: '',
    firstNameKana: '',
    lastNameKana: '',
    email: '',
    occupation: '',
  },
]);

const currentUsers = store.getters.getUsers;
if (currentUsers) {
  users = currentUsers;
}

const userFormAdd = (): void => {
  const user: User = {
    firstName: '',
    lastName: '',
    firstNameKana: '',
    lastNameKana: '',
    email: '',
    occupation: '',
  };
  users.push(user);
};

const removeUserForm = (i: number): void => {
  users.splice(i, 1);
};

const enabled = ref<boolean>(false);

const saveUsers = (): void => {
  store.dispatch('setUsers', users);
  router.push('/confirmation');
};

const officeCategory: OfficeCategory = store.getters.getOfficeCategory;

const backToPage = (): void => {
  let name:
    | 'HospitalRegistration'
    | 'CareOfficeRegistration'
    | 'OtherOfficeRegistration';

  if (officeCategory === 'medical') {
    name = 'HospitalRegistration';
  } else if (officeCategory === 'care') {
    name = 'CareOfficeRegistration';
  } else {
    name = 'OtherOfficeRegistration';
  }

  router.push({ name });
};
</script>

<template>
  <div class="content">
    <TritrusH1 class="content__title">お申込者様新規登録</TritrusH1>
    <p class="content__message">お申込者様の情報を入力してください。</p>

    <div
      v-for="(user, i) in users"
      :key="i"
      :class="{ 'user-form-container elevation-5': users.length >= 2 }"
    >
      <div v-if="users.length >= 2" class="user-form-count">
        {{ i + 1 }}人目
      </div>

      <v-btn
        v-if="users.length >= 2"
        icon="icon-close"
        size="x-small"
        @click="removeUserForm(i)"
        class="remove-user-form"
      />

      <TritrusH3 class="form-label">氏名</TritrusH3>
      <div class="form-body form-user-name">
        <TritrusTextFieldVue
          label="名字フリガナ"
          v-model="user.firstNameKana"
        />
        <TritrusTextFieldVue label="名前フリガナ" v-model="user.lastNameKana" />
        <TritrusTextFieldVue label="名字" v-model="user.firstName" />
        <TritrusTextFieldVue label="名前" v-model="user.lastName" />
      </div>

      <TritrusH3 class="form-label">メールアドレス</TritrusH3>
      <TritrusTextFieldVue
        label="メールアドレス"
        v-model="user.email"
        class="form-body"
      />

      <TritrusH3 class="form-label">職種</TritrusH3>
      <v-select
        label="職種"
        :items="['医師', '看護師', '介護職員', 'ヘルパー']"
        v-model="user.occupation"
        class="form-body"
      />
    </div>

    <v-btn @click="userFormAdd" class="user-form-add-btn" height="4rem"
      ><v-icon icon="icon-plus2"
    /></v-btn>

    <v-btn
      variant="outlined"
      height="3rem"
      rounded="lg"
      color="#fc8f2f"
      href="https://portal.kanamic.net/tritrus/rule/rule.html"
      target="_blank"
      rel="noopener noreferrer"
      >利用規約を確認</v-btn
    >

    <v-checkbox
      label="利用規約に同意する"
      :hide-details="true"
      color="#fc8f2f"
      v-model="enabled"
      class="form-body"
    />

    <div class="content__btns">
      <TritrusButton btn-type="back" @click="backToPage">戻る</TritrusButton>

      <TritrusButton
        btn-type="save"
        left-icon="null"
        right-icon="icon-Aarrow-right"
        :disabled="!enabled"
        @click="saveUsers"
        >確認</TritrusButton
      >
    </div>
  </div>
</template>

<style scoped lang="stylus">
.user-form-container
  position: relative
  padding: 2rem 1rem 0
  border-radius: 4px

  &:not(:last-child)
    margin-bottom: 2rem

  .user-form-count
    position: absolute
    top: 0
    left: 1rem
    font-size: 1.2rem
    background-color: #fff
    transform: translateY(-50%)

  .remove-user-form
    position: absolute
    top: 0
    right: 0
    transform: translate(30%, -30%)

.form-user-name
  display: grid
  // stylelint-disable-next-line plugin/no-unsupported-browser-features
  grid-template-columns: repeat(2, 1fr)
  gap: 1rem 0.5rem

.user-form-add-btn
  margin-bottom: 6rem
</style>
