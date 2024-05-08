import { Router } from "express";
import CreateEntity from "../controller/entity/create/route";
const entityRouter = Router();
entityRouter.post('/create', CreateEntity);
export default entityRouter;
