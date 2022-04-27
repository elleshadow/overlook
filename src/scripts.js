import "./css/styles.css";
import { getCustomerByID } from "./classes/api-endpoints";
import {
  displayBookingsByUserID,
  displayUsername,
  setCalendarLimits,
  displayLoginScreen,
} from "./classes/domUpdates";

//Temp Functions==========================================================

let loginScreen = document.querySelector(".login-screen");
loginScreen.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    loginButton.click();
  }
});

let logoutBtn = document.querySelector(".random_user_button");
logoutBtn.addEventListener("click", () => {
  console.log("button working");
  run(undefined);
});

let loginButton = document.querySelector(".login__button");
loginButton.addEventListener("click", () => evaluateLogin());

let usernameTextbox = document.querySelector(".login__user-name");
let passwordTextbox = document.querySelector(".login__password");
let evaluateLogin = () => {
  usernameTextbox.classList.remove("invalid");
  passwordTextbox.classList.remove("invalid");
  let username = usernameTextbox.value;
  let password = passwordTextbox.value;
  let role = username.substring(0, 8);
  let customerID = username.replace(role, "");
  if (!IdCheck(customerID) || !roleCheck(role)) invalidUsername();
  if (!passwordCheck(password)) invalidPassword();
  if (IdCheck(customerID) && roleCheck(role) && passwordCheck(password))
    run(parseInt(customerID));
};
let roleCheck = (role) => {
  return role === "customer";
};

let IdCheck = (customerID) => {
  return customerID <= "50" && customerID >= "1";
};

let passwordCheck = (password) => {
  return password === "overlook2021";
};

let invalidUsername = () => {
  usernameTextbox.classList.add("invalid");
  passwordTextbox.classList.add("invalid");
};

let invalidPassword = () => {
  usernameTextbox.classList.add("invalid");
  passwordTextbox.classList.add("invalid");
};

const getRandomUser = () => {
  const maxUsers = 50;
  return Math.floor(Math.random() * maxUsers);
};

//===================================================================

const run = (userID) => {
  console.log(userID);
  logoutBtn.classList.add("hidden");
  hideTabs();
  if (!userID) {
    displayLoginScreen();
    return;
  }
  showTabs();
  logoutBtn.classList.remove("hidden");
  setCalendarLimits();
  getCustomerByID(userID)
    .then((user) => displayUsername(user))
    .catch(() => console.log(userID));
  displayBookingsByUserID(userID);
};

let showTabs = () => {
  let tabs = document.querySelectorAll(".nav__tab");
  tabs.forEach((tab) => {
    tab.classList.remove("hidden");
  });
};
let hideTabs = () => {
  let tabs = document.querySelectorAll(".nav__tab");
  tabs.forEach((tab) => {
    tab.classList.add("hidden");
  });
};

run();
