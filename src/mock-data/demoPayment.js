export const demoPayment = {
  ride: {
    pickup: "123 Le Loi, District 1",
    dropoff: "456 Nguyen Trai, District 5",
    date: "2024-05-25",
    time: "14:30",
    driver: {
      name: "Bao Nguyen",
      avatar: "https://avatar.iran.liara.run/public/8",
      car: "Toyota Vios (White)",
      license: "51A-123.45",
    },
  },
  fare: {
    base: 30.0,
    distance: 15.0,
    tax: 2.0,
    total: 47.0,
    breakdown: [
      { label: "Base Fare", value: "$30.00" },
      { label: "Distance (10km)", value: "$15.00" },
      { label: "Tax", value: "$2.00" },
      { label: "Total", value: "$47.00" },
    ],
  },
  paymentMethod: "Card/Banking",
  delivery: {
    instant: true,
    method: "Instant e-Receipt",
    note: "Sent to your email",
  },
};
