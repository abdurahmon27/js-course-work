export default class Pagination {
  constructor() {
    this.gallery = null;
    this.currentPage = 1;
    this.totalPages = 1;
    this.paginationContainer = document.querySelector("#pagination-container");
  }

  setGallery(gallery) {
    this.gallery = gallery;
  }

  init(totalItems, itemsPerPage = 10) {
    this.totalPages = Math.ceil(totalItems / itemsPerPage);
    this.renderPagination();
    this.bindPaginationEvents();
  }

  renderPagination() {
    if (!this.paginationContainer) return;

    this.paginationContainer.innerHTML = "";

    const prevButton = document.createElement("button");
    prevButton.textContent = "←";
    prevButton.classList.add("page-button", "prev-button");
    prevButton.disabled = this.currentPage === 1;
    this.paginationContainer.appendChild(prevButton);

    for (let i = 1; i <= this.totalPages; i++) {
      const pageButton = document.createElement("button");
      pageButton.textContent = i;
      pageButton.classList.add("page-button");
      if (i === this.currentPage) {
        pageButton.classList.add("active");
      }
      pageButton.dataset.page = i;
      this.paginationContainer.appendChild(pageButton);
    }

    // Next button
    const nextButton = document.createElement("button");
    nextButton.textContent = "→";
    nextButton.classList.add("page-button", "next-button");
    nextButton.disabled = this.currentPage === this.totalPages;
    this.paginationContainer.appendChild(nextButton);
  }

  bindPaginationEvents() {
    if (!this.paginationContainer) return;

    this.paginationContainer.addEventListener("click", (e) => {
      const target = e.target;

      if (target.classList.contains("page-button")) {
        if (target.classList.contains("prev-button")) {
          this.changePage(this.currentPage - 1);
        } else if (target.classList.contains("next-button")) {
          this.changePage(this.currentPage + 1);
        } else {
          const page = parseInt(target.dataset.page);
          this.changePage(page);
        }
      }
    });
  }

  changePage(page) {
    if (page < 1 || page > this.totalPages) return;

    this.currentPage = page;
    if (this.gallery) {
      this.gallery.renderPage(page);
    }
    this.renderPagination();
  }
}
