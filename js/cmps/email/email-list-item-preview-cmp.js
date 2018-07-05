export default {
    template : `
    <div @click="selectEmail" class="list-item-container flex">
        <div class="list-item-icon">*</div>
        <div v-if="email" class="list-item">{{email.subject}}</div>
        <div v-if="!email" class="list-item">NO_EMAIL LOADED</div>
        <div class="list-item-status">16:37</div>
    </div>
    `,

    props: ['email'],
    
    methods : {
        selectEmail() {
            console.log('emitting id=',this.email.id);
            this.$emit('emailSelected', this.email.id);
        }
    }
}

{/* <div class="list-item">You just won the lottery! please contact us immediatly</div> */}
