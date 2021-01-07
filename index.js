const express = require('express');
const connectDb = require('./config/db');
const cors = require('cors');
const { LOGIN_ROLES }  = require('./utils/constants');
const auth = require('./middleware/auth');

const app = express();

//db connection
connectDb();

app.use(express.json({extended: false}));
app.use(cors());

app.use('/api/auth', require('./routes/api/auth'));
// app.use((req, res, next) => {
//     if (req.header('x-auth-token')) return auth(req, res, next);
  
//     if (req.header('api_key') && req.header('api_key') === config.get("API_KEY")) {
//       req['role'] = constants.LOGIN_ROLES.ADMIN;
//       return next();
//     }
//     // return next() // TODO send next to let us proceed with requests that do not require authentication
//     return res.status(401).send('Not Authorized!');
//   });

//routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/hospital', require('./routes/api/hospitals'));
app.use('/api/request', require('./routes/api/request'));

const PORT = process.env.port || 5000;
app.listen(PORT, ()=> console.log(`Server Started on port ${PORT}`));