import bus from '../../services/event-bus.service.js';
import emailService from '../../services/email-service.js';

export default {
  template: `
    <div v-if="status" class="status-container flex">
        <div class="progress-container">
            <div class="progress-empty flex">
                <div :style="{ width: percentComplete + '%' }" class="progress-filling"></div>
            </div>
        </div>
        <div class="progress-data">{{percentComplete.toFixed(0)}}%</div>
    </div>
    `,

  data() {
    return {
      status: null
    };
  },

  computed: {
    percentComplete() {
        return 100 * (1 - (this.status.unread / this.status.total));
    }
  },

  mounted() {
      this.status = emailService.getUnreadCount();

  },

  created() {
    bus.$on('unreadUpdated', () => {
      this.status = emailService.getUnreadCount();
    });
  }
};
