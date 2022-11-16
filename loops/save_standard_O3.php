
<!DOCTYPE html
<html>
<head>
<meta charset="UTF-8">
<title>CMAQ</title>
<link rel="stylesheet" type="text/css" href="style.css">
<script src="jquery-3.1.1.min.js"></script>
<script type="text/javascript" src="functions.js"></script>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>

<body>



<!-- Head element -->
<div class="page-top">
	<span><a style="color:#ffffff">COMMUNITY MULTISCALE AIR QUALITY (CMAQ) MODELING SYSTEM</a></span>
</div>

<!-- Top menu -->
<div class="page-menu"><div class="table">
	
        <div class="element">
                <span class="bold">Year:</span>
                <select id="annual" onchange="changeAnnual(this.value);"></select>
        </div> 

        <div class="element">
                <span class="bold">Month:</span>
                <select id="season" onchange="changeSeason(this.value)"></select>
        </div>
        <div class="element">
                <span class="bold">Region:</span>
                <select id="domain" onchange="changeDomain(this.value)"></select>
        </div>
        <div class="element">
                <span class="bold">Statistic:</span>
                <select id="variable" onchange="changeVariable(this.value)"></select>
        </div>
        <div class="element">
                <span class="bold">Hourly Average:</span>
                <select id="level" onchange="changeLevel(this.value)"></select>
        </div>
        <div class="element">
                <span class="bold">Forecast Hour:</span>
                <select id="period" onchange="changePeriod(this.value)"></select>
        </div>

<!-- /Top menu -->
</div></div>

<!-- Middle menu -->
<div class="page-middle" id="page-middle">
Left/Right arrow keys = Change statistic | Up/Down arrow keys = Change hourly average
<br>For additional information on this image, <button class="infobutton" id="myBtn">click here</button>
<div id="myModal" class="modal">
  <div class="modal-content" style="font-size:130%;">
    <span class="close">&times;</span>
    Additional Image Information
    <embed width=100% height=90% src="https://www.emc.ncep.noaa.gov/mmb/ylin/pcpverif/scores/docs/QandA.html#SCORETYPES">
  </div>
</div>
<!-- /Middle menu -->
</div>

<div id="loading"><img style="width:100%" src="loading.png"></div>

<!-- Image -->
<div id="page-map">
	<image name="map" style="width:100%">
</div>

<!-- /Footer -->
<div class="page-footer">
        <span></div>


<script type="text/javascript">
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
//====================================================================================================
//User-defined variables
//====================================================================================================

//Global variables
var minFrame = 0; //Minimum frame for every variable
var maxFrame = 26; //Maximum frame for every variable
var incrementFrame = 1; //Increment for every frame

var startFrame = 0; //Starting frame

var cycle = 2018100600;

/*
When constructing the URL below, DDD = domain, VVV = variable, LLL = level, SSS = season, Y = frame number.
For X and Y, labeling one X or Y represents an integer (e.g. 0, 10, 20). Multiple of these represent a string
format (e.g. XX = 00, 06, 12 --- XXX = 000, 006, 012).
*/

/* var url = "https://www.emc.ncep.noaa.gov/mmb/aq/fvs/SSSYY/OZON-LLLSFC_VVVPPP_AQMDDD.gif"; */
/* var url = "https://www.emc.ncep.noaa.gov/mmb/hchuang/ftp/CONUS_CMAQ_PM25_TIME_SERIES_DAY2_12Z_202210.png"; */
var url = "https://www.emc.ncep.noaa.gov/mmb/hchuang/ftp/DDD_CMAQ_LLL_VVVPPP_YYSSS.png";
// var url = "https://www.emc.ncep.noaa.gov/gmb/yluo/test/ECMWF/DDDzLLL_VVV_SSS.gif";
/* var url = "https://www.emc.ncep.noaa.gov/mmb/gmanikin/fv3gfs/20180301/fv3_DDD_VVV_2018030100_0Y.png"; */
/*  var url = "https://www.emc.ncep.noaa.gov/users/Alicia.Bentley/fv3gefs/2018030100/images/DDD/mean_diff/VVV_Y.png"; */

//====================================================================================================
//Add variables & domains
//====================================================================================================

var variables = [];
var domains = [];
var levels = [];
var seasons = [];
var maptypes = [];
var periods = [];
var annuals = [];
//var validtimes = []; 


variables.push({
        displayName: "Bias",
	/* name: "bias", */
        displayName: "ME",
});
variables.push({
        displayName: "RMSE",
	/* name: "rmse", */
        displayName: "RMSE",
});
variables.push({
        /* displayName: "Colleration", */
	/* displayName: "Taylor's Diagram", */
	/* name: "corr", */
        displayName: "CONC Time Series",
        name: "TIME_",
});
variables.push({
	displayName: "Taylor's Diagram",
        name: "TAY",
});






/* domains.push({
        displayName: "Multi-Region",
        name: "ALL",
}); */

domains.push({
        displayName: "CONUS",
	/* name: "buk_conus", */
        name: "CONUS",
});
domains.push({
        displayName: "Eastern U.S.",
	/* name: "buk_conus_e", */
        name: "CONUS_East",
});
domains.push({
        displayName: "Central U.S.",
        name: "CONUS_South",
	/* name: "buk_conus_c", */
});
domains.push({
        displayName: "Southern U.S.",
        name: "CONUS_South",
	/* name: "buk_conus_s", */
});
domains.push({
        displayName: "Western U.S.",
	/* name: "buk_conus_w", */
        name: "CONUS_West",
});

/* domains.push({
        displayName: "Northeast/NorthAtlantic",
        name: "buk_ne",
});
domains.push({
        displayName: "Southeast",
        name: "buk_se",
});
domains.push({
        displayName: "Southwest",
        name: "buk_sw",
});
domains.push({
        displayName: "Pacific Northwest",
        name: "buk_npw",
});
domains.push({
        displayName: "Pacific Southwest",
        name: "buk_nsw",
});
domains.push({
        displayName: "Midwest U.S.",
        name: "MDW",
});
domains.push({
        displayName: "Lower MS Valley",
        name: "LMV",
}); */






periods.push({
        displayName: "Mean vs Lead Time",
	/* name: "fhrmean_f024", */
        name: "DL_12Z",
});
periods.push({
        displayName: "Time Series - Day 1 FCST",
        name: "SERIES_DAY1_12Z",
	/* name: "timeseries_f024", */
});
periods.push({
        displayName: "Time Series - Day 2 FCST ",
        name: "SERIES_DAY2_12Z",
        /* name: "timeseries_f048", */
});
periods.push({
        displayName: "Time Series - Day 3 FCST ",
        /* name: "timeseries_f072", */
        name: "SERIES_DAY3_12Z",
});
periods.push({
        displayName: "Taylor - Day 2 FCST ",
        name: "OR_DAY2_12Z",
});
periods.push({
        displayName: "Taylor - Day 2 FCST ",
        name: "OR_DAY2_12Z",
});
periods.push({
        displayName: "Taylor - Day 2 FCST ",
        name: "OR_DAY2_12Z",
});
/* periods.push({
        displayName: "25-48 h",
        name: "25-48",
}); */









levels.push({
displayName: "Hourly Ozone",
	/* name: "ozcon1", */
        name: "O3",
});
levels.push({
displayName: "Hourly PM25",
        name: "PM25",
});
/* levels.push({
        displayName: "8h",
        name: "8",
}); */







seasons.push({
        displayName: "Current",
        name: "current",
});
seasons.push({
	displayName: "January",
        /* name: "jan", */
        name: "01",
});
seasons.push({
        displayName: "February",
        /* name: "feb", */
        name: "02",
});
seasons.push({
        displayName: "March",
        /* name: "mar", */
        name: "03",
});
seasons.push({
        displayName: "April",
        /* name: "apr", */
        name: "04",
});
seasons.push({
        displayName: "May",
        /* name: "may", */
        name: "05",
});
seasons.push({
        displayName: "June",
        /* name: "jun", */
        name: "06",
});
seasons.push({
        displayName: "July",
        /* name: "jul", */
        name: "07",
});
seasons.push({
        displayName: "August",
        /* name: "aug", */
        name: "08",
});
seasons.push({
        displayName: "September",
        /* name: "sep", */
        name: "09",
});
seasons.push({
        displayName: "October",
	/* /* name: "oct", */
        name: "10",
});
seasons.push({
        displayName: "November",
	/* /* name: "nov", */
        name: "11",
});
seasons.push({
        displayName: "December",
        /* name: "dec", */
        name: "12",
});






annuals.push({
        displayName: "2022",
        name: "2022",
});
annuals.push({
        displayName: "2021",
        name: "2021",
});
annuals.push({
        displayName: "2020",
        name: "2020",
});
annuals.push({
        displayName: "2019",
        name: "2019",
});






maptypes.push({
        url: "geo_00Z.php",
        displayName: "0000 UTC",
        name: "geo_00Z",
});
maptypes.push({
        url: "geo_12Z.php",
        displayName: "1200 UTC",
        name: "geo_12Z",
});

//====================================================================================================
//Initialize the page
//====================================================================================================

//function for keyboard controls
document.onkeydown = keys;

//Decare object containing data about the currently displayed map
imageObj = {};

//Initialize the page
initialize();

//Format initialized run date & return in requested format
function formatDate(offset,format){
	var newdate = String(cycle);
	var yyyy = newdate.slice(0,4);
	var mm = newdate.slice(4,6);
	var dd = newdate.slice(6,8);
	var hh = newdate.slice(8,10);
	var curdate = new Date(yyyy,parseInt(mm)-1,dd,hh);
	
	//Offset by run
	var newOffset = curdate.getHours() + offset;
	curdate.setHours(newOffset);
	
	var yy = String(curdate.getFullYear()).slice(2,4);
	yyyy = curdate.getFullYear();
	mm = curdate.getMonth()+1;
	dd = curdate.getDate();
	if(dd < 10){dd = "0" + dd;}
	hh = curdate.getHours();
	if(hh < 10){hh = "0" + hh;}
	
	var wkday = curdate.getDay();
	var day_str = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	
	//Return in requested format
	if(format == 'valid'){
		//06Z Thu 03/22/18 (90 h)
		var txt = hh + "Z " + day_str[wkday] + " " + mm + "/" + dd + "/" + yy;
		return txt;
	}
}

//Initialize the page
function initialize(){
	
	//Set image object based on default variables
	imageObj = {
		variable: "TIME_",
		domain: "CONUS_South",
		level: "O3",
                season: "11",
                annual: "2022",
		period: "SERIES_DAY2_12Z",
//                frame: startFrame,
	};
	
        //Change domain based on passed argument, if any
        var passed_domain = "";
        if(passed_domain!=""){
                if(searchByName(passed_domain,domains)>=0){
                        imageObj.domain = passed_domain;
                }
        }

        //Change variable based on passed argument, if any
        var passed_variable = "";
        if(passed_variable!=""){
                if(searchByName(passed_variable,variables)>=0){
                        imageObj.variable = passed_variable;
                }
        }

	
	//Populate forecast hour and dprog/dt arrays for this run and frame
	populateMenu('variable');
	populateMenu('domain');
	populateMenu('level');
	populateMenu('season');
        populateMenu('annual');
	populateMenu('period');	

	//Populate the frames arrays
	frames = [];
	for(i=minFrame;i<=maxFrame;i=i+incrementFrame){frames.push(i);}
	
	//Predefine empty array for preloading images
	for(i=0; i<variables.length; i++){
		variables[i].images = [];
		variables[i].loaded = [];
		variables[i].dprog = [];
	}
	
	//Preload images and display map
	preload(imageObj);
	showImage();
	
	//Update mobile display for swiping
	updateMobile();

}

var xInit = null;                                                        
var yInit = null;                  
var xPos = null;
var yPos = null;


</script>


</body></html>
