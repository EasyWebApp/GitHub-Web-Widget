import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import { highlight, languages } from 'prismjs';

export const marked = new Marked(
    markedHighlight({
        highlight(code, language) {
            language = language?.toLowerCase() || 'none';

            const Class = `class="language-${language}"`,
                grammer = languages[language];

            return `<pre ${Class}><code ${Class}>${
                grammer ? highlight(code, grammer, language) : code
            }</code></pre>`;
        }
    })
);
