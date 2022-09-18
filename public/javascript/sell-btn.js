async function sellBtnHandler(event) {
    event.preventDefault();
    
    const transaction_amount = parseInt(window.prompt("Enter the number of animals you want to sell"))
    const transaction_type = document.getElementById('sell').value.trim();
    const animal = document.getElementById('animal-name').value.trim();
    const sell_price = parseInt(document.getElementById('sell-price').value.trim());
    const animal_id = parseInt(document.getElementById('animal-name').getAttribute('data-animal-id'))
    const farm_id = parseInt(document.getElementById('animal-name').getAttribute('data-farm-id'))
    const fund = parseInt(document.getElementById('animal-name').getAttribute('data-farm-fund'))
    console.log(transaction_amount)
    console.log(transaction_type)
    console.log(animal)
    console.log(animal_id)
    console.log(farm_id)
    console.log(sell_price)
  
    if (transaction_amount && transaction_type && animal_id && farm_id && sell_price) {
      const responseTrans = await fetch('/api/transactions/', {
        method: 'post',
        body: JSON.stringify({
            transaction_type,
            transaction_amount,
            animal_id,
            farm_id
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  

    const responseFund = await fetch('/api/farms/:id', {
        method: 'put',
        body: JSON.stringify({
            transaction_type,
            transaction_amount,
            animal_id,
            farm_id,
            sell_price,
            fund
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
  
  
  document.getElementById('sell').addEventListener('click', sellBtnHandler);