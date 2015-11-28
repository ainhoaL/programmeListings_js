import chai from 'chai';
import sinon from 'sinon';

import ListingService from '../bld/ListingService';

const baseUrl = 'https://ibl.api.bbci.co.uk/ibl/v1/atoz';

describe('ListingService', () => {
    let listingService, sandbox, fakeServer;

    let expect = chai.expect;

    beforeEach(() => {
        sandbox = sinon.sandbox.create();
        listingService = new ListingService();
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('#getProgrammesForLetterAndPage', () => {

        describe('If no page number is sent', () => {
            it('defaults to page 1', () => {
                sandbox.spy(listingService, '_createUrl');

                listingService.getProgrammesForLetterAndPage('x');

                expect(listingService._createUrl.calledWith, ['x', 1]);
            });
        });

        describe('If page number is 0', () => {
            it('defaults to page 1', () => {
                sandbox.spy(listingService, '_createUrl');

                listingService.getProgrammesForLetterAndPage('x', 0);

                expect(listingService._createUrl.calledWith, ['x', 1]);
            });
        });
    });

    describe('#createUrl', () => {
        it('creates correct url well formed', () => {

            let newUrl = listingService._createUrl('x', 1);

            let expectedUrl = baseUrl + '/x/programmes?page=1';

            expect(newUrl).to.equal(expectedUrl);
        });
    });
});
