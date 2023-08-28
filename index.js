const loadPhone = (searchText = `13`) => {
  fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    .then((res) => res.json())
    .then((data) => displayPhones(data.data));
};
// const loadPhone = async (searchText = `13`) => {
//   const res = await fetch(
//     `https://openapi.programming-hero.com/api/phones?search=${searchText}`
//   );
//   const data = await res.json();
//   const phones = data.data;
// };
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
    // console.log(phone);
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
<button class="btn btn-primary" onclick="handleShowDetailAll('${phone.slug}');my_modal_1.showModal()">Show Details</button>
    </div>
  </div>
    `;
    phoneContainer.appendChild(phoneCard);
  });
  //hide spinner
  toggleLoadingSpinner(false);
};

//handle search button
const handleSearch = () => {
  toggleLoadingSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  console.log(searchText);
  loadPhone(searchText);
};

const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById("loading");
  if (isLoading) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
};
//
const handleShowAll = () => {
  handleSearch();
};
// const handleShowDetailAll = (id) => {
//   //   load single phone data
//   fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
//     .then((res) => res.json())
//     .then((data) => console.log(data));
// };
const handleShowDetailAll = async (id) => {
  // load single phone data
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const phone = data.data;
  phoneDetails(phone);
};
const phoneDetails = (phone) => {
  console.log(phone);
  const phoneName = document.getElementById("show-detail-phone-name");
  phoneName.innerText = phone.name;

  const showDetailContainer = document.getElementById("show-detail-container");
  showDetailContainer.innerHTML = `
  <img src="${phone.image}" alt="" />
  <p><strong>Storage: </strong>${phone.mainFeatures.storage}</p>
<p><strong>Display Size: </strong>${phone.mainFeatures.displaySize}</p>
<p><strong>Chipset: </strong>${phone.mainFeatures.chipSet}</p>
<p><strong>Memory: </strong>${phone.mainFeatures.memory}</p>
<p><strong>Slug: </strong>${phone.slug}</p>
<p><strong>Release Date: </strong>Released 2021, September 24</p>
<p><strong>Brand: </strong>${phone.brand}</p>
<p><strong>GPS: </strong>${phone?.others?.GPS}</p>
`;
  // show the modal
  my_modal_1.showModal();
};

loadPhone();
