import axios from 'axios';
import React, { useEffect, useState } from 'react';
import FacebookLogin from 'react-facebook-login';
import socketClient from 'socket.io-client';
import { FcOk, FcCancel } from 'react-icons/fc';

// const SERVER = 'http://127.0.0.1:5000';
const SERVER = 'https://insta-dm-webhooks.herokuapp.com';

const socket = socketClient(SERVER, { transports: ['websocket'] });

const InstaDM = () => {
  const [userAccessToken, setUserAccessToken] = useState('');
  const [userName, setUserName] = useState('');
  const [userPage, setUserPage] = useState('');
  const [userPageID, setUserPageID] = useState('');
  const [userPageToken, setUserPageToken] = useState('');
  const [messageData, setmessageData] = useState('');
  const [senderData, setSenderData] = useState('');

  //
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
    setUserPageToken(data.data[0].access_token);
  };

  // geting instagram conversation - message threads
  //   const getInstaMessageThreads = async () => {
  //     const { data } = await axios(
  //       `https://graph.facebook.com/v9.0/${userPageID}/conversations?platform=instagram&access_token=EAAIEDxV2qx4BADk3ATKUAJpQZAZAIyAo7cD9Om3MCLweEZBojGEb0BXytZCR2wdvoYUAmE2jTGzaBA10vFoeAL8XxQP2t8X6UaEdCE8mxuUVkbW55Acu4f9R8emR5GK2vOZAzRbIYli5HBZBnb770zZCi9GR7sRpIyvGkffw6mCZBf2ZBZCPEIyO826hGYVSwTA3Y1enxTm58QvgZDZD`
  //     );
  //     console.log(data);
  //     // setUserPageToken(data.data[0].access_token);
  //     // console.log('page access token saved');
  //   };

  //enable page subscriptions
  const enablePageSubscription = async () => {
    const { data } = await axios(
      `https://graph.facebook.com/v12.0/${userPageID}/subscribed_apps?subscribed_fields=feed&access_token=${userPageToken}`
    );
    // setUserPageToken(data.data[0].access_token);
    // console.log('page access token saved');
  };

  // confirm page subscriptions
  const confirmPageSubscription = async () => {
    const { data } = await axios(
      `https://graph.facebook.com/v12.0/me/subscribed_apps?access_token=${userPageToken}`
    );
    console.log('Page susbsccription enabled');
  };

  //insta dm webhook
  //socket.io listening
  socket.on('message_received', (data) => setmessageData(data));
  useEffect(async () => {
    if (messageData) {
      const { data } = await axios(
        `https://graph.facebook.com/v12.0/${messageData.senderId}?fields=name,profile_pic,follower_count&access_token=${userPageToken}`
      );
      setSenderData(data);
    }
  }, [messageData]);
  //getting user details from IGSID (instagram senderId)

  return (
    <div className='flex h-full items-center w-full justify-around'>
      <div className='bg-secondary flex items-center text-xl justify-center rounded-md px-5 py-6 flex-col shadow-xl'>
        {/* dropdown box */}
        <FacebookLogin
          appId='994602868049822'
          callback={fbLoginResponse}
          scope='instagram_basic, instagram_manage_messages, pages_manage_metadata, pages_manage_metadata, pages_show_list'
          render={(renderProps) => <button onClick={renderProps.onClick}>Login with Facebook</button>}
          cssClass='bg-blue-600 w-full text-white py-3 px-12 font-medium rounded  hover:bg-blue-700'
        />
        <button
          className='text-gray-50 bg-purple-600 mt-4 rounded p-2 px-6 py-3 w-full hover:bg-purple-700'
          onClick={getUserPages}
        >
          Get User Pages
        </button>
        <button
          className='text-gray-50 bg-purple-600 mt-4 rounded p-2 px-6 py-3 w-full hover:bg-purple-700 '
          onClick={getUserPageToken}
        >
          Get Page Access Token
        </button>
        {/* <button onClick={getInstaMessageThreads}>Get Instagram Message Threads</button> */}
        {/* <button
          className='text-gray-50 bg-red-500 mt-4 rounded p-2 w-full hover:bg-red-600'
          onClick={enablePageSubscription}
        >
          Enable page subscriptions
        </button> */}
        {/* <button
          className='text-gray-50 bg-red-500 mt-4 rounded p-2 w-full hover:bg-red-600'
          onClick={confirmPageSubscription}
        >
          Confirm page subscriptions
        </button> */}
        <div className='text-white flex flex-col justify-start w-full mt-6'>
          <p className='border-2 cursor-pointer border-purple-500 rounded p-2 text-xl '>User : {userName}</p>
          <p className='border-2 cursor-pointer border-purple-500 rounded p-2 mt-3 text-xl '>
            Page : {userPage}
          </p>
          <p className='border-2 cursor-pointer border-purple-500 rounded p-2 mt-3 text-xl '>
            PageID : {userPageID}
          </p>
          <p className='border-2 cursor-pointer border-purple-500 rounded p-2 mt-3 text-xl flex items-center'>
            Page Access Token :{' '}
            <span className='ml-7 scale-125 -mb-1'>{userPageToken ? <FcOk /> : <FcCancel />}</span>
          </p>
        </div>
      </div>
      <div className='flex   flex-col text-white text-xl w-1/2 h-3/5 bg-secondary mt-12 -ml-96 rounded'>
        {/* Result */}
        <div className='h-10 px-2 bg-gray-900 w-full rounded flex items-center justify-start text-gray-100 text-base'>
          Network: <span className='ml-1 scale-95 -mb-1'>{userPageToken ? <FcOk /> : <FcCancel />}</span>
        </div>
        <div className='h-80 p-6'>
          {senderData ? (
            <div className=' p-2 px-2 w-56 '>
              <p className='rounded-lg flex bg-blue-600 py-1 px-2 items-center '>
                <img className='border rounded-full w-10' src={senderData.profile_pic} alt='profile image' />
                <span className='ml-2 font-medium'>{senderData.name}</span>
              </p>
              <div className='bg-indigo-600 py-1 rounded mt-1 px-2'>
                <p className='m-0'>{messageData.message}</p>
                <p className='text-xs text-gray-300 font-medium mt-1'>
                  {messageData.date}
                  <span className='ml-2'>{messageData.time}</span>
                </p>
              </div>
            </div>
          ) : (
            'No Messages yet'
          )}
        </div>
      </div>
    </div>
  );
};

export default InstaDM;
