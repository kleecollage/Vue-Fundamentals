const app = Vue.createApp({
  data() {
    return {
      title: 'Hello world from VueJS 3',
      amount: 555,
      link: 'https://youtube.com',
      state: false,
      services: ['transfers', 'payments', 'drafts', 'checks'],
      disabled: false,
    }
  },
  methods: {
    addBalance() {
      if (this.amount > 0) {
        this.disabled = false;
        this.amount += 100
        return;
      }
      this.amount += 100
    },
    decreaseBalance(quantity) {
      if (this.amount <= 0) {
        this.disabled = true;
        alert('Zero Balance!');

        return;
      }
      this.amount -= quantity
    }
  },
  computed: {
    colorAmount() {
      return this.amount > 500 ? 'text-success' : 'text-danger'
    },
    upperText() {
      return this.title.toUpperCase();
    }
  }
 })