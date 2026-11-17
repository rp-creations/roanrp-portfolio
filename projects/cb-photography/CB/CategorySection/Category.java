package CB.CategorySection;

import CB.*;

import javax.swing.*;
import java.awt.*;
import java.util.ArrayList;

public abstract class Category extends Main {
    public double totalPrice;
    protected String categoryName;

    public String[] options;
    public double[] optionPrices;
    public ArrayList<Integer> selectedIndices; 

    public Category(String categoryName, String[] options, double[] optionPrices) {
        this.categoryName = categoryName;
        this.options = options;
        this.optionPrices = optionPrices;
        this.selectedIndices = new ArrayList<>(); 
    }

    public String getCategoryName() {
        return categoryName;
    }

    public double getPrice() {
        return totalPrice;
    }

    public String[] getSelectedOptions() {
        String[] selected = new String[selectedIndices.size()];
        for (int i = 0; i < selectedIndices.size(); i++) {
            selected[i] = options[selectedIndices.get(i)]; 
        }
        return selected;
    }

    public double[] getSelectedPrices() {
        double[] selectedPrices = new double[selectedIndices.size()];
        for (int i = 0; i < selectedIndices.size(); i++) {
            selectedPrices[i] = optionPrices[selectedIndices.get(i)]; 
        }
        return selectedPrices;
    }

    public void selectOptionsFrame() {
        JFrame selectionFrame = new JFrame("Service Selection");
        selectionFrame.setSize(400, 400);
        selectionFrame.setLayout(new GridBagLayout());
        selectionFrame.setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
        selectionFrame.setLocationRelativeTo(null);
    
        GridBagConstraints gbc = new GridBagConstraints();
        gbc.insets = new Insets(2, 2, 5, 2);
        gbc.fill = GridBagConstraints.HORIZONTAL;
    
        JLabel titleLabel = new JLabel("Select Services for " + categoryName, JLabel.CENTER);
        titleLabel.setFont(new Font("Arial", Font.BOLD, 16));
        gbc.gridx = 0;
        gbc.gridy = 0;
        gbc.gridwidth = 2;
        selectionFrame.add(titleLabel, gbc);
    
        JCheckBox[] checkboxes = new JCheckBox[options.length];
        for (int i = 0; i < options.length; i++) {
            checkboxes[i] = new JCheckBox(options[i] + " - ₱" + optionPrices[i]);
            checkboxes[i].setSelected(selectedIndices.contains(i));
            gbc.gridy = i + 1;
            gbc.gridwidth = 2;
            selectionFrame.add(checkboxes[i], gbc);
        }
    
        JButton submitButton = new JButton("Submit");
        submitButton.setBackground(Color.DARK_GRAY);
        submitButton.setForeground(Color.WHITE);
        submitButton.addActionListener(e -> {
           
            totalPrice = 0; 
            selectedIndices.clear(); 
    
            boolean atLeastOneSelected = false;
    
            for (int i = 0; i < options.length; i++) {
                if (checkboxes[i].isSelected()) {
                    selectedIndices.add(i);
                    totalPrice += optionPrices[i]; 
                    System.out.println("Added service: " + options[i]);
                    atLeastOneSelected = true; 
                } else {
                    System.out.println("Removed service: " + options[i]);
                }
            }
    
            if (!atLeastOneSelected) {

                JOptionPane.showMessageDialog(selectionFrame,
                        "Please select at least one service to proceed.",
                        "Selection Required", JOptionPane.WARNING_MESSAGE);
                return; 
                
                
            }
    
            System.out.println("Total Price: ₱" + totalPrice);
            selectionFrame.dispose(); 
            showBookingSummary(this); 
        });
    
        gbc.gridy = options.length + 1;
        gbc.gridwidth = 1;
        gbc.anchor = GridBagConstraints.CENTER;
        selectionFrame.add(submitButton, gbc);
        selectionFrame.setIconImage(Logo.icon.getImage());
        selectionFrame.setVisible(true);
    }
    
}