const input = document.querySelector("#input");
const btn = document.querySelector("#btn");
const result = document.querySelector(".result");
const loader = document.querySelector(".loading");

let shortLink;

function shortUrl() {
  loader.style.display = "block";
  const url = `https://cors-anywhere.herokuapp.com/https://api.shrtco.de/v2/shorten?url=${input.value}`;

  fetch(url, {
    method: "POST",
    body: JSON.stringify({
      link: input,
    }),
    headers: { "Content-Type": "application/json, charset=UFT-8" },
  })
    .then((res) => res.json())
    .then((data) => {
      shortLink = data.result.short_link;
      loader.style.display = "none";
    })
    .then(() => displayUrl())
    .catch((err) => console.log(err));
}

function displayUrl() {
  const template = `
        <div class="result-link">
          <a href="#">${input.value}</a>
        </div>
        <hr />
        <p id="paragraph">${shortLink}</p>
        <button id="copied" >copy</button>`;

  result.style.visibility = "visible";
  result.insertAdjacentHTML("beforeend", template);

  const copyBtn = document.querySelector("#copied");
  const paragraph = document.querySelector("#paragraph").textContent;

  copyBtn.addEventListener("click", (e) => {
    updateClipboard(paragraph);
    copyBtn.textContent = "Copied";
    copyBtn.style.backgroundColor = "#3a3054";

    setTimeout(() => {
      copyBtn.textContent = "Copy";
      copyBtn.style.backgroundColor = "#2bd0d0";
    }, 3000);
  });
}

btn.addEventListener("click", (e) => {
  e.preventDefault();
  shortUrl();
  //   displayUrl();
});

//SELECT AND COPY TEXT
function updateClipboard(newClip) {
  navigator.clipboard.writeText(newClip).then(
    function () {
      document.execCommand("copy");
    },
    function () {
      /* clipboard write failed */
    }
  );
}
