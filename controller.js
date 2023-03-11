import * as model from "/model.js";
import Card from "/View/viewCard.js";
import Search from "/View/viewSearch.js";
import TableResults from "./View/viewTableResults.js";
import ResultsReturned from "./View/viewResultsReturned.js";

const controlMovieCard = async function () {
  try {
    Card.render(model.state.movie);
  } catch (err) {
    throw err;
  }
};

const controlSearchResults = async function () {
  try {
    TableResults.renderSpinner();
    const query = Search.getQuery();
    if (!query) return;
    await model.getSearchResults(query);

    TableResults.render(controlResultsReturned(ResultsReturned.value));
  } catch (err) {
    throw err;
  }
};

const controlTableResults = async function (index) {
  try {
    await model.changeMovie(index);
    Card.render(model.state.movie);
  } catch (err) {
    throw err;
  }
};

const controlResultsReturned = async function (value) {
  try {
    let partialArr = model.resultsNumberShift(Number(value));
    TableResults.render(partialArr);
  } catch (err) {
    throw err;
  }
};

const init = function () {
  Card.addHandlerRender(controlMovieCard);
  Search.addHandlerSearch(controlSearchResults);
  TableResults.addHandlerResult(controlTableResults);
  ResultsReturned.addHandlerChange(controlResultsReturned);
};

init();
