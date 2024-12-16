const { MongoClient, ObjectId } = require('mongodb');

const uri = "mongodb+srv://gp1:gp1password123@gp1.u2rpm.mongodb.net/?retryWrites=true&w=majority&appName=gp1";
const client = new MongoClient(uri);

const Employee = {
    create: async (employeeData) => {
        try {
            const db = client.db("gp1");
            const employeesCollection = db.collection('employees');
            const result = await employeesCollection.insertOne(employeeData);
            return result;
        } catch (err) {
            console.error("Error creating employee:", err);
        }
    },
    getAll: async () => {
        try {
            const db = client.db("gp1");
            const employeesCollection = db.collection('employees');
            return await employeesCollection.find().toArray();
        } catch (err) {
            console.error("Error retrieving all employees:", err);
        }
    },
    getById: async (id) => {
        try {
            const db = client.db("gp1");
            const employeesCollection = db.collection('employees');
            return await employeesCollection.findOne({ _id: new ObjectId(id) });
        } catch (err) {
            console.error("Error retrieving employee by ID:", err);
        }
    },
 update: async (id, employeeData) => {
    try {
        const db = client.db("gp1");
        const employeesCollection = db.collection('employees');
        const result = await employeesCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: { name: employeeData.name, position: employeeData.position } }
        );
        return result;
    } catch (err) {
        console.error("Error updating employee:", err);
    }
},

    delete: async (id) => {
        try {
            const db = client.db("gp1");
            const employeesCollection = db.collection('employees');
            const result = await employeesCollection.deleteOne({ _id: new ObjectId(id) });
            return result;
        } catch (err) {
            console.error("Error deleting employee:", err);
        }
    },
     addTask: async (employeeId,date,time,task,taskid,owenerid) => {
        console.log(date,time,task,taskid,owenerid);
    try {
      const db = client.db("gp1");
      const employeesCollection = db.collection('employees');
      const result = await employeesCollection.updateOne(
        { id: employeeId },
        { $push: { assignedTasks: {

           
        'date': date,
        'time': time,
        'task': task,
        'taskId': taskid,
      'ownerId': owenerid,
        }} }
      );
      return result;
    } catch (err) {
      console.error("Error adding task to employee:", err);
    }
  },

  removeTask: async (employeeId, taskId) => {
    try {
      const db = client.db("gp1");
      const employeesCollection = db.collection('employees');
      const result = await employeesCollection.updateOne(
        { _id: new ObjectId(employeeId) },
        { $pull: { assignedTasks: { taskId } } }
      );
      return result;
    } catch (err) {
      console.error("Error removing task from employee:", err);
    }
  }
};

module.exports = Employee;
