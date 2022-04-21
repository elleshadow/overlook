class User {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.bookings = []
    }
}
export default User;