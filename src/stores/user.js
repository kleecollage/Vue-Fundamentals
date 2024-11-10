import { defineStore } from 'pinia';
import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
	updateProfile,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore/lite';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { auth, db, storage } from '../firebaseConfig';
import router from '../router';
import { useDatabaseStore } from './database';

export const useUserStore = defineStore('userStore', {
	state: () => ({
		userData: null,
		loadingUser: false,
    loadingSession: false,
	}),
	actions: {
		// UPDATE USER
		async updateUser(displayName){
			try {
				await updateProfile(auth.currentUser, {
					displayName
				});
				this.setUser(auth.currentUser)
			} catch (error) {
				console.log(error)
				return error.code
			}
		},
		// UPDATE USER IMG PROFILE
		async updateImg(image) {
			try {
				console.log(image)
				const storageRef = ref(storage, `${this.userData.uid}/perfil`)
				await uploadBytes(storageRef, image.originFileObj);
				const photoURL  = await getDownloadURL(storageRef)
				console.log(photoURL)
				await updateProfile(auth.currentUser, {
					photoURL
				});
				this.setUser(auth.currentUser)
			} catch (error) {
				console.log(error);
			}
		},
		// USER INFO
		async setUser(user) {
			try {
				const docRef = doc(db, 'users', user.uid)
				this.userData = {
					email: user.email,
					uid: user.uid,
					displayName: user.displayName,
					photoUrl: user.photoURL,
				}
				await setDoc(docRef, this.userData);
			} catch (error) {
				console.log(error)
			}
		},
		// REGISTER
		async registerUser(email, password) {
			this.loadingUser = true;
			try {
				const { user } = await createUserWithEmailAndPassword(
					auth,
					email,
					password
				);
				this.userData = { email: user.email, uid: user.uid };
				router.push('/login');
			} catch (error) {
				console.log(error.code);
				return error.code
			} finally {
				this.loadingUser = false;
			}
		},
		// LOGIN
		async loginUser(email, password) {
			this.loadingUser = true;
			try {
				const { user } = await signInWithEmailAndPassword( auth, email, password );
				await this.setUser(user);
				router.push('/');
			} catch (error) {
				console.log(error.code);
				return error.code
			} finally {
				this.loadingUser = false;
			}
		},
		// LOGOUT
		async logoutUser() {
			const databaseStore = useDatabaseStore();
			databaseStore.$reset();
			try {
				await signOut(auth);
				router.push('/login');
			} catch (error) {
				console.log(error);
			}
		},
		// CURRENT USER
    currentUser() {
			return new Promise((resolve, reject) => {
				const unsuscribe = onAuthStateChanged( auth, async(user) => {
						if (user) {
							// console.log(user)
							// await this.setUser(user)
							this.userData = {
								email: user.email,
								uid: user.uid,
								displayName: user.displayName,
								photoUrl: user.photoURL,
							}
						} else {
							this.userData = null;
							const databaseStore = useDatabaseStore();
							databaseStore.$reset();
						}
						resolve(user);
						unsuscribe();
					},
					(e) => { reject(e); unsuscribe(); }
				);
			});
		},

	},
});
