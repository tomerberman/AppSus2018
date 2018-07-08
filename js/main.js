import myRouter from './routes.js'
import navBar from './pages/nav-bar.js'
// import userMsg from './cmps/user-msg.js'


new Vue({
    el: '#app',
    router : myRouter,
    components: {
     navBar : navBar
    }
  })