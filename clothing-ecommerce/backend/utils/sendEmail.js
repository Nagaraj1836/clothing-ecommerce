const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', // or use Mailtrap/SendGrid (smtp config)
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendOrderEmail = async (order, user) => {
  const itemsHtml = order.items.map(i => `<li>${i.name} (${i.size}) x${i.qty} - ₹${i.price}</li>`).join('');
  const html = `
    <h1>Thank you for your order!</h1>
    <p>Order ID: ${order._id}</p>
    <p>Date: ${new Date(order.orderDate).toLocaleString()}</p>
    <h3>Items:</h3><ul>${itemsHtml}</ul>
    <h2>Total: ₹${order.totalPrice}</h2>
    <p>We will update you when your order ships.</p>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: `Order Confirmation - #${order._id}`,
    html
  });
};

module.exports = { sendOrderEmail };
