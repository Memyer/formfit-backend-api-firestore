const { Firestore } = require('@google-cloud/firestore');

const firestore = new Firestore({
  projectId: 'formfitdbs',
});

const usersRef = firestore.collection('users');

/**
 * Fetch a user by their email.
 * @param {string} email - The email of the user to fetch.
 * @returns {Promise<Firestore.QuerySnapshot>} - The query snapshot of the user.
 */
const findUserByEmail = async (email) => {
  const query = usersRef.where('email', '==', email);
  const snapshot = await query.get();
  return snapshot;
};

/**
 * Add a new user to the database.
 * @param {Object} userData - The data of the user to create.
 * @returns {Promise<Firestore.DocumentReference>} - The reference to the newly created user document.
 */
const addUser = (userData) => {
  return usersRef.add(userData);
};

/**
 * Update an existing user by their ID.
 * @param {string} id - The ID of the user to update.
 * @param {Object} user - The user data to update.
 * @returns {Promise<Firestore.WriteResult>} - The result of the update operation.
 */
const modifyUserById = async (id, user) => {
  const userRef = usersRef.doc(id);
  const updates = {};

  if (user.email) updates.email = user.email;
  if (user.password) updates.password = user.password;
  if (user.name) updates.name = user.name;

  return await userRef.update(updates);
};

/**
 * Delete a user by their ID.
 * @param {string} id - The ID of the user to delete.
 * @returns {Promise<Firestore.WriteResult>} - The result of the delete operation.
 */
const removeUserById = async (id) => {
  const userRef = usersRef.doc(id);
  return await userRef.delete();
};

/**
 * Get a user by their ID.
 * @param {string} id - The ID of the user to fetch.
 * @returns {Promise<Firestore.DocumentSnapshot>} - The snapshot of the user document.
 */
const fetchUserById = async (id) => {
  const userRef = usersRef.doc(id);
  const doc = await userRef.get();
  return doc;
};

module.exports = {
  findUserByEmail,
  addUser,
  modifyUserById,
  removeUserById,
  fetchUserById,
};
