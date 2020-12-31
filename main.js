//Close modal
const modal = document.querySelector('#myModal');
const btn = document.querySelector('#myBtn');
const span = document.querySelector('.close');

btn.addEventListener('click', () => {
    expName.value = "";
    expNumber.value = "";
    expensesForm.style.display = "block";
    editForm.style.display = "none";
    modal.style.display = "block";
});
span.addEventListener('click', () => {
    modal.style.display = "none";
});
window.addEventListener('click', (e) => {
    if(e.target == modal) {
        modal.style.display = "none";
    }
});
window.addEventListener('keydown', (e) => {
    if(e.key === "Escape") {
        modal.style.display = "none";
    }
});

// //VARIABLS

const amountInput = document.querySelector('#number');
const addForm = document.querySelector('#addForm');
const budgetAmount = document.querySelector('#budgetAmount');
const balanceAmount = document.querySelector('#balanceAmount');

const editForm = document.querySelector('#editForm');
const saveEdit = document.querySelector('#saveEdit');
const editExpValue = document.querySelector('#editExpName');
const editExpNumber = document.querySelector('#editExpNumber');

const expForm = document.querySelector('#expForm');
const expensesAmount = document.querySelector('#expensesAmount');
const expValue = document.querySelector('#expValue');
const displayExpenses = document.querySelector('#displayExpenses');
const expensesForm = document.querySelector('#expense-form');
const budgetform = document.querySelector('#budgetform')

let expName = document.querySelector('#expName');
let expNumber = document.querySelector('#expNumber');
let id = 0;
let details = [];

const clearLocalBtn = document.querySelector('#clearLocal');
// //FUNCTION

function getBudgetAmount (amount) {
    if(!amount) {
        amountInput.style.border = "1px solid #b80c09";
        amountInput.placeholder = "Input can not be empty";
        amountInput.style.color = "#b80c09";
        setTimeout(() => {
            amountInput.style.color = "#496057";
            amountInput.style.border = "1px solid gray"
        }, 3000);
    } else {
        budgetAmount.innerText = amount;
        balanceAmount.innerText = amount;
        expensesForm.style.display = "block";
        budgetform.style.display  = "none";
        editForm.style.display = "none";
        amountInput.value = "";
    }
}

function addExpenses (name, number) {
    if(!name.length || !number.length) {
        expName.style.border = "1px solid #b80c09";
        expName.placeholder = "Input can not be empty";
        expName.style.color = "#b80c09";

        expNumber.style.border = "1px solid #b80c09";
        expNumber.placeholder = "Input can not be empty";
        expNumber.style.color = "#b80c09";

        setTimeout(() => {
            expName.style.border = "1px solid gray";
            expName.placeholder = "Input can not be empty";
            expName.style.color = "#496057";

            expNumber.style.border = "1px solid gray";
            expNumber.placeholder = "Input can not be empty";
            expNumber.style.color = "#496057";  
        }, 3000);
    } else {
        const userExp = {
            id: id,
            name: name, 
            number: parseInt(number)
        };

        details.push(userExp);
        displayExp(details);
        id++;

        localStorage.setItem("expense", JSON.stringify(details));
        
        expName.value = "";
        expNumber.value = "";
    }
}


function displayExp (details) {
    expValue.innerHTML = null;
    for (i = 0; i < details.length; i++) {
        expValue.innerHTML += `
        <div class="expValue" id="${details[i].id}">
            <div id="expTitleName" class="exp"><p>${details[i].name}</p></div>
            <div id="expValueAmount" class="exp"><p> <span>$ </span> ${details[i].number}</p></div>
            <div id="edite_delete">
        <p>
          <button id="${details[i].id}" onclick="editExpDetails(${details[i].id})"> <img src="./edit.svg" width="15" alt=""  /></button> 
          <button id="${details[i].id}" onclick="delExpenseDetails(${details[i].id})"><img src="./trash.svg" width="15" alt="" /></button>
        </p>
      </div>
    </div>
        `;
    }
    calcExpenses();
    displayExpenses.style.display = "block";
}

function calcExpenses() {
    let totalExp = 0;
    for (i = 0; i < details.length; i++) {
        totalExp = details[i].number + totalExp;
    }

    expensesAmount.innerText = totalExp;
    updateBalance();
}

function updateBalance () {
    balanceAmount.innerText = 
    parseInt(budgetAmount.innerText) - parseInt(expensesAmount.innerText);
}

function editExpDetails (id) {
    expensesForm.style.display = "none";
    budgetform.style.display = "none";
    editForm.style.display = "block";
    details.findIndex((item) => {
      if (item.id === id) {
        editExpName.value = item.name;
        editExpNumber.value = item.number;
        saveEdit.children[2].id = item.id;
        modal.style.display = "block";
      }
    });
}

function getExpValue (editExpName, editExpNumber, id) {
    edited = details.findIndex((obj) => obj.id == id);
    details[edited].name = editExpName;
    details[edited].number = parseInt(editExpNumber);
    displayExp(details)
}


function getLocalExpenses() {
    if(localStorage.getItem('expense')) {
        details = JSON.parse(localStorage.getItem('expense'))
        displayExp(details);
        id = details.length; 
    } else {
        details = []
    }
}

function delExpenseDetails (id) {
    let index = details.findIndex((item) => item.id === id);
    details.splice(index, 1);

    displayExp(details);

    if(details.length == 0) {
        displayExpenses.style.display = "none";
    }    
}


function callBudget() {
    budgetform.style.display = "block";
    expensesForm.style.display = "none";
}


function saveBudget () {
    const key = "budget";
    let value = amountInput.value;

    localStorage.setItem(key, value)
}

function getBudgetFromLocalStorage() {
    const amount = localStorage.getItem("budget");
    getBudgetAmount(amount);

}

function clearLocal () {
    localStorage.clear();
    details = [];
    displayExp(details);

    if(details.length == 0) {
        displayExpenses.style.display = "none";
    }    
}

//EVENTS

addForm.addEventListener("submit", (e) => {
    e.preventDefault();
    saveBudget();
    getBudgetAmount(amountInput.value);
});

expForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addExpenses(expName.value, expNumber.value);
});

saveEdit.addEventListener("submit", (e) => {
    e.preventDefault();
    getExpValue(editExpName.value, editExpNumber.value, saveEdit.children[2].id);
});

window.addEventListener('DOMContentLoaded', () => {
    getBudgetFromLocalStorage();
    getLocalExpenses();
});

clearLocalBtn.addEventListener('click', () => {
    clearLocal();
});