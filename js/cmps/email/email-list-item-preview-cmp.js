import emailService from '../../services/email-service.js'
import bus from '../../services/event-bus.service.js'

export default {
  template: `
    <div @click="selectEmail" class="list-item-container flex">
        <div class="list-item-icon" @click.stop="markAsUnread">*</div>
        <div v-if="email" :class="{bold:!email.isRead}" class="list-item">{{email.subject}}</div>
        <div v-if="!email" class="list-item">NO_EMAIL LOADED</div>
        <div v-if="email" :class="{bold:!email.isRead}" class="list-item-time">{{dateAndTime()}}</div>
    </div>
    `,

  props: ['email'],

  created() {
  },

  methods: {
    dateAndTime(){
      moment().format('MMMM Do YYYY, h:mm:ss a');
      var str = moment(`/Date(${this.email.sentAt})/`).format("DD/MM/YYYY, h:mm");
      return str;
    },

    selectEmail() {
      this.$emit('emailSelected', this.email.id);
    },

    markAsUnread() {
        emailService.markAsUnread(this.email.id);
        bus.$emit('unreadUpdated');
    }
  }
};

{
  /* <div class="list-item">You just won the lottery! please contact us immediatly</div> */
}
