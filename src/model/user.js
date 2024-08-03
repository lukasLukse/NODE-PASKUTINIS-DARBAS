import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  money_balance: { type: Number, default: 0, required: true },
});

export default mongoose.model("User", userSchema);
