import { Task } from '@lit/task';
import Fuse from 'fuse.js';
import { StyledComponent, html, css } from './_styled-component.js';

const listJsonSrc = '/search.json';

const fetchJson = async (url) => await (await fetch(url)).json();

class SearchForm extends StyledComponent {
	static styles = css`
		.posts {
			margin: 2em 0;
			padding: 0;
			list-style: none;
			border-bottom: 0.2em solid black;

			li {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				align-items: start;
				gap: 0.5em;
				margin: 0;
				padding: 2em 0;
				border-top: 0.2em solid black;
			}

			li:nth-child(2n) {
				transform: rotate(-0.3deg);
			}
			li:nth-child(3n + 1) {
				transform: rotate(0.3deg);
			}

			a {
				font-weight: bold;
				font-size: 1.2em;
			}
		}

		@media (min-width: 44em) {
			.posts {
				li {
					flex-direction: row;
					align-items: center;
					gap: 2em;
				}

				.metadata {
					text-align: end;
					flex-basis: 35ch;
					flex-shrink: 0;
				}
			}
		}
	`;

	static properties = {
		searchValue: {
			type: String,
			state: true,
		},
	};

	fuse = null;

	searchTask = new Task(this, {
		task: async ([searchValue]) => {
			await this.#initFuse();
			return this.fuse.search(searchValue);
		},
		args: () => [this.searchValue],
	});

	get form() {
		const assignedElements =
			this.renderRoot
				?.querySelector(`slot:not([name])`)
				?.assignedElements({ flatten: true }) || [];

		for (const element of assignedElements) {
			if (element.matches('form')) {
				return element;
			}

			const form = element.querySelector('form');

			if (form) {
				return form;
			}
		}

		return undefined;
	}

	get inputValue() {
		const formData = new FormData(this.form);
		return formData.getAll('q')?.[1]?.trim() || '';
	}

	constructor() {
		super();
		this.fuse = null;
		this.#updateSearchValue();
	}

	firstUpdated() {
		this.form?.querySelector('input[type="text"]')?.focus();
	}

	render() {
		return html`
			<slot @slotchange=${this.#onSlotchange}></slot>
			<div id="search-results">
				${this.searchTask.render({
					initial: () => html``,
					pending: () => html`<div>Searching…</div>`,
					complete: (results) => {
						if (results.length === 0 && this.#hasSearchValue()) {
							return html`<div class="no-results">
								No results found. Please try different keywords.
							</div>`;
						}

						return html`
							<ol class="posts" role="list">
								${results.map(
									(result) => html`
										<li>
											<a href="${result.item.url}">${result.item.title}</a>
											<span class="metadata">
												<time
													datetime="{{ page.data.pubdate | dateDisplay('y-MM-dd') }}"
												>
													{{ page.data.pubdate | dateDisplay("LLLL d, y") }}
												</time>
												&mdash; Tagged as: ${result.item.tags.join(', ')}
											</span>
										</li>
									`
								)}
							</ol>
						`;
					},
					error: () => html`<div>Error loading search index.</div>`,
				})}
			</div>
		`;
	}

	#updateSearchValue() {
		this.searchValue = this.inputValue;
	}

	#onSubmitSearchForm = (e) => {
		e.preventDefault();
		this.#updateSearchValue();
	};

	#onSlotchange() {
		this.form?.addEventListener('submit', this.#onSubmitSearchForm);
		this.form?.addEventListener('input', this.#onSubmitSearchForm);

		// Not sure why, but this is needed to get the input value from
		// the rendered slot after returning to the page using the back button.
		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				this.#updateSearchValue();
			});
		});
	}

	#hasSearchValue() {
		return !!this.searchValue && !!this.searchValue.trim();
	}

	async #initFuse() {
		if (this.fuse) return;

		const list = await fetchJson(listJsonSrc);

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
	}
}

customElements.define('search-form', SearchForm);
