package CB;

class Profile {
    private String firstName;
    private String lastName;
    private String address;
    private String contactNumber;
    private String emailAddress;
    private String age;

    public Profile(String firstName, String lastName, String address, String contactNumber, String emailAddress, String age) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.contactNumber = contactNumber;
        this.emailAddress = emailAddress;
        this.age = age;
    }

  
    public void resetProfile() {
        this.firstName = "";         // Set to empty string
        this.lastName = "";          // Set to empty string
        this.address = "";           // Set to empty string
        this.contactNumber = "";   // Set to null
        this.emailAddress = "";       // Set to empty string
        this.age = "";                // Set to zero
    }

    public void resetField() {
        this.age = "";
        this.contactNumber = "";
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setAge(String age) {
        this.age = age;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    } 
    public String getAddress() {
        return address;
    }

    public String getAge() {
        return age;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }
}
