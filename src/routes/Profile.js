import React, { useEffect, useState } from "react";
import { authService, dbService } from "../FBase";
import {useHistory} from "react-router-dom"

const Profile = ({userObj, refreshUser}) => {
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const history = useHistory()
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/")
    }

    const onChange = (event) => {
        const {target: {value},} =event;
        setNewDisplayName(value);
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        if (userObj.displayName !== newDisplayName){
            await userObj.updateProfile({
                displayName: newDisplayName,
            });
            refreshUser();
        }
    }

    const getMyTweets = async() => {
        const tweets = await dbService.collection("tweets").where("creatorId", "==", userObj.uid).orderBy("createdAt", "desc").get();
        console.log(tweets.docs.map((doc)=> doc.data()));

    }
    useEffect(() => {
        getMyTweets();
    },[]);

    return (
    <div className="container">
        <form onSubmit={onSubmit} className="profileForm">
            <input type="text" placeholder="Display name" value={newDisplayName} onChange={onChange} autoFocus/>
            <input
                type="submit"
                value="Update Profile"
                className="formBtn"
                style={{
                marginTop: 10,
                }}
            />
        </form>
        <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
            Log Out
        </span>
    </div>
    );
};
export default Profile