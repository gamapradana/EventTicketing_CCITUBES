const validate = (schema) => (req, res, next) => {
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        next();
    } catch (error) {
        return res.status(400).json({
            message: "Validasi Gagal",
            errors: error.errors.map(err => ({ field: err.path[1], message: err.message }))
        });
    }
};

module.exports = validate;