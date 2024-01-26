const transactionUl = document.querySelector('#transactions')
const incomeDisplay = document.querySelector('#money-plus')
const expenseDisplay = document.querySelector('#money-minus')
const balanceDisplay = document.querySelector('#balance')
const form = document.querySelector('#form')
const inputTransactionName = document.querySelector('#text')
const inputTransactionAmount = document.querySelector('#amount')



let dummytransactions = [
    {id:1, name: 'Bolo de Brigadeiro', amount: -20},
    {id:2, name: 'salário', amount: 300 },
    {id:3, name: 'Torta de frango', amount: -10},
    {id:4, name: 'violão', amount: 150}
]

const removeTransaction = ID => {
    dummytransactions = dummytransactions.filter(transaction => transaction.id !== ID )
    console.log(dummytransactions)
}

const addTransactionIntoDOM = transaction => {
    const operator = transaction.amount < 0 ? '-' : '+'
    const amountWithoutOperator =  Math.abs(transaction.amount)
    const CSSClass = transaction.amount < 0 ? 'minus' : 'plus'
    const li = document.createElement('li')

    li.classList.add(CSSClass)
    li.innerHTML = `
        ${transaction.name} 
        <span>${operator} R$ ${amountWithoutOperator}</span>
        <button class="delete-btn" onClick="removeTrasaction(${transaction.id})">
            x
        </button>
    `
   transactionUl.append(li)

}

const updateBalanceValues = constValue = () => {
    const transactionsAmounts = dummytransactions
        .map(transaction => transaction.amount)
    const total = transactionsAmounts
        .reduce((accumulator, transaction) => accumulator + transaction, 0)
        .toFixed(2)
    const income = transactionsAmounts
        .filter(value => value > 0)
        .reduce((accumulator, value) => accumulator + value, 0)
        .toFixed(2)
    const expense = Math.abs (transactionsAmounts
        .filter(value => value < 0)
        .reduce((accumulator, value) => accumulator + value, 0))
        .toFixed(2)
    
    balanceDisplay.textContent = `R$ ${total}`
    incomeDisplay.textContent = `R$ ${income}`
    expenseDisplay.textContent = `R$ ${expense}`
}

const init = () => {
    transactionUl.innerHTML = ''
    dummytransactions.forEach(addTransactionIntoDOM)
    updateBalanceValues()
}

init()

const generateID = () => Math.round(Math.random() * 1000)

form.addEventListener('submit', event => {
    event.preventDefault()

    const transactionName = inputTransactionName.value.trim()
    const transactionAmount = inputTransactionAmount.value.trim()

    if ( transactionName === '' || transactionAmount === ''){
        alert('Por favor, preencha tanto o nome quanto o valor da transação')
        return
    }

    const transaction = {
        id:generateID(), 
        name:transactionName, 
        amount: Number(transactionAmount) 
    }

    dummytransactions.push(transaction)
    init()

    inputTransactionName.value = ''
    inputTransactionAmount.value = ''


})
