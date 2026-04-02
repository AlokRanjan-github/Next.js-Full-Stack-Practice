import mongoose, { mongo, Schema } from "mongoose";

interface Iuser {
    _id?:mongoose.Types.ObjectId,
    name: string,
    image?:string,
    email: string
    password:string,
    createdAt?:Date,
    updatedAt?:Date
}

const userSchema = new mongoose.Schema<Iuser>({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    image:{
        type:String
    },
    password:{
        type:String,
        required:true
    }

},{timestamps: true})

// NextJs reload(hotRealoading) and executes the code again when code is changed then it tries to Overwrite the Model traditional mern style model creation doesn't work in Next so we use updated version

// The updated version first checks the list of models if the model already exists then it doesnot Overwrites the model

const User = mongoose.models.User || mongoose.model('User',userSchema)
export default User;