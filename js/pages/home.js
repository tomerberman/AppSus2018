
export default {
    template:`
    <section class="home">
        <h2 >Welcome to Apsus!</h2>
        <h3>The best App + Sus on the web!</h3>
       <div class="box" @click="$router.push('/email')"> <i class="fab fa-mailchimp"></i> Email</div>
       <div class="box" @click="$router.push('/keep')"><i class="far fa-sticky-note"></i> Keep </div>
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