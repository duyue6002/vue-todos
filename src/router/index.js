import Vue from 'vue';
import Router from 'vue-router';
// import HelloWorld from '@/components/HelloWorld';
import Layouts from '@/components/layouts';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Layouts',
      component: Layouts,
    },
  ],
});
