import * as routes from './routes';
import * as methods from '../services/methods';

export const init = (app) => {
  app.get('/', routes.homeRoute);
  app.post('/login', routes.loginRoute);
  app.get('/_health', routes.healthRoute);
  app.get('/cidr-to-mask', authenticateJWT, routes.cidrToMaskRoute);
  app.get('/mask-to-cidr', authenticateJWT, routes.maskToCidrRoute);
};

export const homeRoute = (req, res, next) => {
  res.send('OK');
  next();
}

export const healthRoute = (req, res, next) => {
  methods.health(req, res, next);
}

export const loginRoute = async (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;

  const result = await methods.loginFunction(username, password);
  if (result === null) {
    res.status(422).send('Invalid credentials')
  } else {
    let response = {
      "data": result
    };
    res.send(response);
    next();
  }
}

export const cidrToMaskRoute = (req, res, next) => {
  let value = req.query.value ? req.query.value : false;
  if (!value) {
    res.status(422).send('No value provided')
  } else {
    const result = methods.cidrToMaskFunction(value);
    if (result === null) {
      res.status(422).send('Invalid cidr format')
      return;
    }
    let response = {
      "function": "cidrToMask",
      "input": value,
      "output": result
    };
    res.send(response);
    next();
  }

}

export const maskToCidrRoute = (req, res, next) => {
  let value = req.query.value ? req.query.value : false;
  if (!value) {
    res.status(422).send('No value provided')
  } else {
    const result = methods.maskToCidrFunction(value);
    if (result === null) {
      res.status(422).send('Invalid mask format')
      return;
    }
    let response = {
      "function": "maskToCidr",
      "input": value,
      "output": result
    };
    res.send(response);
    next();
  }
}

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader == null) {
    res.sendStatus(401);
    return;
  }

  const token = authHeader.split(' ')[1];

  if (methods.protectFunction(token) == null) {
    res.sendStatus(401);
    return;
  }

  next();
};
