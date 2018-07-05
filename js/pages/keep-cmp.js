// Vue.component('say-hello', {
//     template: `<section>HELLO</section>`
// })
import noteTxt from '../cmps/keep/note-txt.js'

export default {
    template: `
    <section class="home">
        <h1>Keep</h1>
        <div>
				<label for="search">Search:</label> 
				<input type="text" id="search" />
		</div>
        <!-- <button @click="cmps.push({cmpType: 'say-hello', data: {greet : 'Hi'}})">+</button>-->

        <section class="flex">
            <component v-for="(cmp, idx) in cmps" :is="cmp.cmpType" :key="idx" :data="cmp.data" >
            </component> 
        </section>

        <!-- <button @click="changeCmp">Change Cmp</button> -->
        
        <!-- <component :is="currView" :data="{user: {email: 'x@x.com'}}"></component>-->

    </section>
    `,
    data() {
        return {
            currView: 'note-txt',

            cmps: [
                { cmpType: 'note-txt', data: { title: 'note 1', txt: 'text for display 1' } },
                { cmpType: 'note-txt', data: { title: 'note 2', txt: 'text for display 2' } },
            ]
        }
    },
    methods: {
        changeCmp() {
            this.currView = (this.currView === 'say-hello') ? 'user-profile' : 'say-hello'
        }
    },
    components: {
        noteTxt
    }
}


// 'note-txt': {
//     template: `<section>GREET {{data.txt}}</section>`,
//     props: ['data']
// }

// <input type="text" id="search" 
// 					v-model="filterBy.by" 
// 					@input="updateFilter"/>