let imgURL = "images/download.jpg";
let form = document.querySelector("form");
let clearBTN = document.querySelector(".clear");

let dataArray = JSON.parse(localStorage.getItem("dataArray")) || [];

function CustomerInf(
  userImg,
  nameInput,
  emailInput,
  PasswordInput,
  DateInput,
  GenderInput,
  PhoneInput,
  orderType,
  selectedOptions
) {
  this.userImg = userImg;
  this.nameInput = nameInput;
  this.emailInput = emailInput;
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

    let emailInput = document.createElement("p");
    emailInput.textContent = `Email: ${customer.emailInput}`;

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
    card.appendChild(emailInput);
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
  let emailInput = document.querySelector('[placeholder="Email"]').value;
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
    emailInput,
    PasswordInput,
    DateInput,
    GenderInput,
    PhoneInput,
    orderType,
    selectedOptions
  );

  
  if (!/^[^\s]+$/.test(nameInput)) {
    alert("Username must not contain spaces.");
    return;
  }

  if (PasswordInput.length < 8 || !/\d/.test(PasswordInput) || !/[A-Z]/.test(PasswordInput) || !/[!@#$%^&*]/.test(PasswordInput)) {
    alert("Password must be at least 8 characters long and include at least one number, one uppercase letter, and one special character.");
    return;
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(DateInput)) {
    alert("Birthday must be in the format YYYY-MM-DD.");
    return;
  }

  if (!/^07\d{8}$/.test(PhoneInput)) {
    alert("Phone number must be 10 digits and start with '07'.");
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput)) {
    alert("Please enter a valid email address.");
    return;
  }

  const existingUser = dataArray.find(customer => customer.nameInput === nameInput);
  
  if (existingUser) {
    alert("User already exists.");
    return;
  }

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
