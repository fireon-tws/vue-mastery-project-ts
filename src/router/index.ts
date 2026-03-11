import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/menus',
      name: 'menus',
      component: () => import('../views/MenuListView.vue'),
    },
    {
      path: '/menus/new',
      name: 'menu-new',
      component: () => import('../views/MenuCreateView.vue'),
    },
    {
      path: '/menus/:id',
      name: 'menu-detail',
      component: () => import('../views/MenuDetailView.vue'),
    },
    {
      path: '/menus/:id/edit',
      name: 'menu-edit',
      component: () => import('../views/MenuEditView.vue'),
    },
    {
      path: '/planner',
      name: 'planner',
      component: () => import('../views/PlannerView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue'),
    },
  ],
})

export default router
