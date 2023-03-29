var pics=new Array();
var count=0;
var i=0;
var ith=0;
var speed=1000;
var data="";
var k;
var dateStr;
var filename="";
var findtime;
var newdate;
var itmp;
var jtmp;
var ktmp;
var istatus;
var imax=121;
var nmodel=3;
var nmax=nmodel-1;
var dateStr;
var filename;
var latest_yr;
var latest_mon;
var latest_day;
var latest_ith;
var current_yr;
var current_mon;
var current_day;
var current_exp1;
var current_exp2;
var current_exp3;
var current_exp4;
var current_cyl;
var current_area;
var current_prod;
var area_in;
var area_out;
var area_hms;
var run;
var ftype_out;
var first_julian_day=FirstDay();
var latest_julian_day=LatestDay();
var latest_calendar_day=jday2cald(latest_julian_day);
var fireexp1;
var fireexp2;
var fireexp3;


function Num2Chr(parin) {
   var j;
   if (parin <=9) {
      j="0"+parin;
   }
   else {
      j=parin.toString();
   }
   return j;
}

function isleapyear(year) {
   var ileap=0;
   if (year%4 == 0) {
      ileap=1;
      if ( (year%100 == 0) && (year%400 != 0) ) ileap=0;
   }
   return ileap;
}

function get_mcday(year,month) {
   var ileap=isleapyear(year);
   var mcday = ["31", "28", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31"];
   var mon=month-1;
   var calday = (mcday[mon]/1);
   if ( ileap == 1 && mon == 1 ) calday++;
   return calday;
}

function get_mjday(year,month) {
   var ileap=isleapyear(year/1);
   var mjday = ["0", "31", "59", "90", "120", "151", "181", "212", "243", "273", "304", "334"];
   var mon=month-1;
   var jday = (mjday[mon]/1);
   if ( ileap == 1 && month > 2 ) jday++;
   return jday;
}

function dayofyear(year,month,day) {
   var jday;
   jday = get_mjday(year,month);
   jday = jday+(day/1);
   return jday;
}

function extract_year_from_calendarD(calendar_day) {
   var cnt=calendar_day%10000;
   var yr=(calendar_day-cnt)/10000;
   return yr;
}
function extract_day_from_calendarD(calendar_day) {
   var cnt=calendar_day%10000;
   var day=cnt%100;
   return day;
}
function extract_month_from_calendarD(calendar_day) {
   var day=extract_day_from_calendarD(calendar_day);
   var cnt=calendar_day%10000;
   var mon=(cnt-day)/100;
   return mon;
}
function extract_year_from_julianD(julian_day) {
   var cnt=julian_day%1000;
   var yr=(julian_day-cnt)/1000;
   return yr;
}
function extract_jday_from_julianD(julian_day) {
   var jday=julian_day%1000;
   return jday;
}
function extract_month_from_julianD(julian_day) {
   var maxjday;
   var yr=extract_year_from_julianD(julian_day);
   var jday=extract_jday_from_julianD(julian_day);
   for ( var mon=1; mon<13; mon++) {
      maxjday=get_mjday(yr,mon)/1+get_mcday(yr,mon)/1;
      if ( jday - maxjday <= 0 ) {
         return mon;
         break;
      }
   }
}

function extract_day_from_julianD(julian_day) {
   var yr=extract_year_from_julianD(julian_day);
   var jday=extract_jday_from_julianD(julian_day);
   var mon=extract_month_from_julianD(julian_day);
   if ( mon == 1 ) {
      var day = jday;
   }
   else {
      var day=jday-get_mjday(yr,mon)/1;
   }
   return day;
}

function jday2cald(julian_day) {
   var yr=extract_year_from_julianD(julian_day);
   var mon=extract_month_from_julianD(julian_day);
   var day=extract_day_from_julianD(julian_day);
   var calendar_day=yr*10000+mon*100+day;
   return calendar_day;
}

function cald2jday(calendar_day) {
   var yr=extract_year_from_calendarD(calendar_day);
   var mon=extract_month_from_calendarD(calendar_day);
   var day=extract_day_from_calendarD(calendar_day);
   var jday=dayofyear(yr,mon,day);
   jday=yr*1000+jday;
   return jday;
}

function julian_day_plus1(julian_day) {
   var new_day;
   var yr=extract_year_from_julianD(julian_day);
   var mon=extract_month_from_julianD(julian_day);
   var day=extract_day_from_julianD(julian_day);
   var ileap=isleapyear(yr);
   if ( mon == 12 && day == 31 ) {
      yr++;
      new_day=yr*1000+1;
   }
   else {
      new_day=julian_day+1;
   }
   return new_day;
}

function julian_day_plusN(julian_day, nadd) {
   var new_day;
   var rday;
   var yr=extract_year_from_julianD(julian_day);
   var mon=extract_month_from_julianD(julian_day);
   var day=extract_day_from_julianD(julian_day);
   var jdaymax=get_mjday(yr,mon);

   new_day=julian_day/1+nadd/1;
   if ( new_day > jdaymax ) {
      yr++;
      rday=new_day/1-jdaymax/1;
      new_day=yr*1000+rday;
   }
   return new_day;
}

function julian_day_minus1(julian_day) {
   var new_day;
   var yr=extract_year_from_julianD(julian_day);
   var mon=extract_month_from_julianD(julian_day);
   var day=extract_day_from_julianD(julian_day);
   var ileap=isleapyear(yr);
   if ( mon == 1 && day == 1 ) {
      yr--;
      new_day=get_mjday(yr,12)/1+31;
      new_day=yr*1000+new_day;
   }
   else {
      new_day=julian_day-1;
   }
   return new_day;
}

function calendar_day_plus1(calendar_day) {
   var julian_day=cald2jday(calendar_day);
   var j_plus1=julian_day_plus1(julian_day);
   var new_day=jday2cald(j_plus1);
   return new_day;
}
function calendar_day_minus1(calendar_day) {
   var julian_day=cald2jday(calendar_day);
   var j_minus1=julian_day_minus1(julian_day);
   var new_day=jday2cald(j_minus1);
   return new_day;
}

function save_latest_date(year,month,day){
   latest_year=year;
   latest_mon=month;
   latest_day=day;
   current_year=year;
   current_mon=month;
   current_day=day;
   return 0;
} 
function get_latest_year(){
   var j=latest_year;
   return j;
}

function get_latest_month(){
   var j=latest_mon;
   return j;
}

function get_latest_day(){
   var j=latest_day;
   return j;
}

function save_current_date(year,month,day){
   current_year=year;
   current_mon=month;
   current_day=day;
   var xx=document.form1.yr.options[0].value;
   var yy=document.form1.mn.options[0].value;
   var zz=document.form1.dy.options[0].value;
   var index_yr=year-xx;
   var index_mn=month-yy;
   var index_dy=day-zz;
   document.form1.yr.selectedIndex=index_yr;
   document.form1.mn.selectedIndex=index_mn;
   document.form1.dy.selectedIndex=index_dy;
   return 0;
}

function get_current_year(){
   var j=current_year;
   return j;
}

function get_current_month(){
   var j=current_mon;
   return j;
}

function get_current_day(){
   var j=current_day;
   return j;
}

function save_current_prod(exp1,exp2,exp3,exp4,cycle,area,prod) {
   current_exp1=exp1;
   current_exp2=exp2;
   current_exp3=exp3;
   current_exp4=exp4;
   current_cyl=cycle;
   current_area=area;
   current_prod=prod;
   return 0;
}

function get_current_exp1(){
   var j=current_exp1;
   return j;
}

function get_current_exp2(){
   var j=current_exp2;
   return j;
}

function get_current_exp3(){
   var j=current_exp3;
   return j;
}

function get_current_exp4(){
   var j=current_exp4;
   return j;
}

function get_current_cyl(){
   var j=current_cyl;
   return j;
}

function get_current_area(){
   var j=current_area;
   return j;
}

function get_current_prod(){
   var j=current_prod;
   return j;
}

function get_hms_area(area_in){
   area_out=area_in
   if ( area_in == "glf" ) {
      area_out="east";
   }
   if ( area_in == "mdn" ) {
      area_out="east";
   }
   if ( area_in == "ne10" ) {
      area_out="ne";
   }
   if ( area_in == "se10" ) {
      area_out="se";
   }
   if ( area_in == "nw10" ) {
      area_out="nw";
   }
   if ( area_in == "swse" ) {
      area_out="sw";
   }
   return area_out;
} 
function get_ftype_fire(run){
   ftype_out="gbbepxfire";
   if ( run == "para6d" ) {
      ftype_out="fireemisfire";
   }
   return ftype_out;
}
  function myWin(){
    newWin = open ("http://www.emc.ncep.noaa.gov/mmb/hchuang/web/html/rrfs_cmaq_o3.html", "displayWindow", "width=950,height=800,menubar=yes,resizable=yes,scrollbars=yes,toolbar=yes,location=yes,status=yes");
  }

  function myWindow(frm){
    dateStr=frm.yr.options[frm.yr.selectedIndex].value+frm.mn.options[frm.mn.selectedIndex].value+frm.dy.options[frm.dy.selectedIndex].value;
    newWin = open ("http://www.emc.ncep.noaa.gov/mmb/hchuang/web/html/rrfs_cmaq_o3.html", "displayWindow", "width=800,height=800,menubar=yes,resizable=yes,scrollbars=yes,toolbar=yes,location=yes,status=yes");
  }
function preload2(img){
    if ( count > imax ) {
       for (var k=1; k<=imax; k++ ) {
          pics[k-1].src = pics[k].src;
       }
       count=imax;
    }
    else {
       pics[count] = new Image();
    }
    pics[count].src = img;
    count++;
}

function preload(img){
     pics[count] = new Image();
     pics[count].src = img;
     count++;
}

function get_speed(frm){
  if(frm.elements["spd"].selectedIndex == 0) speed=400;
  if(frm.elements["spd"].selectedIndex == 1) speed=100;
  if(frm.elements["spd"].selectedIndex == 2) speed=1000;
  return speed;
}

function increase_i(){
   i++;
   return i;
}

function anim(){
   if(i>nmax){
      i=0;
   }
   document.cmaq1_o3_image.src  =  pics[i].src;
   document.cmaq2_o3_image.src  =  pics[i+nmodel].src;
   document.cmaq3_o3_image.src  =  pics[i+2*nmodel].src;
   document.cmaq4_o3_image.src  =  pics[i+3*nmodel].src;
   window.setTimeout("increase_i(); anim()", speed);
}
             
function animation(){
   if(i>nmax){
      i=0;
   }
   if(document.form2.timerBox.checked){
      document.cmaq1_o3_image.src  =  pics[i].src;
      document.cmaq2_o3_image.src  =  pics[i+nmodel].src;
      document.cmaq3_o3_image.src  =  pics[i+2*nmodel].src;
      document.cmaq4_o3_image.src  =  pics[i+3*nmodel].src;
      anmiloop= window.setTimeout("increase_i(); animation()", speed);
      ith=i;
   }
   else{
      return;
   }
}

function show2(i){
   ith=i;
   if (ith < nmax) {
      latest_ith=ith;
   }
   else {
      latest_ith=imax;
   }
   document.cmaq1_o3_image.src  =  pics[latest_ith].src;
   document.cmaq2_o3_image.src  =  pics[latest_ith+nmodel].src;
   document.cmaq3_o3_image.src  =  pics[latest_ith+2*nmodel].src;
   document.cmaq4_o3_image.src  =  pics[latest_ith+3*nmodel].src;
}

function show(i){
   ith=i;
   document.cmaq1_o3_image.src  =  pics[ith].src;
   document.cmaq2_o3_image.src  =  pics[ith+nmodel].src;
   document.cmaq3_o3_image.src  =  pics[ith+2*nmodel].src;
   document.cmaq4_o3_image.src  =  pics[ith+3*nmodel].src;
}

function next2(){
   ith=ith+1;
   if(ith > latest_ith) {
      alert('last memorized frame reached, can not go forward');
      ith=ith-1;
   }
   else {
      document.cmaq1_o3_image.src  =  pics[ith].src;
      document.cmaq2_o3_image.src  =  pics[ith+nmodel].src;
      document.cmaq3_o3_image.src  =  pics[ith+2*nmodel].src;
      document.cmaq4_o3_image.src  =  pics[ith+3*nmodel].src;
   }
}

function prev2(){
   ith=ith-1;
   if (ith < 0) {
      alert('first memorized frame reached, can not go backward');
      ith=ith+1;
   }
   else {
      document.cmaq1_o3_image.src  =  pics[ith].src;
      document.cmaq2_o3_image.src  =  pics[ith+nmodel].src;
      document.cmaq3_o3_image.src  =  pics[ith+2*nmodel].src;
      document.cmaq4_o3_image.src  =  pics[ith+3*nmodel].src;
   }
}

function next(){
   ith=ith+1;
   if(ith >= nmax) ith=nmax;
   document.cmaq1_o3_image.src  =  pics[ith].src;
   document.cmaq2_o3_image.src  =  pics[ith+nmodel].src;
   document.cmaq3_o3_image.src  =  pics[ith+2*nmodel].src;
   document.cmaq4_o3_image.src  =  pics[ith+3*nmodel].src;
}

function prev(){
   ith=ith-1;
   if(ith < 0) ith=0;
   document.cmaq1_o3_image.src  =  pics[ith].src;
   document.cmaq2_o3_image.src  =  pics[ith+nmodel].src;
   document.cmaq3_o3_image.src  =  pics[ith+2*nmodel].src;
   document.cmaq4_o3_image.src  =  pics[ith+3*nmodel].src;
}

function rewind(){
   ith=0;
   document.cmaq1_o3_image.src  =  pics[ith].src;
   document.cmaq2_o3_image.src  =  pics[ith+nmodel].src;
   document.cmaq3_o3_image.src  =  pics[ith+2*nmodel].src;
   document.cmaq4_o3_image.src  =  pics[ith+3*nmodel].src;
}

function last(){
   ith=nmax;
   get_i();
   document.cmaq1_o3_image.src  =  pics[ith].src;
   document.cmaq2_o3_image.src  =  pics[ith+nmodel].src;
   document.cmaq3_o3_image.src  =  pics[ith+2*nmodel].src;
   document.cmaq4_o3_image.src  =  pics[ith+3*nmodel].src;
}

function openWin(url) {
   newWin=window.open(url);
}

function reload(){
   open(this);
}

function load_image(frm){
   count=0;
   var newdate;
   var tmpdate;
   var obsfhd;
   var yr=frm.yr.options[frm.yr.selectedIndex].value;
   var mon=frm.mn.options[frm.mn.selectedIndex].value;
   var day=frm.dy.options[frm.dy.selectedIndex].value;
   var area=frm.rg.options[frm.rg.selectedIndex].value;
   var prod=frm.fld.options[frm.fld.selectedIndex].value;
   var exp1=frm.exp1.options[frm.exp1.selectedIndex].value;
   var exp2=frm.exp2.options[frm.exp2.selectedIndex].value;
   var exp3=frm.exp3.options[frm.exp3.selectedIndex].value;
   var exp4=frm.exp4.options[frm.exp4.selectedIndex].value;
   var cycle=frm.tz.options[frm.tz.selectedIndex].value;
   var calendar_day=yr+mon+day;
   var julian_day=cald2jday(calendar_day);
   var area_hms=get_hms_area(area);
   var fireexp1=get_ftype_fire(exp1);
   var mcday=get_mcday(yr,mon);
   var switch_day=cald2jday(20160204);
   var flag_continue="no";
   if ( yr == "2020" && mon == "09" ) {
       flag_continue="yes";
   }
   if ( yr == "2022" && mon == "07" ) {
       flag_continue="yes";
   }
   if ( yr == "2022" && mon == "08" ) {
       flag_continue="yes";
   }
   if ( yr == "2022" && mon == "12" ) {
       flag_continue="yes";
   }
   if ( yr == "2023" ) {
       flag_continue="yes";
   }
   if ( flag_continue == "yes" ) {
     if ( day > mcday ) {
        alert("Figure for date selected   "+yr+"  "+mon+"  "+day+"   is not available");
     }
     else {
        if ( julian_day < first_julian_day || julian_day > latest_julian_day ) {
            alert("Figure for date selected   "+yr+"  "+mon+"  "+day+"   is not available");
        }
        else {
           dateStr=yr+mon+day;
           for (k=1; k<=nmodel; k++) {
              data=Num2Chr(k);
              filename="http://www.emc.ncep.noaa.gov/mmb/hchuang/web/fig/"+yr+"/"+dateStr+"/t"+cycle+"z/aqm."+area+"."+exp1+"."+dateStr+".t"+cycle+"z."+prod+".day"+k+".k1.png";
              preload(filename);
           }
           for (k=1; k<=nmodel; k++) {
              data=Num2Chr(k);
              filename="http://www.emc.ncep.noaa.gov/mmb/hchuang/web/fig/"+yr+"/"+dateStr+"/t"+cycle+"z/aqm."+area+"."+exp2+"."+dateStr+".t"+cycle+"z."+prod+".day"+k+".k1.png";
              preload(filename);
           }
           for (k=1; k<=nmodel; k++) {
              data=Num2Chr(k);
              filename="http://www.emc.ncep.noaa.gov/mmb/hchuang/web/fig/"+yr+"/"+dateStr+"/t"+cycle+"z/aqm."+area+"."+exp3+"."+dateStr+".t"+cycle+"z."+prod+".day"+k+".k1.png";
              preload(filename);
           }
           for (k=1; k<=nmodel; k++) {
              data=Num2Chr(k);
              filename="http://www.emc.ncep.noaa.gov/mmb/hchuang/web/fig/"+yr+"/"+dateStr+"/t"+cycle+"z/aqm."+area+"."+exp4+"."+dateStr+".t"+cycle+"z."+prod+".day"+k+".k1.png";
              preload(filename);
           }
           istatus=save_current_date(yr,mon,day);
           istatus=save_current_prod(exp1,exp2,exp3,exp4,cycle,area,prod);
           show(0);
        }
     }
   }
   else {
      alert("Please select date in 2020/09, 2022/07, 2022/08, 2022/12, and 2023/*");
   }
}

function load_image_latest(){

   count=0;
   var obsfhd;
   var img = new Image();
   var new_yr=extract_year_from_julianD(latest_julian_day);
   var new_mon=extract_month_from_julianD(latest_julian_day);
   var new_day=extract_day_from_julianD(latest_julian_day);
   var area=get_current_area();
   var prod=get_current_prod();
   var exp1=get_current_exp1();
   var exp2=get_current_exp2();
   var exp3=get_current_exp3();
   var exp4=get_current_exp4();
   var cycle=get_current_cyl();
   var area_hms=get_hms_area(area);
   var fireexp1=get_ftype_fire(exp1);
   var switch_day=cald2jday(20160204);
   if ( area == "" ) {
     area="conus";
   }
   if ( prod == "" ) {
      prod="max_1hr_o3";
   }
   if ( exp1 == "" ) {
      exp1="prod";
   }
   if ( cycle == "" ) {
      cycle="06";
   }
   chr_yr=Num2Chr(new_yr);
   chr_mon=Num2Chr(new_mon);
   chr_day=Num2Chr(new_day);
   dateStr=chr_yr+chr_mon+chr_day;
   for (k=1; k<=nmodel; k++) {
      data=Num2Chr(k);
      filename="http://www.emc.ncep.noaa.gov/mmb/hchuang/web/fig/"+chr_yr+"/"+dateStr+"/t"+cycle+"z/aqm."+area+"."+exp1+"."+dateStr+".t"+cycle+"z."+prod+".day"+k+".k1.png";
      preload(filename);
   }
   for (k=1; k<=nmodel; k++) {
      data=Num2Chr(k);
      filename="http://www.emc.ncep.noaa.gov/mmb/hchuang/web/fig/"+chr_yr+"/"+dateStr+"/t"+cycle+"z/aqm."+area+"."+exp2+"."+dateStr+".t"+cycle+"z."+prod+".day"+k+".k1.png";
      preload(filename);
   }
   for (k=1; k<=nmodel; k++) {
      data=Num2Chr(k);
      filename="http://www.emc.ncep.noaa.gov/mmb/hchuang/web/fig/"+chr_yr+"/"+dateStr+"/t"+cycle+"z/aqm."+area+"."+exp3+"."+dateStr+".t"+cycle+"z."+prod+".day"+k+".k1.png";
      preload(filename);
   }
   for (k=1; k<=nmodel; k++) {
      data=Num2Chr(k);
      filename="http://www.emc.ncep.noaa.gov/mmb/hchuang/web/fig/"+chr_yr+"/"+dateStr+"/t"+cycle+"z/aqm."+area+"."+exp4+"."+dateStr+".t"+cycle+"z."+prod+".day"+k+".k1.png";
      preload(filename);
   }
   show(0);
   istatus=save_current_date(new_yr,new_mon,new_day);
}

function load_imageP1(frm){

   count=0;
   var obsfhd;
   var obs_yr;
   var chr_oyr;
   var chr_yr;
   var chr_mon;
   var chr_day;
   var img = new Image();
   var yr=get_current_year();
   var mon=get_current_month();
   var day=get_current_day();
   var calendar_day=10000*(yr/1)+100*(mon/1)+(day/1);
   var julian_day=cald2jday(calendar_day);
   var new_julian_day= julian_day_plus1(julian_day);
   var new_calendar_day= jday2cald(new_julian_day);
   var new_yr=extract_year_from_julianD(new_julian_day);
   var new_mon=extract_month_from_julianD(new_julian_day);
   var new_day=extract_day_from_julianD(new_julian_day);
   var area=frm.rg.options[frm.rg.selectedIndex].value;
   var prod=frm.fld.options[frm.fld.selectedIndex].value;
   var exp1=frm.exp1.options[frm.exp1.selectedIndex].value;
   var exp2=frm.exp2.options[frm.exp2.selectedIndex].value;
   var exp3=frm.exp3.options[frm.exp3.selectedIndex].value;
   var exp4=frm.exp4.options[frm.exp4.selectedIndex].value;
   var cycle=frm.tz.options[frm.tz.selectedIndex].value;
   var area_hms=get_hms_area(area);
   var fireexp1=get_ftype_fire(exp1);
   var mcday=get_mcday(new_yr,new_mon);
   var flag_continue="no";
   if ( new_yr == "2020" && new_mon == "09" ) {
       flag_continue="yes";
   }
   if ( new_yr == "2022" && new_mon == "07" ) {
       flag_continue="yes";
   }
   if ( new_yr == "2022" && new_mon == "08" ) {
       flag_continue="yes";
   }
   if ( new_yr == "2022" && new_mon == "12" ) {
       flag_continue="yes";
   }
   if ( new_yr == "2023" ) {
       flag_continue="yes";
   }
   if ( flag_continue == "yes" ) {
     if ( new_day > mcday ) {
        alert("McDay Figure for date selected   "+new_yr+"  "+new_mon+"  "+new_day+"   is not available");
     }
     else {
        if ( new_julian_day < first_julian_day || new_julian_day > latest_julian_day ) {
           alert("Figure for date selected   "+new_yr+"  "+new_mon+"  "+new_day+"   is not available");
        }
        else {
           chr_yr=Num2Chr(new_yr);
           chr_mon=Num2Chr(new_mon);
           chr_day=Num2Chr(new_day);
           dateStr=chr_yr+chr_mon+chr_day;
           for (k=1; k<=nmodel; k++) {
              data=Num2Chr(k);
              filename="http://www.emc.ncep.noaa.gov/mmb/hchuang/web/fig/"+chr_yr+"/"+dateStr+"/t"+cycle+"z/aqm."+area+"."+exp1+"."+dateStr+".t"+cycle+"z."+prod+".day"+k+".k1.png";
              preload(filename);
           }
           for (k=1; k<=nmodel; k++) {
              data=Num2Chr(k);
              filename="http://www.emc.ncep.noaa.gov/mmb/hchuang/web/fig/"+chr_yr+"/"+dateStr+"/t"+cycle+"z/aqm."+area+"."+exp2+"."+dateStr+".t"+cycle+"z."+prod+".day"+k+".k1.png";
              preload(filename);
           }
           for (k=1; k<=nmodel; k++) {
              data=Num2Chr(k);
              filename="http://www.emc.ncep.noaa.gov/mmb/hchuang/web/fig/"+chr_yr+"/"+dateStr+"/t"+cycle+"z/aqm."+area+"."+exp3+"."+dateStr+".t"+cycle+"z."+prod+".day"+k+".k1.png";
              preload(filename);
           }
           for (k=1; k<=nmodel; k++) {
              data=Num2Chr(k);
              filename="http://www.emc.ncep.noaa.gov/mmb/hchuang/web/fig/"+chr_yr+"/"+dateStr+"/t"+cycle+"z/aqm."+area+"."+exp4+"."+dateStr+".t"+cycle+"z."+prod+".day"+k+".k1.png";
              preload(filename);
           }
           istatus=save_current_date(chr_yr,chr_mon,chr_day);
           istatus=save_current_prod(exp1,exp2,exp3,exp4,cycle,area,prod);
        }
     }
     show(0);
   }
   else {
      alert("The next day should remain in 2020/09, 2022/07, 2022/08, 2022/12, or 2023/*");
   }
}

function load_imageM1(frm){

   count=0;
   var obsfhd;
   var obs_yr;
   var chr_oyr;
   var chr_yr;
   var chr_mon;
   var chr_day;
   var img = new Image();
   var yr=get_current_year();
   var mon=get_current_month();
   var day=get_current_day();
   var calendar_day=(10000*yr/1)+(100*mon/1)+day/1;
   var julian_day=cald2jday(calendar_day);
   var new_julian_day= julian_day_minus1(julian_day);
   var new_calendar_day= jday2cald(new_julian_day);
   var new_yr=extract_year_from_julianD(new_julian_day);
   var new_mon=extract_month_from_julianD(new_julian_day);
   var new_day=extract_day_from_julianD(new_julian_day);
   var area=frm.rg.options[frm.rg.selectedIndex].value;
   var prod=frm.fld.options[frm.fld.selectedIndex].value;
   var exp1=frm.exp1.options[frm.exp1.selectedIndex].value;
   var exp2=frm.exp2.options[frm.exp2.selectedIndex].value;
   var exp3=frm.exp3.options[frm.exp3.selectedIndex].value;
   var exp4=frm.exp4.options[frm.exp4.selectedIndex].value;
   var cycle=frm.tz.options[frm.tz.selectedIndex].value;
   var area_hms=get_hms_area(area);
   var fireexp1=get_ftype_fire(exp1);
   var mcday=get_mcday(new_yr,new_mon);
   var switch_day=cald2jday(20160204);
   var flag_continue="no";
   if ( new_yr == "2020" && new_mon == "09" ) {
       flag_continue="yes";
   }
   if ( new_yr == "2022" && new_mon == "07" ) {
       flag_continue="yes";
   }
   if ( new_yr == "2022" && new_mon == "08" ) {
       flag_continue="yes";
   }
   if ( new_yr == "2022" && new_mon == "12" ) {
       flag_continue="yes";
   }
   if ( new_yr == "2023" ) {
       flag_continue="yes";
   }
   if ( flag_continue == "yes" ) {
      if ( new_day > mcday ) {
         alert("McDay Figure for date selected   "+new_yr+"  "+new_mon+"  "+new_day+"   is not available");
      }
      else {
         if ( new_julian_day < first_julian_day || new_julian_day > latest_julian_day ) {
            alert("Figure for date selected   "+new_yr+"  "+new_mon+"  "+new_day+"   is not available");
         }
         else {
            chr_yr=Num2Chr(new_yr);
            chr_mon=Num2Chr(new_mon);
            chr_day=Num2Chr(new_day);
            dateStr=chr_yr+chr_mon+chr_day;
            for (k=1; k<=nmodel; k++) {
               data=Num2Chr(k);
               filename="http://www.emc.ncep.noaa.gov/mmb/hchuang/web/fig/"+chr_yr+"/"+dateStr+"/t"+cycle+"z/aqm."+area+"."+exp1+"."+dateStr+".t"+cycle+"z."+prod+".day"+k+".k1.png";
               preload(filename);
            }
            for (k=1; k<=nmodel; k++) {
               data=Num2Chr(k);
               filename="http://www.emc.ncep.noaa.gov/mmb/hchuang/web/fig/"+chr_yr+"/"+dateStr+"/t"+cycle+"z/aqm."+area+"."+exp2+"."+dateStr+".t"+cycle+"z."+prod+".day"+k+".k1.png";
               preload(filename);
            }
            for (k=1; k<=nmodel; k++) {
               data=Num2Chr(k);
               filename="http://www.emc.ncep.noaa.gov/mmb/hchuang/web/fig/"+chr_yr+"/"+dateStr+"/t"+cycle+"z/aqm."+area+"."+exp3+"."+dateStr+".t"+cycle+"z."+prod+".day"+k+".k1.png";
               preload(filename);
            }
            for (k=1; k<=nmodel; k++) {
               data=Num2Chr(k);
               filename="http://www.emc.ncep.noaa.gov/mmb/hchuang/web/fig/"+chr_yr+"/"+dateStr+"/t"+cycle+"z/aqm."+area+"."+exp4+"."+dateStr+".t"+cycle+"z."+prod+".day"+k+".k1.png";
               preload(filename);
            }
            istatus=save_current_date(chr_yr,chr_mon,chr_day);
            istatus=save_current_prod(exp1,exp2,exp3,exp4,cycle,area,prod);
         }
      }
      show(0);
   }
   else {
      alert("The day before should remain in 2020/09, 2022/07, 2022/08, 2022/12, or 2023/*");
   }
}

function get_i(){
 i=ith;
} 
