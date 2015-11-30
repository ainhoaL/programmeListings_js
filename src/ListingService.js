const baseUri = 'https://ibl.api.bbci.co.uk';
const endpoint = '${base_uri}/ibl/v1/atoz/${letter}/programmes?page=${page}';

import * as programmeUnmarshaller from './programmeUnmarshaller';

class ListingService {

    //parameters: letter, pageNumber (defaults to 1)
    //Returns a promise of the http request.
    getProgrammesForLetterAndPage(letter, pageNumber = 1) {
        //Make sure we send a valid page
        let page = pageNumber > 0 ? pageNumber : 1;

        let url = this._createUrl(letter, page);

        return this._makeRequest('GET', url).then((data) => {
            return programmeUnmarshaller.unmarshallData(data);
        });
    }

    //Wrapping the xhr to return a promise
    //This function assumes the response will be json
    _makeRequest(method, url) {
        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest();
            xhr.open(method, url);
            xhr.onload = function () {
                if (this.status >= 200 && this.status < 300) {
                    //resolve with json parsed object instead of string
                    resolve(JSON.parse(xhr.response));
                } else {
                    let response = JSON.parse(xhr.response);
                    reject({
                        status: this.status,
                        statusText: response.error ? response.error.details : xhr.statusText
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
        let url = endpoint.replace('${base_uri}', baseUri);
        url = url.replace('${letter}', letter);
        url = url.replace('${page}', page);
        return url;
    }

}

export default ListingService;
