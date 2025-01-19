const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
bodyParser.json({ limit: '50mb' })

const multer = require('./uploadimage');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const sendEmailRoutes = require('./routes/sendemail');
const paymentRoutes = require('./routes/paymentRoutes');
const complaintRoutes = require('./routes/complaintRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const postRoutes = require('./routes/postRoutes');
const maintenanceRequestRoutes = require('./routes/maintenanceRequestRoutes');
const maintenanceRcordsRoutes = require('./routes/maintenanceRecords');
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
const availableSchedules= require('./routes/availableSchedulesRoute');
const app = express();
const port = 3000;


app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use('/api/users', userRoutes);
app.use('/api', sendEmailRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/salesRequests', salesRequests);
app.use('/api/maintenanceRequests', maintenanceRequestRoutes);
app.use('/api/maintenanceRcords', maintenanceRcordsRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/sales', saleRoutes);
app.use('/api/offers', offerRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/deliveryRequests', deliveryRequestRoutes);
app.use('/api/chats', chatRoutes);
app.use('/api/availableSchedules', availableSchedules);

app.use('/api/towingservices',towingserviceRoutes);
app.use('/api/usersignuprequests', usersignuprequests);

app.get('/', (req, res) => {
    
    res.send('Server is running...');
});





app.post('/upload', async (req, res) => { 
    
    try {
        const { imageData } = req.body;  
        if (!imageData) {
            return res.status(400).send('No image data provided.');
        }

        
        const optimizedUrl = await multer(imageData);

        const obj={
            'optimizedUrl': optimizedUrl,
            message: 'Image uploaded successfully',
            
        }
        
        res.status(200).json(obj);
    } catch (error) {
        console.error('Error in upload route:', error);
        res.status(500).send('Failed to upload image');
    }
});

async function startServer() {
    try {
        
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    } catch (err) {
        console.error('Failed to start the server:', err);
        process.exit(1);
    }
}

startServer();