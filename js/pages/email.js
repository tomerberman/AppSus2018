import emailList from '../cmps/email/email-list-cmp.js';
import emailDetails from '../cmps/email/email-details-cmp.js';
import emailStatus from '../cmps/email/email-status-cmp.js';
import emailService from '../services/email-service.js';
import emailListItems from '../cmps/email/email-list-item-preview-cmp.js';
import emailLarge from './email-large.js';
import emailCompose from './compose.js';

export default {
  template: `
        <div class="outer-container">
            <div class="control-bar flex">
            <button class="btn-compose" @click="composeNew">Compose New</button>
            <button class="btn-show-unread" @click="showUnread">Unread Emails</button>
            <button class="btn-show-all" @click="showAll">All Emails</button>
            <button class="btn-sort-date" @click="sortByDate">Sort by Date</button>
            <button class="btn-sort-subject" @click="sortBySubject">Sort by Subject</button>
            </div>
            <input type="text" class="search" v-model="searchQuery" placeholder="Search Emails">
            <div class="inner-container flex">
               <email-list @emailSelected="selectEmail"  :emailsToShow="emailsToShow"></email-list>
               <email-details :email="selected"></email-details>
            </div>
            <email-status></email-status>
        </div>
`,

  data() {
    return {
      emails: null,
      selected: null,
      id: null,
      searchQuery: null,
      showUnreadOnly: false,
      sortBy: null
    };
  },

  computed: {
    emailsToShow() {
      var emailsToShow = this.emails; // [];
      if (this.showUnreadOnly) {
        emailsToShow = this.emails.filter(item => {
          return !item.isRead;
        });
        // return emailsToShow;
      } //else return this.emails;
      if (this.searchQuery) {
        this.selected = null;
        emailsToShow = emailsToShow.filter(item => {
          return ( item.subject.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          item.body.toLowerCase().includes(this.searchQuery.toLowerCase()));
        });
      }

      switch (this.sortBy) {
        case null : break;
        case 'date' : {
          emailsToShow = emailsToShow.sort(function(a,b) {
            if (a.sentAt > b.sentAt) return -1;
            else return 1;
          });
          break;
        }
        case 'subject' : {
          emailsToShow = emailsToShow.sort(function(a,b) {
            if (a.subject.toLowerCase() > b.subject.toLowerCase()) return 1;
            else return -1;
          });
        }
      }
      return emailsToShow;
    }
  },

  created() {
    emailService.getEmails().then(res => {
      this.emails = res;
      // this.selected = this.emails[0];
    });
  },

  methods: {
    selectEmail(id) {
      console.log('unread count = ', emailService.getUnreadCount());
      emailService.getEmailById(id).then(res => {
        this.selected = res;
        emailService.markAsRead(id);
      });
    },

    composeNew() {
      this.selected = emailService.createNewEmail();
      console.log('service returned new empty mail', this.selected);
      this.$router.push(`/email/compose/${this.selected.id}`);
    },

    showUnread() {
      this.showUnreadOnly = true;
      this.selected = null;
    },

    showAll() {
      this.showUnreadOnly = false;
      this.selected = null;
    },

    sortByDate () {
      this.sortBy = 'date';
    },

    sortBySubject () {
      this.sortBy = 'subject';
    },


  },
  components: {
    emailCompose,
    emailLarge,
    emailListItems,
    emailList,
    emailDetails,
    emailStatus
  }
};
