const express = require('express');
const app = express();
const userAuth = require('./middleware/userAuth');
const AppDataSource = require('./database/dbConnection');
const User = require('./model/user.model');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to check user authentication
app.use(userAuth);

// Function to check if user exists in the database
async function checkUserInDatabase(email) {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { email } });
    return user !== null;
}

// Function to register user in the database
async function registerUser(email, userDetails) {
    const userRepository = AppDataSource.getRepository(User);
    const newUser = userRepository.create({ email, ...userDetails });
    await userRepository.save(newUser);
}

// Route to handle login and redirection
app.get('/login', async (req, res) => {
    const userEmail = req.user.email; // Assuming user email is available in req.user
    const userExists = await checkUserInDatabase(userEmail);

    if (userExists) {
        res.redirect('/dashboard.html');
    } else {
        res.redirect('/Registration.html');
    }
});

// Route to handle registration
app.post('/user/register', async (req, res) => {
    const userEmail = req.user.email; // Assuming user email is available in req.user
    const userDetails = {
        name: req.body.name,
        institute: req.body.institute,
        mobile: req.body.mobile,
        participate: req.body.participate,
    };

    await registerUser(userEmail, userDetails);
    res.redirect('/dashboard.html');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
