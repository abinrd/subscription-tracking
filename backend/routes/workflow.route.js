import {Router} from 'express'
import { sendReminders } from '../controller/workflow.controller.js';

const workflowRouter = Router();

workflowRouter.get('/',sendReminders)


export default workflowRouter;