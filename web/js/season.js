if (typeof Season === "undefined") { Season = {}; }
if (typeof Season.IsSeasonActive === "undefined") { Season.IsSeasonActive = {}; }
if (typeof Season.StartDate === "undefined") { Season.StartDate = {}; }
if (typeof Season.EndDate === "undefined") { Season.EndDate = {}; }
if (typeof Season.Name === "undefined") { Season.Name = {}; }
if (typeof Season.Message === "undefined") { Season.Message = {}; }

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

Season.StartDate = new Date(2018, 6, 1).getTime() / 1000; // Inclusively
Season.EndDate = new Date(2018, 8, 1).getTime() / 1000; // Exclusively
Season.Name = "Saison 3 (juillet-août 2018)";
Season.Message = "La saison 3 (juillet-août 2018) est en cours!";

var _lstSeasons = [];

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

function getActiveSeason() {
    if (_lstSeasons.length == 0) {
        return {};
    }

    var now = new Date().getTime() / 1000;
    var activeSeason = _lstSeasons.filter(function (s) { return now >= s.startDate && now < s.endDate });

    if (activeSeason.length)
}


})();