import { setUser, clearUser } from "../features/auth/authSlice";
import {auth, db} from "../../../../firebase/SettingFirebase";
import { getDocs, query, collection, where } from "firebase/firestore";
import {
  updateUserDetails,
  clearUserDetails,
} from "../features/userDetail/userDetailSlice";

// const dispatch = useDispatch();
export const listentoAuthChanges=()=>(dispatch)=>{
    auth.onAuthStateChanged((async(user)=>{
 if (user) {
    dispatch(setUser({userID:user.uid,email:user.email,accessToken:user.accessToken, isLoading:"logged"}));
    try {
    const snapshot = await getDocs(
      query(
        collection(
          db,
          "employee_details_collection"),
          where("username", "==", user.email))
    );
    if (snapshot.docs.length>0) {
          const results = await Promise.all(
            snapshot.docs.map((data) => {
              return data.data();
            })
          );
        dispatch(updateUserDetails(results))
        console.log("User Found");
        
    }
    else{
        console.log("User not found");
    }
} catch (error) {
    console.error("Error getting user details", error.message)
}
 }
 else{
dispatch(clearUser({isLoading:"noLogged"}));
 }
    }))
   
}