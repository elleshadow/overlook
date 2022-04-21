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
    fetch(`http://localhost:3001/api/v1/customers/${id}`)
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw Error(response.statusText)
            }
        }).then(data => console.log(data))
        .catch(err => console.log(err))
}

const getAllRooms = () => {
    fetch(`http://localhost:3001/api/v1/rooms`)
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw Error(response.statusText)
            }
        }).then(data => console.log(data))
        .catch(err => console.log(err))
}

const getAllBookings = () => {
    fetch(`http://localhost:3001/api/v1/bookings`)
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw Error(response.statusText)
            }
        }).then(data => console.log(data))
        .catch(err => console.log(err))
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

export { getAllRooms, getCustomerByID, getAllCustomers, getAllBookings, addNewBooking, deleteBooking }