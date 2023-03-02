<script setup lang="ts">
interface BtnObj {
  styleClassName: string;
  rightIcon: string | undefined;
  leftIcon: string | undefined;
}

interface BtnTypesObj {
  [key: string]: BtnObj;
}

const props = defineProps<{
  btnType?: string;
  leftIcon?: string;
  rightIcon?: string;
}>();

let btn: BtnObj;

const btnTypes: BtnTypesObj = {
  save: {
    styleClassName: 'save-btn',
    leftIcon: 'icon-save',
    rightIcon: undefined,
  },
  search: {
    styleClassName: 'search-btn',
    leftIcon: 'icon-search',
    rightIcon: undefined,
  },
  cansel: {
    styleClassName: 'cansel-btn',
    leftIcon: 'icon-close',
    rightIcon: undefined,
  },
  back: {
    styleClassName: 'back-btn',
    leftIcon: 'icon-Aarrow-left',
    rightIcon: undefined,
  },
  delete: {
    styleClassName: 'delete-btn',
    leftIcon: 'icon-delete',
    rightIcon: undefined,
  },
  basic: {
    styleClassName: '',
    leftIcon: undefined,
    rightIcon: undefined,
  },
};

switch (props.btnType) {
  case 'save':
    btn = btnTypes.save;
    break;

  case 'search':
    btn = btnTypes.search;
    break;

  case 'cansel':
    btn = btnTypes.cansel;
    break;

  case 'back':
    btn = btnTypes.back;
    break;

  case 'delete':
    btn = btnTypes.delete;
    break;

  default:
    btn = btnTypes.basic;
    break;
}

if (typeof props.leftIcon !== 'undefined') {
  btn.leftIcon = props.leftIcon === 'null' ? undefined : props.leftIcon;
}

if (typeof props.rightIcon !== 'undefined') {
  btn.rightIcon = props.rightIcon === 'null' ? undefined : props.rightIcon;
}
</script>

<template>
  <v-btn
    :class="btn.styleClassName"
    height="3rem"
    width="fit-content"
    :prepend-icon="btn.leftIcon"
    :append-icon="btn.rightIcon"
  >
    <slot />
  </v-btn>
</template>

<style scoped lang="stylus">
.save-btn
  color: #fff
  background-color: #fc8f2f

.search-btn
  color: #fff
  background-color: #2172c4

.cansel-btn
.back-btn
  color: #666
  background-color: #f5f5f5

.delete-btn
  color: #fff
  background-color: #d65252

button:focus
  outline: none
</style>
