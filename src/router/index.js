import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import ProduitView from "@/views/ProduitView.vue";
import FeedbackView from "@/views/FeedbackView.vue";
import ClothesView from "@/views/ClothesView.vue";
import JewelleryView from "@/views/JewelleryView.vue";
import ShoesView from "@/views/ShoesView.vue";
import TopView from "@/views/TopView.vue";
import CartView from "@/views/CartView.vue";
import FavoritesView from "@/views/FavoritesView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/produit",
    name: "Produit",
    component: ProduitView,
  },
  {
    path: "/feedback",
    name: "Feedback",
    component: FeedbackView,
  },
  {
    path: "/clothes",
    name: "Clothes",
    component: ClothesView,
  },
  {
    path: "/accessories",
    name: "Jewellery",
    component: JewelleryView,
  },
  {
    path: "/shoes",
    name: "Shoes",
    component: ShoesView,
  },
  {
    path: "/top/:id",
    name: "TOP",
    component: TopView,
    props: (route) => ({ productId: route.params.id }),
  },
  {
    path: "/cart",
    name: "CartView",
    component: CartView,
  },
  {
    path: "/favorites",
    name: "FavoritesView",
    component: FavoritesView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
