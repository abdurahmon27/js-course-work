import ErrorHandler from "./errorHandler";

export default class ApiService {
  constructor(errorHandler) {
    this.errorHandler = errorHandler;
    this.baseUrl = "https://api.pexels.com/v1";

    this.apiKey = "Fnj9ZApqlAcHX4KM0LKy3vqSEAHfhisahnbeeiX43fhC0P7xylTpMzm0";
  }

  async fetchData() {
    try {
      const response = await fetch(`${this.baseUrl}/search?page=50`, {
        headers: {
          Authorization: this.apiKey,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      return data.photos.map((photo) => ({
        id: photo.id,
        title: photo.alt || "Untitled",
        thumbnailUrl: photo.src.medium,
        fullUrl: photo.src.large,
        photographer: photo.photographer,
      }));
    } catch (error) {
      this.errorHandler.log("Fetch Data Error", error);
      throw error;
    }
  }

  async searchData(query) {
    try {
      const response = await fetch(
        `${this.baseUrl}/search?query=${query}&per_page=50`,
        {
          headers: {
            Authorization: this.apiKey,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      return data.photos.map((photo) => ({
        id: photo.id,
        title: photo.alt || "Untitled",
        thumbnailUrl: photo.src.medium,
        fullUrl: photo.src.large,
        photographer: photo.photographer,
      }));
    } catch (error) {
      this.errorHandler.log("Search Data Error", error);
      throw error;
    }
  }
}
