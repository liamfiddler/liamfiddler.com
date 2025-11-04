import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import { StyledComponent, html } from './_styled-component.js';
import mermaid from 'mermaid';

class MermaidDiagramWc extends StyledComponent {
	static properties = {
		svg: { type: String },
	};

	constructor() {
		super();
		this.svg = '';
	}

	connectedCallback() {
		super.connectedCallback();
		this._initMermaid();
	}

	async _initMermaid() {
		mermaid.initialize({ theme: 'dark' });
		const { svg } = await mermaid.render('mermaid-diagram', this.textContent);
		this.svg = svg;
	}

	render() {
		return html`
			${unsafeSVG(this.svg)}
			<details class="mermaid-code">
				<summary>Mermaid code</summary>
				<slot></slot>
			</details>
		`;
	}
}

customElements.define('mermaid-diagram', MermaidDiagramWc);
