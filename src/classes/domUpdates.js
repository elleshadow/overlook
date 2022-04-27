import {
  getAvailableRoomsByDate,
  addNewBooking,
  getBookingsById,
} from "./api-endpoints";
import BookingsTable from "./BookingsTable";

let viewBookingBtn = document.getElementById("bookings");
let bookRoomBtn = document.getElementById("book-a-room");
let searchBtn = document.getElementById("book-a-room__search");
let datePicker = document.querySelector(".book-a-room__date-picker");
let roomsFilters = document.querySelector(".book-a-room__filter");
let availRoomsGridDisplay = document.querySelector(".available-rooms");
let bookingsTable = document.querySelector(".invoice__table");
let views = document.querySelectorAll(".main__view");
let currentUserDisplay = document.querySelector(".username");
let totalDisplay = document.querySelector(".total");

viewBookingBtn.addEventListener("click", (e) => {
  if (!e) return;
  displayView(e.target.id);
});

roomsFilters.addEventListener("click", (e) => {
  if (!e.target.classList.contains("radio")) return;
  filterRoomsByType(e.target.id);
});

searchBtn.addEventListener("click", (e) => {
  if (!e) return;
  try {
    datePicker.showPicker();
  } catch (error) {
    window.alert(
      "So... Good news: this feature has decent error handling; bad news, this feature only seems to work in Chrome"
    );
  }
});

let sortBookingsByDate = (bookings) => {
  if (!bookings) return;
  bookings.sort((a, b) => {
    return b.date - a.date;
  });
};

let sortBookingsByRoomNumber = (bookings) => {
  if (!bookings) return;
  bookings.sort((a, b) => {
    return a.roomNumber - b.roomNumber;
  });
};

let displayLoginScreen = () => {
  document.querySelector(".login__user-name").value = "";
  document.querySelector(".login__password").value = "";
  currentUserDisplay.classList.add("hidden");
  document.querySelector(".login").classList.remove("hidden");
  return displayView("login-screen");
};

let displayView = (view) => {
  if (!view) return;
  resetViews();
  let selectedView = document.querySelector("." + view);
  selectedView.classList.remove("hidden");
  return;
};

let resetViews = () => {
  views.forEach((view) => {
    view.classList.add("hidden");
  });
};

let displayBookings = (bookings) => {
  if (!bookings) return;
  resetCards();
  sortBookingsByRoomNumber(bookings);
  sortBookingsByDate(bookings);
  displayView("bookings");
  let table = new BookingsTable(bookings);
  bookingsTable.innerHTML = table.getHTML();
  totalDisplay.innerText = calculateBookingTotal(bookings);
};

let calculateBookingTotal = (bookings) => {
  if (!bookings) return;
  return bookings
    .reduce((total, booking) => {
      return (total += booking.costPerNight);
    }, 0)
    .toLocaleString();
};

let sortRoomsByCost = (rooms) => {
  rooms.sort((a, b) => {
    b.costPerNight - a.costPerNight;
  });
};

let displayAvailableRooms = (rooms, selectedDate) => {
  if (!rooms || !selectedDate) return;
  sortRoomsByCost(rooms);

  selectedDate = selectedDate.split("-").join("/");
  let currentUserId = currentUserDisplay.dataset.userId;

  let roomTypes = { all: 0 };
  rooms = rooms.map((room) => {
    let beds = "Single";
    let bidet = "";
    let bedSize = room.bedSize;
    let roomStyle = room.roomType.replace("single", "");
    let RoomTypeID = room.roomType.replace(" ", "-");
    let cost = parseFloat(room.costPerNight).toFixed(2).toLocaleString();
    let starRating = room.costPerNight / 6;

    if (room.numBeds > 1) beds = "Double";
    if (room.bidet) bidet = " with bidet";
    let title = `${beds} ${bedSize}<br> ${roomStyle}${bidet}`;

    if (!roomTypes[room.roomType]) roomTypes[room.roomType] = 0;
    roomTypes[room.roomType]++;
    roomTypes.all++;

    return createRoomCard(
      currentUserId,
      room.number,
      RoomTypeID,
      selectedDate,
      title,
      cost,
      starRating
    );
  });
  availRoomsGridDisplay.innerHTML = rooms.join("");
  return roomTypes;
};

let createRoomCard = (
  currentUserId,
  roomNumber,
  RoomTypeID,
  selectedDate,
  title,
  cost,
  starRating
) => {
  return `<div class="card"
    data-user-id="${currentUserId}"
    data-room-number="${roomNumber}" 
    data-room-type="${RoomTypeID}" 
    data-selected-date="${selectedDate}">
    <h3 class="card__title">${title}</h3>
    <p class="card__price">${cost}</p>
    <button class="button card__button" >Book Now!</button>
    <lable class="card__review" style="width:${starRating}px;">⭐️⭐️⭐️⭐️⭐️</lable>
    </div>`;
};

let displayUsername = (user) => {
  currentUserDisplay.classList.remove("hidden");
  currentUserDisplay.innerText = user.name;
  currentUserDisplay.dataset.userId = user.id;
};

let setCalendarLimits = () => {
  let dateToday = new Date();
  let currentYear = dateToday.getFullYear();
  let currentDay = dateToday.getDate();
  let currentMonthIndex = dateToday.getMonth();
  let currentMonth = ++currentMonthIndex;

  let maxYear = currentYear;
  let maxDay = currentDay;
  let maxMonth = currentMonth + 1;

  if (maxDay > 28) {
    maxDay = 1;
    ++maxMonth;
  }

  if (maxMonth > 12) {
    maxMonth = 1;
    ++maxYear;
  }

  if (currentDay < 10) currentDay = "0" + currentDay;
  if (currentMonth < 10) currentMonth = "0" + currentMonth;
  if (maxMonth < 10) maxMonth = "0" + maxMonth;

  datePicker.min = `${currentYear}-${currentMonth}-${currentDay}`;
  datePicker.max = `${maxYear}-${maxMonth}-${maxDay}`;
};

let showAllRooms = () => {
  let rooms = document.querySelectorAll(".card");
  rooms.forEach((room) => {
    room.classList.remove("hidden");
  });
};

let hideAllRooms = () => {
  let rooms = document.querySelectorAll(".card");
  rooms.forEach((room) => {
    room.classList.add("hidden");
  });
};

let showAllFilters = () => {
  roomsFilters.classList.remove("hidden");
};

let clearFilters = () => {
  roomsFilters.innerHTML = "";
};

let filterRoomsByType = (roomTypeID) => {
  hideAllRooms();
  if (roomTypeID === "all") return showAllRooms();
  let rooms = document.querySelectorAll(`[data-room-type="${roomTypeID}"]`);
  rooms.forEach((room) => {
    room.classList.remove("hidden");
  });
};

let resetCards = () => {
  clearFilters();
  hideAllRooms();
  searchBtn.innerText = "Select a Date";
  datePicker.value = "";
  return;
};

datePicker.addEventListener("change", () => {
  let selectedDate = datePicker.value;
  if (selectedDate === "") return resetCards();
  searchBtn.innerText = selectedDate;
  showAllFilters();
  getAvailableRoomsByDate(selectedDate)
    .then((rooms) => displayAvailableRooms(rooms, selectedDate))
    .then((roomTypes) => displayFilters(roomTypes));
});

let displayFilters = (roomTypes) => {
  clearFilters();
  let roomKeys = Object.keys(roomTypes);
  roomKeys.forEach((key) => {
    let count = roomTypes[key];
    displayFilter(key, count);
  });
  document.getElementById("all").checked = true;
};

availRoomsGridDisplay.addEventListener("click", (e) => {
  if (!e.target.classList.contains("button")) return;
  let cardButton = e.target;
  let card = cardButton.parentNode;
  let { roomNumber, selectedDate, userId } = card.dataset;
  if (!roomNumber || !selectedDate || !userId) return;

  addNewBooking(parseInt(userId), selectedDate, parseInt(roomNumber)).then(
    (userId) => {
      displaySuccessFeedback(cardButton);
      setTimeout(() => displayBookingsByUserID(userId), 2000);
    }
  );
});

let displaySuccessFeedback = (cardButton) => {
  cardButton.classList.remove("button");
  cardButton.classList.add("card__button--success");
  cardButton.innerText = "✅";
};

let displayBookingsByUserID = (userId) => {
  getBookingsById(userId).then((bookings) => displayBookings(bookings));
  viewBookingBtn.click();
};

let displayFilter = (roomType, count = 0) => {
  let filterTitle = `${roomType.replace("single", "")} (${count})`;
  let filterID = roomType.replace(" ", "-");
  let filter = `
  <input class="radio book-a-room__filter__radio" type="radio" name="filter-buttons" id="${filterID}">
  <label role="button" for="${filterID}">${filterTitle}</label>`;
  roomsFilters.innerHTML += filter;
};

bookRoomBtn.addEventListener("click", () => displayView("book-a-room"));
export {
  displayBookings,
  displayUsername,
  displayBookingsByUserID,
  displayLoginScreen,
  setCalendarLimits,
};
