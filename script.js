/* Niharika Chava — Portfolio interactions */
document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    const navLinkItems = document.querySelectorAll(".nav-link");
    const header = document.getElementById("header");

    const closeMenu = () => {
        if (!hamburger || !navLinks) return;
        hamburger.classList.remove("active");
        navLinks.classList.remove("active");
        hamburger.setAttribute("aria-expanded", "false");
    };

    if (hamburger && navLinks) {
        hamburger.addEventListener("click", () => {
            const isOpen = hamburger.classList.toggle("active");
            navLinks.classList.toggle("active", isOpen);
            hamburger.setAttribute("aria-expanded", String(isOpen));
        });

        navLinkItems.forEach((link) => link.addEventListener("click", closeMenu));

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") closeMenu();
        });
    }

    const sections = document.querySelectorAll("main section[id], footer[id]");

    const updateNavigation = () => {
        if (!header) return;
        const scrollPosition = window.scrollY;
        header.classList.toggle("scrolled", scrollPosition > 24);

        let activeId = "home";
        const offset = header.offsetHeight + 36;

        sections.forEach((section) => {
            if (scrollPosition >= section.offsetTop - offset) {
                activeId = section.id;
            }
        });

        navLinkItems.forEach((link) => {
            const active = link.getAttribute("href") === `#${activeId}`;
            link.classList.toggle("active", active);
            if (active) link.setAttribute("aria-current", "page");
            else link.removeAttribute("aria-current");
        });
    };

    window.addEventListener("scroll", updateNavigation, { passive: true });
    window.addEventListener("resize", closeMenu);
    updateNavigation();
});
