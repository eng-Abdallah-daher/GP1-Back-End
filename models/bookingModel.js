const { MongoClient, ObjectId } = require('mongodb');

const uri = "mongodb+srv://gp1:gp1password123@gp1.u2rpm.mongodb.net/?retryWrites=true&w=majority&appName=gp1";
const client = new MongoClient(uri);

const Booking = {
    create: async (bookingData) => {
        try {
            const db = client.db("gp1");
            const bookingsCollection = db.collection('Booking');
            const result = await bookingsCollection.insertOne(bookingData);
            return result;
        } catch (err) {
            console.error("Error creating booking:", err);
        }
    },
    getAll: async () => {
        try {
            const db = client.db("gp1");
            const bookingsCollection = db.collection('Booking');
            return await bookingsCollection.find().toArray();
        } catch (err) {
            console.error("Error retrieving bookings:", err);
        }
    },
    getById: async (id) => {
        try {
            const db = client.db("gp1");
            const bookingsCollection = db.collection('Booking');
            return await bookingsCollection.findOne({ bookingId:Number(id)  });
        } catch (err) {
            console.error("Error retrieving booking by ID:", err);
        }
    },
 update: async (id, bookingData) => {
    try {
        const db = client.db("gp1");
        const bookingsCollection = db.collection('Booking');
        const result = await bookingsCollection.updateOne(
            { bookingId:Number(id)  },
            { 
                $set: {
                    customerName: bookingData.customerName,
                    appointmentDate: new Date(bookingData.appointmentDate)
                }
            }
        );
        return result;
    } catch (err) {
        console.error("Error updating booking:", err);
    }
},

    updateStatus: async (id, status) => {
        try {
            const db = client.db("gp1");
            const bookingsCollection = db.collection('Booking');
            const result = await bookingsCollection.updateOne(
                { bookingId:Number(id)  },
                { $set: { status: status } }
            );
            return result;
        } catch (err) {
            console.error("Error updating booking status:", err);
        }
    },
    delete: async (id) => {
        try {
            const db = client.db("gp1");
            const bookingsCollection = db.collection('Booking');
            const result = await bookingsCollection.deleteOne({ bookingId:Number(id)  });
            return result;
        } catch (err) {
            console.error("Error deleting booking:", err);
        }
    }
};

module.exports = Booking;
