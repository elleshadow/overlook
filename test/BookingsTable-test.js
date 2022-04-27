import { expect } from "chai";
import BookingsTable from "../src/classes/BookingsTable";
import bookings from "./test-data/bookings.js";

describe("Bookings Table", function () {

  let bookingsTable;
  let expectedHTML = `<table class="invoice__table"><tr class="invoice__table__row"><th class="invoice__table__headder">Date</th><th class="invoice__table__headder">Room Number</th><th class="invoice__table__headder">Room Type</th><th class="invoice__table__headder">Beds</th><th class="invoice__table__headder">Cost</th></tr><tr class="invoice__table__row past-booking" id="5fwrgu4i7k55hl6sz"><td class="invoice__table__data date">4/22/2022</td><td class="invoice__table__data ">15</td><td class="invoice__table__data money">NaN</td></tr><tr class="invoice__table__row past-booking" id="5fwrgu4i7k55hl6t5"><td class="invoice__table__data date">1/24/2022</td><td class="invoice__table__data ">24</td><td class="invoice__table__data money">NaN</td></tr><tr class="invoice__table__row past-booking" id="5fwrgu4i7k55hl6t6"><td class="invoice__table__data date">1/10/2022</td><td class="invoice__table__data ">12</td><td class="invoice__table__data money">NaN</td></tr><tr class="invoice__table__row past-booking" id="5fwrgu4i7k55hl6t7"><td class="invoice__table__data date">2/16/2022</td><td class="invoice__table__data ">7</td><td class="invoice__table__data money">NaN</td></tr><tr class="invoice__table__row past-booking" id="5fwrgu4i7k55hl6t8"><td class="invoice__table__data date">2/5/2022</td><td class="invoice__table__data ">12</td><td class="invoice__table__data money">NaN</td></tr><tr class="invoice__table__row past-booking" id="5fwrgu4i7k55hl6t9"><td class="invoice__table__data date">2/14/2022</td><td class="invoice__table__data ">14</td><td class="invoice__table__data money">NaN</td></tr><tr class="invoice__table__row past-booking" id="5fwrgu4i7k55hl6ta"><td class="invoice__table__data date">1/11/2022</td><td class="invoice__table__data ">9</td><td class="invoice__table__data money">NaN</td></tr><tr class="invoice__table__row past-booking" id="5fwrgu4i7k55hl6tb"><td class="invoice__table__data date">2/6/2022</td><td class="invoice__table__data ">5</td><td class="invoice__table__data money">NaN</td></tr></table>`

  beforeEach(() => {
    bookingsTable = new BookingsTable(bookings);
  });


  it("Should be a function", () => {
    expect(BookingsTable).to.be.a("function");
  });

  it("Should be an instance of BookingsTable", () => {
    expect(bookingsTable).to.be.instanceOf(BookingsTable);
  });


  it("Should store bookings", () => {
    expect(bookingsTable.bookings).to.equal(bookings);
  });


  it("Should store HTML", () => {
    expect(bookingsTable.HTML).to.equal(expectedHTML);
  });

  it("Should have a method to create a table", () => {
    expect(bookingsTable.createTable).to.be.a("function");
  });


  it("Should have a method to create headder rows", () => {
    expect(bookingsTable.createTableHeadderRow).to.be.a("function");
  });


  it("Should have a method create table headers", () => {
    expect(bookingsTable.createHeadder).to.be.a("function");
  });


  it("Should have a method to create table data items", () => {
    expect(bookingsTable.createTableRows).to.be.a("function");
  });


  it("Should have a method to calulate a bookings age", () => {
    expect(bookingsTable.createBookingAge).to.be.a("function");
  });


  it("Should have a method to create table data", () => {
    expect(bookingsTable.createTableData).to.be.a("function");
  });


  it("Should have a method to return finalized HTML", () => {
    expect(bookingsTable.getHTML).to.be.a("function");


  });

    it("Should return finalized HTML", () => {

    expect(bookingsTable.getHTML()).to.equal(expectedHTML);

  });

});
