const _ariaCurrent = (active, page) =>
    active === page ? 'aria-current="page"' : '';

module.exports = {
	header: (active) => `
        <header>
            <nav>
                <a href="/" ${_ariaCurrent(active, 'home')}>
                    <strong><split-text>Liam Fiddler</split-text></strong>
                </a>
                <a
                    href="/projects"
                    data-text="Side Projects"
                    ${_ariaCurrent(active, 'projects')}
                    >Side Projects</a
                >
                <a
                    href="/posts"
                    data-text="Posts"
                    ${_ariaCurrent(active, 'posts')}
                    >Posts</a
                >
                <a href="/search" ${_ariaCurrent(active, 'search')}>
                    <svg
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 48 48"
                    >
                        <g transform="translate(0 -1004.36)" fill="none">
                            <circle cx="20" cy="1024.36" r="9.87" stroke-width="4.27" />
                            <path d="M37.87 1042.23l-7.6-7.6" stroke-width="6.67" />
                            <path d="M26.67 1031.03l5.33 5.33" stroke-width="2.67" />
                        </g>
                    </svg>
                    <span class="visually-hidden">Search</span>
                </a>
            </nav>
        </header>
    `,
};
