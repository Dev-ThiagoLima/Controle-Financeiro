const transactionUl = document.querySelector('#transactions')

const dummytransactions = [
    {id:1, name: 'Bolo de Brigadeiro', amount: -20},
    {id:2, name: 'salário', amount: 300 },
    {id:3, name: 'Torta de frango', amount: -10},
    {id:4, name: 'violão', amount: 150}
]

const addTransactionIntoDOM = transaction => {
    const operator = transaction.amount < 0 ? '-' : '+'
    const amountWithoutOperator =  Math.abs(transaction.amount)
    const CSSClass = transaction.amount < 0 ? 'minus' : 'plus'
    const li = document.createElement('li')

    li.classList.add(CSSClass)
    li.innerHTML = `
        ${transaction.name} <span>${operator} R$ ${amountWithoutOperator}</span><button class="delete-btn">x</button>
    `
   transactionUl.prepend(li)

}

addTransactionIntoDOM(dummytransactions[0])