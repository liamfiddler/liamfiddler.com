import { LitElement, css } from 'lit';
export { html, nothing, css } from 'lit';

export class StyledComponent extends LitElement {
	static styles = css`
		@import url('/style/main.css');
	`;

	createRenderRoot() {
		if (window.location.href === 'about:srcdoc') {
			return this;
		}

		return super.createRenderRoot();
	}
}
