const Orders = [
  {
    id: "ORD-2026-001",
    date: "2026-02-25",
    total: 22000,
    status: "delivered",
    items: [{ name: "Luxury Khimar", quantity: 1, price: 22000 }],
  },
  {
    id: "ORD-2026-002",
    date: "2026-02-26",
    total: 120000,
    status: "shipped",
    items: [
      { name: "Royal Agbada", quantity: 1, price: 85000 },
      { name: "Elegant Abaya", quantity: 1, price: 35000 },
    ],
  },
  {
    id: "ORD-2026-003",
    date: "2026-02-27",
    total: 70000,
    status: "processing",
    items: [{ name: "Premium Aso Ebi Lace", quantity: 1, price: 70000 }],
  },
];

export default Orders;
