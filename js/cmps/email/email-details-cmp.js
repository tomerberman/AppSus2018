// import myRouter from '../../routes.js'

export default {
    template: `
      
      <div class="details-container flex column">
            <div @click="fullScreenRead" class="details-top">{{email.subject}}</div>
            <!-- <div class="details-top">Amazing offer for You! 40% off!</div> -->
            <div class="full-content">{{email.body}}</div>
            <!-- <div class="full-content">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis, neque quo beatae, rerum quia illum eum suscipit esse consequatur ipsam eligendi recusandae laborum consequuntur eos assumenda sequi dolorem labore velit?
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis, neque quo beatae, rerum quia illum eum suscipit esse consequatur ipsam eligendi recusandae laborum consequuntur eos assumenda sequi dolorem labore velit?
            </div> -->
      </div>
      `,

      props : ['email'],

      methods : {
        fullScreenRead() {
            console.log('fuLllllll   screeEENNN');
            this.$router.push(`/email/large/${this.email.id}`);
        },
    },
  };