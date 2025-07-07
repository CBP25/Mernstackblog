import axios from "axios";
const URLC = `http://localhost:3000` ;

// All posts
export async function getPosts() {
  const response = await axios.get(`${URLC}/posts`);
  if (response.status === 200) {
    return response.data;

    
  } else {
    return;
  }
}

// Single post
export async function getPost(id) {
  
  const response = await axios.get(`${URLC}/posts/${id}`);

  const post = response.data;
  const data = await getImage(post.imageId);
  post.image = data;

  return post;
  
}
// Create Post
export async function createPost(post) {
  const data = await createImage(post.file);
  const imageId = post.file.name;

  post.imageId = imageId;

  const response = await axios.post(`${URLC}/posts`, post);
  return response;
}

//Update Post
export async function updatePost(id, post) {
  const response = await axios.put(`${URLC}/posts/${id}`,post);
  return response;
}

//Delete Post
export async function deletePost(id) {
  const response = await axios.delete(`${URLC}/posts/${id}`);
  return response;
}

/* FOR USERS */

// Read a User Profile
export async function getUser(id) {
  const response = await axios.get(`${URLC}/blogusers/${id}`);
  if (response.status === 200) {
    return response.data;
  } else {
    return;
  }
}
// Create User
export async function createUser(user) {
  const response = await axios.post(`${URLC}/blogusers`, user);
  return response;
}

//Update User
export async function updateUser(id, user) {
  const response = await axios.put(`${URLC}/blogusers/${id}`,user);
  return response;
}

//Delete User
export async function deleteUser(id) {
  const response = await axios.delete(`${URLC}/blogusers/${id}`);
  return response;
}

//Log in
export async function verifyLogin(user) {
  const response = await axios.post(`${URLC}/blogusers/login`, user);

  if (response.data.success) {
    return response.data.token;
  } else {
    // Throw a custom error message if login fails
    throw new Error(response.data.message || "Login failed. Please try again.");
  }
}


//image handlers
export async function createImage(file){
  const formdata = new FormData();
  formdata.append('image', file)
  const response = await axios.post(`${URLC}/images`, formdata, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
 return response
}
export async function getImage(id){
  const response = await axios.get(`${URLC}/images/${id}`)
  return response;
}
export async function deleteImage(id){
  const response = await axios.delete(`${URLC}/images/${id}`)
  return response
}

//Contact form
export async function sendMessage(message) {
  const response = await axios.post(
    `${URLC}/contact`,
    message
  );
  return response;
}