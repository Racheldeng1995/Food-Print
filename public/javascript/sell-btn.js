function sellBtnHandler(id) {
  bootbox.prompt({
    title: "Enter the number of animals you want to sell: ",
    inputType: 'number',
    callback: function (result) {
        sellCalculation(id, result);
    }
  });}

async function sellCalculation (id, numberInput) {

  const transaction_amount = numberInput;
  const transaction_type = "sell";
  const sell_price = parseInt(document.getElementById(`sell-${id}`).getAttribute('data-sell-price'));
  const animal_id = parseInt(document.getElementById(`sell-${id}`).getAttribute('data-animal-id'))
  const farm_id = parseInt(document.getElementById('market').getAttribute('data-farm-id'))
  const fund = parseInt(document.getElementById('market').getAttribute('data-farm-fund'))
  console.log(transaction_amount)
  console.log(transaction_type)

  console.log(animal_id)
  console.log(farm_id)
  console.log(sell_price)
  console.log(`sell-${id}`)


  if (transaction_amount && transaction_type && animal_id && farm_id && sell_price) {
    const responseTrans = await fetch('/api/transactions/', {
      method: 'post',
      body: JSON.stringify({
          transaction_type: transaction_type,
          transaction_amount: transaction_amount,
          animal_id: animal_id,
          farm_id: farm_id
      }),
      headers: { 'Content-Type': 'application/json' }
    });


  const responseFund = await fetch('/api/farms/:id', {
      method: 'put',
      body: JSON.stringify({
          transaction_type: transaction_type,
          transaction_amount: transaction_amount,
          animal_id: animal_id,
          farm_id: farm_id,
          price: sell_price,
          fund: fund
      }),
      headers: { 'Content-Type': 'application/json' }
    });

  if (responseFund.ok && responseTrans.ok) {
  document.location.replace('/market');
  } else {
  alert(responseFund.statusText);
  alert(responseTrans.statusText)
  }

}
}