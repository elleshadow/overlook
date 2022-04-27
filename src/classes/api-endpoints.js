const getAllRooms = () => {
  return fetch(`http://localhost:3001/api/v1/rooms`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then((data) => data)
    .catch((err) => console.log(err));
};

const getAvailableRoomsByDate = (date) => {
  if (!date) return;
  let selectedDate = date.toLocaleString().split("-").join("/");

  return fetch(`http://localhost:3001/api/v1/rooms`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then((hotel) => {
      return getAllBookings()
        .then((bookings) => {
          return bookings.filter((booking) => {
            return booking.date.toLocaleString() === selectedDate;
          });
        })
        .then((conflicts) => {
          if (conflicts.length) {
            conflicts.forEach((conflect) => {
              const index = hotel.rooms.findIndex(
                (room) => room.number === conflect.roomNumber
              );
              hotel.rooms.splice(index, 1);
            });
          }
          return hotel.rooms;
        });
    })
    .catch((err) => console.log(err));
};

const getCustomerByID = (id) => {
  if (!id || typeof id !== "number") return;
  return fetch(`http://localhost:3001/api/v1/customers/${id}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .catch((err) => console.log(err));
};

const getAllBookings = () => {
  return getAllRooms().then((rooms) => {
    return fetch(`http://localhost:3001/api/v1/bookings`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw Error(response.statusText);
        }
      })
      .then((data) => {
        return data.bookings.map((booking) => {
          let currentRoom = rooms.rooms.find((room) => {
            return room.number === booking.roomNumber;
          });
          return {
            id: booking.id,
            userID: booking.userID,
            date: booking.date,
            roomNumber: booking.roomNumber,
            roomType: currentRoom.roomType,
            bidet: currentRoom.bidet,
            bedSize: currentRoom.bedSize,
            numBeds: currentRoom.numBeds,
            costPerNight: currentRoom.costPerNight,
          };
        });
      })
      .catch((err) => console.log(err));
  });
};

const getBookingsById = (currentUserID) => {
  if (!currentUserID || currentUserID < 1 || currentUserID > 50) return;

  return getAllRooms().then((rooms) => {
    return fetch(`http://localhost:3001/api/v1/bookings`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw Error(response.statusText);
        }
      })
      .then((data) => {
        return data.bookings.map((booking) => {
          let currentRoom = rooms.rooms.find((room) => {
            return room.number === booking.roomNumber;
          });
          return {
            id: booking.id,
            userID: booking.userID,
            date: Date.parse(booking.date),
            roomNumber: booking.roomNumber,
            roomType: currentRoom.roomType,
            bidet: currentRoom.bidet,
            bedSize: currentRoom.bedSize,
            numBeds: currentRoom.numBeds,
            costPerNight: currentRoom.costPerNight,
          };
        });
      })
      .then((data) => {
        return data.filter((booking) => {
          return booking.userID === currentUserID;
        });
      })
      .catch((err) => console.log(err));
  });
};

const addNewBooking = (userID, bookingDate, roomNumber) => {
  if (!userID || !bookingDate || !roomNumber) return;

  return fetch("http://localhost:3001/api/v1/bookings", {
    method: "POST",
    body: JSON.stringify({
      userID: userID,
      date: bookingDate,
      roomNumber: roomNumber,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then((data) => data.newBooking.userID)
    .catch((err) => console.log(err));
};

export {
  getCustomerByID,
  getBookingsById,
  getAvailableRoomsByDate,
  addNewBooking,
};
