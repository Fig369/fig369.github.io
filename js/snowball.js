let debtIdCounter = 1; // Initialize outside functions to maintain its value

document.getElementById('due-date-input').valueAsDate = new Date();

// Function to save debt rows to localStorage
function saveDebtRowsToLocalStorage() {
    const debtRows = document.querySelectorAll('#debtTable-rows tr');
    const serializedRows = [];

    debtRows.forEach((row, index) => {
        const rowData = {
            id: row.getAttribute('id'), // Use the existing ID
            name: row.children[0].textContent,
            dueDate: row.children[1].textContent,
            interestRate: row.children[2].textContent,
            balanceDue: row.children[3].textContent,
            minimumPayment: row.children[4].textContent
        };
        serializedRows.push(JSON.stringify(rowData));
    });

    localStorage.setItem('debtRows', JSON.stringify(serializedRows));
}

// Function to load debt rows from localStorage
function loadDebtRowsFromLocalStorage() {
    const serializedRows = localStorage.getItem('debtRows');
    if (serializedRows) {
        const rows = JSON.parse(serializedRows);

        // Clear existing rows before loading
        const tbody = document.getElementById('debtTable-rows');
        tbody.innerHTML = ''; // Clear existing rows

        rows.forEach(serializedRow => {
            const rowData = JSON.parse(serializedRow);

            const row = document.createElement('tr');
            row.setAttribute('id', rowData.id); // Set the saved row ID

            const nameCell = document.createElement('td');
            nameCell.textContent = rowData.name;
            const dateCell = document.createElement('td');
            dateCell.textContent = rowData.dueDate;
            const interestRateCell = document.createElement('td');
            interestRateCell.textContent = rowData.interestRate;
            const balanceDueCell = document.createElement('td');
            balanceDueCell.textContent = rowData.balanceDue;
            const minimumPaymentCell = document.createElement('td');
            minimumPaymentCell.textContent = rowData.minimumPayment;
            const deleteCell = document.createElement('td');

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('btn', 'btn-danger');
            deleteButton.setAttribute('onclick', `deleteRow('${rowData.id}')`);
            deleteCell.appendChild(deleteButton);

            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.classList.add('btn', 'btn-primary');
            editButton.setAttribute('onclick', `editRow('${rowData.id}')`);
            deleteCell.appendChild(editButton);

            row.appendChild(nameCell);
            row.appendChild(dateCell);
            row.appendChild(interestRateCell);
            row.appendChild(balanceDueCell);
            row.appendChild(minimumPaymentCell);
            row.appendChild(deleteCell);

            tbody.appendChild(row);

            // Update debtIdCounter based on existing rows
            const idNumber = parseInt(rowData.id.split('-')[1]);
            if (idNumber >= debtIdCounter) {
                debtIdCounter = idNumber + 1;
            }
        });
    }

    updateDebtSummary();
    updateSnowballOrder();
}

// Call the function to load saved rows when the page loads
window.addEventListener('load', loadDebtRowsFromLocalStorage);

// Function to save rows
function saveRow() {
    const name = document.getElementById('name-input').value;
    let dueDateInput = document.getElementById('due-date-input').value;
    const interestRate = document.getElementById('interest-rate-input').value;
    const balanceDue = document.getElementById('balance-due-input').value;
    const minimumPayment = document.getElementById('minimum-payment-input').value;

    if (!name || !dueDateInput || !interestRate || !balanceDue || !minimumPayment) {
        alert('Please fill out all fields');
        return;
    }

    if (dueDateInput.includes('/')) {
        const parts = dueDateInput.split('/');
        dueDateInput = `20${parts[2]}-${parts[0].padStart(2, '0')}-${parts[1].padStart(2, '0')}`;
    }

    const dueDate = new Date(dueDateInput);
    const currentDate = new Date();

    if (dueDate < currentDate) {
        dueDate.setMonth(dueDate.getMonth() + 1);
    }

    const formattedDueDate = dueDate.toISOString().slice(0, 10);

    const tbody = document.getElementById('debtTable-rows');
    const row = document.createElement('tr');
    row.setAttribute('id', `debt-row-${debtIdCounter}`);

    const nameCell = document.createElement('td');
    nameCell.textContent = name;
    const dateCell = document.createElement('td');
    dateCell.textContent = formattedDueDate;
    const interestRateCell = document.createElement('td');
    interestRateCell.textContent = interestRate;
    const balanceDueCell = document.createElement('td');
    balanceDueCell.textContent = balanceDue;
    const minimumPaymentCell = document.createElement('td');
    minimumPaymentCell.textContent = minimumPayment;
    const deleteCell = document.createElement('td');

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.setAttribute('onclick', `deleteRow('debt-row-${debtIdCounter}')`);
    deleteCell.appendChild(deleteButton);

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('btn', 'btn-primary');
    editButton.setAttribute('onclick', `editRow('debt-row-${debtIdCounter}')`);
    deleteCell.appendChild(editButton);

    row.appendChild(nameCell);
    row.appendChild(dateCell);
    row.appendChild(interestRateCell);
    row.appendChild(balanceDueCell);
    row.appendChild(minimumPaymentCell);
    row.appendChild(deleteCell);

    tbody.appendChild(row);

    // Increment debtIdCounter for unique IDs
    debtIdCounter++;

    // Clear input fields after saving row
    document.getElementById('name-input').value = '';
    document.getElementById('due-date-input').value = '';
    document.getElementById('interest-rate-input').value = '';
    document.getElementById('balance-due-input').value = '';
    document.getElementById('minimum-payment-input').value = '';

    // Save rows to localStorage
    saveDebtRowsToLocalStorage();

    updateDebtSummary();
    updateSnowballOrder();
}

// Function to edit a row
function editRow(rowId) {
    const row = document.getElementById(rowId);

    const newName = row.children[0].textContent;
    const newDueDateText = row.children[1].textContent.trim();
    const newInterestRate = row.children[2].textContent;
    const newBalanceDue = row.children[3].textContent;
    const newMinimumPayment = row.children[4].textContent;

    // Populate form fields with row data for editing
    document.getElementById('name-input').value = newName;
    document.getElementById('due-date-input').value = newDueDateText;
    document.getElementById('interest-rate-input').value = newInterestRate;
    document.getElementById('balance-due-input').value = newBalanceDue;
    document.getElementById('minimum-payment-input').value = newMinimumPayment;

    // Remove edited row from table
    row.remove();

    updateDebtSummary();
    updateSnowballOrder();
}

// Function to delete a row
function deleteRow(rowId) {
    const row = document.getElementById(rowId);
    if (row) {
        row.remove();

        // Save rows to localStorage after deletion
        saveDebtRowsToLocalStorage();

        updateDebtSummary();
        updateSnowballOrder();
    }
}

// Function to update debt summary
function updateDebtSummary() {
    const debtRows = document.querySelectorAll('#debtTable-rows tr');

    let totalInterest = 0;
    let totalBalanceDue = 0;
    let totalMinimumPayment = 0;
    let totalInterestRate = 0;
    let rowCount = debtRows.length;

    debtRows.forEach((row) => {
        const interestRate = parseFloat(row.children[2].textContent);
        const balanceDue = parseFloat(row.children[3].textContent);
        const minimumPayment = parseFloat(row.children[4].textContent);
        totalBalanceDue += balanceDue;
        totalMinimumPayment += minimumPayment;
        totalInterestRate += interestRate;
        totalInterest += balanceDue * interestRate / 100;
    });

    let averageInterestRate = (rowCount > 0) ? (totalInterestRate / rowCount) : 0;

    document.getElementById('totalInterestRate').textContent = averageInterestRate.toFixed(2);
    document.getElementById('totalBalanceDue').textContent = totalBalanceDue.toFixed(2);
    document.getElementById('totalMinimumPayment').textContent = totalMinimumPayment.toFixed(2);
}

function updateSnowballOrder() {
    const debtRows = document.querySelectorAll('#debtTable-rows tr');
    const snowballTable = document.getElementById('debtSnowballOrder');
    const tfoot = document.querySelector('#debtTable tfoot');
    let leftover = parseFloat(tfoot.querySelector('#leftover').textContent);

    let debtsArray = Array.from(debtRows);

    debtsArray.sort((a, b) => {
        const balanceA = parseFloat(a.children[3].textContent);
        const balanceB = parseFloat(b.children[3].textContent);
        return balanceA - balanceB;
    });

    snowballTable.innerHTML = '';

    const table = document.createElement('table');
    table.classList.add('snowball-table');

    const headerRow = document.createElement('tr');
    const headers = ['Debt Name', 'Month', 'Additional Applied', 'Remaining Balance', 'Interest Accrued', 'Next Minimum Due Date', 'Payoff Date'];
    headers.forEach(headerText => {
        const header = document.createElement('th');
        header.textContent = headerText;
        headerRow.appendChild(header);
    });
    table.appendChild(headerRow);

    debtsArray.forEach((row, index) => {
        const name = row.children[0].textContent;
        let balance = parseFloat(row.children[3].textContent);
        const interestRate = parseFloat(row.children[2].textContent);

        const snowballRow = document.createElement('tr');

        const nameCell = document.createElement('td');
        nameCell.textContent = name;
        snowballRow.appendChild(nameCell);

        const monthCell = document.createElement('td');
        monthCell.textContent = index + 1;
        snowballRow.appendChild(monthCell);

        let additionalAppliedCell = document.createElement('td');
        let remainingBalanceCell = document.createElement('td');
        let interestAccruedCell = document.createElement('td');
        let nextMinimumDueDateCell = document.createElement('td');
        let payoffDateCell = document.createElement('td');

        if (leftover > 0 && balance > 0) {
            const minimumPayment = Math.min(leftover, balance); // Apply leftover or remaining balance, whichever is smaller
            additionalAppliedCell.textContent = minimumPayment.toFixed(2);
            remainingBalance = balance - minimumPayment;
            remainingBalanceCell.textContent = remainingBalance.toFixed(2);
            const interestAccrued = remainingBalance * interestRate / 12;
            interestAccruedCell.textContent = interestAccrued.toFixed(2);
            const dueDate = new Date(row.children[1].textContent);
            dueDate.setMonth(dueDate.getMonth() + 1);
            nextMinimumDueDateCell.textContent = dueDate.toISOString().slice(0, 10);
            const payoffDate = new Date();
            payoffDate.setMonth(payoffDate.getMonth() + index + 1);
            payoffDateCell.textContent = remainingBalance <= 0 ? payoffDate.toISOString().slice(0, 10) : '';
            leftover -= minimumPayment;
        } else {
            additionalAppliedCell.textContent = '0.00';
            remainingBalanceCell.textContent = balance.toFixed(2);
            interestAccruedCell.textContent = (balance * interestRate / 12).toFixed(2);
            const dueDate = new Date(row.children[1].textContent);
            dueDate.setMonth(dueDate.getMonth() + 1);
            nextMinimumDueDateCell.textContent = dueDate.toISOString().slice(0, 10);
            payoffDateCell.textContent = '';
        }

        snowballRow.appendChild(additionalAppliedCell);
        snowballRow.appendChild(remainingBalanceCell);
        snowballRow.appendChild(interestAccruedCell);
        snowballRow.appendChild(nextMinimumDueDateCell);
        snowballRow.appendChild(payoffDateCell);

        table.appendChild(snowballRow);
    });

    snowballTable.appendChild(table);

    // Update the leftover amount in the tfoot element
    tfoot.querySelector('#leftover').textContent = leftover.toFixed(2);
}



// Function to update the leftover amount based on income and total minimum payment
function updateLeftover() {
    const householdIncome = parseFloat(document.getElementById('householdIncome').value) || 0;
    const totalMinimumPayment = parseFloat(document.getElementById('totalMinimumPayment').textContent) || 0;
    const leftover = householdIncome - totalMinimumPayment;

    // Update the leftover amount in the tfoot element
    const leftoverElement = document.getElementById('leftover');
    if (leftoverElement) {
        leftoverElement.textContent = leftover.toFixed(2);
    }

    return leftover;
}

// Function to update the debt snowball order table based on remaining balances and leftover amount
function updateSnowballOrder() {
    const debtRows = document.querySelectorAll('#debtTable-rows tr');
    const snowballTable = document.getElementById('debtSnowballOrder');
    const tfoot = document.querySelector('#debtTable tfoot');
    let leftover = parseFloat(tfoot.querySelector('#leftover').textContent);
    let totalInterestRate = parseFloat(document.getElementById('totalInterestRate').textContent);
    // let totalBalanceDue = parseFloat(document.getElementById('totalBalanceDue').textContent);
    // let totalMinimumPayment = parseFloat(document.getElementById('totalMinimumPayment').textContent);
    // let rowCount = debtRows.length;
    // let averageInterestRate = (rowCount > 0) ? (totalInterestRate / rowCount) : 0;
    // let averageBalanceDue = (rowCount > 0) ? (totalBalanceDue / rowCount) : 0;
    // let averageMinimumPayment = (rowCount > 0) ? (totalMinimumPayment / rowCount) : 0;
    // let averageInterestRateElement = document.getElementById('averageInterestRate');
    // let averageBalanceDueElement = document.getElementById('averageBalanceDue');
    // let averageMinimumPaymentElement = document.getElementById('averageMinimumPayment');
    // averageInterestRateElement.textContent = averageInterestRate.toFixed(2);
    // averageBalanceDueElement.textContent = averageBalanceDue.toFixed(2);
    // averageMinimumPaymentElement.textContent = averageMinimumPayment.toFixed(2);
    


    let debtsArray = Array.from(debtRows);

    debtsArray.sort((a, b) => {
        const balanceA = parseFloat(a.children[3].textContent);
        const balanceB = parseFloat(b.children[3].textContent);
        return balanceA - balanceB;
    });

    snowballTable.innerHTML = '';

    const table = document.createElement('table');
    table.classList.add('snowball-table');

    const headerRow = document.createElement('tr');
    const headers = ['Debt Name', 'Month', 'Additional Applied', 'Remaining Balance', 'Interest Accrued', 'Next Minimum Due Date', 'Payoff Date'];
    headers.forEach(headerText => {
        const header = document.createElement('th');
        header.textContent = headerText;
        headerRow.appendChild(header);
    });
    table.appendChild(headerRow);

    debtsArray.forEach((row, index) => {
        const name = row.children[0].textContent;
        let balance = parseFloat(row.children[3].textContent);
        const interestRate = totalInterestRate / 100;

        const snowballRow = document.createElement('tr');

        const nameCell = document.createElement('td');
        nameCell.textContent = name;
        snowballRow.appendChild(nameCell);

        const monthCell = document.createElement('td');
        monthCell.textContent = index + 1;
        snowballRow.appendChild(monthCell);

        let additionalAppliedCell = document.createElement('td');
        let remainingBalanceCell = document.createElement('td');
        let interestAccruedCell = document.createElement('td');
        let nextMinimumDueDateCell = document.createElement('td');
        let payoffDateCell = document.createElement('td');

        if (leftover > 0 && balance > 0) {
            const minimumPayment = Math.min(leftover, balance); // Apply leftover or remaining balance, whichever is smaller
            additionalAppliedCell.textContent = minimumPayment.toFixed(2);
            remainingBalance = balance - minimumPayment;
            remainingBalanceCell.textContent = remainingBalance.toFixed(2);
            const interestAccrued = remainingBalance * interestRate / 12;
            interestAccruedCell.textContent = interestAccrued.toFixed(2);
            const dueDate = new Date(row.children[1].textContent);
            dueDate.setMonth(dueDate.getMonth() + 1);
            nextMinimumDueDateCell.textContent = dueDate.toISOString().slice(0, 10);
            const payoffDate = new Date();
            payoffDate.setMonth(payoffDate.getMonth() + index + 1);
            payoffDateCell.textContent = remainingBalance <= 0 ? payoffDate.toISOString().slice(0, 10) : '';
            leftover -= minimumPayment;
        } else {
            additionalAppliedCell.textContent = '0.00';
            remainingBalanceCell.textContent = balance.toFixed(2);
            interestAccruedCell.textContent = (balance * interestRate / 12).toFixed(2);
            const dueDate = new Date(row.children[1].textContent);
            dueDate.setMonth(dueDate.getMonth() + 1);
            nextMinimumDueDateCell.textContent = dueDate.toISOString().slice(0, 10);
            payoffDateCell.textContent = '';
        }

        snowballRow.appendChild(additionalAppliedCell);
        snowballRow.appendChild(remainingBalanceCell);
        snowballRow.appendChild(interestAccruedCell);
        snowballRow.appendChild(nextMinimumDueDateCell);
        snowballRow.appendChild(payoffDateCell);

        table.appendChild(snowballRow);
    });

    snowballTable.appendChild(table);

    // Update the leftover amount in the tfoot element
    tfoot.querySelector('#leftover').textContent = leftover.toFixed(2);
}

// Event listener for changes in household income and total minimum payment
// document.getElementById('householdIncome').addEventListener('input', () => {
//     updateLeftover();
//     updateSnowballOrder();
// });

// Event listener for changes in debt rows
// document.getElementById('debtTable').addEventListener('change', () => {
//     updateDebtSummary();
//     updateSnowballOrder();
// });

// Initialize leftover amount when the page loads
updateLeftover();
