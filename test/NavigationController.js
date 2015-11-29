import chai from 'chai';
import sinon from 'sinon';

import NavigationController from '../bld/NavigationController';

var expect = chai.expect;

describe('NavigationController', () => {
    let controller;

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

    let multiplePagesData = {
        count: 61,
        character: 'a',
        page: 4,
        per_page: 20,
        elements: [{
            id: 'b00vk67s',
            title: 'ZingZillas',
            smallSynopse: null,
            image: undefined
        }]
    };

    let error = {statusText: 'Bad Request'};

    beforeEach(() => {
        controller = new NavigationController();
    });

    describe.skip('Given a letter', () => {
        it('loads the programmes for that letter', () => {
            let serviceCallPromise = new Promise((resolve, reject) => {resolve(testData);});
            sinon.stub(controller.service, "getProgrammesForLetterAndPage").returns(serviceCallPromise);
            let displayProg = sinon.stub(controller.view, 'displayListOfProgrammes');

            controller.loadLetterAndPage('z');
            expect(controller.service.getProgrammesForLetterAndPage.calledWith('z', 1)).to.be.true;
            expect(displayProg.calledWith(testData.elements)).to.be.true;

        });
    });

    describe.skip('Given a letter and a page', () => {
        it('loads the programmes for that letter and page', () => {
            let serviceCallPromise = new Promise((resolve, reject) => {resolve(testData);});
            sinon.stub(controller.service, "getProgrammesForLetterAndPage").returns(serviceCallPromise);
            sinon.stub(controller.view, 'displayListOfProgrammes');

            controller.loadLetterAndPage('z', 1);
            expect(controller.view.displayListOfProgrammes.calledWith('z', 1)).to.be.true();
        });
    });

    describe.skip('Not giving a letter', () => {
        it('loads the programmes for "a"', () => {

            controller.loadLetterAndPage();
            expect(serviceGetProgrammes.calledWith('a', 1)).to.be.true;
        });
    });

    describe.skip('Loading programmes fails', () => {
        it('shows the error message', () => {
            let serviceCallPromise = new Promise((resolve, reject) => {reject(error);});
            sinon.stub(controller.service, "getProgrammesForLetterAndPage").returns(serviceCallPromise);
            sinon.stub(controller.view, 'displayErrorMessage');

            controller.loadLetterAndPage();
            expect(controller.view.displayErrorMessage.calledWith({statusText: 'Bad Request'})).to.be.true;

        });
    });
});
