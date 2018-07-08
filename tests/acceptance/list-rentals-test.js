import Service from '@ember/service';
import { module, test } from 'qunit';
import { visit, currentURL, click, triggerKeyEvent, fillIn } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';

let stubMapService = Service.extend({
  getMapElement() {
    document.createElement('div');
  }
})

module('Acceptance | list rentals', function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(function () {
    this.owner.register('service:maps', stubMapService);
  });

  test('should show rentals as home page', async function (assert) {
    await visit('/');
    assert.equal(currentURL(), '/rentals');
  });

  test('should link to information about the company', async function (assert) {
    await visit('/');
    await click('.menu-about');
    assert.equal(currentURL(), '/about');
  });

  test('should link to contact information', async function (assert) {
    await visit('/');
    await click('.menu-about');
    assert.equal(currentURL(), '/about');
  });

  test('should list available rentals', async function (assert) {
    await visit('/');
    assert.equal(this.element.querySelectorAll('.listing').length, 3);
  });

  test('should filter the list of rentals by city', async function (assert) {
    await visit('/');
    await fillIn('.list-filter input', 's');
    await triggerKeyEvent('.list-filter input', 'keyup', 69);

    assert.equal(this.element.querySelectorAll('.results .listing').length, 2);
    assert.ok(this.element.querySelector('.listing .location').textContent.trim().includes('San Francisco'));
  });

  test('should link to rental information', async function (assert) {
  });
});
