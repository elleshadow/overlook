let sortBookingsByDate = (bookings) => {
    bookings.sort((a, b) => {
        return a.date - b.date
    })
}

let displayBookings = (bookings) => {
    sortBookingsByDate(bookings)
    let tableHTML = ''
    tableHTML += '<table>'
    tableHTML += `<tr>`
    tableHTML += `<th>Date</th>`
    tableHTML += `<th>Room Number</th>`
    tableHTML += `<th>Room Type</th>`
    tableHTML += `<th>Bidet</th>`
    tableHTML += `<th>Beds</th>`
    tableHTML += `<th>Cost</th>`
    tableHTML += `</tr>`

    bookings.forEach(booking => {
        tableHTML += `<tr>`
        tableHTML += `<td class="date">${new Date(booking.date).toLocaleDateString("en-US")}</td>`
        tableHTML += `<td>${booking.roomNumber}</td>`
        tableHTML += `<td>${booking.roomType}</td>`
        tableHTML += `<td>${booking.bidet}</td>`
        tableHTML += `<td>${booking.numBeds}</td>`
        tableHTML += `<td class="money">$${booking.costPerNight.toFixed(2)}</td>`
        tableHTML += `</tr>`
    })

    tableHTML += '</table>'
    document.querySelector('.view-customer').innerHTML = tableHTML
    displayBookingTotal(bookings)
    document.querySelector('.view-customer').classList.remove('hidden')
    show(document.querySelector('.view-customer'))
}

let hide = (element) => {
    [element].classlist.add('hidden')
}

let show = (element) => {
    [element].classlist.remove('hidden')
}

let displayBookingTotal = (bookings) => {
    let bookingTotal = bookings.reduce((total, booking) => {
        return total += booking.costPerNight
    }, 0)
    document.querySelector('.total').innerText = `$${bookingTotal.toFixed(2)}`
}

let displayUsername = (user) => {
    document.querySelector('.username').innerText = user.name
}

export {displayBookings, displayUsername}