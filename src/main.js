
import ListingService from './ListingService';
import ListingView from './ListingView';

function renderApp() {
    let div = document.getElementById('main');

    let service = new ListingService();
    let view = new ListingView();

    //Let's check this is all working end to end
    service.getProgrammesForLetterAndPage('z', 1).then((data) => {
        view.displayListOfProgrammes(data.elements);
    }, (error) => {
        div.textContent = error.statusText;
    });
}

renderApp();
