import emailService from '../services/email-service.js';
import bus from '../services/event-bus.service.js';

export default {
  template: `
      <div>
    <div v-if="email" class="details-container flex column">
        <div class="send-cancel-container flex">
          <button @click="sendEmail" class="btn send-cancel">Send</button>
          <button @click="cancelSending" class="btn send-cancel">Cancel and Delete</button>
        </div>
        <input v-model="email.subject" class="details-top"></input>
        <textarea class="compose-body" v-model="email.body" placeholder="type your letter here..."></textarea>
      </div>
      </div>
    `,

  data() {
    return {
      email: null
    }
  },

  created() {
    this.emailId = this.$route.params.emailId;
    emailService.getEmailById(this.emailId)
    .then((res)=>{
        this.email = res;
        return res;
    })
  },

  methods: {
    loadEmail(id) {
      emailService.getEmailById(id).then(res => {
        this.email = res;
      });
    },

    sendEmail(){
      emailService.sendEmail(this.email)
      .then(res => {
      bus.$emit('unreadUpdated');
      this.$router.push('/email');
      })
      .catch(res => {
      })
    },

    cancelSending(){
      emailService.clearEmail(this.email.id);
      this.$router.push('/email');
    }

  },
};
