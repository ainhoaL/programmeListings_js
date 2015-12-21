import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import PaginationView from '../bld/PaginationView';

var expect = chai.expect;
chai.should();
chai.use(sinonChai);

describe('PaginationView', () => {
    let paginationView, sandbox, programme;

    beforeEach(() => {
        sandbox = sinon.sandbox.create();
        paginationView = new PaginationView();

        //Restore programme values
        programme = {
            id: 'b00vk67s',
            title: 'ZingZillas',
            smallSynopse: 'A band of primate friends play music in their tropical island paradise and meet guests',
            image: 'http://ichef.bbci.co.uk/images/ic/{recipe}/p01m1v3s.jpg'
        };
    });

    afterEach(() => {
        sandbox.restore();
    });


    //TODO: enable when we have tests running on the browser
    describe.skip('Create pagination buttons', () => {
        it('adds the right number of buttons to the pagination', () => {
            let onclickFunc = () => {};
            paginationView.createPaginationButtons(5, 2, onclickFunc);

            //TODO: check the correct number of buttons has been created and #2 is disabled
        });

        it('displays the pagination div', () => {
            let onclickFunc = () => {};
            paginationView.createPaginationButtons(5, 2, onclickFunc);

            //TODO: check the pagination div has the right class
        });
    });

    //TODO: enable when we have tests running on the browser
    describe.skip('Create a to z navigation', () => {
        it('adds the 26 letters as links with the right href', () => {

            paginationView.createAZNavigation();

            //TODO: check the correct number of links has been created and with the correct href and text
        });
    });
});
