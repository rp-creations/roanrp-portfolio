package CB;

import javax.swing.ImageIcon;
import java.io.File;
import java.net.URL;

/**
 * Window icon, loaded from the classpath so the project runs from any folder.
 * Falls back to the source tree when classes are run in place.
 */
public interface Logo {
    ImageIcon icon = loadIcon();

    static ImageIcon loadIcon() {
        URL resource = Logo.class.getResource("/CB/Logo.png");

        if (resource == null) {
            File file = new File("CB/Logo.png");
            if (file.isFile()) {
                try {
                    resource = file.toURI().toURL();
                } catch (Exception ignored) {
                    // Fall through to the empty icon below.
                }
            }
        }

        return resource == null ? new ImageIcon() : new ImageIcon(resource);
    }
}
