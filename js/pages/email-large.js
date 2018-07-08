import emailService from '../services/email-service.js';
import bus from '../services/event-bus.service.js';

export default {
  template: `
    <section v-if="email" class="details-container flex column">
      <div class="prev-next-outer flex">
        <div class="details flex">
          <div class="prev-next-container flex">
            <button @click="prevEmail" class="btn prev-next">Previous Email</button>
            <button @click="nextEmail" class="btn prev-next">Next Email</button>
            <button @click="deleteEmail" class="btn delete">Delete Email</button>
          </div>
          <button @click="BackToInbox" class="btn back-to">Back to Inbox</button>
        </div>  
      </div>
      <div class="details-top">{{email.subject}}</div>
    <div class="full-content">{{email.body}}</div>
    </section>
    `,

  data () {
    return {
      email : null,
    }
  },

  created() {
    this.emailId = this.$route.params.emailId;
    emailService.getEmailById(this.emailId).then(res => {
      this.email = res;
    });
  },

  watch: {
    '$route.params.emailId': function(newId) {
      this.loadEmail(newId);
    }
  },

  methods: {
    loadEmail(id) {
      emailService.getEmailById(id).then(res => {
        this.email = res;
      });
    },

    nextEmail() {
      emailService.getNextEmailId(this.email.id).then(id => {
        this.$router.push(`${id}`);
        emailService.markAsRead(id);
        bus.$emit('unreadUpdated');
      });
    },

    prevEmail() {
      emailService.getPrevEmailId(this.email.id).then(id => {
        this.$router.push(`${id}`);
        emailService.markAsRead(id);
        bus.$emit('unreadUpdated');
      });
    },

    deleteEmail() {
      emailService.clearEmail(this.email.id);
      this.nextEmail();
    },

    BackToInbox() {
      this.$router.push(`/email/`);
    }
  }
};
