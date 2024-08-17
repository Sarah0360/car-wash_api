import { Router } from "express";
import { remoteUpload } from "../Middlewares/upload.js";
import { createService, getServices,getService, updateService, deleteService  } from "../Controllers/services.js";


export const serviceRouter = Router();

serviceRouter.post("/carcare", remoteUpload.single('image'),createService);

serviceRouter.get("/carcare", getServices);

serviceRouter.get("/carcare/:id", getService);

serviceRouter.patch("/carcare/:id", remoteUpload.single('image'),updateService);

serviceRouter.delete("/carcare/:id", remoteUpload.single('image'), deleteService);

// export default serviceRouter;