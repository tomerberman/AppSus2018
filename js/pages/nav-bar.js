import emailService from '../services/email-service.js';
import bus from '../services/event-bus.service.js';

export default {
  template: `
    <div class="nav-bar-container flex column">
      <div class="nav-bar flex">
        <div v-if="unreadStatus.unread > 0" class="nav-bar-counter">New {{unreadStatus.unread}}</div>
        <div class="app-name">App-sus</div>
        <div class="routing-links flex">
            <router-link exact to="/">Home</router-link> |
            <router-link to="/email">email</router-link> |
            <router-link to="/keep">keep</router-link>
        </div>
        </div>
    </div>
`,

  data() {
    return {
        unreadStatus: emailService.getUnreadCount()
    };
  },

  created() {
    bus.$on('unreadUpdated', () => {
      this.unreadStatus = emailService.getUnreadCount()
    });
  }
};
