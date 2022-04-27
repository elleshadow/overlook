import "./css/styles.css";
import { getCustomerByID } from "./classes/api-endpoints";
import {
  displayBookingsByUserID,
  displayUsername,
  setCalendarLimits,
} from "./classes/domUpdates";

//Temp Functions==========================================================

let randomUserBtn = document.querySelector(".random_user_button");
randomUserBtn.addEventListener("click", () => run());

const getRandomUser = () => {
  const maxUsers = 50;
  return Math.floor(Math.random() * maxUsers);
};

//===================================================================

const run = (userID = getRandomUser()) => {
  setCalendarLimits();
  getCustomerByID(userID)
    .then((user) => displayUsername(user))
    .catch(() => console.log(userID));
  displayBookingsByUserID(userID);
};

run();
