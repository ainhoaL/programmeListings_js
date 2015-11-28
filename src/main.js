
import ListingService from './ListingService';

function renderApp() {
    let div = document.getElementById('main');

    let service = new ListingService();

    //Let's check this is all working end to end
    service.getProgrammesForLetterAndPage('x', 1).then((data) => {
        div.textContent = data;
    }, (error) => {
        div.textContent = error.statusText;
    });
}

renderApp();
