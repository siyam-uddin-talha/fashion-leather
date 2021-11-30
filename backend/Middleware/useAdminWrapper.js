const useAdminWrapper = (fn) => {
    return (req, res, next) => {
        if (req.admin) {
            fn(req, res, next)
        }
        if (!req.admin) {
            res.json({ success: false, message: `not login` })
        }

    }
}

module.exports = useAdminWrapper