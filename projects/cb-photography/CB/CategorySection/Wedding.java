package CB.CategorySection;

public class Wedding extends Category {
    public Wedding() {
        super("Wedding",
                new String[] { "Pre-Nup Shoot", "Same-Day Edit (SDE)", "Wedding Album (Printed)", "Drone Coverage",
                        "Reception Coverage", "Full-Day Coverage", "Additional Photographer" },
                new double[] { 5000, 10000, 7000, 8000, 6000, 15000, 5000 });
    }
}