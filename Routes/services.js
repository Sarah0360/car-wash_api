import { Router } from "express";
import { remoteUpload } from "../Middlewares/upload.js";
import { createService, getServices,getService, updateService, deleteService  } from "../Controllers/services.js";


const serviceRouter = Router();


serviceRouter.post("/carwash", remoteUpload.single('image'),createService);

serviceRouter.get("/carwash", getServices);

serviceRouter.get("/carwash/:id", getService);

serviceRouter.patch("/carwash/:id", remoteUpload.single('image'),updateService);

serviceRouter.delete("/carwash/:id", deleteService);

export default serviceRouter