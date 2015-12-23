import NavigationController from './NavigationController';

function renderApp() {
    let navigationController = new NavigationController();

    //Create the A-Z navigation
    navigationController.createAZNavigation();

    //Get letter from querystring and give it to the controller
    //EVen if there is no querystring, letter will be undefined and we deal with that
    //In this case we are also passing the letter via the queryString so the user can bookmark it
    //Alternatively, A-Z navigation and/or pagination can be done with buttons so the whole page doesn't refresh
    //or A-Z navigation and pagination via querystring.

    let queryString = window.location.search;
    queryString = queryString.substring(1);
    let queryParams = queryString.split('&');
    let letterParams = queryParams[0].split('=');
    let letter = letterParams[1];
    //Here we could also get the page from the querystring if navigated via links and pass it to loadLetterAndPage

    navigationController.loadLetterAndPage(letter);

}

renderApp();
