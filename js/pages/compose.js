import emailService from '../services/email-service.js';

export default {
  template: `
      <div>===COMPOSE===
    <!-- <div v-if="email" class="details-container flex column"> -->
        <div class="send-cancel-container flex">
          <button @click="sendEmail" class="btn send-cancel">Send</button>
          <button @click="cancelSending" class="btn send-cancel">Cancel and Delete</button>
        </div>
        <div class="details-top">{{email.subject}}</div>
        <div class="full-content">{{email.body}}</div>
      </div>
    `,

  props: ['email'],

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
      })
      .catch(res => {
        console.log('Sending Failure. server replied:',res);
      })
    }

  },
};
