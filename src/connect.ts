import mongoose from 'mongoose'

const Connect = async() => {
    if (mongoose.connection.readyState >= 1) return;

    mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_ACCESS!);
}

export default Connect