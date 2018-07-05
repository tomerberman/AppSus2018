import home from './pages/home.js'
import email from './pages/email.js'
import keep from './pages/keep.js'


const routes = [
  {path: '/', component: home},
  {path: '/keep', component: keep},
  {path: '/email', component: email}
];

Vue.use(VueRouter);
var myRouter = new VueRouter({routes})

export default myRouter;



