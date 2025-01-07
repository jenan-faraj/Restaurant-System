let imgURL = "images/download.jpg";
let form = document.querySelector("form");
let clearBTN = document.querySelector(".clear");

let dataArray = JSON.parse(localStorage.getItem("dataArray")) || [];

function CustomerInf(
  userImg,
  nameInput,
  PasswordInput,
  DateInput,
  GenderInput,
  PhoneInput,
  orderType,
  selectedOptions
) {
  this.userImg = userImg;
  this.nameInput = nameInput;
  this.PasswordInput = PasswordInput;
  this.DateInput = DateInput;
  this.GenderInput = GenderInput;
  this.PhoneInput = PhoneInput;
  this.orderType = orderType;
  this.selectedOptions = selectedOptions;
}

function rander() {
  let cardsContainer = document.querySelector(".cardsContainer");
  cardsContainer.innerText = ''; 
  dataArray.forEach((customer) => {
    let card = document.createElement("div");
    card.classList.add("card");

    let userImg = document.createElement("img");
    userImg.src = imgURL;

    let nameInput = document.createElement("p");
    nameInput.textContent = `Name: ${customer.nameInput}`;

    let PasswordInput = document.createElement("p");
    PasswordInput.textContent = `Password: ${"*".repeat(
      customer.PasswordInput.length
    )}`;

    let DateInput = document.createElement("p");
    DateInput.textContent = `Date of Birth: ${customer.DateInput}`;

    let GenderInput = document.createElement("p");
    GenderInput.textContent = `Gender: ${customer.GenderInput}`;

    let PhoneInput = document.createElement("p");
    PhoneInput.textContent = `Phone: ${customer.PhoneInput}`;

    let orderType = document.createElement("p");
    orderType.textContent = `Order type: ${customer.orderType}`;


    let selectedOptions = document.createElement("p");
    selectedOptions.textContent = `Order ptions: ${customer.selectedOptions}`;

    card.appendChild(userImg);
    card.appendChild(nameInput);
    card.appendChild(PasswordInput);
    card.appendChild(DateInput);
    card.appendChild(GenderInput);
    card.appendChild(PhoneInput);
    card.appendChild(orderType);
    card.appendChild(selectedOptions);

    cardsContainer.appendChild(card);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let nameInput = document.querySelector('[placeholder="Full Name"]').value;
  let PasswordInput = document.querySelector('[placeholder="Password"]').value;
  let DateInput = document.querySelector('[placeholder="Date of Birth"]').value;
  let GenderInput = document.querySelector('[placeholder="Gender"]').value;
  let PhoneInput = document.querySelector('[placeholder="Phone number"]').value;

  let orderType = "";
  document.querySelectorAll('input[type="radio"]:checked').forEach((e) => {
    orderType += e.value + " ";
    orderType = orderType || "No order selected";
  });

  let selectedOptions = "";
  document.querySelectorAll('input[type="checkbox"]:checked').forEach((e) => {
    selectedOptions += e.value + " ";
    selectedOptions = selectedOptions || "No options selected";
  });

  const newCustomer = new CustomerInf(
    imgURL,
    nameInput,
    PasswordInput,
    DateInput,
    GenderInput,
    PhoneInput,
    orderType,
    selectedOptions
  );

  dataArray.push(newCustomer);

  localStorage.setItem("dataArray", JSON.stringify(dataArray));

  form.reset();

  rander();
});

rander();
clearBTN.addEventListener("click", () => {
  localStorage.clear();
  location.reload();
});
