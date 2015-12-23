import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import NavigationController from '../bld/NavigationController';

var expect = chai.expect;
chai.should();
chai.use(sinonChai);

describe('NavigationController', () => {
    let controller, sandbox;

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
        sandbox = sinon.sandbox.create();
        controller = new NavigationController();
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('Loading a letter and page', () => {
        let serviceCallPromise, serviceStub, viewStub;
        beforeEach(() => {
            viewStub = sandbox.stub(controller.view, 'displayListOfProgrammes');
            serviceCallPromise = Promise.defer();
            serviceStub = sandbox.stub(controller.service, "getProgrammesForLetterAndPage");
            serviceStub.returns(serviceCallPromise.promise);
        });

        it('loads the programmes for that letter if only given a letter', () => {
            controller.loadLetterAndPage('z');

            serviceCallPromise.resolve(testData);
            expect(serviceStub).to.have.been.calledWith('z', 1);

            //Check when the promise is resolved, otherwise we check too soon!
            serviceCallPromise.promise.then(() => {
                expect(viewStub).to.have.been.calledWith(testData.elements);
            });
        });

        it('loads the programmes for that letter and page if given both', () => {

            controller.loadLetterAndPage('z', 1);
            serviceCallPromise.resolve(testData);

            //Check when the promise is resolved, otherwise we check too soon!
            serviceCallPromise.promise.then(() => {
                expect(viewStub).to.have.been.calledWith(testData.elements);
            });

        });

        it('loads the programmes for "a" if a letter is not given', () => {

            controller.loadLetterAndPage();
            expect(serviceStub).to.have.been.calledWith('a', 1);
        });
    });

    describe('Loading programmes fails', () => {
        let serviceCallPromise, serviceStub, errorStub;
        beforeEach(() => {
            errorStub = sandbox.stub(controller.view, 'displayErrorMessage');
            serviceCallPromise = Promise.defer();
            serviceStub = sandbox.stub(controller.service, "getProgrammesForLetterAndPage");
            serviceStub.returns(serviceCallPromise.promise);
        });

        it('shows the error message', () => {

            controller.loadLetterAndPage();
            serviceCallPromise.reject(error);

            //Check when the promise is rejected, otherwise we check too soon!
            serviceCallPromise.promise.then(() => {}, () => {
                expect(errorStub).to.have.been.calledWith({statusText: 'Bad Request'});
            });
        });
    });

    describe('Pagination', () => {
        let serviceCallPromise, serviceStub, paginationStub;
        beforeEach(() => {
            paginationStub = sandbox.stub(controller.pagination, 'createPagination');
            serviceCallPromise = Promise.defer();
            serviceStub = sandbox.stub(controller.service, "getProgrammesForLetterAndPage");
            serviceStub.returns(serviceCallPromise.promise);
        });

        it('is not created if there is only 1 page', () => {
            controller.loadLetterAndPage('z');
            serviceCallPromise.resolve(testData);

            serviceCallPromise.promise.then(() => {
                expect(paginationStub).to.not.have.been.called();
            });
        });

        it('is created if there is more than 1 page', () => {
            controller.loadLetterAndPage('a', 4);
            serviceCallPromise.resolve(multiplePagesData);

            serviceCallPromise.promise.then(() => {
                expect(paginationStub).to.have.been.calledWith('a', 5, 4);
            });
        });

        it('passes the correct arguments to the view to create the buttons', () => {
            controller.createPagination('a', 5, 2);
            expect(paginationStub).to.have.been.calledWith(5, 2);
        });
    });
});
