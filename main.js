let form = document.querySelector("form");
let output = document.querySelector(".output");
let clearBTN = document.querySelector(".clear");


let dataArray = JSON.parse(localStorage.getItem("daArray")) || []; 

form.addEventListener("submit", (e) => {
    e.preventDefault();

    let nameInput = document.querySelector('[placeholder="Full Name"]').value;
    let PasswordInput = document.querySelector('[placeholder="Password"]').value;
    let DateInput = document.querySelector('[placeholder="Date of Birth"]').value;
    let GenderInput = document.querySelector('[placeholder="Gender"]').value;
    let PhoneInput = document.querySelector('[placeholder="Phone number"]').value;

    let shawerma = document.querySelector('[id="shawerma"]:checked')?.value || "";
    let zinger = document.querySelector('[id="zinger"]:checked')?.value || "";
    let borger = document.querySelector('[id="borger"]:checked')?.value || "";

    let selectedOptions = "";
    document.querySelectorAll('input[type="checkbox"]:checked').forEach((e) => {
        selectedOptions += e.value + " ";
    });
    
    selectedOptions = selectedOptions || "No options selected";

   
    let data = {
        userName: nameInput,
        Password: PasswordInput,
        Date: DateInput,
        Gender: GenderInput,
        Phone: PhoneInput,
        Meal: shawerma || zinger || borger,
        Options: selectedOptions
    };
    
    
    dataArray.push(data);
    output.innerHTML += `
    <p>Name: ${data.userName}</p>
    <p>Password: ${data.Password}</p>
    <p>Date of Birth: ${data.Date}</p>
    <p>Gender: ${data.Gender}</p>
    <p>Phone: ${data.Phone}</p>
    <p>Meal: ${data.Meal}</p>
    <p>Options: ${data.Options}</p>
    `;
    
    localStorage.setItem("daArray", JSON.stringify(dataArray));
});


clearBTN.addEventListener("click", () => {
    localStorage.clear();
    location.reload();
});
