import axios from 'axios';
import React, { useState } from 'react';
import FacebookLogin from 'react-facebook-login';
import socketClient from 'socket.io-client';

// const SERVER = 'http://127.0.0.1:5000';
const SERVER = 'https://insta-dm-webhooks.herokuapp.com';

const socket = socketClient(SERVER, { transports: ['websocket'] });

socket.on('test', (data) => console.log(data));

const InstaDM = () => {
  const [userAccessToken, setUserAccessToken] = useState('');
  const [userName, setUserName] = useState('');
  const [userPage, setUserPage] = useState('');
  const [userPageID, setUserPageID] = useState('');
  const [userPageToken, setUserPageToken] = useState('');
  let accessToken =
    'EAAOIlgakh54BAICWfcIA2gqZBknh8tR1GhQ7emA3umPtB9UtnaFLapBcjOGJPZB53430za8EbCrVZCnTKmAZBHxi96jFkVYQzhQAvT8jkOOg42F3oSJwjsSpEWwr8PgsFPv3LdDKMBcSzZB0VBUpFPx1RZBE1tJEf13ZByNKRq1aS0ffQonulHrV0gaeVkswnu9H0ib3VgASZACxBYB4O4ZBdlmeEFivYe9oZD';
  const fbLoginResponse = (response) => {
    setUserAccessToken(response.accessToken);
    setUserName(response.name);
  };

  const getUserPages = async () => {
    const { data } = await axios(
      `https://graph.facebook.com/v9.0/me/accounts?access_token=${userAccessToken}`
    );
    setUserPage(data.data[0].name);
    setUserPageID(data.data[0].id);
  };

  const getUserPageToken = async () => {
    const { data } = await axios(
      `https://graph.facebook.com/v9.0/me/accounts?access_token=${userAccessToken}`
    );
    console.log(data);
    setUserPageToken(data.data[0].access_token);
    console.log('page access token saved');
  };

  // geting instagram conversation - message threads
  const getInstaMessageThreads = async () => {
    const { data } = await axios(
      `https://graph.facebook.com/v9.0/${userPageID}/conversations?platform=instagram&access_token=EAAIEDxV2qx4BACnBbwmIXZBpGJuxW9POeq3m497HZBRD8ZB970Jg9Q1CuIwLqMUvZCFaJ5rgZAMcP1bn17W8NUY0bm152cQWjpgSPXqYZAZAiU7V4vLuv3XvN5ZBBTwH34xpFyQCMujAD25mYY1HkzduzId2HRqCEZCJHhfnAWpymtZC3HZCdf014SnzBPCZCIOL29YtUidndGZAjIQZDZD`
    );
    console.log(data);
    // setUserPageToken(data.data[0].access_token);
    // console.log('page access token saved');
  };

  //enable page subscriptions
  const enablePageSubscription = async () => {
    const { data } = await axios(
      `https://graph.facebook.com/v12.0/${userPageID}/subscribed_apps?subscribed_fields=feed&access_token=${userPageToken}`
    );
    console.log(data);
    // setUserPageToken(data.data[0].access_token);
    // console.log('page access token saved');
  };

  // confirm page subscriptions
  const confirmPageSubscription = async () => {
    const { data } = await axios(
      `https://graph.facebook.com/v12.0/me/subscribed_apps?access_token=${userPageToken}`
    );
    console.log(data);
    console.log('Page susbsccription enabled');
  };
  return (
    <div className='flex flex-col h-full items-center w-full'>
      <div className='bg-purple-600 flex items-center text-xl justify-center rounded-md px-4 py-4 flex-col'>
        {/* dropdown box */}
        <FacebookLogin
          appId='994602868049822'
          callback={fbLoginResponse}
          scope='instagram_basic, instagram_manage_messages, pages_manage_metadata, pages_manage_metadata, pages_show_list'
          render={(renderProps) => <button onClick={renderProps.onClick}>Login with Facebook</button>}
        />
        <button onClick={getUserPages}>Get User Pages</button>
        <button onClick={getUserPageToken}>Get FB Page Access Token</button>
        <button onClick={getInstaMessageThreads}>Get Instagram Message Threads</button>
        <button onClick={enablePageSubscription}>Enable page subscriptions</button>
        <button onClick={confirmPageSubscription}>Confirm page subscriptions</button>
      </div>
      <div className='flex items-center justify-center py-4 text-white text-xl w-1/2 bg-purple-600 mt-12'>
        {/* Result */}
        <div>
          <p>UserName: {userName}</p>
          <p>UserPage: {userPage}</p>
          <p>UserPageID: {userPageID}</p>
        </div>
      </div>
    </div>
  );
};

export default InstaDM;
