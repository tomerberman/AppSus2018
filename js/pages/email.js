import emailList from '../cmps/email/email-list-cmp.js';
import emailDetails from '../cmps/email/email-details-cmp.js';
import emailStatus from '../cmps/email/email-status-cmp.js';
import emailService from '../services/email-service.js';
import emailListItems from '../cmps/email/email-list-item-preview-cmp.js';


// Vue.component('say-hello', {
//     template: `<section>HELLO</section>`
// })

export default {
    template:`
        <div class="outer-container">
            <div class="inner-container flex">
               <email-list @emailSelected="selectEmail"  :emails="emails"></email-list>
               <email-details v-if="selectedEmail" :email="selectedEmail"></email-details>
            </div>
            <email-status></email-status>
        </div>
`,

/*
        <!-- <component v-for="(cmp, idx) in cmps" :is="cmp.cmpType" :key="idx" :data="cmp.data"> -->
        <!-- <keep-alive> -->
            <!-- <component :is="currView" :data="{user: {email: 'x@x.com'}}"></component> -->
        <!-- </keep-alive> -->
*/

    data() {
        return {
            emails : null,
            selectedEmail : null,
            id : null,
        };

        // currView : 'user-profile',
            
        //     cmps: [
        //         {cmpType: 'say-hello', data: {greet : 'Ahalan'}},
        //         {cmpType: 'user-profile', data: {user : {email: 'bo@bob.com'} } },
        //         {cmpType: 'say-hello', data: {greet : 'Marhaba!'}},

        //     ]
        // }
    },

    created () {
        emailService.getEmails().then((res) => {
            this.emails = res;
            console.log('emails array =',this.emails);
            this.selectedEmail = this.emails[0];
        });
    },

    methods: {

        selectEmail(id){
            console.log('this.selectedEmail =',this.selectedEmail);
            this.selectedEmail = emailService.getEmailById(id);
        },

        changeCmp() {
            this.currView = (this.currView === 'say-hello')? 'user-profile' : 'say-hello'
        }
    },
    components: {
        emailListItems,
        emailList,
        emailDetails,
        emailStatus,



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