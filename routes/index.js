let moment = require("moment");
var express = require("express");
var router = express.Router();

/* GET home page. */
router.post("/", function (req, res, next) {
  let workHours = req.body;
  let openingTime = "";

  const openingHours = (listOfWorkingHr) => {
    const daysOfTheWeek = [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ];
    for (let i = 0; i < 7; i++) {
      const dayOfWeek = daysOfTheWeek[i];
      let businessDayOpeningHours = listOfWorkingHr[dayOfWeek];

      if (
        businessDayOpeningHours.length > 1 &&
        businessDayOpeningHours.length % 2 == 0 &&
        businessDayOpeningHours[0].type == "open"
      ) {
        printBusinessHour(dayOfWeek, businessDayOpeningHours);
      }

      if (businessDayOpeningHours.length == 0) {
        printCloseBusinessDay(dayOfWeek);
      }

      if (
        businessDayOpeningHours.length == 1 &&
        businessDayOpeningHours[0].type == "close" &&
        dayOfWeek == "monday"
      ) {
        printCloseBusinessDay(dayOfWeek);
      }
      if (
        businessDayOpeningHours.length > 1 &&
        businessDayOpeningHours[0].type == "close" &&
        dayOfWeek == "monday"
      ) {
        printBusinessHour(dayOfWeek, businessDayOpeningHours.slice(1));
      }

      if (
        businessDayOpeningHours.length > 0 &&
        businessDayOpeningHours.length % 2 != 0 &&
        businessDayOpeningHours[0].type == "open" &&
        dayOfWeek != "sunday"
      ) {
        const nextWorkingDay = daysOfTheWeek[i + 1];
        const nextBusinessHour = listOfWorkingHr[nextWorkingDay];
        businessDayOpeningHours[businessDayOpeningHours.length] =
          nextBusinessHour[0];
        nextBusinessHour.splice(0, 1);
        printBusinessHour(dayOfWeek, businessDayOpeningHours);
      }

      if (
        businessDayOpeningHours.length > 0 &&
        businessDayOpeningHours.length % 2 != 0 &&
        businessDayOpeningHours[0].type == "open" &&
        dayOfWeek == "sunday"
      ) {
        const nextWorkingDay = daysOfTheWeek[0];
        const nextBusinessHour = listOfWorkingHr[nextWorkingDay];
        businessDayOpeningHours[businessDayOpeningHours.length] =
          nextBusinessHour[0];
        nextBusinessHour.splice(0, 1);
        printBusinessHour(dayOfWeek, businessDayOpeningHours);
      }
    }
  };

  const printBusinessHour = (dayOfWeek, listOfBusinessHour) => {
    openingTime += dayOfWeek + ": \n";
    for (const hour of listOfBusinessHour) {
      openingTime += hour.type + " ";
      openingTime += moment(hour.value).format("hh:mm A") + ", ";
    }
    openingTime += "\n"; // Add a new Line
  };

  const printCloseBusinessDay = (dayOfWeek) => {
    openingTime += dayOfWeek;
    openingTime += ": ";
    openingTime += (dayOfWeek + ":", "Closed");
    openingTime += "\n";
  };

  openingHours(workHours);
  res.send(openingTime);
});

module.exports = router;
