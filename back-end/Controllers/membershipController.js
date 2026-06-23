const db = require("../Models");

const Membership = db.Membership;

// Get all memberships
exports.getAllMemberships = async (req, res, next) => {

    try {

        const memberships = await Membership.findAll();

        return res.status(200).jsend.success({
            statusCode: 200,
            result: "success",
            message: "Memberships retrieved successfully",
            data: memberships
        });

    }
    catch (error) {

        next(error);

    }

}
