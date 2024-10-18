import { encryptPassword } from "../helpers/Bcrypt"
import { rolesObj } from "../helpers/Constants";
import Users from "../models/user.model";

export const adminSeeder = async ( ) => {
try {
    
    const encyptPassword = await encryptPassword('admin@1234');
    const adminExist = await Users.findOne({"role":rolesObj.ADMIN}).exec();
        if(adminExist){
            console.log("EXISTING ADMIN",adminExist.email);
            return "Admin already exits";
        }

         console.log("Creating User");

         await new Users({
            name: "Admin",
            email: "admin@admin.com",
            password: encyptPassword,
            role:rolesObj.ADMIN,
            approved: true,
          }).save();

} catch (error) {
    console.log(error) 
}


}