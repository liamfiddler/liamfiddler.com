class SplitText extends HTMLElement {
	constructor() {
		super();
		this._text = this.textContent;
		this.style.setProperty('--num-chars', this._text.length);
	}

	connectedCallback() {
		let charIndex = 0;

		this.innerHTML = `
			<span class="visually-hidden">
				${this._text}
			</span>
			<span class="split-text-output" aria-hidden="true">
				${this._text.split(' ').map((word) => {
					const wordMarkup = `
						<span class="word">
							${word
								.split('')
								.map((c) => `
									<span
										data-char="${c}"
										class="char"
										style="--char-index: ${charIndex++};"
									>
										${c}
									</span>
								`)
								.join('')}
						</span>
					`;

					charIndex++; // increment again for the space character

					return wordMarkup;
				}).join(' ')}
			</span>
		`;

		this.classList.add('rendered');
	}
}

customElements.define('split-text', SplitText);
