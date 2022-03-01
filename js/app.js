// Element selection
const searchInput = document.getElementById("search-input");

// Load phone data function
const loadData = () => {
  const searchValue = searchInput.value.toLowerCase();
  if (searchValue === "") {
    console.log("Please enter a value");
  } else if (!isNaN(searchValue)) {
    console.log("Enter a string");
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
    console.log("No results found");
  } else {
    for (const phone of phones) {
      console.log(phone);
    }
  }
};
