import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import IUser from '@/models/interfaces/user.interface';

const UserSchema = new Schema ({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
}, { timestamps: true }
)

UserSchema.pre<IUser>('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

UserSchema.methods.comparePassword = async function (password: string): Promise<Error | boolean> {
    return await bcrypt.compare(password, this.password)
}
export default model<IUser>('User', UserSchema);