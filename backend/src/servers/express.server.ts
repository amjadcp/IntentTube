import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from '../configs/passport.config';
import { SESSION_SECRET } from '../configs/env.config';
import authenticationRouter from '../features/authentication/authentication.router';

const app = express();

// Security middleware
app.use(helmet());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// Body parsing and cookies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Session and Passport
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, secure: false }, // Set secure: true in production
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', authenticationRouter);

// Health check
app.get('/health', (req, res) => res.send('OK'));

const PORT = process.env.PORT || 5000;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app; 