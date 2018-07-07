import emailService from '../../services/email-service.js'
// import moment from '../../../lib/moment.js'

export default {
  template: `
    <div @click="selectEmail" class="list-item-container flex">
        <div class="list-item-icon" @click="markAsUnread">*</div>
        <div v-if="email" :class="{bold:email.isRead}" class="list-item">{{email.subject}}</div>
        <div v-if="!email" class="list-item">NO_EMAIL LOADED</div>
        <div v-if="email" class="list-item-time">{{dateAndTime()}}</div>
    </div>
    `,

  props: ['email','viewMenu','dateAndTime'],

  created() {
    this.viewMenu = false;
  },

  methods: {
    dateAndTime(){
      moment().format('MMMM Do YYYY, h:mm:ss a');
      var str = moment(`/Date(${this.email.sentAt})/`).format("DD/MM/YYYY, h:mm");
      return str;
    },

    selectEmail() {
      console.log('item-preview, email props is :', this.email);
      console.log('emitting id=', this.email.id);
      this.$emit('emailSelected', this.email.id);
    },

    markAsUnread() {
        console.log('ITEM_PREVIEW markAsUnread');
        
        emailService.markAsUnread(this.email.id);
    }
  }
};

{
  /* <div class="list-item">You just won the lottery! please contact us immediatly</div> */
}
