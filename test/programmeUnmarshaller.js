import chai from 'chai';

import * as programmeUnmarshaller from '../bld/programmeUnmarshaller';

var expect = chai.expect;

describe('programmeUnmarshaller', () => {
    let baseJsonData, sampleProgramme;

    beforeEach(() => {
        //Restore the objects to their original values
        baseJsonData = {
          'atoz_programmes': {
            character: 'z',
            count: 1,
            page: 1,
            per_page: 20,
            elements: []}
        };

        sampleProgramme = {
            id: 'b00vk67s',
            tleo_type: 'brand',
            type: 'programme_large',
            title: 'ZingZillas',
            synopses: {
                small: 'A band of primate friends play music in their tropical island paradise and meet guests',
                medium: 'A band of primate friends play music in their tropical island paradise and meet different musical guests'
            },
            images: {
                standard: 'http://ichef.bbci.co.uk/images/ic/{recipe}/p01m1v3s.jpg',
                type: 'image'
            }
        };
    });

    describe('for an empty JSON object', () => {
        it('returns empty object', () => {
            expect(programmeUnmarshaller.unmarshallData({})).to.deep.equal({});
        });
    });

    describe('for an object with no programmes', () => {
        it('returns an object with no programmes', () => {
            //we just expect the same data inside atoz_programmes
            let expectedData = baseJsonData.atoz_programmes;

            expect(programmeUnmarshaller.unmarshallData(baseJsonData)).to.deep.equal(expectedData);
        });
    });

    describe('for an object with programmes', () => {
        it('returns an object with simplified list of programmes', () => {

            baseJsonData.atoz_programmes.elements[0] = sampleProgramme;

            let expectedData = {
                count: 1,
                character: 'z',
                page: 1,
                per_page: 20
            };
            expectedData.elements = [{
                id: 'b00vk67s',
                title: 'ZingZillas',
                smallSynopse: 'A band of primate friends play music in their tropical island paradise and meet guests',
                image: 'http://ichef.bbci.co.uk/images/ic/{recipe}/p01m1v3s.jpg'
            }]

            expect(programmeUnmarshaller.unmarshallData(baseJsonData)).to.deep.equal(expectedData);
        });
    });

    describe('for an object with programmes with missing fields', () => {
        it('returns an object with simplified list of programmes', () => {

            sampleProgramme.images = {};
            sampleProgramme.synopses = null;

            baseJsonData.atoz_programmes.elements[0] = sampleProgramme;

            let expectedData = {
                count: 1,
                character: 'z',
                page: 1,
                per_page: 20
            };
            expectedData.elements = [{
                id: 'b00vk67s',
                title: 'ZingZillas',
                smallSynopse: null,
                image: undefined
            }];

            expect(programmeUnmarshaller.unmarshallData(baseJsonData)).to.deep.equal(expectedData);
        });
    });
});
