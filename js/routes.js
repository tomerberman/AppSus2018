import home from './pages/home.js'
import email from './pages/email.js'
import keep from './pages/keep-cmp.js'
import emailLarge from './pages/email-large.js'


const routes = [
  { path: '/', component: home },
  { path: '/email', component: email },
  { path: '/email/:emailId', component: emailLarge },
  { path: '/keep', component: keep },
  // { path: '/keep/:noteId', component: noteDetails },
  { path: '*', redirect: '/' }
];

Vue.use(VueRouter);
var myRouter = new VueRouter({ routes })

export default myRouter;



