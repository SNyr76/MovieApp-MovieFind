class ResultsReturned {
  parentElement = document.querySelector(".dropdown-button");
  value = this.parentElement.value;
  addHandlerChange(handler) {
    this.parentElement.addEventListener("change", (e) => {
      const selectedVal = e.target.value;
      handler(selectedVal);
    });
  }
}

export default new ResultsReturned();
