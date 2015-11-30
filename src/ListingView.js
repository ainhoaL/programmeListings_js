const imageSize = '192x108';

class ListingView {

    constructor() {
        this.azLinks = {};
    }

    displayListOfProgrammes(list) {
        //Show the listings and hide any error
        this.showListings(true);

        let listElement = document.getElementById('listing');

        //First clear the list from old programmes
        this.clearNode(listElement);

        list.forEach((programme) => {
            //Create the programme DOM li element
            let programmeElement = this.createProgrammeEntry(programme);
            //Add li element to list
            listElement.appendChild(programmeElement);
        });
    }

    createProgrammeEntry(programme) {
        let element = document.createElement('li');
        element.innerHTML = this._templateProgramme(programme);

        return element;
    }

    _templateProgramme(programme) {
        let imageSrc, imageTemplate;
        let template = '<div class="programme">'
        //Make sure we have image information, otherwise don't display an image
        if (programme.image) {
            imageSrc = programme.image.replace('{recipe}', imageSize);
            imageTemplate = `<img src="${imageSrc}" />`;
        }
        template += imageTemplate ? imageTemplate : '';
        template += `<div class="programmeTitle"><strong>${programme.title}</strong></div> <div class="programmeSynopse">${programme.smallSynopse}</div></div>`;
        return template;
    }

    displayErrorMessage(errorObj) {
        this.showListings(false);

        let errorSpan = document.getElementById('errorDetails');
        errorSpan.textContent = errorObj.statusText;
    }

    //Centralized place to hide or show the listings / error message
    showListings(showListing) {
        let listElement = document.getElementById('listing');
        let errorElement = document.getElementById('errorMessage');

        if (showListing) {
            listElement.classList.remove('hideListing');
            errorElement.classList.add('hideError');
        } else {
            listElement.classList.add('hideListing');
            errorElement.classList.remove('hideError');
        }
    }

    createPaginationButtons(numberPages, currentPage, onClickFunc) {
        this.hidePagination(false);

        let paginationList = document.getElementById('paginationButtons');
        //First clear any previous buttons
        this.clearNode(paginationList);

        //Create a button per page
        for (let i = 1; i <= numberPages; i++) {
            let element = document.createElement('li');
            let paginationButton = document.createElement('input');
            paginationButton.setAttribute('type', 'button');
            paginationButton.setAttribute('value', i);
            paginationButton.onclick = () => {
                onClickFunc(i);
            };
            if (i === currentPage) {
                paginationButton.setAttribute('disabled', true);
            }
            element.appendChild(paginationButton);
            paginationList.appendChild(element);
        }
    }

    hidePagination(hide) {
        let paginationDiv = document.getElementById('pagination');
        if (hide) {
            paginationDiv.classList.add('hidePagination');
        } else {
            paginationDiv.classList.remove('hidePagination');
        }
    }

    createAZNavigation() {
        let azNavigationList = document.getElementById('azNavigation');
        this.clearNode(azNavigationList);

        let lettersArray = 'abcdefghijklmnopqrstuvwxyz'.split('');

        lettersArray.forEach((letter) => {
            let element = document.createElement('li');

            let letterLink = document.createElement('a');
            letterLink.setAttribute('href', '?letter=' + letter);
            letterLink.innerHTML = letter.toUpperCase();
            //store the links so we can access them later
            this.azLinks[letter] = letterLink;

            element.appendChild(letterLink);
            azNavigationList.appendChild(element);
        });
    }

    setCurrentLetter(letter) {
        let letterLink = this.azLinks[letter];
        if (letterLink) {
            letterLink.classList.add('selected');
        }
    }

    clearNode(node) {
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
    }

}

export default ListingView;
