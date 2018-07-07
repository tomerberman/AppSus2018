import eventBus, {USR_MSG_DISPLAY} from '../services/event-bus.service.js'
import toggleBtn from '../cmps/toggle-btn.js'

export default {
    template:`
    <section class="about">
        <h1 ref="myTitle">Keep {{greet}}</h1>
        Happy? {{isHappy}}
        <br/><br/><br/> 
        <toggle-btn v-model="isHappy"></toggle-btn>
        <button @click="goHome">Go Home</button>
        You spent {{count}} secs of your life here.
    </section>
    `,
    created() {
        console.log('Component ABOUT was created!');
        this.intervalSecs = setInterval(()=>{
            this.count++
            console.log('Still here!');
        }, 1000)
        
    },
    mounted() {
        console.log('Component ABOUT was mounted to DOM!', this.$refs);
        // this.$refs.myTitle.innerHTML = 'Puki'
    },
    destroyed() {
        console.log('Component ABOUT was Destoyed');
        clearInterval(this.intervalSecs)
        this.intervalSecs = null;
    },
    data() {
        return {
            intervalSecs : null,
            count: 0,
            isHappy: false, 
            greet: this.$route.params.greet
        }
    },
    methods: {
        goHome() {
            eventBus.$emit(USR_MSG_DISPLAY, {txt:'Going Home...',type:'success'});
            this.$router.push('/')
        }
    },
    components: {
        toggleBtn
    }
    
}