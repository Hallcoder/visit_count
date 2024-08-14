import { useState, useEffect } from 'react'
import { doc, getDoc, increment, setDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase/config';
import {fetchUserIp} from "./utils/functions";
function App() {
  const [count, setCount] = useState<number>(0);
  const [loading,setLoading] = useState<boolean>(false);
 
  useEffect(() => {
    
    const fetchVisitorCount = async () => {
      setLoading(true);
      // Fetch the user's IP address
      const userIp = await fetchUserIp();
      console.log(userIp)
      // Reference to the document storing the count
      const countRef = doc(db, "count", "glNO2qlzbRbm8rBuMggS");
      
      // Reference to the collection where we store unique IPs
      const ipRef = doc(db, "visitorIp", userIp);

      // Check if the IP already exists in the visitorIPs collection
      const ipDoc = await getDoc(ipRef);
      if (!ipDoc.exists()) {
        // If the IP does not exist, it means this is a new visitor
        const docSnap = await getDoc(countRef);
        if (docSnap.exists()) {
          const currentCount = docSnap.data().current_count;
          setCount(currentCount);

          // Increment the count
          await updateDoc(countRef, {
            current_count: increment(1),
          });

          // Store the IP in the Firestore to prevent double counting
          await setDoc(ipRef, {
            timestamp: new Date(),
          });

          // Fetch the updated count
          const updatedDocSnap = await getDoc(countRef);
          if (updatedDocSnap.exists()) {
            setCount(updatedDocSnap.data().current_count);
          }
        }
      } else {
        console.log("IP already recorded, not incrementing count.");
        let docSnap = await getDoc(countRef);
        setCount(docSnap.data().current_count);
      }
      setLoading(false);
    };

    fetchVisitorCount();
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white p-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold">Gotchaa 😂😂</h1>
        <p className="mt-2 text-lg">You are not alone though</p>
      </header>

      <main className="bg-white text-black rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-center mb-4">Visitor Counter</h2>
        <div className="text-center">
          <p className="text-6xl font-extrabold animate-pulse">{loading ? "wait for it...":count}</p>
          <p className="mt-2 text-lg"><span className="font-semibold">{count}</span> other have been also caught 😂😂</p>
        </div>
      </main>

      <footer className="mt-8 text-center">
        <p className="text-sm">Thank you for being a part of our journey! 🚀</p>
      </footer>
    </div>
  );
}

export default App
