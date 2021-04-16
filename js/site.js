let addressArray = [{
        name: "Yukon Potatoes",
        city: "Gainesville",
        state: "Georgia",
        email: "potatoMan@gmail.com",
        phone: "111-345-1234",
    },
    {
        name: "Rock Lee",
        city: "Leaf",
        state: "Land of Fire",
        email: "bowlCut@gmail.com",
        phone: "112-345-1234",
    }, {
        name: "Gaara Kazekage",
        city: "Sand",
        state: "Land of wind",
        email: "sandMan@gmail.com",
        phone: "333-345-1234",
    }, {
        name: "Zoro Roronoa",
        city: "East Blue",
        state: "One Piece",
        email: "swordMan@gmail.com",
        phone: "777-345-1234",
    }
];
loadAddressBook();

function loadAddressBook() {
    let addressBook = [];
    addressBook = getData();
    displayData(addressBook);
}

function getData() {
    let addressBook = JSON.parse(localStorage.getItem("addressArray")) || [];

    if (addressBook.length == 0) {
        addressBook = address;
        localStorage.setItem("addressArray", JSON.stringify(addressBook));
    }
    return addressBook;
}

function saveAddress() {
    //grab the events out of local storage
    let addressBook = JSON.parse(localStorage.getItem("addressArray")) || addressArray;
    // create new object
    let obj = {};
    //assign that new object new attributes! wow
    obj["name"] = document.getElementById("newName").value;
    obj["city"] = document.getElementById("newCity").value;
    obj["state"] = document.getElementById("newState").value;
    obj["email"] = document.getElementById("newEmail").value;
    obj["phone"] = document.getElementById("newPhone").value;

    addressBook.push(obj);

    localStorage.setItem("addressArray", JSON.stringify(addressBook));

    // Access the values fromthe form by ID and add an objecet to the array.
    displayData(addressBook);
}

function displayData(addressBook) {
    const template = document.getElementById("Data-template");
    const resultsBody = document.getElementById("resultsBody");
    //clear table first
    resultsBody.innerHTML = "";
    for (let i = 0; i < addressBook.length; i++) {
        const dataRow = document.importNode(template.content, true);

        dataRow.getElementById("name").textContent = addressBook[i].name;
        dataRow.getElementById("city").textContent = addressBook[i].city;
        dataRow.getElementById("state").textContent = addressBook[i].state;
        dataRow.getElementById("email").textContent = addressBook[i].email;
        dataRow.getElementById("phone").textContent = formatPhoneNumber(addressBook[i].phone);

        resultsBody.appendChild(dataRow);
    }
}

function formatPhoneNumber(phoneNumberString) {
    let cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return null;
}