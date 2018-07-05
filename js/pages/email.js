// Vue.component('say-hello', {
//     template: `<section>HELLO</section>`
// })

export default {
    template:`
    <section class="home">
        <h1>email!</h1>
        <!-- <button @click="cmps.push({cmpType: 'say-hello', data: {greet : 'Hi'}})">+</button>
        <component v-for="(cmp, idx) in cmps" :is="cmp.cmpType" :key="idx" :data="cmp.data">
        </component> -->


        <button @click="changeCmp">Change Cmp</button>
        <keep-alive>
            <component :is="currView" :data="{user: {email: 'x@x.com'}}"></component>
        </keep-alive>

    </section>
    `,
    data() {
        return {
            currView : 'user-profile',
            
            cmps: [
                {cmpType: 'say-hello', data: {greet : 'Ahalan'}},
                {cmpType: 'user-profile', data: {user : {email: 'bo@bob.com'} } },
                {cmpType: 'say-hello', data: {greet : 'Marhaba!'}},

            ]
        }
    },
    methods: {
        changeCmp() {
            this.currView = (this.currView === 'say-hello')? 'user-profile' : 'say-hello'
        }
    },
    components: {
        'say-hello' : {
            template: `<section>GREET {{data.greet}}</section>`,
            props: ['data']
        },
        'user-profile' : {
            template: `<section>
                            {{data.user.email}}
                            <input type="text" v-model="emailToEdit" />
                        </section>`,
            props: ['data'],
            data() {
                return {
                    emailToEdit : this.data.user.email
                }
            }
        }
    }
}