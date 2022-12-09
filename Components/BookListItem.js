const BookListItem = (book) => {
  let html = `<li
              id="book-${book.id}"
              onmouseover="showDetails(${book.id})"
              onmouseout="hideDetails(${book.id})"
              class="book-list__item mb-2 mx-2 last:mb-0 p-3 text-red-900 last:border-b-0 border-b border-red-700 cursor-pointer">
            ${book.author} - ${book.title}
            </li>`;
  return html;
};

async function showDetails(id) {
  const li = document.getElementById('book-' + id);

  let b = await getBookInfo(id);
  let coverImage = b.coverImage;
  if (coverImage === "") {
      coverImage = "../bild-saknas.jpg";
  }

  let html = `<div class="pb-5 pl-5 ml-5" id="bookDetail-${id}">
              <h1><u><b>${b.title}</b> <i>(${b.releaseDate})</i></u></h1>
              <h2>Av: ${b.author}</h2>
              <h2>Sidor: ${b.pages}</h2>
              <img class="border-2 border-black" width="150px" alt="Bokbild" src="${coverImage}"
              </div>
  `
  
  b && li.insertAdjacentHTML("afterend", html);
}

function hideDetails(id) {
  let stillExists = false;
  do {
    const existingElement = document.getElementById('bookDetail-' + id);
    stillExists = !!existingElement;
    existingElement && existingElement.remove();
  }
  while(stillExists);

}

async function getBookInfo(id) {
  let bookUrl = url + "/" + id;
  const result = await fetch(bookUrl)
    .then((result) => result.json())
    .catch((e) => e);

  return result;
}