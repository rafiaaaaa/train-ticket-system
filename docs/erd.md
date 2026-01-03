# ERD – Train Ticket Booking System

---

## Entity: Station

Description:
Represents a train station.

Fields:

- id
- name
- code (unique)
- city

Relations:

- Has many Routes as origin
- Has many Routes as destination

---

## Entity: Train

Description:
Represents a physical train.

Fields:

- id
- name
- code
- totalSeats

Relations:

- Has many Seats
- Has many Schedules

---

## Entity: Route

Description:
Represents a route between two stations.

Fields:

- id
- originStationId
- destinationStationId
- distanceKm

Relations:

- Belongs to origin Station
- Belongs to destination Station
- Has many Schedules

---

## Entity: Schedule

Description:
Represents a scheduled trip of a train.

Fields:

- id
- trainId
- routeId
- departureTime
- arrivalTime
- price

Relations:

- Belongs to Train
- Belongs to Route
- Has many Bookings

---

## Entity: Seat

Description:
Represents a seat inside a train.

Fields:

- id
- trainId
- seatNumber

Relations:

- Belongs to Train
- Can be linked to many Bookings (via BookingSeat)

---

## Entity: Booking

Description:
Represents a ticket booking.

Fields:

- id
- scheduleId
- status (PENDING, PAID, EXPIRED)
- expiresAt

Relations:

- Belongs to Schedule
- Has many BookingSeats
- Has one Payment

---

## Entity: BookingSeat

Description:
Join table between Booking and Seat.

Fields:

- id
- bookingId
- seatId

Relations:

- Belongs to Booking
- Belongs to Seat

---

## Entity: Payment

Description:
Represents a payment for a booking.

Fields:

- id
- bookingId
- amount
- status
- paidAt

Relations:

- Belongs to Booking
