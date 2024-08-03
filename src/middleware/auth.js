import jwt from "jsonwebtoken";

const authCompany = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Auth failed." });
  }

  const decodedInfo = jwt.verify(token, process.env.JWT_SECRET);

  if (!decodedInfo) {
    return res.status(401).json({ message: "Auth failed." });
  }

  req.body.companyId = decodedInfo.companyId;

  next();
};

export default authCompany;
