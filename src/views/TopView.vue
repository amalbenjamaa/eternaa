<template>
  <TopComponent :productId="productId" />
</template>

<script>
import TopComponent from "@/components/TopComponent.vue";

export default {
  components: {
    TopComponent,
  },
  props: {
    productId: {
      type: [String, Number],
      default: null,
    },
  },
};
</script>
