import emailService from '../services/email-service.js';
import bus from '../services/event-bus.service.js';

export default {
  template: `
      <div>===COMPOSE===
    <div v-if="email" class="details-container flex column">
        <div class="send-cancel-container flex">
          <button @click="sendEmail" class="btn send-cancel">Send</button>
          <button @click="cancelSending" class="btn send-cancel">Cancel and Delete</button>
        </div>
        <input v-model="email.subject" class="details-top"></input>
        <textarea v-model="email.body" placeholder="type your letter here..."></textarea>
        <!-- <div class="full-content">{{email.body}}</div> -->
      </div>
      </div>
    `,

  data() {
    return {
      email: null
    }
  },

  // data: ['email.body'],

  created() {
    console.log('email-compose CREATED. params=', this.$route.params.emailId);
    this.emailId = this.$route.params.emailId;
    console.log('COMPOSE - MOUNTED , email id is : ',this.emailId);
    emailService.getEmailById(this.emailId)
    .then((res)=>{
        this.email = res;
        console.log('COMPOSE - MOUNTED , email object is : ',this.email);
        return res;
    })
  },

  watch: {
    // '$route.params.emailId': function(newId) {
    //   console.log('$route.params.emailId has changed!', newId);
    //   this.loadEmail(newId);
    // }
  },

  methods: {
    loadEmail(id) {
      console.log('loadEmail METHOD at email-compose , id  = ', id);
      emailService.getEmailById(id).then(res => {
        this.email = res;
        console.log('email-large METHOD: this.email = ', this.email);
      });
    },

    sendEmail(){
      emailService.sendEmail(this.email)
      .then(res => {
      console.log('Sending Successful. server replied:',res);
      bus.$emit('unreadUpdated');
      this.$router.push('/email');
      })
      .catch(res => {
        console.log('Sending Failure. server replied:',res);
      })
    },

    cancelSending(){
      emailService.clearEmail(this.email.id);
      this.$router.push('/email');
    }

  },
};
