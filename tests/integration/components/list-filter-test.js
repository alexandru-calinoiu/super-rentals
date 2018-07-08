import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled, triggerKeyEvent, fillIn } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { resolve } from 'rsvp';

const ITEMS = [{ city: 'San Francisco' }, { city: 'Portland' }, { city: 'New York' }];
const FILTERED_ITEMS = [{ city: 'New York' }];

module('Integration | Component | list-filter', function (hooks) {
  setupRenderingTest(hooks);

  test('should initially load all listing', async function (assert) {
    this.set('filterByCity', () => resolve({ results: ITEMS }));

    await renderComponent();

    settled().then(() => {
      assert.equal(this.element.querySelectorAll('.city').length, 3);
      assert.equal(this.element.querySelector('.city').textContent.trim(), 'San Francisco');
    })
  });

  test('should filter results', async function (assert) {
    this.set('filterByCity', () => resolve({ results: FILTERED_ITEMS }));
    
    await renderComponent();

    let inputElement = this.element.querySelector('.list-filter input');
    await fillIn(inputElement, 'n');
    await triggerKeyEvent(inputElement, 'keyup', 83);

    settled().then(() => {
      assert.equal(this.element.querySelectorAll('.city').length, 1);
      assert.equal(this.element.querySelector('.city').textContent.trim(), 'New York');
    })
  });

  function renderComponent() {
    return render(hbs`
      {{#list-filter filter=(action filterByCity) as |results|}}
        <ul>
        {{#each results as |item|}}
          <li class="city">{{item.city}}</li>
        {{/each}}
        </ul>
      {{/list-filter}}
    `)
  }
});
