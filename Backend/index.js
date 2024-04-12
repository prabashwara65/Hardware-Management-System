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

const CreatevehicleRoutes = require('./routes/DeliveryManagementRoutes/VehicleRoutes/CreateVehicleRoute');
const VehicleViewRoutes = require('./routes/DeliveryManagementRoutes/VehicleRoutes/VehicleViewRoute');
const GetVehicleRoutes = require('./routes/DeliveryManagementRoutes/VehicleRoutes/GetVehicleRoutes');
const VehicleUpdateDeleteRoutes = require('./routes/DeliveryManagementRoutes/VehicleRoutes/UpdateAndDeleteRoutes');



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




//-----------------------------------------------------------------------------------------------------------------------------------------------------//

////Prabashwara's API's
///Vehicle Database


//Create Vehicle
app.use('/CreateVehicle', CreatevehicleRoutes);

//View Vehicles
app.use('/VehicleView' , VehicleViewRoutes);

//Get Vehicle ID for Update
app.use('/getVehicle' , GetVehicleRoutes);

//Update and Delete Vehicle data
app.use('/VehicleUpdateDelete' , VehicleUpdateDeleteRoutes);


app.use('/VehicleDelete' , VehicleViewRoutes);

// //Update and Delete Vehicle data
// app.put('/VehicleUpdateDelete/:id', async (req, res) => {
//     const id = req.params.id;
//     try {
//         // Find the vehicle by ID and update its details
//         const updatedVehicle = await VehicleModel.findByIdAndUpdate(
//             id,
//             {
//                 name: req.body.name,
//                 model: req.body.model,
//                 millage: req.body.millage,
//                 availability: req.body.availability
//             },
//             { new: true } // To return the updated document
//         );

//         // Send the updated vehicle as response
//         res.json(updatedVehicle);
//     } catch (error) {
//         // Handle errors
//         console.error(error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

// //Delete Vehicle 
// app.delete('/VehicleDelete/:id', (req, res) => {
//     const id = req.params.id;
//     DeliveryModel.findByIdAndDelete({_id: id})
//         .then(deletedDelivery => {
//             res.json(deletedDelivery); // Send the deleted delivery as JSON response
//         })
//         .catch(err => {
//             res.status(500).json({ error: err.message }); // Send error response if there's an error
//         });
// });


// Update vehicle availability
app.put('/updateVehicleAvailability/:id', async (req, res) => {
    const id = req.params.id;
    try {
        // Find the vehicle by ID and update its availability
        const updatedVehicle = await VehicleModel.findByIdAndUpdate(
            id,
            {
                availability: req.body.availability
            },
            { new: true } // To return the updated document
        );

        // Send the updated vehicle as response
        res.json(updatedVehicle);
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



///DeliveryDatabase
//Create Delivery
app.post("/CreateDelivery", (req, res) => {
    console.log("Request Body:", req.body); // Log the request body
    DeliveryModel.create(req.body)
        .then(vehicle => res.json(vehicle))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        });
});

//View Vehicles
app.get('/DeliveryView' , (req , res) => {
    DeliveryModel.find({})
    .then(Users => res.json(Users))
    .catch(err => res.json(err))
})

////Get Delivery ID for Update
app.get('/getDelivery/:id' , (req,res)=> {
    const id = req.params.id;
    DeliveryModel.findById({_id : id})
    .then(Users => res.json(Users))
    .catch(err => res.json(err))
})


//Get Delivery ID for Delete
app.delete('/DeliveryDelete/:id', (req, res) => {
    const id = req.params.id;
    DeliveryModel.findByIdAndDelete({_id: id})
        .then(deletedDelivery => {
            res.json(deletedDelivery); // Send the deleted delivery as JSON response
        })
        .catch(err => {
            res.status(500).json({ error: err.message }); // Send error response if there's an error
        });
});

//Delivery Update and Delete 
app.put('/DeliveryUpdateDelete/:id', async (req, res) => {
    const id = req.params.id;
    try {
        // Find the vehicle by ID and update its details
        const updatedVehicle = await DeliveryModel.findByIdAndUpdate(
            id,
            {
                shippingAddress: req.body.shippingAddress,
                selectVehicle: req.body.selectVehicle,
                deliveryCost: req.body.deliveryCost,
                estimateTime: req.body.estimateTime

            },
            { new: true } // To return the updated document
        );

        // Send the updated vehicle as response
        res.json(updatedVehicle);
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

//-----------------------------------------------------------------------------------------------------------------------------------------------------//



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

