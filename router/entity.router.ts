import { Router } from "express";
import CreateEntity from "../controller/entity/create/route";
import InsertIntoEntity from '../controller/entity/insert/route';
import GetAllEntity from '../controller/entity/route';
import DropEntity from '../controller/entity/drop/route';
import DeleteRowFromEntity from '../controller/entity/delete-column/route';
import AllDataFromEntity from '../controller/entity/entity-data/route'
const entityRouter = Router();
entityRouter.post('/create', CreateEntity);
entityRouter.post('/insert', InsertIntoEntity);
entityRouter.put('/drop', DropEntity);
entityRouter.delete('/delete-column', DeleteRowFromEntity);
entityRouter.get('/', GetAllEntity);
entityRouter.get('/entity-data', AllDataFromEntity);
export default entityRouter;
