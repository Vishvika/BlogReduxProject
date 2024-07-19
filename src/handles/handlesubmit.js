import { addDoc, collection } from "@firebase/firestore"
import { firestore } from "../components/firebase_setup/firebase"

// import { analytics } from "../components/firebase_setup/firebase"

const handleSubmit = (testdata) => {
    const ref = collection(firestore, "message") // Firebase creates this automatically
 
    let data = {
        testData: testdata
    }
    try {
        addDoc(ref, data)
    } catch(err) {
        console.log(err)
    }
}
 
export default handleSubmit;