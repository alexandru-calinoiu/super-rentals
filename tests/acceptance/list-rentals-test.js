import { module, test } from 'qunit';
import { visit, currentURL, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | list rentals', function (hooks) {
  setupApplicationTest(hooks);

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

  test('should list available rentals', async function(assert) { });
  
  test('should filter the list of rentals by city', async function(assert) { });

  test('should link to rental information', async function(assert) { });
});
