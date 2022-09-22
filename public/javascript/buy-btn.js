function buyBtnHandler(id) {
    bootbox.prompt({
      title: "Enter the number of animals you want to buy: ",
      inputType: 'number',
      callback: function (result) {
          buyCalculation(id, result);
      }
    });}

async function buyCalculation (id, numberInput) {    
    const transaction_amount = numberInput;
    const transaction_type = "Buy";
    const buy_price = 0-parseInt(document.getElementById(`buy-${id}`).getAttribute('data-buy-price'));
    const animal_id = parseInt(document.getElementById(`buy-${id}`).getAttribute('data-animal-id'))
    const farm_id = parseInt(document.getElementById('market').getAttribute('data-farm-id'))
    const fund = parseInt(document.getElementById('market').getAttribute('data-farm-fund'))
    console.log(transaction_amount)
    console.log(transaction_type)
    console.log(document.getElementById(id))
    console.log(animal_id)
    console.log(farm_id)
    console.log(buy_price)
  
    if (transaction_amount && transaction_type && animal_id && farm_id && buy_price) {
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
            price: buy_price,
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