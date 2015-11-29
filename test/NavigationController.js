import chai from 'chai';
import sinon from 'sinon';

import NavigationController from '../bld/NavigationController';

var expect = chai.expect;

describe('NavigationController', () => {
    let controller, serviceGetProgrammes, serviceCallPromise, displayList, displayError;

    let testData = {
        count: 1,
        character: 'z',
        page: 1,
        per_page: 20,
        elements: [{
            id: 'b00vk67s',
            title: 'ZingZillas',
            smallSynopse: null,
            image: undefined
        }]
    };

    //Stub out the service call so we control the response and can mock fail / success scenarios
    let stubServiceCall = () => {
        serviceCallPromise = Promise.defer();
        return serviceCallPromise.promise;
    }

    beforeEach(() => {
        controller = new NavigationController();
        serviceGetProgrammes = sinon.stub(controller.service, 'getProgrammesForLetterAndPage', stubServiceCall);
        displayList = sinon.stub(controller.view, 'displayListOfProgrammes');
        displayError = sinon.stub(controller.view, 'displayErrorMessage');

    });

    afterEach(() => {
        controller.service.getProgrammesForLetterAndPage.restore();
        controller.view.displayListOfProgrammes.restore();
    });

    describe('Given a letter', () => {
        it('loads the programmes for that letter', () => {

            controller.loadLetterAndPage('z');
            expect(serviceGetProgrammes.calledWith, ['z', 1]);
            serviceCallPromise.resolve(testData);
            expect(displayList.calledWith, testData.elements);

        });
    });

    describe('Given a letter and a page', () => {
        it('loads the programmes for that letter and page', () => {

            controller.loadLetterAndPage('z', 1);
            serviceCallPromise.resolve(testData);
            expect(displayList.calledWith, testData.elements);

        });
    });

    describe('Not giving a letter', () => {
        it('loads the programmes for "a"', () => {

            controller.loadLetterAndPage();
            expect(serviceGetProgrammes.calledWith, ['a', 1]);

        });
    });

    describe('Loading programmes fails', () => {
        it('shows the error message', () => {

            controller.loadLetterAndPage();
            serviceCallPromise.reject({statusText: 'Bad Request'});
            expect(displayError.calledWith, {statusText: 'Bad Request'});

        });
    });
});
