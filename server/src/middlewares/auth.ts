import { NextFunction, Request, Response } from "express";
import { auth } from "express-oauth2-jwt-bearer";
import { CODE_401, ERROR_UNAUTHORIZED } from "../utils/constants";
import jwt from "jsonwebtoken";
import User from "../models/user.model";

declare global {
  namespace Express {
    interface Request {
      userId: string;
      auth0Id: string;
    }
  }
}

export const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  tokenSigningAlg: process.env.AUTH0_TOKEN_SIGNING_ALG,
});

export const jwtParse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    res.status(CODE_401).json({ message: ERROR_UNAUTHORIZED });
    return;
  }

  const token = authorization.split(" ")[1];

  try {
    const decoded = jwt.decode(token) as jwt.JwtPayload;
    const auth0Id = decoded.sub;
    const user = await User.findOne({ auth0Id });

    if (!user) {
      res.status(CODE_401).json({ message: ERROR_UNAUTHORIZED });
      return;
    }

    req.auth0Id = auth0Id as string;
    req.userId = user._id.toString();

    next();
  } catch (error) {
    console.log("JWT PARSE ERROR", error);
    res.status(CODE_401).json({ message: ERROR_UNAUTHORIZED });
  }
};
