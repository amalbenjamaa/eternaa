<template>
  <PotteryComponent
      category-title="Our Pottery"
      :products="pottery"
  />
</template>

<script>
import PotteryComponent from '@/components/PotteryComponent.vue';

const pottery= [
      {
        id: 9,
        name: "shoes",
        price: 98,
        image: require("../assets/image pottery/shoes6.jpg"),
        isFavorite: false,
      },
      {
        id: 10,
        name: "shoes ",
        price: 98,
        image: require("../assets/image pottery/shoes7.jpg"),
        isFavorite: true,
      },
      {
        id: 11,
        name: "shoes",
        price: 98,
        image: require("../assets/image pottery/shoes8.jpg"),
        isFavorite: false,
      },
      {
        id: 12,
        name: "shoes ",
        price: 98,
        image: require("../assets/image pottery/shoes9.jpg"),
        isFavorite: false,
      },
    ];

export default {
  components: { PotteryComponent },
  data() {
    return { pottery };
  }
};
</script>