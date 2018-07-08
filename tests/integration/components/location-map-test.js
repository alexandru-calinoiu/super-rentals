import Service from '@ember/service';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

const StubMapsService = Service.extend({
  getMapElement(location) {
    this.set('calledWithLocation', location);
    return document.createElement('div');
  }
})

module('Integration | Component | location-map', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.owner.register('service:maps', StubMapsService);
    this.mapsService = this.owner.lookup('service:maps');
  });

  test('should append map element to container', async function(assert) {
    this.set('myLocation', 'Sibiu');
    
    await render(hbs`{{location-map location=myLocation}}`);
    
    assert.equal(this.element.querySelector('.map-container').childNodes.length, 1);
    assert.equal(this.get('mapsService.calledWithLocation'), 'Sibiu');
  });
});
