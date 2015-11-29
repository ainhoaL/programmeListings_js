const imageSize = '192x108';

class ListingView {

    displayListOfProgrammes(list) {
        //Show the listings and hide any error
        this.showListings(true);

        let listElement = document.getElementById("listing");

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
        let imageSrc, imageTemplate, template;
        //Make sure we have image information, otherwise don't display an image
        if (programme.image) {
            imageSrc = programme.image.replace('{recipe}', imageSize);
            imageTemplate = `<img src="${imageSrc}" />`;
        }
        template = `<span>${programme.title}</span> <span>${programme.smallSynopse}</span>`;
        return imageTemplate ? imageTemplate + template : template;
    }

    displayErrorMessage(errorObj) {
        this.showListings(false);

        let errorSpan = document.getElementById("errorDetails");
        errorSpan.textContent = errorObj.statusText;
    }

    //Centralized place to hide or show the listings / error message
    showListings(showListing) {
        let listElement = document.getElementById("listing");
        let errorElement = document.getElementById("errorMessage");

        if (showListing) {
            listElement.classList.remove('hideListing');
            errorElement.classList.add('hideError');
        } else {
            listElement.classList.add('hideListing');
            errorElement.classList.remove('hideError');
        }
    }

    createPaginationButtons(numberPages, currentPage, onClickFunc) {
        let paginationDiv = document.getElementById("pagination");
        //First clear any previous buttons
        this.clearNode(paginationDiv);

        //Create a button per page
        for (let i = 1; i <= numberPages; i ++) {
            let paginationButton = document.createElement('input');
            paginationButton.setAttribute('type', 'button');
            paginationButton.setAttribute('value', i);
            paginationButton.onclick = () => {
                onClickFunc(i);
            };
            if (i === currentPage) {
                paginationButton.setAttribute('disabled', true);
            }
            paginationDiv.appendChild(paginationButton);
        }
    }

    createAZNavigation() {
        let azNavigationDiv = document.getElementById("azNavigation");
        this.clearNode(azNavigationDiv);
        
        let lettersArray = 'abcdefghijklmnopqrstuvwxyz'.split('');

        lettersArray.forEach((letter) => {
            let letterLink = document.createElement('a');
            letterLink.setAttribute('id', "letter_" + letter);
            letterLink.setAttribute('href', '?letter=' + letter);
            letterLink.innerHTML = letter.toUpperCase();
            azNavigationDiv.appendChild(letterLink);
        });
    }

    clearNode(node) {
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
    }

}

export default ListingView;
