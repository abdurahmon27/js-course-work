export default class ErrorHandler {
  constructor() {
    this.errorContainer = this.createErrorContainer();
  }

  createErrorContainer() {
    const container = document.createElement("div");
    container.id = "error-container";
    container.style.position = "fixed";
    container.style.top = "10px";
    container.style.right = "10px";
    container.style.zIndex = "1000";
    document.body.appendChild(container);
    return container;
  }

  log(message, error) {
    console.error(`${message}:`, error);
    this.displayUserMessage(message);
  }

  displayUserMessage(message, type = "error") {
    const errorElement = document.createElement("div");
    errorElement.textContent = message;
    errorElement.style.backgroundColor = type === "error" ? "red" : "yellow";
    errorElement.style.color = "white";
    errorElement.style.padding = "10px";
    errorElement.style.margin = "5px";
    errorElement.style.borderRadius = "5px";

    this.errorContainer.appendChild(errorElement);

    setTimeout(() => {
      this.errorContainer.removeChild(errorElement);
    }, 5000);
  }
}
