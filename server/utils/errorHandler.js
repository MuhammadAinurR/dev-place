module.exports = (err, req, res, next) => {
    console.log(err)
    if (err.name === 'githubFailLogin') return res.status(401).json({ message: 'Github Login Failed' })
    if (err.name === 'SequelizeValidationError') return res.status(400).json({ message: err.errors.filter(e => e.message).map(e => e.message) });
    if (err.name === "SequelizeUniqueConstraintError") return res.status(400).json({ message: err.errors.filter(e => e.message).map(e => e.message) });
    if (err.name === "Unauthenticated") return res.status(401).json({ message: "Error Authentication" });
    if (err.name === "InvalidEmailOrPassword") return res.status(401).json({ message: "Invalid email or password" });
    if (err.name === "EmailIsRequired") return res.status(400).json({ message: "Email is required" });
    if (err.name === "PasswordIsRequired") return res.status(400).json({ message: "Password is required" });
    res.status(500).json({ message: "Internal Server Error." });
}