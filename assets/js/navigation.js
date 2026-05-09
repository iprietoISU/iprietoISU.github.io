(() => {
  const parser = new DOMParser();

  function isSamePageLink(link) {
    const target = new URL(link.href, window.location.href);

    return (
      target.origin === window.location.origin &&
      target.hash === "" &&
      !link.target &&
      !link.hasAttribute("download") &&
      (target.pathname.endsWith(".html") || !target.pathname.includes("."))
    );
  }

  function normalizePath(pathname) {
    if (pathname === "/" || pathname.endsWith("/")) {
      return "/index.html";
    }

    if (!pathname.split("/").pop().includes(".")) {
      return `${pathname}.html`;
    }

    return pathname;
  }

  function updateActiveNav(pathname) {
    const current = normalizePath(pathname);

    document.querySelectorAll(".navbar .nav-link").forEach((link) => {
      const linkPath = normalizePath(new URL(link.href, window.location.href).pathname);
      const isActive = linkPath === current;

      link.classList.toggle("active", isActive);
      link.toggleAttribute("aria-current", isActive);

      if (isActive) {
        link.setAttribute("aria-current", "page");
      }
    });
  }

  async function loadPage(url, pushState = true) {
    const response = await fetch(url, {
      headers: { "X-Requested-With": "fetch" },
    });

    if (!response.ok) {
      window.location.href = url;
      return;
    }

    const html = await response.text();
    const nextDocument = parser.parseFromString(html, "text/html");
    const nextMain = nextDocument.querySelector("main");
    const currentMain = document.querySelector("main");

    if (!nextMain || !currentMain) {
      window.location.href = url;
      return;
    }

    currentMain.replaceWith(nextMain);
    document.title = nextDocument.title;
    updateActiveNav(new URL(url, window.location.href).pathname);

    if (pushState) {
      window.history.pushState({}, "", url);
    }

    window.scrollTo(0, 0);
  }

  document.addEventListener("click", (event) => {
    const link = event.target.closest("a");

    if (!link || !isSamePageLink(link)) {
      return;
    }

    event.preventDefault();
    loadPage(link.href).catch(() => {
      window.location.href = link.href;
    });
  });

  window.addEventListener("popstate", () => {
    loadPage(window.location.href, false).catch(() => {
      window.location.reload();
    });
  });

  updateActiveNav(window.location.pathname);
})();
