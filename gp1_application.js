const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const complaintRoutes = require('./routes/complaintRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/salesRequestRoute');
const maintenanceRequestRoutes = require('./routes/maintenanceRequestRoutes');
const itemRoutes = require('./routes/itemRoutes');
const cartRoutes = require('./routes/cartRoutes');
const saleRoutes = require('./routes/saleRoutes');
const offerRoutes = require('./routes/offerRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const deliveryRequestRoutes = require('./routes/deliveryRequestRoutes');
const chatRoutes = require('./routes/chatRoutes');
const salesRequests=require('./routes/salesRequestRoute');
const towingserviceRoutes= require('./routes/towingServiceRoutes');
const usersignuprequests= require('./routes/userSignUpRequestRoute');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.use('/api/users', userRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/salesRequests', salesRequests);
app.use('/api/comments', commentRoutes);
app.use('/api/maintenanceRequests', maintenanceRequestRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/sales', saleRoutes);
app.use('/api/offers', offerRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/deliveryRequests', deliveryRequestRoutes);
app.use('/api/chats', chatRoutes);

app.use('/api/towingservices',towingserviceRoutes);
app.use('/api/usersignuprequests', usersignuprequests);
app.get('/', (req, res) => {
    res.send('Server is running...');
});

async function startServer() {
    try {
        // await connectDB();
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    } catch (err) {
        console.error('Failed to start the server:', err);
        process.exit(1);
    }
}

startServer();
