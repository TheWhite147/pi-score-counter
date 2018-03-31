if (typeof Season === "undefined") { Season = {}; }
if (typeof Season.IsSeasonActive === "undefined") { Season.IsSeasonActive = {}; }
if (typeof Season.StartDate === "undefined") { Season.StartDate = {}; }
if (typeof Season.EndDate === "undefined") { Season.EndDate = {}; }
if (typeof Season.Name === "undefined") { Season.Name = {}; }
if (typeof Season.Message === "undefined") { Season.Message = {}; }

(function () {

Season.IsSeasonActive = true; // Change to enable season features

Season.StartDate = new Date(2018, 3, 1).getTime() / 1000; // April 2018 season - Inclusively
Season.EndDate = new Date(2018, 4, 1).getTime() / 1000; // Exclusively
Season.Name = "Saison 1 (avril 2018)";
Season.Message = "La saison 1 (avril 2018) est en cours!";

})();