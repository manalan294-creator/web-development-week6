const budgetInput = document.getElementById('budgetInput');
const updateBudgetBtn = document.getElementById('updateBudgetBtn');
const expenseForm = document.getElementById('expenseForm');
const expenseNameInput = document.getElementById('expenseName');
const expenseCategoryInput = document.getElementById('expenseCategory');
const expenseAmountInput = document.getElementById('expenseAmount');
const resetBtn = document.getElementById('resetBtn');
const budgetValue = document.getElementById('budgetValue');
const spentValue = document.getElementById('spentValue');
const remainingValue = document.getElementById('remainingValue');
const statusMessage = document.getElementById('statusMessage');
const expenseList = document.getElementById('expenseList');

let budget = 2500;
let expenses = [
  { id: 1, name: 'Rent', category: 'Housing', amount: 950 },
  { id: 2, name: 'Groceries', category: 'Food', amount: 240 },
  { id: 3, name: 'Fuel', category: 'Transport', amount: 120 },
  { id: 4, name: 'Streaming', category: 'Entertainment', amount: 35 }
];

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value);
}

function calculateTotalExpenses() {
  let total = 0;

  for (const expense of expenses) {
    total += Number(expense.amount);
  }

  return total;
}

function getBudgetStatus(remaining) {
  if (remaining > 200) {
    return {
      text: 'You are in a strong position. You still have plenty of room in your budget.',
      className: 'good'
    };
  }

  if (remaining >= 0) {
    return {
      text: 'Your budget is healthy, but keep tracking your spending.',
      className: 'neutral'
    };
  }

  if (remaining < -200) {
    return {
      text: 'Warning: your spending is far above budget. Review your expenses immediately.',
      className: 'danger'
    };
  }

  return {
    text: 'You are slightly over budget. Consider reducing one or two expenses.',
    className: 'warning'
  };
}

function renderExpenses() {
  if (expenses.length === 0) {
    expenseList.innerHTML = '<p class="empty-state">No expenses recorded yet.</p>';
    return;
  }

  expenseList.innerHTML = '';

  for (const expense of expenses) {
    const expenseItem = document.createElement('div');
    expenseItem.className = 'expense-item';
    expenseItem.innerHTML = `
      <div class="expense-main">
        <strong>${expense.name}</strong>
        <span class="expense-tag">${expense.category}</span>
      </div>
      <span class="expense-amount">${formatCurrency(expense.amount)}</span>
      <button class="delete-btn" type="button" data-id="${expense.id}">Delete</button>
    `;

    expenseList.appendChild(expenseItem);
  }
}

function renderDashboard() {
  const totalExpenses = calculateTotalExpenses();
  const remaining = budget - totalExpenses;
  const status = getBudgetStatus(remaining);

  budgetValue.textContent = formatCurrency(budget);
  spentValue.textContent = formatCurrency(totalExpenses);
  remainingValue.textContent = formatCurrency(remaining);
  statusMessage.textContent = status.text;
  statusMessage.className = `status-banner ${status.className}`;

  if (remaining < 0) {
    remainingValue.style.color = '#b91c1c';
  } else {
    remainingValue.style.color = '#166534';
  }
}

function updateBudget() {
  const newBudget = Number(budgetInput.value);

  if (newBudget >= 0) {
    budget = newBudget;
    renderDashboard();
  } else {
    alert('Budget must be zero or greater.');
  }
}

function addExpense(event) {
  event.preventDefault();

  const name = expenseNameInput.value.trim();
  const category = expenseCategoryInput.value;
  const amount = Number(expenseAmountInput.value);

  if (!name || amount <= 0) {
    alert('Please enter a valid expense name and amount greater than zero.');
    return;
  }

  expenses.push({
    id: Date.now(),
    name,
    category,
    amount
  });

  expenseForm.reset();
  renderExpenses();
  renderDashboard();
}

function resetExpenses() {
  expenses = [];
  renderExpenses();
  renderDashboard();
}

function deleteExpense(event) {
  const deleteButton = event.target.closest('.delete-btn');

  if (!deleteButton) {
    return;
  }

  const id = Number(deleteButton.dataset.id);
  expenses = expenses.filter((expense) => expense.id !== id);
  renderExpenses();
  renderDashboard();
}

updateBudgetBtn.addEventListener('click', updateBudget);
expenseForm.addEventListener('submit', addExpense);
resetBtn.addEventListener('click', resetExpenses);
expenseList.addEventListener('click', deleteExpense);

renderExpenses();
renderDashboard();
