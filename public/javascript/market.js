function MarketHandler(event) {
    event.preventDefault();
  
    document.location.replace('/market');

    
}
 
document.getElementById('market').addEventListener('click', MarketHandler);