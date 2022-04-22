// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import { getAllRooms, getCustomerByID, getAllCustomers, getAllBookings, getBookingsById, addNewBooking, deleteBooking } from './classes/api-endpoints'
import { displayBookings, displayUsername } from './classes/domUpdates';
import User from './classes/User';


const currentUserID = 1

getCustomerByID(currentUserID).then(user => displayUsername(user))
getBookingsById(currentUserID).then(bookings => displayBookings(bookings))









