import ListingService from './ListingService';
import ListingView from './ListingView';

class NavigationController {

    constructor() {
        this.service = new ListingService();
        this.view = new ListingView();
    }

    loadLetterAndPage(letter, page = 1) {
        //Keep track of which letter we are displaying
        letter = letter || 'a'; //Just in case somehow we are loading with a null letter

        this.view.setCurrentLetter(letter);

        this.service.getProgrammesForLetterAndPage(letter, page).then((data) => {
            this.view.displayListOfProgrammes(data.elements);

            let numberPages = Math.ceil(data.count / data.per_page);
            if (numberPages > 1) {
                this.createPagination(letter, numberPages, data.page);
            }

        }, (error) => {
            this.view.displayErrorMessage(error);
        });
    }

    createPagination(letter, numberPages, currentPage) {
        //Keep all html rendering in the View layer, so we need to tell the View to create the pagination

        //Create the function that will be called when a pagination button is clicked
        let onClickFunc = this.loadLetterAndPage.bind(this, letter);

        this.view.createPaginationButtons(numberPages, currentPage, onClickFunc);
    }

    //Just to expose the creation of the A to Z Navigation
    //Don't want other modules to have to handle the view for themselves
    createAZNavigation() {
        this.view.createAZNavigation();
    }
}

export default NavigationController;
