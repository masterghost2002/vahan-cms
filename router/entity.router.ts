import { Router } from "express";
import CreateEntity from "../controller/entity/create/route";
import InsertIntoEntity from '../controller/entity/insert/route';
const entityRouter = Router();
entityRouter.post('/create', CreateEntity);
entityRouter.post('/insert', InsertIntoEntity);
export default entityRouter;
