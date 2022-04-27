import { expect } from "chai";
import BookingsTable from "../src/classes/BookingsTable";

describe("Bookings Table", function () {
  let bookingsTable;

  beforeEach(() => {
    bookingsTable = new BookingsTable();
  });

  // Constructor Tests
  it("Should be a function", () => {
    expect(BookingsTable).to.be.a("function");
  });

  it("Should be an instance of BookingsTable", () => {
    expect(bookingsTable).to.be.instanceOf(BookingsTable);
  });

  //Peramitor Tests
  it("Should be accept a [peramitorName] peramitor", () => {
    expect(bookingsTable).to.be.instanceOf(BookingsTable);
  });

  //Happy Path Tests
  it("Should be accept a [peramitorName] peramitor", () => {
    expect(bookingsTable).to.be.instanceOf(BookingsTable);
  });

  //Sad Path Tests
  it("Should be accept a [peramitorName] peramitor", () => {
    expect(bookingsTable).to.be.instanceOf(BookingsTable);
  });

  //Method Tests
  it("Should have a method named [MethodName]", () => {
    expect(bookingsTable.methodName).to.be.a("function");
  });
});
