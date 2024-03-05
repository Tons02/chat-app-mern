

export const signup = async (req, res, next) => {
    try {
        const {fullName, username, password, confirmPassword, gender} = req.body;
    } catch (error) {
        
    }
}

export const login = (req, res, next) => {
    console.log("login")
    res.send("login!");
}

export const logout = (req, res, next) => {
    console.log("logout")
    res.send("logout!");
}

