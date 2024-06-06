let input = document.getElementById("input-box");
let button = document.getElementById("submit-button");
let showContainer = document.getElementById("show-container");
let listContainer = document.querySelector(".list");

let date = new Date();
console.log(date.getTime());

const [timestamp, apiKey, hashValue] = [ts, publicKey, hashVal];

function displayWords(value) {
  input.value = value;
  removeElements();
}

function removeElements() {
  listContainer.innerHTML = "";
}

input.addEventListener("keyup", async () => {
  removeElements();
  if (input.value.length < 1) {
    return false;
  }

  const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}&nameStartsWith=${input.value}`;

  const response = await fetch(url);
  const jsonData = await response.json();

  jsonData.data["results"].forEach((result) => {
    let name = result.name;
    let div = document.createElement("div");
    div.style.cursor = "pointer";
    div.classList.add("autocomplete-items");
    div.setAttribute("onclick", "displayWords('" + name + "')");
    let word = "<b>" + name.substr(0, input.value.length) + "</b>";
    word += name.substr(input.value.length);
    div.innerHTML = `<p class="item">${word}</p>`;
    listContainer.appendChild(div);
  });
});

const comics_container = document.createElement("container2");
comics_container.classList = "comics_container d-flex justify-content-center";
const div_2 = document.getElementById("root");

button.addEventListener(
  "click",
  (getRsult = async () => {
    if (input.value.trim().length < 1) {
      alert("Input cannot be blank");
    }
    showContainer.innerHTML = "";
    const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}&name=${input.value}`;
    const response = await fetch(url);
    const jsonData = await response.json();

    jsonData.data["results"].forEach((element) => {
      showContainer.innerHTML = `<div class="card-container">
      <div class="container-character-image">
        <img src="${
          element.thumbnail["path"] + "." + element.thumbnail["extension"]
        }"/>
      </div>
      <div class="character-name">${element.name}</div>
      <div class="character-description">${element.description}</div>
    </div>`;

      // Limpiar los elementos parrafo dentro del elemento ul
      comics_container.innerHTML = "";
      //agregar items
      const comics_info = element?.comics?.items.map((comicItem, index) => {
        const container2 = document.createElement("div");
        const parrafo = document.createElement("p");
        const imgComic = document.createElement("img");

        container2.classList = "card w-25 p-5 ";
        parrafo.classList = "fs-3 d-flex justify-content-center text-primary";
        imgComic.classList = "";

        imgComic.id = `img${index}`;
        // const urlImg
        parrafo.classList = "comics";
        parrafo.textContent = comicItem?.name || "";

        const comicInfo = `${comicItem.resourceURI}?ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}&name=${input.value}`;

        container2.appendChild(imgComic);
        container2.appendChild(parrafo);
        comics_container.appendChild(container2);

        return comicInfo;
      });
      comics_info.forEach(async (data, index) => {
        const response = await fetch(data);
        const data_comics = await response.json();

        // console.log(data_comics.data.results[0].images[0].path);
        path = data_comics.data.results[0].images[0].path;
        // console.log(data_comics.data.results[0].images[0].extension);
        extension = data_comics.data.results[0].images[0].extension;

        const img = document.getElementById(`img${index}`);
        let src_concat = path + "." + extension;
        img.src = src_concat;
      });
    });

    div_2.appendChild(comics_container);
  })
);
window.onload = () => {
  getRsult();
};
