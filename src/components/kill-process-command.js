import { StyledComponent, html } from './_styled-component.js';
import * as clipboard from 'clipboard-polyfill';

class KillProcessCommand extends StyledComponent {
	static properties = {
		port: { type: Number },
		isSubmitting: { type: Boolean },
	};

	constructor() {
		super();
		this.port = 80;
		this.isSubmitting = false;
	}

	render() {
		return html`
			<form @submit=${this._handleSubmit}>
				<label for="port">Port &#35;</label>
				<input
					type="number"
					name="port"
					id="port"
					list="common-ports"
					@input=${this._handleInput}
					.value=${this.port}
					required
					style="width:7em"
				/>
				<button
					type="submit"
					?disabled=${this.isSubmitting}
					class="${this.isSubmitting ? 'active' : ''}"
				>
					${this.isSubmitting ? 'Copied!' : 'Copy'}
				</button>
			</form>
			<datalist id="common-ports">
				<option value="80">HTTP :80</option>
				<option value="443">HTTPS :443</option>
				<option value="3000">Angular :3000</option>
				<option value="8000">Apache :8000</option>
				<option value="8080">Vue, React, Eleventy :8080</option>
				<option value="1234">Parcel :1234</option>
			</datalist>
		`;
	}

	_handleInput(e) {
		this.port = e.target.value;
	}

	_handleSubmit(e) {
		e.preventDefault();
		clipboard.writeText(`lsof -nti:${this.port} | xargs kill -9`);
		this.isSubmitting = true;

		setTimeout(() => {
			this.isSubmitting = false;
		}, 3000);
	}
}

customElements.define('kill-process-command', KillProcessCommand);
