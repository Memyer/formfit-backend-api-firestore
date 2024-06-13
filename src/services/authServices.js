const { Firestore } = require("@google-cloud/firestore");

// Initialize Firestore with the specified database
const db = new Firestore({
  databaseId: "formfitdbs",
});

// Reference to the users collection in Firestore
const usersCollection = db.collection("users");

/**
 * Retrieve a user by their email address.
 * @param {string} email - The email address of the user.
 * @returns {Promise<Firestore.QuerySnapshot>} - A promise that resolves to the query snapshot of the user.
 */
const findUserByEmail = async (email) => {
  return usersCollection.where("email", "==", email).get();
};

/**
 * Add a new user to the Firestore database.
 * @param {Object} userData - The user data to add.
 * @returns {Promise<Firestore.DocumentReference>} - A promise that resolves to the document reference of the new user.
 */
const addUser = (userData) => {
  return usersCollection.add(userData);
};

/**
 * Update user information by their document ID.
 * @param {string} id - The document ID of the user.
 * @param {Object} user - The new user data to update.
 * @returns {Promise<Firestore.WriteResult>} - A promise that resolves to the write result of the update.
 */
const modifyUserById = async (id, user) => {
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

  return userDoc.update(updateData);
};

/**
 * Delete a user from the Firestore database by their document ID.
 * @param {string} id - The document ID of the user.
 * @returns {Promise<Firestore.WriteResult>} - A promise that resolves to the write result of the delete operation.
 */
const removeUserById = async (id) => {
  const userDoc = usersCollection.doc(id);
  return userDoc.delete();
};

/**
 * Retrieve a user by their document ID.
 * @param {string} id - The document ID of the user.
 * @returns {Promise<Firestore.DocumentSnapshot>} - A promise that resolves to the document snapshot of the user.
 */
const findUserById = async (id) => {
  const userDoc = usersCollection.doc(id);
  return userDoc.get();
};

// Export the functions for use in other modules
module.exports = { findUserByEmail, addUser, modifyUserById, removeUserById, findUserById };
