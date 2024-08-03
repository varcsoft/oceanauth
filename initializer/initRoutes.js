import errorHandler from '../middlewares/error.js';
import authRoutes from "../routes/auth.js";
import userRoutes from "../routes/user.js";
import login_historyRoutes from "../routes/login_history.js";
import verifyRoutes from "../routes/verify.js";
import auth from "../middlewares/checkAuth.js";
import ApiError from '../utils/ApiError.js';

export default (app) => {
    app.use(function(req, res, next) {
      req.headers['ngrok-skip-browser-warning'] = 0;
      next();
    });
    app.get('/', async (req, res) => res.json('Hello! Welcome To OceanAuth'));
    app.get('/ping', async (req, res) => res.json('pong!'));
    app.use("/auth", authRoutes);
    app.use("/user", userRoutes);
    app.use(auth.checkToken);
    app.use("/login_history", login_historyRoutes);
    app.use("/verify", verifyRoutes);
    app.use((req, res, next) => next(new ApiError(401,'Not found')));
    app.use(errorHandler);
}