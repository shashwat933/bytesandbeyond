const express = require('express');
const cors = require('cors');

const dotenv = require('dotenv');
const connectDB = require("./confiq/MONGO");
const userRoutes = require('./Routes/userRoute');
const blogRoutes = require('./Routes/blogRoutes');
dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());

app.use('/user', userRoutes);
app.use('/blog', blogRoutes);

app.get('/', (req, res) => {
    return res.status(200).send({
        message: "RUNNING SUCCESSFULLY"
    })
})
connectDB();
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server Running on ${PORT}`);
})
