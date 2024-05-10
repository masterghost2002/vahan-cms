import { Router } from "express";
import CreateEntity from "../controller/entity/create/route";
import UpdateEntityData from "../controller/entity/entity-data/update/route"
import InsertIntoEntity from '../controller/entity/entity-data/insert/route';
import GetAllEntity from '../controller/entity/route';
import DropEntity from '../controller/entity/drop/route';
import DeleteRowFromEntity from '../controller/entity/delete-column/route';
import AllDataFromEntity from '../controller/entity/entity-data/route';
import DropRowFromEntity from '../controller/entity/entity-data/drop-row/route'
const entityRouter = Router();
entityRouter.post('/create', CreateEntity);
entityRouter.post('/insert', InsertIntoEntity);
entityRouter.put('/update', UpdateEntityData);
entityRouter.put('/drop', DropEntity);
entityRouter.delete('/delete-column', DeleteRowFromEntity);
entityRouter.delete('/drop-row', DropRowFromEntity);
entityRouter.get('/', GetAllEntity);
entityRouter.get('/entity-data/:entity_name', AllDataFromEntity);
export default entityRouter;
