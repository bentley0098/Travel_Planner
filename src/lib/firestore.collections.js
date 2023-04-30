import { collection } from "@firebase/firestore";
import { db } from "./init-firebase";

export const locationCollectionRef = collection(db, 'locations')