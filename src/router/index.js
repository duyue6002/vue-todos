import Vue from 'vue';
import Router from 'vue-router';
// import HelloWorld from '@/components/HelloWorld';
import Layouts from '@/components/layouts';
import todo from '@/components/todo';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Layouts',
      component: Layouts,
      children: [{
        path: '/todo/:id',
        name: 'todo',
        component: todo
      }]
    },
  ],
});
