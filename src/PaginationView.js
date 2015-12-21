class PaginationView {

    constructor() {
        this.azLinks = {};
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

export default PaginationView;
