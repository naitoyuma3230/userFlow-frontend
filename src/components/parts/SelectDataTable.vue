<script setup lang="ts">
import { ref, computed } from 'vue';

type Item = Company | Office;

const props = defineProps<{
  itemData: Array<Item>;
  headerName: string;
}>();

const emits = defineEmits<{
  // TODO: item: Item では、src/components/pages/OfficeRegistration.vue でエラーになる
  (e: 'selectItem', item: any): void;
}>();

const COUNT = 5;
const page = ref<number>(1);

const items = computed<Array<Item>>(() => {
  const start = (page.value - 1) * COUNT;
  const end = start + COUNT;

  return props.itemData.slice(start, end);
});

const pageLength = computed<number>(() =>
  Math.floor(props.itemData.length / COUNT + 1)
);

const itemClick = (item: Item): void => {
  emits('selectItem', item);
};
</script>

<template>
  <v-table class="item-list" :hover="true">
    <thead class="item-list__header">
      <tr>
        <th class="item-name">{{ headerName }}</th>
        <th class="item-adress">住所</th>
      </tr>
    </thead>
    <tbody class="item-list__body">
      <tr
        v-for="item in items"
        :key="item.name"
        @click="itemClick(item)"
        class="item-row"
      >
        <td>{{ item.name }}</td>
        <td>
          <p>{{ item.postCode }}</p>
          <p>{{ item.address }}</p>
        </td>
      </tr>
      <template v-if="items.length < COUNT">
        <tr v-for="n in COUNT - items.length" :key="n" class="item-row">
          <td></td>
          <td></td>
        </tr>
      </template>
    </tbody>
  </v-table>
  <v-pagination v-model="page" :length="pageLength" :total-visible="6" />
</template>

<style scoped lang="stylus">
.item-list
  width: 100%

  &__header
    background-color: #ffefd6

  &__body
    cursor: pointer

.item-name
.item-adress
  width: 50%


.item-row
  height: 4rem
</style>
