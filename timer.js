function secToTime(seconds){
  var hours = Math.floor(seconds/3600);
  if(hours<10) hours = "0" + hours;
  var minutes = Math.floor(seconds/60)- hours*60;
  if(minutes<10) minutes = "0" + minutes;
  var sek = seconds - ((hours * 3600) + (minutes * 60));
  if(sek<10) sek = "0" + sek;
  $()(hours+ ":"+ minutes + ":" + sek);
}
secToTime(0);
secToTime(56);
secToTime(65);
secToTime(130);
secToTime(3601);
secToTime(24);
secToTime(3661);
secToTime(328873);
