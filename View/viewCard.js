class Card {
  data;
  parentElement = document.querySelector(".description-card");

  render(data) {
    this.data = data;
    const markup = this.insertMarkup();
    this.clear();
    this.parentElement.insertAdjacentHTML("afterbegin", markup);
  }
  addHandlerRender(handler) {
    ["hashchange", "load"].forEach((ev) =>
      window.addEventListener(ev, handler)
    );
  }

  clear() {
    this.parentElement.innerHTML = "";
  }

  genreDisplay() {
    const arr = this.data.genres;
    let string;
    arr.forEach((el) => {
      if (!string) {
        string = `<span>${el.name}</span>`;
      } else {
        string = `<span>${el.name}</span>` + string;
      }
    });
    return string;
  }

  insertMarkup() {
    return `
        <img
        src="https://image.tmdb.org/t/p/w500/${this.data.poster}"
        width="100%"
      />
      <div class="card-features">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="logo-main bookmark-description"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
          />
        </svg>

        <p class="title">${this.data.title}</p>
        <p class="plot">
        ${this.data.plot}
        </p>
        <div class="genre-list-description">
          ${this.genreDisplay()}
        </div>
      </div>
        `;
  }
}

export default new Card();
