import { html } from 'https://unpkg.com/lit-html/lit-html.js';
import { component, useState } from 'https://unpkg.com/haunted/haunted.js';
import * as clipboard from 'https://unpkg.com/clipboard-polyfill/dist/clipboard-polyfill.esm.js';

function KillProcessCommand() {
  const [port, setPort] = useState('80');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInput = (event) => {
    setPort(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    clipboard.writeText(`lsof -nti:${port} | xargs kill -9`);
    setIsSubmitting(true);
    setTimeout(() => setIsSubmitting(false), 3000);
  };

  return html`
    <form @submit=${handleSubmit}>
      <label for="port">Port &#35;</label>
      <input
        type="number"
        name="port"
        id="port"
        list="common-ports"
        @input=${handleInput}
        .value=${port}
        required
        style="width:7em"
      />
      <button
        type="submit"
        .disabled="${isSubmitting}"
        class="${isSubmitting ? 'active' : ''}"
      >
        ${isSubmitting ? 'Copied!' : 'Copy'}
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

customElements.define(
  'kill-process-command',
  component(KillProcessCommand, { useShadowDOM: false }),
);
