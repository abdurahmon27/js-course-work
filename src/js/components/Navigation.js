class Navigation {
  constructor() {
    this.initNavigation();
  }

  initNavigation() {
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const target = link.getAttribute("href");
        this.navigateTo(target);
      });
    });
  }

  navigateTo(target) {
    window.history.pushState({}, "", target);
  }
}

export default Navigation;
