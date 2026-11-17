package CB;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.io.*;
import javax.swing.*;
import java.awt.*;
import CB.CategorySection.*;

public class Main implements Logo {
    private static Profile person;
    private static Booking booking;
    private static int venueNumber = 1;
    protected static Category category;

    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> new Main().createMainFrame());
    }

    // Main Interface
    private void createMainFrame() {
        JFrame mainFrame = new JFrame("CB Creatives Photography Services");
        mainFrame.setSize(410, 200);
        mainFrame.setIconImage(icon.getImage());
        mainFrame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        mainFrame.setResizable(false);
        mainFrame.setLocationRelativeTo(null);

        mainFrame.setLayout(new GridBagLayout());
        GridBagConstraints gbc = new GridBagConstraints();
        gbc.fill = GridBagConstraints.HORIZONTAL;
        gbc.insets = new Insets(10, 10, 10, 10);

        JLabel welcomeLabel = new JLabel(" Welcome to CB Creatives Photography Services! ", JLabel.CENTER);
        welcomeLabel.setFont(new Font("Arial", Font.BOLD, 16));
        gbc.gridx = 0;
        gbc.gridy = 0;
        gbc.weighty = 1;
        mainFrame.add(welcomeLabel, gbc);

        JPanel buttonPanel = new JPanel();
        buttonPanel.setLayout(new GridBagLayout());

        JButton startBookingButton = new JButton("Start Booking");
        startBookingButton.setBackground(Color.DARK_GRAY);
        startBookingButton.setForeground(Color.WHITE);
        startBookingButton.setFocusable(false);

        JButton historyButton = new JButton("History");
        historyButton.setBackground(Color.DARK_GRAY);
        historyButton.setForeground(Color.WHITE);
        historyButton.setFocusable(false);

        startBookingButton.addActionListener(e -> {
            mainFrame.dispose();
            createProfile();
        });

        historyButton.addActionListener(e -> {
            mainFrame.dispose();
            showReceiptHistory();
        });

        GridBagConstraints buttonGbc = new GridBagConstraints();
        buttonGbc.fill = GridBagConstraints.BOTH;
        buttonGbc.weightx = 1;
        buttonGbc.insets = new Insets(5, 5, 5, 5);

        buttonPanel.add(startBookingButton, buttonGbc);

        buttonGbc.gridy = 1;
        buttonPanel.add(historyButton, buttonGbc);

        gbc.gridx = 0;
        gbc.gridy = 1;
        gbc.weighty = 0;
        mainFrame.add(buttonPanel, gbc);
        mainFrame.setVisible(true);
    }

    private static void createProfile() {
        JFrame profileFrame = new JFrame("Profile Information");
        profileFrame.setSize(400, 310);
        profileFrame.setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
        profileFrame.setLayout(new GridBagLayout());
        profileFrame.setResizable(false);

        GridBagConstraints gbc = new GridBagConstraints();
        gbc.insets = new Insets(0, 0, 4, 0);
        gbc.fill = GridBagConstraints.HORIZONTAL;
        gbc.anchor = GridBagConstraints.WEST;

        JLabel instructionLabel = new JLabel("Please fill out this form to proceed:");
        gbc.gridx = 0;
        gbc.gridy = 0;
        gbc.gridwidth = 2;
        gbc.anchor = GridBagConstraints.CENTER;
        profileFrame.add(instructionLabel, gbc);
        profileFrame.setIconImage(Logo.icon.getImage());

        JTextField fnameField = createTextField();
        fnameField.setText(person != null ? person.getFirstName() : "");

        JTextField lnameField = createTextField();
        lnameField.setText(person != null ? person.getLastName() : "");

        JTextField ageField = createTextField();
        ageField.setText(person != null ? person.getAge() : ""); 

        JTextField eAddressField = createTextField();
        eAddressField.setText(person != null ? person.getEmailAddress() : "");

        JTextField addressField = createTextField();
        addressField.setText(person != null ? person.getAddress() : "");

        JTextField cnumberField = createTextField();
        cnumberField.setText(person != null ? person.getContactNumber() : ""); 

        addField(profileFrame, gbc, "First Name:", fnameField, 1);
        addField(profileFrame, gbc, "Last Name:", lnameField, 2);
        addField(profileFrame, gbc, "Age:", ageField, 3);
        addField(profileFrame, gbc, "Email Address:", eAddressField, 4);
        addField(profileFrame, gbc, "Address:", addressField, 5);
        addField(profileFrame, gbc, "Contact Number:", cnumberField, 6);

        JButton submitButton = new JButton("Proceed");
        submitButton.setBackground(Color.DARK_GRAY);
        submitButton.setForeground(Color.WHITE);
        submitButton.addActionListener(e -> {

            String fname = fnameField.getText().trim();
            String lname = lnameField.getText().trim();
            String eAddress = eAddressField.getText().trim();
            String address = addressField.getText().trim();
            String age = ageField.getText().trim();
            String cnumber = cnumberField.getText().trim();

            if (fname.isEmpty() || lname.isEmpty() || age.isEmpty() || eAddress.isEmpty() || address.isEmpty()
                    || cnumber.isEmpty()) {
                JOptionPane.showMessageDialog(profileFrame,
                        "All fields must be filled out. Please enter valid information.",
                        "Input Error", JOptionPane.ERROR_MESSAGE);
                profileFrame.dispose();
                createProfile();
                return;
            } else {
                person = new Profile(fname, lname, address, cnumber, eAddress, age);
            }

            if (!age.matches("\\d+")) {
                JOptionPane.showMessageDialog(profileFrame,
                        "Age must be a number. Please enter a valid age.",
                        "Input Error", JOptionPane.ERROR_MESSAGE);
                person.setAge("");
                profileFrame.dispose();
                createProfile();
                return;
            } else {
                person.setAge(age);
            }

            if (!cnumber.matches("\\d+")) {
                JOptionPane.showMessageDialog(profileFrame,
                        "Contact number must be a number. Please enter a valid number.",
                        "Input Error", JOptionPane.ERROR_MESSAGE);
                person.setContactNumber("");
                profileFrame.dispose();
                createProfile();
                return;
            } else {
                person.setContactNumber(cnumber);
            }

            person.setFirstName(fname);
            person.setLastName(lname);
            person.setEmailAddress(eAddress);
            person.setAddress(address);
            person.setAge(age);
            person.setContactNumber(cnumber); 

            profileFrame.dispose();
            if (profileModify) {
                profileModify = false;
                createBooking();
            } else {
                showBookingSummary(category);
            }
        });

        gbc.gridx = 0;
        gbc.gridy = 7;
        gbc.gridwidth = 2;
        gbc.anchor = GridBagConstraints.CENTER;
        profileFrame.add(submitButton, gbc);

        profileFrame.setLocationRelativeTo(null);
        profileFrame.setVisible(true);
    }

    private static boolean profileModify = true;

    private static void addField(JFrame frame, GridBagConstraints gbc, String labelText, JTextField textField,
            int row) {
        gbc.gridx = 0;
        gbc.gridy = row;
        gbc.gridwidth = 1;
        frame.add(new JLabel(labelText), gbc);

        gbc.gridx = 1;
        frame.add(textField, gbc);
    }

    private static JTextField createTextField() {
        JTextField textField = new JTextField();
        textField.setPreferredSize(new Dimension(250, 30));
        return textField;
    }

    // For Venue Information
    private static void createBooking() {
        JFrame bookingFrame = new JFrame("Venue Information");
        bookingFrame.setSize(420, 200);
        bookingFrame.setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
        bookingFrame.setLayout(new GridBagLayout());
        bookingFrame.setResizable(false);
        GridBagConstraints gbc = new GridBagConstraints();
        gbc.insets = new Insets(2, 2, 4, 2);
        gbc.fill = GridBagConstraints.HORIZONTAL;

        Dimension fieldSize = new Dimension(250, 30);

        JLabel instructionLabel = new JLabel("Please fill out this form to proceed:");
        gbc.gridx = 0;
        gbc.gridy = 0;
        gbc.gridwidth = 2;
        gbc.anchor = GridBagConstraints.CENTER;
        bookingFrame.add(instructionLabel, gbc);

        JLabel placeLabel = new JLabel("Place:");
        JTextField placeField = new JTextField();
        placeField.setText(booking != null ? booking.getPlace() : "");
        placeField.setPreferredSize(fieldSize);

        JLabel addressLabel = new JLabel("Complete Address:   ");
        JTextField addressField = new JTextField();
        addressField.setText(booking != null ? booking.getAddress() : "");
        addressField.setPreferredSize(fieldSize);

        gbc.gridwidth = 1;
        gbc.gridx = 0;
        gbc.gridy = 1;
        bookingFrame.add(placeLabel, gbc);

        gbc.gridx = 1;
        bookingFrame.add(placeField, gbc);

        gbc.gridx = 0;
        gbc.gridy = 2;
        bookingFrame.add(addressLabel, gbc);

        gbc.gridx = 1;
        bookingFrame.add(addressField, gbc);

        JButton submitButton = new JButton("Proceed");
        submitButton.setBackground(Color.DARK_GRAY);
        submitButton.setForeground(Color.WHITE);
        submitButton.addActionListener(e -> {
            String place = placeField.getText().trim();
            String completeAddress = addressField.getText().trim();

            if (place.isEmpty() || completeAddress.isEmpty()) {
                JOptionPane.showMessageDialog(bookingFrame,
                        "Please fill in both the place and complete address fields.",
                        "Input Error", JOptionPane.ERROR_MESSAGE);
            } else {
                booking = new Booking(place, completeAddress);
                bookingFrame.dispose();

                if (venueModify) {
                    selectCategory();
                    venueModify = false;
                } else {
                    showBookingSummary(category);
                }
            }
        });

        gbc.gridx = 0;
        gbc.gridy = 3;
        gbc.gridwidth = 2;
        gbc.anchor = GridBagConstraints.CENTER;
        bookingFrame.add(submitButton, gbc);

        bookingFrame.setLocationRelativeTo(null);
        bookingFrame.setIconImage(Logo.icon.getImage());
        bookingFrame.setVisible(true);
    }

    private static boolean venueModify = true;

    // For Event Category
    private static void selectCategory() {
        JFrame categoryFrame = new JFrame("Select Event Category");
        categoryFrame.setSize(300, 400);
        categoryFrame.setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
        categoryFrame.setResizable(false);

        String[] options = { "Wedding", "Birthday", "Corporate Event", "Baptism", "Creative Photography",
                "Product Photography" };
        String choice = (String) JOptionPane.showInputDialog(
                categoryFrame,
                "Choose a category for your event:",
                "Event Category",
                JOptionPane.PLAIN_MESSAGE,
                null,
                options,
                options[0]);

        if (choice == null) {
            categoryFrame.dispose();
            new Main().createMainFrame();
            return;
        }

        switch (choice) {
            case "Wedding":
                category = new Wedding();
                break;
            case "Birthday":
                category = new Birthday();
                break;
            case "Corporate Event":
                category = new CorporateEvent();
                break;
            case "Baptism":
                category = new Baptism();
                break;
            case "Creative Photography":
                category = new CreativePhotography();
                break;
            case "Product Photography":
                category = new ProductPhotography();
                break;
            default:
                JOptionPane.showMessageDialog(categoryFrame, "Invalid choice! Please select again.");
                selectCategory();
                return;
        }

        categoryFrame.dispose();
        categoryFrame.setIconImage(Logo.icon.getImage());
        category.selectOptionsFrame();
    }

    // Modify Book Information
    private static void showModifyOptions() {
        JFrame modifyFrame = new JFrame("Modify Options");
        modifyFrame.setSize(300, 300);
        modifyFrame.setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
        modifyFrame.setLayout(new GridBagLayout());
        modifyFrame.setIconImage(Logo.icon.getImage());
        GridBagConstraints gbc = new GridBagConstraints();
        gbc.insets = new Insets(4, 4, 4, 4);
        gbc.fill = GridBagConstraints.HORIZONTAL;

        JButton modifyVenueButton = new JButton("Modify Venue");
        JButton modifyProfileButton = new JButton("Modify Profile");
        JButton modifyCategoryButton = new JButton("Modify Category");
        JButton modifyServicesButton = new JButton("Modify Services");
        JButton backButton = new JButton("Go Back");

        modifyProfileButton.setFocusable(false);
        modifyProfileButton.setBackground(Color.DARK_GRAY);
        modifyProfileButton.setForeground(Color.WHITE);

        modifyVenueButton.setForeground(Color.WHITE);
        modifyVenueButton.setBackground(Color.DARK_GRAY);

        modifyCategoryButton.setBackground(Color.DARK_GRAY);
        modifyCategoryButton.setForeground(Color.WHITE);

        modifyServicesButton.setBackground(Color.DARK_GRAY);
        modifyServicesButton.setForeground(Color.WHITE);

        backButton.setBackground(Color.DARK_GRAY);
        backButton.setForeground(Color.WHITE);

        modifyProfileButton.addActionListener(e -> {
            modifyFrame.dispose();
            createProfile();
        });

        modifyVenueButton.addActionListener(e -> {
            modifyFrame.dispose();
            createBooking();
        });

        modifyCategoryButton.addActionListener(e -> {
            modifyFrame.dispose();
            selectCategory();
        });

        modifyServicesButton.addActionListener(e -> {
            modifyFrame.dispose();
            category.selectOptionsFrame();
        });

        backButton.addActionListener(e -> {
            modifyFrame.dispose();
            showBookingSummary(category);
        });

        gbc.gridx = 0;
        gbc.gridy = 0;
        modifyFrame.add(modifyProfileButton, gbc);

        gbc.gridy = 1;
        modifyFrame.add(modifyVenueButton, gbc);

        gbc.gridy = 2;
        modifyFrame.add(modifyCategoryButton, gbc);

        gbc.gridy = 3;
        modifyFrame.add(modifyServicesButton, gbc);

        gbc.gridy = 4;
        modifyFrame.add(backButton, gbc);

        modifyFrame.setLocationRelativeTo(null);
        modifyFrame.setVisible(true);
    }

    // show History
    private static void showReceiptHistory() {
        JFrame historyFrame = new JFrame("Receipt History");
        historyFrame.setSize(400, 500);
        historyFrame.setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
        historyFrame.setLayout(new BorderLayout());

        JTextArea textArea = new JTextArea();
        textArea.setEditable(false);
        textArea.setFont(new Font("Monospaced", Font.PLAIN, 12));

        JScrollPane scrollPane = new JScrollPane(textArea);
        historyFrame.add(scrollPane, BorderLayout.CENTER);

        String historyFileName = "Receipt_History.txt";

        try (BufferedReader reader = new BufferedReader(new FileReader(historyFileName))) {
            String line;
            boolean isEmpty = true;

            while ((line = reader.readLine()) != null) {
                isEmpty = false;
                textArea.append(line + "\n");
            }

            if (isEmpty) {
                textArea.setText("No receipt history found.");
            }
        } catch (FileNotFoundException e) {
            textArea.setText("Receipt history file not found.\n");
        } catch (IOException e) {
            textArea.setText("Error reading receipt history: " + e.getMessage());
        }

        JButton goBackButton = new JButton("Go Back");
        goBackButton.setBackground(Color.DARK_GRAY);
        goBackButton.setForeground(Color.WHITE);
        goBackButton.addActionListener(e -> {
            historyFrame.dispose();
            new Main().createMainFrame();
        });

        JPanel buttonPanel = new JPanel();
        buttonPanel.add(goBackButton);
        historyFrame.add(buttonPanel, BorderLayout.SOUTH);

        historyFrame.setResizable(false);
        historyFrame.setLocationRelativeTo(null);
        historyFrame.setVisible(true);
    }

    // Payment Method
    private static String selectPaymentMethod() {
        String[] paymentMethods = { "GCash", "PayPal", "Bank Transfer" };
        return (String) JOptionPane.showInputDialog(null, "Select Payment Method:", "Payment",
                JOptionPane.PLAIN_MESSAGE, null, paymentMethods, paymentMethods[0]);
    }

    // Booking Summary
    public static void showBookingSummary(Category category) {
        StringBuilder summary = new StringBuilder();
        summary.append(" CB Creatives Photography Summary\n");
        summary.append(" Client Name: " + person.getFirstName() + " " + person.getLastName() + "\n");
        summary.append(" Venue Number: " + venueNumber + "\n");
        summary.append(" Venue Category: " + category.getCategoryName() + "\n");
        summary.append(" Place: " + booking.getPlace() + "\n");
        summary.append(" Address: " + booking.getAddress() + "\n");
        summary.append("\n Selected Services:\n");

        String[] selectedOptions = category.getSelectedOptions();
        double[] selectedPrices = category.getSelectedPrices();
        for (int i = 0; i < selectedOptions.length; i++) {
            summary.append(String.format(" - %-30s ₱%.2f%n", selectedOptions[i], selectedPrices[i]));
        }

        summary.append("\n Total Price: ₱" + category.getPrice() + "\n");

        JFrame summaryFrame = new JFrame("Booking Summary");
        summaryFrame.setSize(400, 400);
        summaryFrame.setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
        summaryFrame.setLayout(new BorderLayout());

        JTextArea summaryTextArea = new JTextArea();
        summaryTextArea.setText(summary.toString());
        summaryTextArea.setEditable(false);
        summaryTextArea.setFont(new Font("Monospaced", Font.PLAIN, 12));
        summaryFrame.setIconImage(Logo.icon.getImage());

        JScrollPane scrollPane = new JScrollPane(summaryTextArea);
        summaryFrame.add(scrollPane, BorderLayout.CENTER);

        JPanel buttonPanel = new JPanel();
        JButton modifyButton = new JButton("Modify");
        modifyButton.setBackground(Color.DARK_GRAY);
        modifyButton.setForeground(Color.WHITE);

        JButton proceedButton = new JButton("Proceed to Payment");
        proceedButton.setBackground(Color.DARK_GRAY);
        proceedButton.setForeground(Color.WHITE);

        modifyButton.addActionListener(e -> {

            summaryFrame.dispose();
            showModifyOptions();
        });

        proceedButton.addActionListener(e -> {
            String paymentMethod = selectPaymentMethod();
            if (paymentMethod == null) return;
            summaryFrame.dispose();
            showReceipt(category, paymentMethod);
        });

        buttonPanel.add(modifyButton);
        buttonPanel.add(proceedButton);
        summaryFrame.add(buttonPanel, BorderLayout.SOUTH);

        // Finalize frame settings
        summaryFrame.setLocationRelativeTo(null);
        summaryFrame.setVisible(true);
    }

    // Final Reciept
    private static void showReceipt(Category category, String paymentMethod) {
        String receiptNumber = "#" + (int) (Math.random() * 100000);

        // Generate receipt details
        String receiptDetails = printDetails(receiptNumber, category, paymentMethod, true);

        // Create the JFrame to display the receipt
        JFrame receiptFrame = new JFrame("Receipt");
        receiptFrame.setSize(380, 500);
        receiptFrame.setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
        receiptFrame.setLayout(new BorderLayout());
        receiptFrame.setIconImage(icon.getImage());

        // Text area to display receipt details
        JTextArea receiptTextArea = new JTextArea();
        receiptTextArea.setText(receiptDetails);
        receiptTextArea.setEditable(false);
        receiptTextArea.setFont(new Font("Monospaced", Font.PLAIN, 12));

        JScrollPane scrollPane = new JScrollPane(receiptTextArea);
        receiptFrame.add(scrollPane, BorderLayout.CENTER);

        // Save the individual receipt file
        try (FileWriter writer = new FileWriter("Receipt_" + receiptNumber + ".txt")) {
            writer.write(receiptDetails);
            JOptionPane.showMessageDialog(null, "Receipt saved as Receipt_" + receiptNumber + ".txt");
        } catch (IOException e) {
            JOptionPane.showMessageDialog(null, "Error saving receipt: " + e.getMessage());
        }

        // Append the receipt to the history file
        String historyFileName = "Receipt_History.txt";
        try (FileWriter historyWriter = new FileWriter(historyFileName, true)) { // Append mode
            historyWriter.write(receiptDetails + "\n"); // Append receipt details with a newline
        } catch (IOException e) {
            JOptionPane.showMessageDialog(null, "Error updating receipt history: " + e.getMessage());
        }

        // Create buttons for user actions
        JPanel buttonPanel = new JPanel();

        JButton bookAgainButton = new JButton("Book Again");
        bookAgainButton.setBackground(Color.DARK_GRAY);
        bookAgainButton.setForeground(Color.WHITE);
        bookAgainButton.addActionListener(e -> {
            venueNumber++;
            receiptFrame.dispose();
            person.resetProfile();
            profileModify = true;
            venueModify = true;
            booking.resetBooking();
            new Main().createMainFrame();
        });

        JButton exitButton = new JButton("Exit");
        exitButton.setBackground(Color.DARK_GRAY);
        exitButton.setForeground(Color.WHITE);
        exitButton.addActionListener(e -> receiptFrame.dispose());

        buttonPanel.add(bookAgainButton);
        buttonPanel.add(exitButton);

        receiptFrame.add(buttonPanel, BorderLayout.SOUTH);

        receiptFrame.setLocationRelativeTo(null);
        receiptFrame.setVisible(true);
    }

    private static String printDetails(String receiptNumber, Category category, String paymentMethod,
            boolean isReceipt) {
        StringBuilder details = new StringBuilder();

        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String formattedDateTime = now.format(formatter);

        details.append("===================================================\n");
        details.append("          CB Creatives Photography " + (isReceipt ? "Receipt" : "Summary") + "\n");
        details.append("===================================================\n");

        details.append(" Date & Time       : " + formattedDateTime + "\n");

        if (isReceipt) {
            details.append(" Receipt Number    : " + receiptNumber + "\n");
        }
        details.append(" Client Name       : " + person.getFirstName() + " " + person.getLastName() + "\n\n");
        details.append(" Venue Number      : " + venueNumber + "\n");
        details.append(" Venue Category    : " + category.getCategoryName() + "\n");
        details.append(" Place             : " + booking.getPlace() + "\n");
        details.append(" Address           : " + booking.getAddress() + "\n");
        details.append("===================================================\n");

        String[] selectedOptions = category.getSelectedOptions();
        double[] selectedPrices = category.getSelectedPrices();
        for (int i = 0; i < selectedOptions.length; i++) {
            details.append(String.format(" %-17s - P%.2f\n", selectedOptions[i], selectedPrices[i]));
        }

        details.append("===================================================\n");
        details.append(String.format(" Total Price       : P%.2f\n", category.getPrice()));

        if (isReceipt) {
            details.append(" Payment Method    : " + paymentMethod + "\n");
        }
        details.append("===================================================\n");

        return details.toString();
    }
}