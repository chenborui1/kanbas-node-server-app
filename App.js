import "dotenv/config";

import express from "express";
import Lab5 from "./Lab5.js";
import cors from "cors";
import Hello from "./Hello.js";
import CourseRoutes from "./Kanbas/courses/routes.js";
import ModuleRoutes from "./Kanbas/modules/routes.js";
import mongoose from "mongoose";
import UserRoutes from "./Kanbas/Users/routes.js";
import session from "express-session";

const app = express()
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING
mongoose.connect(CONNECTION_STRING);


app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:3000', 'https://a6--kanbas-react-app-4550.netlify.app'], // Allowed origins

  })
);

const sessionOptions = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  };
  if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
      sameSite: "none",
      secure: true,
      domain: process.env.HTTP_SERVER_DOMAIN,
    };
  }
  
app.use(session(sessionOptions));



app.use(express.json())



Hello(app)
CourseRoutes(app)
ModuleRoutes(app)
Lab5(app)
UserRoutes(app);
app.listen(process.env.PORT || 4000);