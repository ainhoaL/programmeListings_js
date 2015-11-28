const base_uri = 'https://ibl.api.bbci.co.uk';
const endpoint = '${base_uri}/ibl/v1/atoz/${letter}/programmes?page=${page}';

class ListingService {

    //parameters: letter, pageNumber (defaults to 1)
    //Returns a promise of the http request.
    getProgrammesForLetterAndPage(letter, pageNumber = 1) {
        //Make sure we send a valid page
        let page = pageNumber > 0 ? pageNumber : 1;

        let url = this._createUrl(letter, page);

        return this._makeRequest('GET', url);
    }

    //Wrapping the xhr to return a promise
    _makeRequest(method, url) {
        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest();
            xhr.open(method, url);
            xhr.onload = function () {
              if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response);
              } else {
                reject({
                  status: this.status,
                  statusText: xhr.statusText
                });
              }
            };
            xhr.onerror = function () {
              reject({
                status: this.status,
                statusText: xhr.statusText
              });
            };
            xhr.send();
        });
    }

    _createUrl(letter, page) {
        let url = endpoint.replace('${base_uri}', base_uri);
        url = url.replace('${letter}', letter);
        url = url.replace('${page}', page);
        return url;
    }

}

export default ListingService;
