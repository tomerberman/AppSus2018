import emailService from '../services/email-service.js';
import bus from '../services/event-bus.service.js';

export default {
  template: `
    <div class="nav-bar-container flex column">
        <h1> App-sus </h1>
        <div class="nav-bar flex">
            <div class="nav-bar-counter">unread: {{unreadStatus.unread}}</div>
            <div class="nav-bar-counter">total: {{unreadStatus.total}}</div>
        </div>
        <div>
            <router-link exact to="/">Home</router-link> |
            <router-link to="/email">email</router-link> |
            <router-link to="/keep">keep</router-link>
        </div>
    </div>
`,

  data() {
    return {
        unreadStatus: emailService.getUnreadCount()
    //   unreadStatus() {
    //     var unreadStatus = emailService.getUnreadCount();
    //     return unreadStatus;
    //   }
    };
  },

  created() {
    bus.$on('unreadUpdated', () => {
      this.unreadStatus = emailService.getUnreadCount()
    //   console.log('HOME recieved unread count:', x);
    });
  }
};
