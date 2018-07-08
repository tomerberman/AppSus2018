import emailPreview from './email-list-item-preview-cmp.js';

export default {
  template: `
    
    <div class="list-container flex-column">
           <email-preview @emailSelected="emitSelected" :email="email" v-for="(email,idx) in emailsToShow" :key=idx></email-preview>
    </div>
    `,

    props: ['emails','emailsToShow'],

    components: {
        emailPreview
    },

    created () {
        console.log('email-list Created! this.emails=',this.emails);
        console.log('email-list Created! this.emailToShow=',this.emailsToShow);
    },

    methods : {
        emitSelected(id) {
            // console.log('email-list Method emitSelected, emailSelected id = ',id);
            this.$emit('emailSelected',id);
        },
    }
};
