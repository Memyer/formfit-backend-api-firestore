const Firestore = require("@google-cloud/firestore");


const db = new Firestore({
  databaseId: "formfitdbs",
});
const usersCollection = db.collection("users");

const getUserByEmail = async (email) => {
  return await usersCollection.where("email", "==", email).get();
};


const createUser = (userData) => {
  return db.collection("users").add(userData);
};


const updateUserById = async (id, user) => {
  const userDoc = usersCollection.doc(id);
  const updateData = {};

  if (user.email !== undefined) {
    updateData.email = user.email;
  }

  if (user.password !== undefined) {
    updateData.password = user.password;
  }

  if (user.name !== undefined) {
    updateData.name = user.name;
  }

  return await userDoc.update(updateData);
};


const deleteUserById = async (id) => {
  const userDoc = usersCollection.doc(id);
  return await userDoc.delete();
};


const getUserById = async (id) => {
  const userDoc = usersCollection.doc(id);
  return await userDoc.get();
};

module.exports = { getUserByEmail, createUser, updateUserById, deleteUserById, getUserById };