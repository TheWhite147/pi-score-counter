if (typeof Season === "undefined") { Season = {}; }
if (typeof Season.IsSeasonActive === "undefined") { Season.IsSeasonActive = {}; }
if (typeof Season.StartDate === "undefined") { Season.StartDate = {}; }
if (typeof Season.EndDate === "undefined") { Season.EndDate = {}; }
if (typeof Season.Name === "undefined") { Season.Name = {}; }
if (typeof Season.Message === "undefined") { Season.Message = {}; }
if (typeof Season.ActiveSeason === "undefined") { Season.ActiveSeason = {}; }

(function () {

Season.IsSeasonActive = true; // Change to enable season features

// INFO: Months use 0-index (eg.: April = 3)

// Janvier = 0
// Février = 1
// Mars = 2
// Avril = 3
// Mai = 4
// Juin = 5
// Juillet = 6
// Août = 7
// Septembre = 8
// Octobre = 9
// Novembre = 10
// Décembre = 11

var _lstSeasons = [];
createSeasons();

Season.ActiveSeason = getActiveSeason();

Season.StartDate = Season.ActiveSeason.startDate;
Season.EndDate = Season.ActiveSeason.endDate;
Season.Name = Season.ActiveSeason.name;
Season.Message = Season.ActiveSeason.message;

function createSeasons() {

    _lstSeasons.push({
            startDate: new Date(2020, 10, 1).getTime() / 1000,
            endDate: new Date(2021, 0, 1).getTime() / 1000,
            name: "Saison 17 (novembre-décembre 2020)",
            message: "La saison 17 (novembre-décembre 2020) est en cours"
    });

    _lstSeasons.push({
            startDate: new Date(2020, 8, 1).getTime() / 1000,
            endDate: new Date(2020, 10, 1).getTime() / 1000,
            name: "Saison 16 (septembre-octobre 2020)",
            message: "La saison 16 (septembre-octobre 2020) est en cours"
    });

    _lstSeasons.push({
            startDate: new Date(2020, 6, 1).getTime() / 1000,
            endDate: new Date(2020, 8, 1).getTime() / 1000,
            name: "Saison 15 (juillet-août 2020)",
            message: "La saison 15 (juillet-août 2020) est en cours"
    });

    _lstSeasons.push({
            startDate: new Date(2020, 4, 1).getTime() / 1000,
            endDate: new Date(2020, 6, 1).getTime() / 1000,
            name: "Saison 14 (mai-juin 2020)",
            message: "La saison 14 (mai-juin 2020) est en cours"
    });

    _lstSeasons.push({
            startDate: new Date(2020, 2, 1).getTime() / 1000,
            endDate: new Date(2020, 4, 1).getTime() / 1000,
            name: "Saison 13 (mars-avril 2020)",
            message: "La saison 13 (mars-avril 2020) est en cours"
    });

    _lstSeasons.push({
            startDate: new Date(2020, 0, 1).getTime() / 1000,
            endDate: new Date(2020, 2, 1).getTime() / 1000,
            name: "Saison 12 (janvier-février 2020)",
            message: "La saison 12 (janvier-février 2020) est en cours"
    });  

    ////////////////////////////////////////////////////////////////////////////////////////

    _lstSeasons.push({
            startDate: new Date(2019, 10, 1).getTime() / 1000,
            endDate: new Date(2020, 0, 1).getTime() / 1000,
            name: "Saison 11 (novembre-décembre 2019)",
            message: "La saison 11 (novembre-décembre 2019) est en cours"
    });

    _lstSeasons.push({
            startDate: new Date(2019, 8, 1).getTime() / 1000,
            endDate: new Date(2019, 10, 1).getTime() / 1000,
            name: "Saison 10 (septembre-octobre 2019)",
            message: "La saison 10 (septembre-octobre 2019) est en cours"
    });

    _lstSeasons.push({
            startDate: new Date(2019, 6, 1).getTime() / 1000,
            endDate: new Date(2019, 8, 1).getTime() / 1000,
            name: "Saison 9 (juillet-août 2019)",
            message: "La saison 9 (juillet-août 2019) est en cours"
    });

    _lstSeasons.push({
            startDate: new Date(2019, 4, 1).getTime() / 1000,
            endDate: new Date(2019, 6, 1).getTime() / 1000,
            name: "Saison 8 (mai-juin 2019)",
            message: "La saison 8 (mai-juin 2019) est en cours"
    });

    _lstSeasons.push({
            startDate: new Date(2019, 2, 1).getTime() / 1000,
            endDate: new Date(2019, 4, 1).getTime() / 1000,
            name: "Saison 7 (mars-avril 2019)",
            message: "La saison 7 (mars-avril 2019) est en cours"
    });

    _lstSeasons.push({
            startDate: new Date(2019, 0, 1).getTime() / 1000,
            endDate: new Date(2019, 2, 1).getTime() / 1000,
            name: "Saison 6 (janvier-février 2019)",
            message: "La saison 6 (janvier-février 2019) est en cours"
    });    

    ////////////////////////////////////////////////////////////////////////////////////////

    _lstSeasons.push({
            startDate: new Date(2018, 10, 1).getTime() / 1000,
            endDate: new Date(2019, 0, 1).getTime() / 1000,
            name: "Saison 5 (novembre-décembre 2018)",
            message: "La saison 5 (novembre-décembre 2018) est en cours"
    });

    _lstSeasons.push({
        startDate: new Date(2018, 8, 1).getTime() / 1000,
        endDate: new Date(2018, 10, 1).getTime() / 1000,
        name: "Saison 4 (septembre-octobre 2018)",
        message: "La saison 4 (septembre-octobre 2018) est en cours"
    });

    _lstSeasons.push({
        startDate: new Date(2018, 6, 1).getTime() / 1000,
        endDate: new Date(2018, 8, 1).getTime() / 1000,
        name: "Saison 3 (juillet-août 2018)",
        message: "La saison 3 (juillet-août 2018) est en cours"
    });
    
    _lstSeasons.push({
        startDate: new Date(2018, 4, 14).getTime() / 1000,
        endDate: new Date(2018, 6, 1).getTime() / 1000,
        name: "Saison 2 (mai-juin 2018)",
        message: "La saison 2 (mai-juin 2018) est en cours"
    });
    
    _lstSeasons.push({
        startDate: new Date(2018, 3, 1).getTime() / 1000,
        endDate: new Date(2018, 4, 1).getTime() / 1000,
        name: "Saison 1 (avril 2018)",
        message: "La saison 1 (avril 2018) est en cours"
    });
}
    
function getActiveSeason() {

    var now = new Date().getTime() / 1000;

    for (var i = 0; i < _lstSeasons.length; i++) {
        if (now >= _lstSeasons[i].startDate && now < _lstSeasons[i].endDate)
            return _lstSeasons[i];
    }

    return {};
}


})();