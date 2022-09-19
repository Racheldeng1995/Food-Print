# Food-Print

## User Story ##
As a user, 

I would like to have a virtual farm, 

so that it would allow me to raise animals.

## Acceptance Criteria ##

* GIVEN I am using a virtual farm to raise animals, 
  
  * WHEN I open the application
    
    THEN the user name, email, and password should be presented to start
  * WHEN I login in
    
    THEN I am presented with a default farm name and I’m able to change it to another name
  * WHEN I login in 
    
    THEN I am presented with a default farm with initial animals including one chicken, sheep, and duck and fund number as 5000. 
  * WHEN I login in
    
    THEN I am presented with animal market button.
  * WHEN I click the animal market button
    
    THEN I’m directed to the animal market page with available animals on the markets including animal name, sell price, cost price, and buttons of selling, buying, and close. 

    Note that in animal markets page, it should also display what animals that user own to allow them make decisions on selling or buying.
    
  * WHEN I click button of selling
    
    THEN I’m presented with prompted window including number box for user to enter and buttons of submit and cancel

  * When I click the button of submit on selling window,
    
    THEN the number of owned animal from user should be dedected; Meanwhile, the number of animal from market should be added;
      Money user owned should be added
      
  * WHEN I click button of buying
    
    THEN I’m presented with prompted window including number box for user to enter and buttons of submit and cancel
  
  * When I click the button of submit on buying window,
the number of owned animal from user should be added; Meanwhile, the number of animal from market should be reduced;
Money user owned should be reduced

  * WHEN I click button of cancel
   
    THEN either buying window or selling window should be closed and I’m presented on animal market page.
