import React from "react";
const TimeCalc = ({ postDate }) => {
  const todayDate = new Date();
  // const todayDate = new Date("November 26, 2021 23:00:00");

  // (((1000 milliseconds * (60 seconds * 60 minutes) * 24 hours) * 30 days))

  let difference = todayDate.getTime() - postDate.getTime();
  let TotalTime = difference;

  if (difference / 1000 == 1) {
    TotalTime = difference / 1000;
    var timePast = TotalTime + " Second ago";
  } else if (difference / 1000 < 60) {
    TotalTime = difference / 1000;
    var timePast = TotalTime + " Seconds ago";
  } else if (difference / (1000 * 60) == 1) {
    TotalTime = difference / (1000 * 60);
    console.log(difference / (1000 * 60), "Minute");
    var timePast = TotalTime + " Minute ago";
  } else if (difference / (1000 * 60) < 60) {
    TotalTime = Math.floor(difference / (1000 * 60));
    console.log(Math.floor(difference / (1000 * 60)), "Minutes");
    var timePast = TotalTime + " Minutes ago";
  } else if (Math.floor(difference / (1000 * (60 * 60)) == 1)) {
    TotalTime = difference / (1000 * (60 * 60));
    console.log(difference / (1000 * (60 * 60)), "Hour");
    var timePast = TotalTime + " Hour ago";
  } else if (difference / (1000 * (60 * 60)) < 24) {
    TotalTime = Math.floor(difference / (1000 * (60 * 60)));
    console.log(Math.floor(difference / (1000 * (60 * 60))), "Hours");
    console.log(todayDate.getTime());
    console.log(postDate.getTime());
    console.log(
      Math.abs(todayDate.getTime() - postDate.getTime()) / (1000 * (60 * 60))
    );
    var timePast = TotalTime + " Hours ago";
  } else if (Math.floor(difference / (1000 * (60 * 60) * 24)) == 1) {
    TotalTime = Math.floor(difference / (1000 * (60 * 60) * 24));
    console.log(Math.floor(difference / (1000 * (60 * 60) * 24)), "Day");
    var timePast = TotalTime + " Day ago";
  } else if (difference / (1000 * (60 * 60) * 24) < 30) {
    TotalTime = Math.floor(difference / (1000 * (60 * 60) * 24));
    console.log(Math.floor(difference / (1000 * (60 * 60) * 24)), "Days");
    var timePast = TotalTime + " Days ago";
  } else if (Math.floor(difference / (1000 * (60 * 60) * 24 * 30)) == 1) {
    TotalTime = Math.floor(difference / (1000 * (60 * 60) * 24 * 30));
    console.log(Math.floor(difference / (1000 * (60 * 60) * 24 * 30)), "Month");
    var timePast = TotalTime + " Month ago";
  } else if (difference / (1000 * (60 * 60) * 24 * 30) < 12) {
    TotalTime = Math.floor(difference / (1000 * (60 * 60) * 24 * 30));
    console.log(
      Math.floor(difference / (1000 * (60 * 60) * 24 * 30)),
      "Months"
    );
    var timePast = TotalTime + " Months ago";
  } else if (
    Math.floor((difference / (1000 * (60 * 60) * 24 * 30)) * 12) == 1
  ) {
    TotalTime = Math.floor(difference / (1000 * (60 * 60) * 24 * 30 * 12));
    console.log(
      Math.floor(difference / (1000 * (60 * 60) * 24 * 30 * 12)),
      "Year"
    );
    var timePast = TotalTime + " Year ago";
  } else if (
    Math.floor((difference / (1000 * (60 * 60) * 24 * 30)) * 12) > 12
  ) {
    TotalTime = Math.floor(difference / (1000 * (60 * 60) * 24 * 30 * 12));
    console.log(
      Math.floor(difference / (1000 * (60 * 60) * 24 * 30 * 12)),
      "Years"
    );
    var timePast = TotalTime + " Years ago";
  }

  return timePast;
};
export default TimeCalc;
