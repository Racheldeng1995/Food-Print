async function buyBtnHandler(event) {
    event.preventDefault();

    const transaction_amount = parseInt(window.prompt("Enter the number of animals you want to buy"))
    const transaction_type = "Buy";
    const buy_price = 0-parseInt(document.getElementById('buy-price').textContent);
    const animal_id = parseInt(document.getElementById('animal-name').getAttribute('data-animal-id'))
    const farm_id = parseInt(document.getElementById('market').getAttribute('data-farm-id'))
    const fund = parseInt(document.getElementById('market').getAttribute('data-farm-fund'))
    console.log(transaction_amount)
    console.log(transaction_type)
    console.log(animal_id)
    console.log(farm_id)
    console.log(buy_price)
    console.log(document.getElementById('animal-name'))
    console.log(document.getElementById('market'))
    
    console.log((document.getElementById('buy-price')))
  
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
  
  
  document.getElementById('buy').addEventListener('click', buyBtnHandler);