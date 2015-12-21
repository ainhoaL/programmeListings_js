const imageSize = '192x108';

class ListingView {

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
        let template = '<div class="programme">';
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

    clearNode(node) {
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
    }

}

export default ListingView;
