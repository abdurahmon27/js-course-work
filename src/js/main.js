import ApiService from "./services/apiService.js";
import Gallery from "./components/Gallery.js";
import Pagination from "./components/Pagination.js";
import ErrorHandler from "./services/errorHandler";

class App {
  constructor() {
    this.errorHandler = new ErrorHandler();
    this.apiService = new ApiService(this.errorHandler);
    this.pagination = new Pagination();
    this.gallery = new Gallery(
      this.apiService,
      this.errorHandler,
      this.pagination
    );
    this.pagination.setGallery(this.gallery);

    this.init();
  }

  async init() {
    try {
      const data = await this.apiService.fetchData();
      this.gallery.render(data);
      this.pagination.init(data.length);
    } catch (error) {
      this.errorHandler.displayUserMessage("Failed to load initial data");
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.app = new App();
});
