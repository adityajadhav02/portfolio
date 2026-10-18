// Progressive enhancement only: the page is fully readable without this file.
// (The inline head script adds `.js` to <html>; CSS hides collapsed/reveal content only under `.js`.)
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

// ===== Full-screen menu (mobile) =====
const menu = document.getElementById('site-menu');
const menuToggle = document.querySelector('.menu-toggle');

if (menu && menuToggle) {
    const menuClose = menu.querySelector('.menu-close');
    // Everything the overlay covers: inert while it's open so focus and screen readers stay inside
    const behind = [document.querySelector('.skip-link'), document.querySelector('.site-header'),
        document.getElementById('main'), document.querySelector('body > footer')].filter(Boolean);
    const isOpen = () => menu.classList.contains('is-open');

    const setMenu = (open, { restoreFocus = true } = {}) => {
        if (open === isOpen()) return;
        menu.classList.toggle('is-open', open);
        menu.inert = !open;
        behind.forEach((el) => { el.inert = open; });
        menuToggle.setAttribute('aria-expanded', String(open));
        document.documentElement.classList.toggle('menu-open', open);
        if (open) (menuClose || menu.querySelector('a')).focus();
        else if (restoreFocus) menuToggle.focus();
    };

    menuToggle.addEventListener('click', () => setMenu(true));
    if (menuClose) menuClose.addEventListener('click', () => setMenu(false));

    // Following a link closes the menu; the browser then scrolls to the target
    menu.addEventListener('click', (e) => {
        if (e.target.closest('a')) setMenu(false, { restoreFocus: false });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isOpen()) setMenu(false);
    });

    // The overlay is mobile-only; close it if the viewport grows past the breakpoint
    window.matchMedia('(min-width: 768px)').addEventListener('change', (e) => {
        if (e.matches) setMenu(false, { restoreFocus: false });
    });
}

// ===== Collapsibles (mobile only; CSS ignores data-open at >= 48rem) =====
const setToggleLabel = (btn, open) => {
    const label = open ? btn.dataset.labelOpen : btn.dataset.labelClosed;
    if (!label) return;
    // Icon-only toggles carry their label in aria-label; text toggles show it
    if (btn.classList.contains('toggle-circle') || !btn.textContent.trim()) btn.setAttribute('aria-label', label);
    else btn.textContent = label;
};

document.querySelectorAll('[data-collapsible]').forEach((box) => {
    const open = box.dataset.open !== 'false';
    box.querySelectorAll('[data-toggle]').forEach((btn) => {
        if (btn.closest('[data-collapsible]') !== box) return;
        btn.setAttribute('aria-expanded', String(open));
        setToggleLabel(btn, open);
    });
});

document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-toggle]');
    if (!btn) return;
    const box = btn.closest('[data-collapsible]');
    if (!box) return;
    const open = box.dataset.open === 'false';
    box.dataset.open = String(open);
    box.classList.toggle('was-toggled', !reduceMotion.matches);
    box.querySelectorAll('[data-toggle]').forEach((b) => {
        if (b.closest('[data-collapsible]') !== box) return;
        b.setAttribute('aria-expanded', String(open));
        setToggleLabel(b, open);
    });
});

// ===== Header hairline once the page has scrolled =====
const header = document.querySelector('.site-header');
const sentinel = document.getElementById('top-sentinel');
if (header && sentinel && 'IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
        header.classList.toggle('is-scrolled', !entry.isIntersecting);
    }).observe(sentinel);
} else if (header) {
    header.classList.add('is-scrolled');
}

// ===== Scroll reveal (once per element) =====
const reveals = document.querySelectorAll('.reveal');
if (reduceMotion.matches || !('IntersectionObserver' in window)) {
    reveals.forEach((el) => el.classList.add('is-visible'));
} else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        });
    }, { rootMargin: '0px 0px -10% 0px' });
    reveals.forEach((el) => revealObserver.observe(el));
}

// ===== Footer year =====
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
