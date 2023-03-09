import { createRouter, createWebHistory } from 'vue-router';
import HospitalRegistration from '@/components/parts/office/HospitalRegistration.vue';
import CareOfficeRegistration from '@/components/parts/office/CareOfficeRegistration.vue';
import OtherOfficeRegistration from '@/components/parts/office/OtherOfficeRegistration.vue';
import OfficeRegistration from '@/components/pages/OfficeRegistration.vue';
import UserRegistration from '@/components/pages/UserRegistration.vue';
import FinalConfirmation from '@/components/pages/FinalConfirmation.vue';
import RegistrationComplete from '@/components/pages/RegistrationComplete.vue';
import CompanyRegistration from '@/components/pages/CompanyRegistration.vue';
import OpenAi from '@/components/pages/OpenAi.vue';

const routes = [
  {
    path: '/',
    name: 'CompanyRegistration',
    component: CompanyRegistration,
  },
  {
    // TODO: パス修正 e.g. /office
    path: '/OfficeRegistration',
    name: 'OfficeRegistration',
    component: OfficeRegistration,
    children: [
      {
        path: 'hospital',
        name: 'HospitalRegistration',
        component: HospitalRegistration,
      },
      {
        path: 'careOffice',
        name: 'CareOfficeRegistration',
        component: CareOfficeRegistration,
      },
      {
        path: 'otherOffice',
        name: 'OtherOfficeRegistration',
        component: OtherOfficeRegistration,
      },
    ],
  },
  { path: '/user', name: 'UserRegistration', component: UserRegistration },
  {
    path: '/confirmation',
    name: 'FinalConfirmation',
    component: FinalConfirmation,
  },
  {
    path: '/complete',
    name: 'RegistrationComplete',
    component: RegistrationComplete,
  },
  {
    path: '/openai',
    name: 'OpenAi',
    component: OpenAi,
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
  // TODO: 入力済みの場合の『戻る』・『編集』時のスクロール位置
  scrollBehavior: (to, from, savedPosition) => savedPosition || { top: 0 },
});
