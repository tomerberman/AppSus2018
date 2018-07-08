export default {
  template: `
    <section class="details">
      <div v-if="email" class="details-container flex column">
            <div @click="fullScreenRead" class="details-top">{{email.subject}}</div>
            <div class="full-content">{{email.body}}</div>
      </div>
      <div v-if="!email" class="details-container flex column">
            <div @click="fullScreenRead" class="details-top"></div>
            <div class="full-content"></div>
      </div>
    </section>
      `,

  props: ['email'],

  methods: {
    fullScreenRead() {
      this.$router.push(`/email/large/${this.email.id}`);
    }
  }
};
