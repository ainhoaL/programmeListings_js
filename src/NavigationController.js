import ListingService from './ListingService';
import ListingView from './ListingView';

class NavigationController {

    constructor() {
        this.service = new ListingService();
        this.view = new ListingView();
    }

    loadLetterAndPage(letter, page = 1) {
        //Keep track of which letter we are displaying
        this.currentLetter = letter || 'a'; //Just in case somehow we are loading with a null letter

        this.service.getProgrammesForLetterAndPage(letter, page).then((data) => {
            this.view.displayListOfProgrammes(data.elements);

            //TODO: add paging

        }, (error) => {
            //TODO: Display error
        });
    }

}

export default NavigationController;
