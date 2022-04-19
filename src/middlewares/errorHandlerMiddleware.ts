import { NextFunction, Request, Response } from "express";

export function handleErrorMiddleware(
    error: any,
    req: Request,
    res: Response,
    next: NextFunction
  ) {

    console.log(error);
    
    if (error.type === "conflict") {
      return res.sendStatus(409);
    }
    if (error.type === "unauthorized")
        return res.sendStatus(401);
  
    res.sendStatus(500);
  }
  