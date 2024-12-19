export default class Gallery {
  constructor(apiService, errorHandler, pagination) {
    this.apiService = apiService;
    this.errorHandler = errorHandler;
    this.pagination = pagination;
    this.galleryContainer = document.querySelector("#gallery-container");
    this.searchInput = document.querySelector("#search-input");
    this.currentPage = 1;
    this.itemsPerPage = 10;
    this.allData = [];
    this.searchTimeout = null;
    this.bindEvents();
  }

  bindEvents() {
    if (this.searchInput) {
      this.searchInput.addEventListener("input", (e) => {
        this.debounceSearch(e.target.value);
      });
    }
  }

  debounceSearch(query) {
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      this.applyFilter(query);
    }, 500);
  }

  async render(data) {
    try {
      this.allData = data;
      this.pagination.init(data.length, this.itemsPerPage);
      this.renderPage(this.currentPage);
    } catch (error) {
      this.errorHandler.log("Gallery Render Error", error);
      this.errorHandler.displayUserMessage(
        "Failed to render gallery",
        "warning"
      );
    }
  }

  renderPage(page) {
    if (!this.galleryContainer) return;

    this.currentPage = page;
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    const pageData = this.allData.slice(startIndex, endIndex);

    this.galleryContainer.innerHTML = pageData
      .map(
        (item) => `
      <div class="gallery-item">
        <img src="${item.thumbnailUrl}" alt="${item.title}" class="gallery-image">
        <div class="gallery-item-info">
          <p class="gallery-item-title">${item.title}</p>
          <p class="gallery-item-photographer">Photographer: ${item.photographer}</p>
        </div>
      </div>
    `
      )
      .join("");
  }

  async applyFilter(query) {
    try {
      if (query.trim() === "") {
        const allData = await this.apiService.fetchData();
        this.render(allData);
      } else {
        const filteredData = await this.apiService.searchData(query);
        this.render(filteredData);
      }
    } catch (error) {
      this.errorHandler.log("Gallery Filter Error", error);
    }
  }
}
