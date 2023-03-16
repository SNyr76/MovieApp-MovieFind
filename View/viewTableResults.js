class TableResults {
  data;
  parentElement = document.querySelector(".table-results");

  renderSpinner() {
    const markup = `
  <div id="spinner-container">
    <div class="spinner"></div>
  </div>`;
    this.parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  render(data) {
    this.data = data;
    const markup = this.insertMarkup();
    this.clear();
    this.parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  clear() {
    this.parentElement.innerHTML = "";
  }

  addHandlerResult(handler) {
    this.parentElement.addEventListener("click", function (event) {
      if (event.target && event.target.nodeName === "TD") {
        const rowEl = event.target.closest(".table-row");
        handler(rowEl.dataset.index);
      }
    });
  }

  insertMarkup() {
    let markup;
    markup = this.data.map(function (element, index) {
      let string = ` 
    <tr
    class="table-row"
    style="
      background-image: linear-gradient(
          rgba(34, 34, 34, 0.5),
          rgba(34, 34, 34, 0.5)
        ),
        url(https://image.tmdb.org/t/p/w500/${element.backdrop});
      background-size: cover;
      color: var(--background-highlight);
      transition: all 0.3s;
      cursor:pointer;
    "
    data-index=${index}
  >
    <td>${element.title}</td>
    <td>${element.releaseDate}</td>
    <td>${element.voteAverage}</td>
    <td>${element.voteCount}</td>
  </tr>`;
      return string;
    });

    markup = markup.join(",");
    markup = markup.replaceAll("</tr>,", "</tr>");
    return markup;
  }
}

export default new TableResults();
