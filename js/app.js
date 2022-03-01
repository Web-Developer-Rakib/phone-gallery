// Element selection
const searchInput = document.getElementById("search-input");
const errorBody = document.getElementById("error-body");
const errorTxt = document.getElementById("error-txt");
const notFoundTxt = document.getElementById("not-found");

// Alert messages
const alerts = (errMsg) => {
  errorBody.classList.remove("d-none");
  errorTxt.innerText = errMsg;
};
// Load phone data
const loadData = () => {
  const searchValue = searchInput.value.toLowerCase();
  if (searchValue === "") {
    alerts("Please enter a phone name.");
  } else if (!isNaN(searchValue)) {
    alerts("Please enter a phone name instead of number.");
  } else {
    fetch(
      `https://openapi.programming-hero.com/api/phones?search=${searchValue}`
    )
      .then((res) => res.json())
      .then((data) => displayPhones(data.data));
  }
};

// Display phones
const displayPhones = (phones) => {
  if (phones.length === 0) {
    notFoundTxt.classList.remove("d-none");
  } else {
    phones.forEach((phone) => {
      console.log(phone.length);
    });
  }
};

// Load details data
const loadDetails = (id) => {
  console.log(id);
};
// Display phones details
const displayDetails = () => {
  console.log("Phone details");
};
