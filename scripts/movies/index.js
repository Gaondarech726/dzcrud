import movieApi from "./movieApi.js";

async function moviesService() {
  const listContainer = document.querySelector("#movies > ul");

  try {
    const movies = await movieApi.getAllMovies();
    const stringHtml = getList(movies);
    listContainer.innerHTML = stringHtml;
  } catch (e) {
    listContainer.innerHTML = "Помилка";
    console.error("getAllMovies", e);
  }
}

function getDetails(obj, isEditable) {
  const { id = "new-id", title = "", genre, director, year } = obj;

  return `
      <li id="${id}">
            <details>
              <summary>${title}</summary>
              <form data-id='${id}'>
                <input type="text" name="title" placeholder="Title" value="${title}" data-edit='${!isEditable}' disabled='${!isEditable}' />
                <input type="text" name="genre" placeholder="Genre" value="${genre}" data-edit='${!isEditable}' disabled='${!isEditable}' />
                <input type="text" name="director" placeholder="Director" value="${director}" data-edit='${!isEditable}' disabled='${!isEditable}' />
                <input type="number" name="year" placeholder="Year" value="${year}" data-edit='${!isEditable}' disabled='${!isEditable}' />
                
                <div class='edit-btns'>
                <button type="button"  data-edit='${isEditable}' class='edit' >Редагувати</button>
                <button type="reset" data-edit='${!isEditable}' disabled='${!isEditable}'>Повернути зміни</button>
                <button type="submit" data-edit='${!isEditable}' disabled='${!isEditable}'>Зберегти</button>
                </div>
              </form>
              
            </details>
      </li>
      `;
}

function getList(list) {
  return list.map(getDetails).join(" ");
}

function getEditedFieldsByFormChildNode(editBtn) {
  const form = editBtn.closest("form");
  const list = form.querySelectorAll("[data-edit]");
  return Array.from(list);
}

function switchDisabledByNodeList(nodeList) {
  nodeList.forEach((elem) => {
    elem.disabled = !elem.disabled;
    elem.dataset.edit = !elem.dataset.edit;
  });
}

function switchEditable(editBtn) {
  const disabledList = getEditedFieldsByFormChildNode(editBtn);
  switchDisabledByNodeList(disabledList);
}

function getFormNewData(form) {
  return {
    title: form.elements.title.value,
    genre: form.elements.genre.value,
    director: form.elements.director.value,
    year: form.elements.year.value
  };
}

function clickHandler(e) {
  const { target } = e;

  if (target.closest(".edit")) {
    switchEditable(target);
  }
}

async function addNewMovie(data) {
  try {
    await movieApi.addMovie(data);
  } catch (e) {
    console.error(e);
  }
}

async function updateMovie(id, data) {
  try {
    await movieApi.updateMoviePatch(id, data);

    switchEditable(target);
  } catch (e) {
    console.error(e);
  }
}

async function submitHandler(e) {
  e.preventDefault();

  const { target } = e;
  const id = target.dataset.id;
  const newData = getFormNewData(target);

  if (id === "new-movie") {
    await addNewMovie(newData);
  } else {
    await updateMovie(id, newData);
  }
}

moviesService();

document.addEventListener("click", clickHandler);
document.querySelector("#movies").addEventListener("submit", submitHandler);
