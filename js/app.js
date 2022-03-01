// Element selection
const searchInput = document.getElementById("search-input");
const errorBody = document.getElementById("error-body");
const errorTxt = document.getElementById("error-txt");
const notFoundTxt = document.getElementById("not-found");
const phoneRow = document.getElementById("phone-row");
const details = document.getElementById("details");
const modal = document.getElementById("modal");

// Alert messages
const alerts = (errMsg) => {
  errorBody.classList.remove("d-none");
  errorBody.classList.add("d-flex");
  errorBody.classList.add("align-items-center");
  errorTxt.innerText = errMsg;
  phoneRow.innerHTML = "";
  notFoundTxt.classList.remove("d-none");
};
// Load phone data
const loadData = () => {
  const searchValue = searchInput.value.toLowerCase();
  if (searchValue === "") {
    alerts("Please enter a phone name.");
  } else if (!isNaN(searchValue)) {
    alerts("Please enter a phone name instead of number.");
  } else {
    errorBody.classList.add("d-none");
    fetch(
      `https://openapi.programming-hero.com/api/phones?search=${searchValue}`
    )
      .then((res) => res.json())
      .then((data) => displayPhones(data.data));
    phoneRow.innerHTML = "";
  }
};

// Display phones
const displayPhones = (phones) => {
  if (phones.length === 0) {
    notFoundTxt.classList.remove("d-none");
  } else {
    phones.forEach((phone) => {
      const col = document.createElement("div");
      col.classList.add("col-12");
      col.classList.add("col-lg-4");
      col.classList.add("g-4");
      col.classList.add("shadow-lg");
      col.classList.add("p-3");
      col.classList.add("bg-body");
      col.classList.add("rounded");

      col.innerHTML = `<div class="card card-hight">
      <img
        src="${phone.image}"
        class="card-img-top"
        alt="..."
      />
      <div class="card-body">
        <h4><b>Phone Name:</b> ${phone.phone_name}</h4>
        <h5><b>Phone Brand:</b> ${phone.brand}</h5>
        <button
          class="btn custom-btn text-white"
          onclick="loadDetails('${phone.slug}')"
          >See details</button>
      </div>
    </div>`;
      phoneRow.appendChild(col);
      notFoundTxt.classList.add("d-none");
    });
  }
};

// Load details data
const loadDetails = (id) => {
  fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    .then((res) => res.json())
    .then((data) => displayDetails(data.data));
};
// Display phones details
const displayDetails = (detailsInfo) => {
  details.innerHTML = `<button
  class="btn btn-danger text-white position-absolute top-0 mt-2 me-3 end-0 p-2"
  type="button" onclick="modalClose()"
>
  Close
</button>
<div class="mt-5 d-flex justify-content-center">
  <img
    src="${detailsInfo.image}"
    class="card-img-top w-25"
    alt="..."
  />
</div>
<div class="card-body text-center">
  <h4><b>Phone name:</b> ${detailsInfo.name}</h4>
  <h5><b>Phone brand:</b> ${detailsInfo.brand}</h5>
  <h5><b>Storage:</b> ${detailsInfo.mainFeatures.storage}</h5>
  <h5><b>Display size:</b> ${detailsInfo.mainFeatures.displaySize}</h5>
  <h5><b>Releash date:</b> ${detailsInfo.releaseDate}</h5>
  <h5><b>Sensors:</b> ${detailsInfo.mainFeatures.sensors} </h5>
</div>`;
  modal.classList.remove("d-none");
  details.classList.remove("d-none");
};
// Modal close
const modalClose = () => {
  modal.classList.add("d-none");
};
