//Only copy across the fields we need to use
function unmarshallProgramme(programme) {
    return {
        id: programme.id,
        title: programme.title,
        image: programme.images ? programme.images.standard : null,
        smallSynopse: programme.synopses ? programme.synopses.small : null
    };
}

export function unmarshallData(jsonData) {
    let listOfProgrammes = {};
    if (jsonData.atoz_programmes) {
        let programmesInfo = jsonData.atoz_programmes;
        listOfProgrammes.character = programmesInfo.character;
        listOfProgrammes.count = programmesInfo.count;
        listOfProgrammes.page = programmesInfo.page;
        listOfProgrammes.per_page = programmesInfo.per_page;

        listOfProgrammes.elements = programmesInfo.elements.map(unmarshallProgramme);
    }

    return listOfProgrammes;
}
