import emailList from '../cmps/email/email-list-cmp.js';
import emailDetails from '../cmps/email/email-details-cmp.js';
import emailStatus from '../cmps/email/email-status-cmp.js';
import emailService from '../services/email-service.js';
import emailListItems from '../cmps/email/email-list-item-preview-cmp.js';
import emailLarge from './email-large.js';
import emailCompose from './compose.js';
import bus from '../services/event-bus.service.js'


export default {
  template: `
        <div class="outer-container">
            <div class="control-bar flex">
            <button class="btn-compose" @click="composeNew">Compose New</button>
            <button class="btn-sort-date" @click="sortByDate">Sort by Date</button>
            <button class="btn-sort-subject" @click="sortBySubject">Sort by Subject</button>
            </div>
            <section class="radio-search flex">
              <label>
              <input type="radio" id="radio-filter-all" value="all" v-model="filterByStatus">All
              </label>
              <label>
              <input type="radio" id="radio-filter-read" value="read" v-model="filterByStatus">Read
              </label>
              <label>
              <input type="radio" id="radio-filter-unread" value="unread" v-model="filterByStatus">Unread
              </label>
              <input type="text" class="search" v-model="searchQuery" placeholder="Search Emails">
            </section>
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
      sortBy: null,
      filterByStatus : 'all',
    };
  },

  computed: {
    
    emailsToShow() {
      var emailsToShow = this.emails;

      switch (this.filterByStatus) {
        case 'all' : 
        break;

        case 'read' : 
        emailsToShow = this.emails.filter(item => {
          return item.isRead;
        });
        break;

        case 'unread' : 
        emailsToShow = this.emails.filter(item => {
          return !item.isRead;
        });
      }

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
    });
  },

  methods: {
    selectEmail(id) {
      var isSmall = window.innerWidth < 680;
      if (isSmall) {
        this.$router.push(`/email/large/${id}`);
      } else {
        emailService.getEmailById(id).then(res => {
          this.selected = res;
          emailService.markAsRead(id);
          bus.$emit('unreadUpdated');
  
        });
      }
    },

    composeNew() {
      this.selected = emailService.createNewEmail();
      this.$router.push(`/email/compose/${this.selected.id}`);
    },

    showUnread() {
      this.selected = null;
    },

    showRead() {
      this.selected = null;
    },

    showAll() {
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
