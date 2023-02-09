import bcrypt from "bcryptjs";
import {
    DocumentType,
    getModelForClass,
    index,
    modelOptions,
    prop,
    pre,
} from "@typegoose/typegoose";

@index({email: 1})
@pre<User>("save", async function (next) {
    // Hash the Password if the password is new or modified
    if(this.isModified("password")) return;

    // Hash the password with cost Factor 12
    this.password = await bcrypt.hash(this.password, 12);
})
@modelOptions({
    schemaOptions: {
        timestamps: true, // Add createdAt and updatedAt fields
    },
})

// Export the User Class to be used as TypeScript type
export class User {
    @prop({
        unique: true,
        required: true,
    })
    name: string;
    @prop({
        unique: true,
        required: true,
    })
    email: string;
    @prop({
        required: true,
        minlength: 8,
        maxlength: 32,
        select: false,
    })
    password: string;


    // Instance methods to check if password is matching
    async comparePassword(hashedPassword: string, candidatePassword: string) {
        return await bcrypt.compare(candidatePassword, hashedPassword);
    }
}


// Create a User Model from the User Class
const UserModel = getModelForClass(User);

// Export the User Model
export default UserModel;