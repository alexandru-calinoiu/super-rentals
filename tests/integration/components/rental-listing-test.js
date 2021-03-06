import Service from '@ember/service';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import EmberObject from '@ember/object';

let stubMapService = Service.extend({
  getMapElement() {
      document.createElement('div');
  }
})

module('Integration | Component | rental-listing', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.rental = EmberObject.create({
      image: 'fake.png',
      title: 'test-title',
      owner: 'test-owner',
      type: 'test-type',
      city: 'test-city',
      bedrooms: 3
    });
    this.owner.register('service:maps', stubMapService);
  });

  test('should render rental details', async function (assert) {
    await render(hbs`{{rental-listing rental=rental}}`);
    assert.equal(this.$('.listing h3').text().trim(), 'test-title');
    assert.equal(this.$('.listing .owner').text().trim(), 'Owner: test-owner');
  });

  test('sholud toggle wide class on click', async function (assert) {
    await render(hbs`{{rental-listing rental=rental}}`);
    assert.notOk(this.element.querySelector('.image.wide'));
    await click('.image');
    assert.ok(this.element.querySelector('.image.wide'));
    await click('.image');
    assert.notOk(this.element.querySelector('.image.wide'));
  });
});
