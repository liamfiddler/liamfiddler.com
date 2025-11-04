// This file isn't used in the main site, but is used in the CMS preview

import { StyledComponent, html } from './_styled-component.js';
import FooterTemplate from '../_includes/utils/footer.cjs';

class SiteFooter extends StyledComponent {
	render() {
		return html`${FooterTemplate.footer()}`;
	}
}

customElements.define('site-footer', SiteFooter);
