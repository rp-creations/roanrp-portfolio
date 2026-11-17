package CB;

import java.util.*;

public class IsValid {
    static Scanner scan = new Scanner(System.in);

    public static int getValidInt(String prompt) {
        int number = 0;
        boolean valid = false;

        while (!valid) {
            System.out.print(prompt);
            try {
                number = scan.nextInt();
                scan.nextLine();
                valid = true;
            } catch (InputMismatchException e) {
                System.out.println("Invalid input. Please enter a valid integer.");
                scan.nextLine(); // Clear invalid input
            }
        }
        return number;
    }

    public static long getValidLong(String prompt) {
        long number = 0;
        boolean valid = false;

        while (!valid) {
            System.out.print(prompt);
            try {
                number = scan.nextLong();
                valid = true;
            } catch (InputMismatchException e) {
                System.out.println("Invalid input. Please enter a valid long integer.");
                scan.next(); // Clear invalid input
            }
        }

        return number;
    }

    public static String getValidString(String prompt) {
        String input = "";
        boolean valid = false;

        while (!valid) {
            System.out.print(prompt);
            input = scan.nextLine().trim();
            if (!input.isEmpty()) {
                valid = true;
            } else {
                System.out.println("Invalid input. Please enter a non-empty value.");
            }
        }

        return input;
    }
}
