class Search {
  parentElement = document.querySelector(".search");

  getQuery() {
    const query = document.querySelector(".search-text").value;
    this.clearInput();
    return query;
  }

  clearInput() {
    this.parentElement.querySelector(".search-text").value = "";
  }

  addHandlerSearch(handler) {
    this.parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new Search();
