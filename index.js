const Cards = document.getElementsByClassName("Cards");
const response = document.getElementById("Response");
const SearchText = document.getElementById("Search");
const fragment = document.createDocumentFragment();

function rePosition() {
    const SearchPos = SearchText.getBoundingClientRect();
    response.style.top = `${SearchPos.bottom + 10}px`;
    response.style.left = `${SearchPos.left}px`;
}
rePosition();
window.addEventListener("resize", rePosition)

SearchText.addEventListener("input", (event) => {
    response.replaceChildren();
    const textIn = event.target.value.toLowerCase();
    for (let i = 0; i<Cards.length; i++) {
        if (textIn == "") {
            continue;
        }
        a = Cards[i].firstElementChild.childNodes[3].firstElementChild.firstElementChild.textContent;
        b = Cards[i].firstElementChild.childNodes[3].firstElementChild.lastElementChild.textContent;
        if (a.toLowerCase().includes(textIn) || b.toLowerCase().includes(textIn)) {
            const duplicate = Cards[i].cloneNode(true);
            fragment.appendChild(duplicate);
        }
    }
    response.appendChild(fragment);
})