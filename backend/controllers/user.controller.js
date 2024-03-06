import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;

        const filteredUsers = await User.find ({ _id : {$ne: loggedInUserId}}).select("-password");

        res.status(200).json({
            message: "Message sent successfully",
            data: filteredUsers
        });

    } catch (error) {
        console.error("Error get users sidebar:", error);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
}

export default getUsersForSidebar;