class PaginationView {

    constructor() {
        this.azLinks = {};
        this.currentLetter = 'a';
    }

    createPagination(numberPages, currentPage, onClickFunc) {
        this.hidePagination(false);

        let paginationList = document.getElementById('paginationButtons');
        //First clear any previous buttons
        this.clearNode(paginationList);

        this.createPaginationButtons(paginationList, numberPages, currentPage, onClickFunc); //Use this to create pagination via buttons
        //this.createPaginationLinks(paginationList, numberPages, currentPage); //Use this to create pagination via links
    }

    /**
     * Use this function to create pagination via buttons
     * @param {Object - DOM element} paginationList: DOM element for the pagination list
     * @param {Number} numberPages: number of pages user can navigate through
     * @param {Number} currentPage: page the user is seeing right now
     * @param {function} onClickFunc: function to call with the page number when the page button is clicked
    */
    createPaginationButtons(paginationList, numberPages, currentPage, onClickFunc) {
        //Create a button per page
        for (let i = 1; i <= numberPages; i++) {
            let element = document.createElement('li');
            let paginationButton = this.createPaginationButtonElement(i, onClickFunc)
            element.appendChild(paginationButton);

            if (i === currentPage) {
                paginationButton.setAttribute('disabled', true);
            }

            paginationList.appendChild(element);
        }
    }

    createPaginationButtonElement(value, onClickFunc) {
        let paginationButton = document.createElement('input');
        paginationButton.setAttribute('type', 'button');
        paginationButton.setAttribute('value', value);
        paginationButton.onclick = () => {
            onClickFunc(value);
        };

        return paginationButton;
    }

    /**
     * Use this function to create pagination via links
     * @param {Object - DOM element} paginationList: DOM element for the pagination list
     * @param {Number} numberPages: number of pages user can navigate through
     * @param {Number} currentPage: page the user is seeing right now
    */
    createPaginationLinks(paginationList, numberPages, currentPage) {
        //Create a link per page
        for (let i = 1; i <= numberPages; i++) {
            let element = document.createElement('li');
            let link = this.createPaginationLinkElement(i, '?letter=' + this.currentLetter + '&page=' + i);
            element.appendChild(link);
            paginationList.appendChild(element);
        }
    }

    createPaginationLinkElement(value, href = '') {
        let link = document.createElement('a');
        link.setAttribute('href', href);
        link.innerHTML = value;
        return link;
    }

    hidePagination(hide) {
        let paginationDiv = document.getElementById('pagination');
        if (hide) {
            paginationDiv.classList.add('hidePagination');
        } else {
            paginationDiv.classList.remove('hidePagination');
        }
    }

    //To create A-Z navigation via links
    //Same way as the pagination, it could be done via buttons
    createAZNavigation() {
        let azNavigationList = document.getElementById('azNavigation');
        this.clearNode(azNavigationList);

        let lettersArray = 'abcdefghijklmnopqrstuvwxyz'.split('');

        lettersArray.forEach((letter) => {
            let element = document.createElement('li');
            let link = this.createPaginationLinkElement(letter, '?letter=' + letter);
            this.azLinks[letter] = link;
            element.appendChild(link);
            azNavigationList.appendChild(element);
        });
    }

    setCurrentLetter(letter) {
        this.currentLetter = letter;
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
