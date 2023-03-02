// This model was generated by Forest CLI. However, you remain in control of your models.
// Learn how here: https://docs.forestadmin.com/documentation/reference-guide/models/enrich-your-models

module.exports = (mongoose, Mongoose) => {
  // This section contains the properties of your model, mapped to your collection's properties.
  // Learn more here: https://docs.forestadmin.com/documentation/reference-guide/models/enrich-your-models#declaring-a-new-field-in-a-model
  const schema = Mongoose.Schema({
    userName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 35,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      maxlength: 300,
      minlength: 6,
    },
    pictureUrl: {
      type: String,
      default: "",
    },
    dateOfBirth: { type: Date },

    sneakers: {
      default: [],
      type: Array,
    },
    skans: {
      default: [],
      type: Array,
    },
    likes: {
      default: [],
      type: Array,
    },
    adminRank: {
      type: Number,
      default: 0,
    },
    firstName: {
      type: String,
      default: "",
    },
    lastName: {
      type: String,
      default: "",
    },
    sex: {
      type: String,
      default: "",
    },
    phoneNumber: {
      type: String,
      default: "",
    },
    favoriteBrand: {
      type: String,
      default: "",
    },
    shoeSize: {
      type: String,
      default: "",
    },
  });

  return mongoose.model("users", schema, "users");
};
