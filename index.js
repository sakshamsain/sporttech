import express from 'express';
import path from 'path';
import morgan from 'morgan';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import userRoutes from './routes/user.routes.js';
import adminRoutes from './routes/admin.routes.js';
import paymentRoutes from './routes/payment.routes.js';
import adminMiddleware from './middleware/adminAuth.js';
import teamRoutes from './routes/team.route.js';
import net from 'net';
import { getRepository } from 'typeorm';
import User from './model/user.model.js';
import userAuth from './middleware/userAuth.js'; // Add this line

const app = express();
dotenv.config();

app.use(morgan("dev"));
app.use(helmet());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get("/auth_config.json", (req, res) => {
    res.sendFile(path.join(__dirname, "auth_config.json"));
});
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'about.html'));
});
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});
app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

app.post('/user/register', async (req, res) => {
  const userRepository = getRepository(User);
  const user = userRepository.create(req.body);
  await userRepository.save(user);
  res.status(201).json({ message: 'User registered successfully' });
});



// app.use("/", commonRoutes)
app.use("/user", userRoutes)
app.use("/admin", adminRoutes)
app.use("/payment", paymentRoutes)
app.use("/team", teamRoutes)



const PORT = process.env.PORT || 3000;

const checkPort = (port) => {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.once('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        reject(new Error(`Port ${port} is already in use`));
      } else {
        reject(err);
      }
    });
    server.once('listening', () => {
      server.close();
      resolve();
    });
    server.listen(port);
  });
};

const startServer = async () => {
  try {
    await checkPort(PORT);
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

startServer();