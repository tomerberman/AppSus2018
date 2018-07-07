import home from './pages/home.js'
import email from './pages/email.js'
import keep from './pages/keep-app-cmp.js'
import notePreview from './cmps/keep/note-preview-cmp.js'
import noteEdit from './cmps/keep/note-edit-cmp.js'


// import emailLarge from './pages/email-large.js'

const routes = [
  { path: '/', component: home },
  { path: '/email', component: email },
  // { path: '/email/:emailId', component: emailLarge },
  { path: '/keep', component: keep },
  { path: '/keep/:noteId', component: notePreview },
  { path: '/keep/edit/:noteId', component: noteEdit },
  { path: '*', redirect: '/' }
];

Vue.use(VueRouter);
var myRouter = new VueRouter({ routes })

export default myRouter;