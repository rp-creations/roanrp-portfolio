package CB;

class Booking {
    private String place;
    private String cAddress;

    public Booking(String place, String cAddress) {
        this.place = place;
        this.cAddress = cAddress;
    }

    // Getters
    public String getPlace() {
        return place;
    }

    public String getAddress() {
        return cAddress;
    }

    // Setters
    public void setPlace(String place) {
        this.place = place;
    }

    public void setAddress(String cAddress) {
        this.cAddress = cAddress;
    }

    // Method to reset the booking
    public void resetBooking() {
        this.place = "";      // Set to empty string
        this.cAddress = "";   // Set to empty string
    }
}
