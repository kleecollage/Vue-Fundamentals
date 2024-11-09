import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	query,
	updateDoc,
	where,
} from 'firebase/firestore/lite';
import { defineStore } from 'pinia';
import { auth, db } from '../firebaseConfig';
import { nanoid } from 'nanoid';
import router from '../router';

export const useDatabaseStore = defineStore('database', {
	state: () => ({
		documents: [],
		loadingDoc: false,
		loading: false,
	}),
	actions: {
		// READ
		async getUrls() {
			if (this.documents.length !== 0) {
				return;
			}
			this.loadingDoc = true;
			try {
				const q = query(
					collection(db, 'urls'),
					where('user', '==', auth.currentUser.uid)
				);
				const querySnapShot = await getDocs(q);
				querySnapShot.forEach((doc) => {
					// console.log(doc.id, doc.data());
					this.documents.push({
						id: doc.id,
						...doc.data(),
					});
				});
			} catch (error) {
				console.log(error);
			} finally {
				this.loadingDoc = false;
			}
		},
		// CREATE
		async addUrl(name) {
			this.loading = true
			try {
				const objetoDoc = {
					name: name,
					short: nanoid(6),
					user: auth.currentUser.uid,
				};
				const docRef = await addDoc(collection(db, 'urls'), objetoDoc);
				this.documents.push({
					...objetoDoc,
					id: docRef.id,
				});
			} catch (error) {
				console.log(error);
			} finally {
				this.loading = false
			}
		},
		// DELETE
		async deleteUrl(id) {
			this.loading = true
			try {
				const docRef = doc(db, 'urls', id);
				const docSnap = await getDoc(docRef);

				if (!docSnap.exists()) {
					throw new Error('no existe el documento');
				}

				if (docSnap.data().user !== auth.currentUser.uid) {
					throw new Error('Este doc no le pertence!');
				}

				await deleteDoc(docRef);
				
				this.documents = this.documents.filter((item) => item.id !== id);

			} catch (error) {
				// console.log(error.code);
				return error.message
			} finally {
				this.loading = false
			}
		},
		// GET ONE
		async getUrl(id) {
			this.loading = true
			try {
				const docRef = doc(db, 'urls', id);
				const docSnap = await getDoc(docRef);
				// Validaciones
				if (!docSnap.exists()) throw new Error('no existe el documento');
				if (docSnap.data().user !== auth.currentUser.uid)
					throw new Error('Este doc no le pertence!');

				return docSnap.data().name;
			} catch (error) {
				console.log(error.nessage);
			} finally {
				this.loading = false
			}
		},
		// UPDATE
		async updateUrl(id, name) {
			this.loading = true
			try {
				const docRef = doc(db, 'urls', id);
				const docSnap = await getDoc(docRef);
				// Validaciones
				if (!docSnap.exists()) throw new Error('no existe el documento');
				if (docSnap.data().user !== auth.currentUser.uid)
					throw new Error('Este doc no le pertence!');

				await updateDoc(docRef, {
					name: name,
				});

				this.documents = this.documents.map((item) =>
					item.id == id ? { ...item, name: name } : item
				);
        
				router.push('/');
			} catch (error) {
				console.log(error.message);
				
				return error.message

			} finally {
				this.loading = false
			}
		},
	},
});
