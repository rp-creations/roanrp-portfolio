# CB Photography — Booking & Receipting System

A Java Swing desktop application for **CB Creatives Photography**. It walks a
client through a booking, lets them pick services per event type, calculates the
total, records a payment method, and prints an itemized receipt.

![CB Creatives Photography](CB/Logo.png)

## What it does

1. **Client profile** — first/last name, age, email, address, contact number.
2. **Venue** — place and complete address.
3. **Event category** — wedding, birthday, corporate event, baptism, creative
   photography, or product photography.
4. **Services** — seven priced services per category, selected with checkboxes.
5. **Summary** — itemized total, with every stage editable before payment.
6. **Payment** — GCash, PayPal, or bank transfer.
7. **Receipt** — timestamped receipt number, saved to a text file and appended
   to a running history log.

### Event categories

| Category              | Example services                                                |
| --------------------- | --------------------------------------------------------------- |
| Wedding               | Pre-nup shoot, same-day edit, printed album, drone coverage     |
| Birthday              | Highlight video, photobooth, on-the-spot printing, slideshow    |
| Corporate Event       | Livestream setup, drone shots, team photoshoot, panel interviews |
| Baptism               | Ceremony coverage, reception video, group shots, full-day       |
| Creative Photography  | Conceptual shoot, fashion editorial, studio rental, retouching  |
| Product Photography   | Flat lay, 360-degree shots, lifestyle shoots, pack shots        |

Each category defines seven services and prices in an abstract `Category` class,
with one subclass per event type.

## Tech

- **Java** (Swing / AWT) — desktop UI built with `JFrame`, `GridBagLayout`,
  dialogs, and form controls.
- **OOP** — abstract `Category` model with six subclasses; encapsulated
  `Profile` and `Booking` objects.
- **File I/O** — receipts written with `FileWriter`/`BufferedReader` and a
  persistent `Receipt_History.txt`.
- No external libraries. Java 8+.

## Run it

From this folder:

```bash
javac CB/*.java CB/CategorySection/*.java
java CB.Main
```

If your shell does not expand wildcards:

```bash
javac CB/Booking.java CB/IsValid.java CB/Logo.java CB/Main.java CB/Profile.java \
      CB/CategorySection/*.java
java CB.Main
```

The app creates receipts in the working directory, so run it from a folder where
it is allowed to write.

## Data & privacy

Real client receipts are **not** included in this repository. `.gitignore`
excludes `Receipt_*.txt`, `Receipt_History.txt`, and compiled `.class` files.
Receipts contain client names, contact details, venues, and payment methods —
treat them as personal data and keep them out of version control.

## Structure

```text
CB/
  Main.java                 entry point and booking flow
  Profile.java              client record
  Booking.java              venue record
  Logo.java                 classpath-safe window icon loader
  IsValid.java              console input helpers (kept for reference)
  Logo.png                  CB Creatives mark
  CategorySection/
    Category.java           abstract service menu + pricing + selection UI
    Wedding.java
    Birthday.java
    CorporateEvent.java
    Baptism.java
    CreativePhotography.java
    ProductPhotography.java
```

## Known limitations

- Single-user desktop app; bookings are not stored in a database.
- Payment method is recorded, not processed — there is no gateway integration.
- Receipt numbers are randomised rather than sequential.
- No automated tests; the flow was validated manually.

---

Part of the [Roan Pantalla portfolio](https://github.com/rp-creations/roanrp-portfolio).
