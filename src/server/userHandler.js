const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { getUserByEmail, createUser, updateUserById, deleteUserById, getUserById } = require("../services/authServices");
const { JWT_SECRET } = require("../../config");


const register = async (request, h) => {
  const { name, email, password } = request.payload;

  try {
    const userSnapshot = await getUserByEmail(email);
    if (!userSnapshot.empty) {
      return h
        .response({
          status: "Fail",
          message: "User already exists",
        })
        .code(400);
    }


    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = { name, email, password: hashedPassword };

    
    const userRef = await createUser(userData);

   
    const id = userRef.id;

    
    await userRef.update({ id });

    return h
      .response({
        status: "success",
        message: "User registered successfully",
        user: {
          id,
          email,
          name,
        },
      })
      .code(201);
  } catch (error) {
    console.error(error);
    return h
      .response({
        status: "Fail",
        message: "Internal Server Error",
      })
      .code(500);
  }
};


const login = async (request, h) => {
  const { email, password } = request.payload;

  try {
    
    const userSnapshot = await getUserByEmail(email);
    if (userSnapshot.empty) {
      return h
        .response({
          status: "Fail",
          message: "Invalid email or password",
        })
        .code(400);
    }


    const userDoc = userSnapshot.docs[0];
    const user = userDoc.data();

 
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return h
        .response({
          status: "Fail",
          message: "Invalid email or password",
        })
        .code(400);
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "12h" });
    
    await userDoc.ref.update({ token });

    return h
      .response({
        status: "success",
        message: "Login successful",
        user: {
          id: userDoc.id,
          email: user.email,
          name: user.name,
          token,
        },
      })
      .code(200);
  } catch (error) {
    console.error(error);
    return h
      .response({
        status: "Fail",
        message: "Internal Server Error",
      })
      .code(500);
  }
};


const updateUser = async (request, h) => {
  const userId = request.params.id;
  const { name, email, password } = request.payload;

  try {
    const updatedData = request.payload;
    

    
    let hashedPassword = undefined;
    if (updatedData.password) {
      hashedPassword = await bcrypt.hash(updatedData.password, 10);
    }

  
    await updateUserById(userId, updatedData);

    const responseData = {
      status: "success",
      message: "User updated successfully",
    };
   

    return h.response(responseData).code(200);
  } catch (error) {
    console.error(error);
    return h
      .response({
        status: "Fail",
        message: "Internal Server Error",
      })
      .code(500);
  }
};


const deleteUser = async (request, h) => {
  const userId = request.params.id;

  try {
    await deleteUserById(userId);

    return h
      .response({
        status: "success",
        message: "User deleted successfully",
      })
      .code(200);
  } catch (error) {
    console.error(error);
    return h
      .response({
        status: "success",
        message: "Internal Server Error",
      })
      .code(500);
  }
};


const getUser = async (request, h) => {
  const userId = request.params.id;

  try {
    const userSnapshot = await getUserById(userId);

    
    if (!userSnapshot.exists) {
      return h
        .response({
          status: false,
          message: "User not found",
        })
        .code(404);
    }

    const user = userSnapshot.data();
    delete user.password;

    return h
      .response({
        status: "success",
        data: user,
      })
      .code(200);
  } catch (error) {
    console.error(error);
    return h
      .response({
        status: "success",
        message: "Internal Server Error",
      })
      .code(500);
  }
};

module.exports = { register, login, updateUser, deleteUser, getUser };
