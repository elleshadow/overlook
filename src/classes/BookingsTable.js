class BookingsTable {
  constructor(bookings) {
    if (!bookings) return;
    this.bookings = bookings;
    this.HTML = "";
    this.createTable();
  }

  getHTML = () => {
    return this.HTML;
  };

  createTable = () => {
    if (!this.bookings) return;
    let tableHeaderRow = this.createTableHeadderRow();
    let tableRows = this.createTableRows(this.bookings);
    this.HTML = `<table class="invoice__table">${tableHeaderRow}${tableRows}</table>`;
  };

  createTableHeadderRow = () => {
    let headders = ["Date", "Room Number", "Room Type", "Beds", "Cost"];
    let tableHeaders = headders.map((headder) => this.createHeadder(headder));

    return this.createHeadderRow(tableHeaders);
  };

  createHeadder = (content) => {
    if (!content || typeof content !== "string") return;
    return `<th class="invoice__table__headder">${content}</th>`;
  };

  createHeadderRow = (content) => {
    if (!content) return;
    return `<tr class="invoice__table__row">${content.join("")}</tr>`;
  };

  createTableRows = (bookings) => {
    if (!bookings) return;
    let tableRows = [];
    bookings.forEach((booking) => {
      let bookingDate = new Date(booking.date).toLocaleDateString("en-US");

      let content = [];
      content.push(this.createTableData(bookingDate, "date"));
      content.push(this.createTableData(booking.roomNumber));
      content.push(this.createTableData(booking.roomType, "room-type"));
      content.push(this.createTableData(booking.numBeds));
      content.push(
        this.createTableData(
          parseFloat(booking.costPerNight).toFixed(2).toLocaleString(),
          "money"
        )
      );

      tableRows.push(
        this.createTableRow(booking.id, bookingDate, content.join(""))
      );
    });
    return tableRows.join("");
  };

  createTableRow = (bookingId, bookingDate, content) => {
    if (!bookingId || !bookingDate || !content) return;

    let bookingAge = this.createBookingAge(bookingId, bookingDate);

    return `<tr class="invoice__table__row ${bookingAge}" id="${bookingId}">${content}</tr>`;
  };

  createBookingAge = (bookingId, bookingDate) => {
    if (!bookingId || !bookingDate) return;

    let bookingAge = "upcoming-booking";
    let timeStamp = new Date();
    if (timeStamp - bookingId < 10000) bookingAge = "new-booking";
    if (new Date(bookingDate) < timeStamp) bookingAge = "past-booking";
    return bookingAge;
  };

  createTableData = (data, className = "") => {
    if (!data) return;
    return `<td class="invoice__table__data ${className}">${data}</td>`;
  };
}
export default BookingsTable;
