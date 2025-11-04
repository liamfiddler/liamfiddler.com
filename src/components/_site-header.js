// This file isn't used in the main site, but is used in the CMS preview

import { StyledComponent, html } from './_styled-component.js';
import HeaderTemplate from '../_includes/utils/header.cjs';

class SiteHeader extends StyledComponent {
	render() {
		return html`${HeaderTemplate.header()}`;
	}
}

customElements.define('site-header', SiteHeader);
