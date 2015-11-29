import NavigationController from './NavigationController';

function renderApp() {
    let navigationController = new NavigationController();

    //Let's check this is all working end to end
    navigationController.loadLetterAndPage('a');
}

renderApp();
