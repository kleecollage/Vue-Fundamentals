app.component('footer-banco', {
  props: ['value', 'date'],
	template: /* html */`
    <div class="bg-dark py-3 mt-2 text-white text-center">
      <h3>{{ text }}  ({{ value }}) </h3>
      <p>{{ date }}</p>
    </div>
  `,
  data() {
    return {
      text: 'My web site dynamic footer',
    }
  }
});
