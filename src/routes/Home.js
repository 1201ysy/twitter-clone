import Tweet from "components/Tweet";
import { dbService, storageService } from "FBase";
import { v4 as uuidv4 } from 'uuid';
import React, { useEffect, useState } from "react";
import TweetFactory from "components/TweetFactory";

const Home = ({userObj}) =>{ 
    const [tweets, setTweets] = useState([]);

    // const getTweets = async() => {
    //     const dbTweets = await dbService.collection("tweets").get();
    //     dbTweets.forEach((document) => {
    //         const tweetObject = {
    //             ...document.data(),
    //             id: document.id,
    //         }
    //         setTweets(prev => [tweetObject, ...prev]);
    //     });
    // }

    useEffect(() => {
        //getTweets();
        dbService.collection("tweets").onSnapshot((snapshot) => {
            const tweetArray = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setTweets(tweetArray);
        })
    }, []);


    return (
    <div className="container">
        <TweetFactory userObj={userObj}/>
        <div style={{ marginTop: 30 }}>
            {tweets.map( (tweet) => (
            <Tweet key={tweet.id} tweetObj={tweet} isOwner={tweet.creatorId === userObj.uid} />
            ))}
        </div>
    </div>
    )
};
export default Home