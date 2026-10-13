import { Router, Request, Response } from 'express';
import { asyncRoute } from '../middlewares';
import { answerTavoQuestion } from '../modules/ai/agent.service';

export function registerAiRoutes(router: Router): void {
  router.post(
    '/ai/agent/ask',
    asyncRoute(async (req: Request, res: Response) => {
      const { question, context } = req.body || {};
      const result = answerTavoQuestion({ question, context });
      res.json(result);
    })
  );

  router.post(
    '/ai/ask',
    asyncRoute(async (req: Request, res: Response) => {
      const { question, context } = req.body || {};
      const result = answerTavoQuestion({ question, context });
      res.json(result);
    })
  );
}
