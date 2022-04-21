import { use } from "chai"

const getAllCustomers = () => {
    fetch('http://localhost:3001/api/v1/customers')
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw Error(response.statusText)
            }
        }).then(data => console.log(data))
        .catch(err => console.log(err))
} 

const getCustomerByID = (id) => {
    if (!id || typeof(id) !== 'number') return 
    return fetch(`http://localhost:3001/api/v1/customers/${id}`)
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw Error(response.statusText)
            }
        })
        .catch(err => console.log(err))
}

const getAllRooms = () => {
   return fetch(`http://localhost:3001/api/v1/rooms`)
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw Error(response.statusText)
            }
        }).then(data => data)
        .catch(err => console.log(err))
}

const getAllBookings = () => {
    return getAllRooms().then(rooms => {
        return fetch(`http://localhost:3001/api/v1/bookings`)
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw Error(response.statusText)
                }
            }).then(data => {
               return data.bookings.map(booking => {
                   let currentRoom = rooms.rooms.find(room => {
                      return room.number === booking.roomNumber
                   })
                    return {
                        "id": booking.id,
                        "userID": booking.userID,
                        "date": booking.date,
                        "roomNumber": booking.roomNumber,
                        "roomType": currentRoom.roomType,
                        "bidet": currentRoom.bidet,
                        "bedSize": currentRoom.bedSize,
                        "numBeds": currentRoom.numBeds,
                        "costPerNight": currentRoom.costPerNight
                    }
                })
            })
            .catch(err => console.log(err))
    })
}

const getBookingsById = (currentUserID) => {
    if (!currentUserID || currentUserID < 1 || currentUserID > 50) return
    return getAllRooms().then(rooms => {
        return fetch(`http://localhost:3001/api/v1/bookings`)
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw Error(response.statusText)
                }
            }).then(data => {
                return data.bookings.map(booking => {
                    let currentRoom = rooms.rooms.find(room => {
                        return room.number === booking.roomNumber
                    })
                    return {
                        "id": booking.id,
                        "userID": booking.userID,
                        "date": Date.parse(booking.date),
                        "roomNumber": booking.roomNumber,
                        "roomType": currentRoom.roomType,
                        "bidet": currentRoom.bidet,
                        "bedSize": currentRoom.bedSize,
                        "numBeds": currentRoom.numBeds,
                        "costPerNight": currentRoom.costPerNight
                    }
                })
            }).then(data => {
               return data.filter(booking => {
                    return booking.userID === currentUserID
                })
            })
            .catch(err => console.log(err))
    })
}

const addNewBooking = (userID, bookingDate, roomNumber) => {
    fetch("http://localhost:3001/api/v1/users", {
        method: "POST",
        body: JSON.stringify({
            'userID': userID,
            'date': bookingDate,
            'roomNumber': roomNumber
        }),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => {
        if (response.ok) {
            return { ok: true }
        } else {
            throw Error(response.statusText)
        }
    }).catch(err => console.log(err))
}

const deleteBooking = (bookingID) => {
    fetch(`http://localhost:3001/api/v1/bookings/${bookingID}`, {
        method: "Delete",
        body: JSON.stringify({
            'ID': bookingID,
        }),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => {
        if (response.ok) {
            return { ok: true }
        } else {
            throw Error(response.statusText)
        }
    }).catch(err => console.log(err))
}

export { getAllRooms, getCustomerByID, getAllCustomers, getAllBookings, getBookingsById, addNewBooking, deleteBooking }