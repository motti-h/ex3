import { Response, Request, NextFunction, RequestHandler } from 'express';

export function middleCheckId(req: Request, res: Response, next: NextFunction): any {
    const id = req.params.id; // url params

    if (isNaN(id)) {
       next(new Error('400'));
    }

    next();
}

export function endError(err: Error , req: Request, res: Response, next: NextFunction) {
    if ( parseInt(err.message, 10) ) {
        res.sendStatus( parseInt(err.message, 10) );
    } else {
        next(err);
    }
}
