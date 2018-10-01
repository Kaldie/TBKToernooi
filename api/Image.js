import { _ } from 'underscore'

export class Image {
    constructor(doc) {
	return _.extend(this, doc)
    }
}
