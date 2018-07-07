import emailPreview from './email-list-item-preview-cmp.js';

export default {
  template: `
    
    <div class="list-container flex-column">
           <email-preview @emailSelected="emitSelected" :email="email" v-for="(email,idx) in emails" :key=idx></email-preview>
           <email-preview></email-preview>
    </div>
    `,

    props: ['emails'],

    components: {
        emailPreview
    },

    created () {
        // console.log('email-list Created! this.emails=',this.emails);
    },

    methods : {
        emitSelected(id) {
            // console.log('email-list Method emitSelected, emailSelected id = ',id);
            this.$emit('emailSelected',id);
        },
    }
};
