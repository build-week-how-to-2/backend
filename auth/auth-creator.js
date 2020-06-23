  module.exports = (req, res, next) => {
    if (req.decodedToken.role == "creator") {
        next();
    } else {
        res.status(400).json({ message: "Endpoint only available to creators." });
    }
}