import { StyledComponent, html } from './_styled-component.js';

class LfTestWc extends StyledComponent {
	static properties = {
		count: { type: Number },
	};

	constructor() {
		super();
		this.count = 0;
	}

	render() {
		return html`
			<p><button @click="${this._increment}">Click Me!</button></p>
			<p>Click count: <b>${this.count}</b></p>
		`;
	}

	_increment(e) {
		this.count++;
	}
}

customElements.define('lf-testwc', LfTestWc);
