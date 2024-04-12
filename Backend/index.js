require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')



const registerRouter = require('./routes/LoginRegisterDashboard/registerRouter');
const authRoutes = require('./routes/LoginRegisterDashboard/authRoutes');
const authDashboard = require('./routes/LoginRegisterDashboard/authDashboard');
const inventoryRoutes = require('./routes/inventory');
const feedbackRoutes = require('./routes/productFeedback');


const supplyManagementRoutes = require('./routes/SupplyManagementRoutes/SupplyManagementRoutes')
const supplierManagementRoutes = require('./routes/SupplyManagementRoutes/SupplierManagementRoutes')



const app = express()


//middleware
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173'],
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
    credentials: true
}));
app.use(cookieParser());
app.use(express.static('upload'))

//Prabashwara's Apis
app.use('/register', registerRouter);
app.use('/', authRoutes);
app.use('/dashboard', authDashboard);

//Binura's Api
app.use('/inventory', inventoryRoutes);
app.use('/feedback',feedbackRoutes);

app.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ Status: true })
})

//Supply Manager Api's
app.use('/supply-management/suppliers', supplierManagementRoutes)
app.use('/supply-management', supplyManagementRoutes)














//Rental - routes
const itemsRouter = require('./routes/RentalManagementRoutes/items');
const lendedItemsRouter = require('./routes/RentalManagementRoutes/lendedItems');
const userItemListRouter = require('./routes/RentalManagementRoutes/userItemList');
const reservedItemsRouter = require("./routes/RentalManagementRoutes/reservedItems");
const rentalReportRoutes = require('./routes/RentalManagementRoutes/rentalReports');

app.use('/items', itemsRouter); 
app.use('/lendedItems', lendedItemsRouter);
app.use('/userItemList', userItemListRouter);
app.use("/reservedItems", reservedItemsRouter);
app.use('/rentalReport', rentalReportRoutes); 


//Database connection
mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        //Server setup
        app.listen(process.env.PORT, () => {
            console.log('Connected to db and listening to port ', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })

