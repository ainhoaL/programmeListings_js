import NavigationController from './NavigationController';

function renderApp() {
    let navigationController = new NavigationController();

    //Create the A-Z navigation
    navigationController.createAZNavigation();

    //Get letter from querystring and give it to the controller
    let queryString = window.location.search;
    queryString = queryString.substring(1);
    let queryParams = queryString.split('=');
    let letter = queryParams[1];
    
    navigationController.loadLetterAndPage(letter);
}

renderApp();
