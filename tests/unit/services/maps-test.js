import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

const DUMMY_ELEMENT = {};

module('service:maps', 'Unit | Service | maps', function (hooks) {
  setupTest(hooks);

  test('should create a new map if one does not exist in cache', function (assert) {
    assert.expect(4);
    let stubMapsUtil = {
      createMap(element, location) {
        assert.ok(element, 'An elemen was passed');
        assert.ok(location, 'A location was passed');
        return DUMMY_ELEMENT;
      }
    };
    let mapService = this.owner.factoryFor('service:maps').create({ mapUtil: stubMapsUtil });
    let mapElement = mapService.getMapElement('San Francisco');
    assert.ok(mapElement, 'Element existis');
    assert.equal(mapElement.className, 'map');
  });

  test('should use the existing map if one was chached for location', function (assert) {
    assert.expect(1);
    let stubCachedMaps = {
      sanFrancisco: DUMMY_ELEMENT,
    };

    let mapService = this.owner.factoryFor('service:maps').create({ cachedMaps: stubCachedMaps, mapUtil: {} });
    let mapElement = mapService.getMapElement('San Francisco');
    assert.equal(DUMMY_ELEMENT, mapElement);
  });
});

