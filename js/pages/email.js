import emailList from '../cmps/email/email-list-cmp.js';
import emailDetails from '../cmps/email/email-details-cmp.js';
import emailStatus from '../cmps/email/email-status-cmp.js';
import emailService from '../services/email-service.js';
import emailListItems from '../cmps/email/email-list-item-preview-cmp.js';
import emailLarge from './email-large.js';
import emailCompose from './compose.js';

export default {
    template:`
        <div class="outer-container">
            <div class="btn-compose" @click="composeNew">COMPOSE NEW MAIL</div>
            <div class="inner-container flex">
               <email-list @emailSelected="selectEmail"  :emails="emails"></email-list>
               <email-details v-if="selected" :email="selected"></email-details>
               <!-- <email-large email="selected"></email-large> -->
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
            selected : null,
            id : null,
        };
    },

    created () {
        emailService.getEmails().then((res) => {
            this.emails = res;
            console.log('emails array =',this.emails);
            this.selected = this.emails[0];
        });
    },

    methods: {

        selectEmail(id){
            console.log('unread count = ', emailService.getUnreadCount());
            // console.log('emails Method: selectEmail this.selected =',this.selected);
            emailService.getEmailById(id)
            .then(res => this.selected = res);
            // console.log('>>>>>>>>>> and after service, its ',this.selected);
        },

        changeCmp() {
            this.currView = (this.currView === 'say-hello')? 'user-profile' : 'say-hello'
        },

        composeNew() {
            this.selected = emailService.createNewEmail();
            console.log('service returned new empty mail',this.selected);
            this.$router.push(`/email/compose/${this.selected.id}`);
        }
    },
    components: {
        emailCompose,
        emailLarge,
        emailListItems,
        emailList,
        emailDetails,
        emailStatus,
       
                    // emailToEdit : this.data.user.email
                // }
            // }
        // }
    }
}