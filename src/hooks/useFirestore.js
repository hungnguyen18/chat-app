import { useEffect, useState } from "react";
import { db } from "../firebase/config";

export default function useFirestore(collection, condition) {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    let collectionRef = db.collection(collection).orderBy("createdAt");

    if (condition) {
      if (!condition.compareValue || !condition.compareValue.length) {
        setDocuments([]);
        return;
      }

      collectionRef = collectionRef.where(
        condition.fieldName,
        condition.operator,
        condition.compareValue
      );
    }

    const unsubscribe = collectionRef.onSnapshot((snapshot) => {
      const documents = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setDocuments(documents);
    });

    return unsubscribe;
  }, [collection, condition]);

  const updateUser = async (uid, data) => {
    try {
      const userRef = db.collection(collection).where("uid", "==", uid);
      await userRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.update(data);
        });
      });
      console.log("User updated successfully!");
    } catch (error) {
      console.error("Error updating user: ", error);
    }
  };

  return { documents, updateUser };
}
