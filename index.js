const loadPhone = (searchText) => {
  fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    .then((res) => res.json())
    .then((data) => displayPhones(data.data));
};
const displayPhones = (phones) => {
  const phoneContainer = document.getElementById("phone-container");

  //clear search bar
  phoneContainer.textContent = "";
  //show all button
  const showAll = document.getElementById("show-all");
  if (phones.length > 9) {
    showAll.classList.remove("hidden");
  } else {
    showAll.classList.add("hidden");
  }
  //slice displays only 1st 9
  phones = phones.slice(0, 9);
  phones.forEach((phone) => {
    console.log(phone);
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card bg-base-100 shadow-xl`;
    phoneCard.innerHTML = `
    <figure class="px-10 pt-10">
    <img src="${phone.image} " alt="Shoes" class="rounded-xl" />
  </figure>
  <div class="card-body items-center text-center">
    <h2 class="card-title">${phone.phone_name}  </h2>
    <p>There are many variations of passages of available, but the majority have suffered</p>
    <div class="card-actions">
<button class="btn btn-accent">Show Details</button>
    </div>
  </div>
    `;
    phoneContainer.appendChild(phoneCard);
  });
};

//handle search button
const handleSearch = () => {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  console.log(searchText);
  loadPhone(searchText);
};
