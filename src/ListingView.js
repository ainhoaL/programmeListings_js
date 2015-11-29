const imageSize = '192x108';

class ListingView {

    displayListOfProgrammes(list) {
        this.showListings(true);
        let listElement = document.getElementById("listing");

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

}

export default ListingView;
