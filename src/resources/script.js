const loadScript = (src, isModule = false) =>
  new Promise((onload, onerror) => {
    const scriptElem = Object.assign(document.createElement('script'), {
      type: isModule ? 'module' : 'text/javascript',
      async: true,
      src,
      onload,
      onerror,
    });

    document.body.appendChild(scriptElem);
  });

const scrollToTop = () => {
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
};

const getTagName = (element) => element.tagName.toLowerCase();

const isUniqueCustomElement = (tagName, index, tagNameArray) =>
  tagName.includes('-') && tagNameArray.indexOf(tagName) === index;

const loadCustomElement = (tagName) => {
  if (customElements.get(tagName) === undefined) {
    const customElemScriptPath = `/resources/components/${tagName}.js`;
    loadScript(customElemScriptPath, true);
  }
};

const findAndLoadCustomElements = (selector = 'body') => {
  const elems = document.querySelectorAll(`${selector} *`);

  [...elems]
    .map(getTagName)
    .filter(isUniqueCustomElement)
    .forEach(loadCustomElement);
};

const markActiveNavLink = () => {
  const [pathname] = window.location.pathname.split('/').filter((n) => n);
  const headerLinks = document.querySelectorAll('header a');
  const href = `/${pathname ? pathname : ''}`;

  headerLinks.forEach((headerLink) => {
    if (headerLink.getAttribute('href') === href) {
      headerLink.setAttribute('aria-current', 'page');
      return;
    }

    headerLink.removeAttribute('aria-current');
  });
};

const initPageTransitions = async () => {
  await Promise.all([
    loadScript('/resources/libs/swup.min.js'),
    loadScript('/resources/libs/SwupPreloadPlugin.min.js'),
  ]);

  const swup = new Swup({
    containers: ['#main-content'],
    plugins: [new SwupPreloadPlugin()],
    cache: true,
  });

  swup.on('contentReplaced', () => {
    scrollToTop();
    markActiveNavLink();
    swup.options.containers.forEach(findAndLoadCustomElements);
  });
};

const applyPageTexture = () => {
  const w = window.innerWidth;
  const h = window.innerHeight * 1.5;
  const numDots = Math.max(200, w / 4);
  let dots = '';

  for (let i = 0; i < numDots; i++) {
    const cx = Math.random() * w;
    const cy = Math.random() * h;
    const r = Math.random() * 5 + 5;

    dots += `<circle cx="${cx}" cy="${cy}" r="${r}" style="filter: url(#displacementFilter)" />`;
  }

  const svg = `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      class="texture"
      viewbox="0 0 ${w} ${h}"
      fill="rgba(0, 0, 0, 0.1)"
    >
      <filter id="displacementFilter">
        <feTurbulence type="turbulence" baseFrequency="0.05" numOctaves="2" result="turbulence" />
        <feDisplacementMap in2="turbulence" in="SourceGraphic" scale="100" xChannelSelector="R" yChannelSelector="G" />
      </filter>
      ${dots}
    </svg>
  `;

  document.body.innerHTML += svg;
};

const handleParallax = () => {
  document.documentElement.style.setProperty('--scroll', 0);

  window.addEventListener('scroll', () => {
    const scrollDistance = document.body.scrollHeight - document.documentElement.clientHeight;
    const scrollValue = window.pageYOffset / Math.abs(scrollDistance);
    document.documentElement.style.setProperty('--scroll', scrollValue);
  });
};

document.fonts.ready.then(() => {
  document.documentElement.classList.add('webfonts-ready');
});

findAndLoadCustomElements();
initPageTransitions();
applyPageTexture();
handleParallax();
