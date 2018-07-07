import emailService from '../services/email-service.js';
import myRouter from '../routes.js';

export default {
  template: `
    <div v-if="email" class="details-container flex column">
      <div>===emailLarge===</div>
      <div class="prev-next-container flex">
        <button @click="prevEmail" class="btn prev-next">Previous Email</button>
        <button @click="nextEmail" class="btn prev-next">Next Email</button>
      </div>
      <div class="details-top">{{email.subject}}</div>
      <div class="full-content">{{email.body}}</div>
    </div>
    `,

  props: ['email'],

  created() {
    console.log('email-large CREATED. params=', this.$route.params.emailId);
    this.emailId = this.$route.params.emailId;

    console.log('email-large CREATED: this.emailID =', this.emailId);
    console.log('email-large CREATED: this.email =', this.email);
    emailService.getEmailById(this.emailId).then(res => {
      this.email = res;
      console.log(
        'email-large CREATED: this.email (after service) =',
        this.email
      );
    });
  },

  watch: {
    '$route.params.emailId': function(newId) {
      console.log('$route.params.emailId has changed!', newId);
      this.loadEmail(newId);
    }
  },

  methods: {
    loadEmail(id) {
      console.log('loadEmail at email-large , id  = ', id);
      emailService.getEmailById(id).then(res => {
        this.email = res;
        console.log('email-large METHOD: this.email = ', this.email);
      });
    },

    nextEmail() {
      emailService.getNextEmailId(this.email.id).then(id => {
        this.$router.push(`${id}`);
        // route? router?
        emailService.markAsRead(id);
      });
    },

    prevEmail() {
      emailService.getPrevEmailId(this.email.id).then(id => {
        this.$router.push(`${id}`);
        emailService.markAsRead(id);
        // route? router?
      });
    },

  },
};
