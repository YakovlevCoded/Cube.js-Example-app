import VueRouter from 'vue-router'
import Hello from '../components/pages/Hello'
import Login from '../components/pages/Login'
import Dashboard from '../components/pages/Dashboard'

// 2. Define some routes
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// `Vue.extend()`, or just a component options object.
// We'll talk about nested routes later.
const routes = [
    { path: '/', component: Hello },
    { path: '/login', component: Login },
    { path: '/dashboard', component: Dashboard },
];

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
    routes // short for `routes: routes`
});

router.beforeEach((to, from, next) => {
    if (to.path === '/' || to.path === '/login') {
        next();
    } else {
        let user = localStorage.getItem('user');
        if (user) {
            next();
        } else {
            next({ path: '/' })
        }
    }
});

export default router;
