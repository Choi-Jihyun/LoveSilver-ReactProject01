// storage 관련 추가 (getApp)
import firebase, { initializeApp, getApp } from 'firebase/app';
import { v4 as uuid } from 'uuid';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, set, get, remove, query, orderByKey, equalTo } from 'firebase/database';
// storage 관련 추가
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useState } from 'react';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwfOPRzHBkYUIFX_EijBdUWsD5hAvClME",
  authDomain: "lovesilver-abf37.firebaseapp.com",
  databaseURL: "https://lovesilver-abf37-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "lovesilver-abf37",
  storageBucket: "lovesilver-abf37.appspot.com",
  messagingSenderId: "934444516339",
  appId: "1:934444516339:web:a2b536dae3a13449188886",
  measurementId: "G-H2VE9267RT"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const database = getDatabase(app);
// storage 관련 추가 (Initialize Cloud Storage and get a reference to the service)
const storage = getStorage(app);

export function login() {
  signInWithPopup(auth, provider).catch(console.error);
}

export function logout() {
  signOut(auth).catch(console.error);
}

export function onUserStateChange(callback) {
  onAuthStateChanged(auth, async (user) => {
    const updatedUser = user ? await adminUser(user) : null;
    callback(updatedUser);
  });
}

async function adminUser(user) {
  return get(ref(database, 'admins')) 
    .then((snapshot) => {
      if (snapshot.exists()) {
        const admins = snapshot.val();
        const isAdmin = admins.includes(user.uid);
        return { ...user, isAdmin };
      }
      return user;
    });
}

export async function getProducts() {
  return get(ref(database, 'products')).then((snapshot) => {
    if (snapshot.exists()) {
      return Object.values(snapshot.val());
    }
    return [];
  });
}

export async function getProductDetail(productId) {
  return get(
    query(ref(database, "products"), orderByKey("id"), equalTo(productId))
  ).then((snapshot) => {
    if (snapshot.exists()) {
      return Object.values(snapshot.val())[0];
    } else {
      console.log("Product not found");
      return null;
    }
  });
}

export {database}


// 이미지 업로드 함수, 이거 다른  파일에서 쓰게 하는 거 실패함.
// export async function handleImageUpload(event) {
//   const files = event.target.files;
//   const imageUrls = [];

//   for (const file of files) {
//     const imageName = `${uuid()}_${file.name}`;
//     const imageRef = storageRef(storage, `images/${imageName}`);
//     await uploadBytes(imageRef, file);
//     const imageUrl = await getDownloadURL(imageRef);
//     imageUrls.push(imageUrl);
//   }
//   setImages(imageUrls);
//   return imageUrls;
// }

// 삭제 기능 함수
export async function handleDeleteItem(itemId) {
  const itemRef = ref(database, `products/${itemId}`);
  try {
    await remove(itemRef);
    console.log('Item deleted successfully');
  } catch (error) {
    console.error('Error deleting item:', error);
  }
}