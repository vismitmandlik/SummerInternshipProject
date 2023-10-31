const {User} = require("../models/product")


const isAdmin=async(username)=>{
    // const {username,password}=req.body

    const user=await User.findOne({username:username})

    if( user.role=="faculty"){
        // res.redirect("/admin-dashboard")
        return true
    }
    else{
        // res.redirect("/")
        return false;
    }
}

module.exports=isAdmin