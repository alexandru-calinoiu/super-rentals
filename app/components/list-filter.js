import Component from '@ember/component';
import { debounce } from '@ember/runloop'

export default Component.extend({
    classNames: ['list-filter'],
    value: '',

    init() {
        this._super(...arguments);
        this.populate(this.get('filter'), '');
    },

    actions: {
        handleFilterEntry() {
            debounce(this, this.populate, this.get('filter'), this.get('value'), 1000)
        }
    },

    populate(action, filter) {
        action(filter).then((result) => { if (result.query || '' === filter) { this.set('results', result.results) } });
    }
});
