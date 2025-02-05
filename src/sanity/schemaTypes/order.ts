const orderschema = {
  name: "order",
  title: "Order",
  type: "document",
  fields: [
    { name: "firstName", type: "string", title: "First Name" },
    { name: "lastName", type: "string", title: "Last Name" },
    { name: "address", type: "string", title: "Address" },
    { name: "city", type: "string", title: "City" },
    { name: "zipCode", type: "string", title: "Zip Code" },
    { name: "phone", type: "string", title: "Phone Number" },
    { name: "email", type: "string", title: "Email" },
    { name: "total", type: "number", title: "Total Amount" },
    {
      name: "items",
      title: "Order Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "product", type: "reference", to: [{ type: "products" }] },
            { name: "quantity", type: "number", title: "Quantity" },
            { name: "price", type: "number", title: "Price" },
          ],
        },
      ],
    },
    { name: "status", type: "string", title: "Order Status", options: { list: ["pending", "shipped", "delivered"] } },
  ],
};
export default orderschema;
