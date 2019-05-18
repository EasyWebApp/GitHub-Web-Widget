import { component } from 'web-cell';

import CodeParser from 'code-parser';

import marked from 'marked';

@component()
export default class MarkDown extends CodeParser {
    constructor() {
        super();
    }

    static parse(raw) {
        return marked(raw);
    }
}