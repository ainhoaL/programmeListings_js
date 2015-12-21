import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import ListingView from '../bld/ListingView';

var expect = chai.expect;
chai.should();
chai.use(sinonChai);

describe('ListingView', () => {
    let listingView, sandbox, programme;

    beforeEach(() => {
        sandbox = sinon.sandbox.create();
        listingView = new ListingView();

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

    //TODO: need to change to running tests on the browser so tests that handle
    //document can work!!!
    describe.skip('If list of programmes is empty', () => {
        it('displays nothing', () => {
            sandbox.spy(listingView, 'createProgrammeEntry');

            listingView.displayListOfProgrammes([]);

            //Check the functiont that creates the programmes html is not called
            expect(listingView.createProgrammeEntry).to.not.have.been.called();
        });
    });

    describe.skip('If there is a list of programmes', () => {
        it('adds the programmes to the page', () => {
            listingView.displayListOfProgrammes([programme]);

            //TODO: check the right number of items have been added to the list
        });

        it('hides the error messages', () => {
            listingView.displayListOfProgrammes([programme]);
            expect(listingView.showListings).to.have.been.calledWith(true);

            //TODO: check the elements have the right classes applied
        });
    });

    describe('template creation', () => {
        it('creates valid html', () => {
            let expectedTemplate = '<div class="programme"><img src="http://ichef.bbci.co.uk/images/ic/192x108/p01m1v3s.jpg" /><div class="programmeTitle"><strong>' +
            'ZingZillas</strong></div> <div class="programmeSynopse">A band of primate friends play music in their tropical island paradise and meet guests</div></div>';

            let template = listingView._templateProgramme(programme);

            expect(template).to.equal(expectedTemplate);
        });

        it('skips image if no image src', () => {
            let expectedTemplate = '<div class="programme"><div class="programmeTitle"><strong>' +
            'ZingZillas</strong></div> <div class="programmeSynopse">A band of primate friends play music in their tropical island paradise and meet guests</div></div>';

            programme.image = null;

            let template = listingView._templateProgramme(programme);

            expect(template).to.equal(expectedTemplate);
        });
    });

    //TODO: enable when we have tests running on the browser
    describe.skip('Showing an error', () => {
        it('hides the programmes listing', () => {
            sandbox.spy(listingView, 'showListings');

            listingView.displayErrorMessage({statusText: 'Bad Request'});

            expect(listingView.showListings).to.not.have.been.called();

            //TODO: check the elements have the right classes applied
        });

        it('adds the message text to the error details', () => {
            listingView.displayErrorMessage({statusText: 'Bad Request'});

            //TODO: check the errorDetails element has the right text inside
        });
    });

});
