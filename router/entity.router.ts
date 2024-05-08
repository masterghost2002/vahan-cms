import { Router } from "express";
import CreateEntity from "../controller/entity/create/route";
import InsertIntoEntity from '../controller/entity/insert/route';
import GetAllEntity from '../controller/entity/route';
const entityRouter = Router();
entityRouter.post('/create', CreateEntity);
entityRouter.post('/insert', InsertIntoEntity);
entityRouter.get('/', GetAllEntity)
export default entityRouter;
