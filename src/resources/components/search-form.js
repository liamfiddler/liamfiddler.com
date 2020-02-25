const listJsonSrc = '/search.json';
const fuseScriptSrc = '/resources/libs/fuse.js';

const fetchJson = async (url) => await (await fetch(url)).json();

const loadFuseScript = () =>
  new Promise((resolve, reject) => {
    if ('Fuse' in window) {
      resolve();
      return;
    }

    const scriptElem = Object.assign(document.createElement('script'), {
      type: 'text/javascript',
      async: true,
      src: fuseScriptSrc,
      onload: resolve,
      onerror: reject,
    });

    document.body.appendChild(scriptElem);
  });

class SearchForm extends HTMLElement {
  constructor() {
    super();
    this.fuse = null;
    this.results = null;
  }

  renderSearchResults(text) {
    const results = this.fuse.search(text);
    const numResults = results.length;

    if (numResults === 0) {
      this.results.innerHTML = `
        <div class="no-results">
          No results found. Please try different keywords.
        </div>
      `;
    }

    let output = '<ol>';

    for (let i = 0; i < numResults; i++) {
      const { title, url, tags } = results[i].item;

      output += `
        <li>
          <a href="${url}">
            ${title}
          </a>
        </li>
      `;
    }

    output += '</ol>';

    this.results.innerHTML = output;
  }

  async initSearch() {
    const input = this.querySelector('#search-value');
    this.results = this.querySelector('#search-results');

    const [list] = await Promise.all([
      fetchJson(listJsonSrc),
      loadFuseScript(),
    ]);

    this.fuse = new Fuse(list, {
      shouldSort: true,
      includeScore: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: [
        {
          name: 'title',
          weight: 0.3,
        },
        {
          name: 'tags',
          weight: 0.5,
        },
        {
          name: 'index',
          weight: 0.7,
        },
      ],
    });

    this.querySelector('form').addEventListener('submit', (e) => {
      e.preventDefault();
      this.renderSearchResults(input.value);
    });
  }

  connectedCallback() {
    this.initSearch();
  }
}

customElements.define('search-form', SearchForm);
