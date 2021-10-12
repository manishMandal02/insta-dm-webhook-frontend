import React from 'react';

const Scrapper = () => {
  return (
    <div className='flex flex-col h-full items-center w-full'>
      <div className='bg-purple-600 flex items-center text-xl justify-center rounded-md px-4 py-4 flex-col'>
        {/* dropdown box */}
        <div className='flex flex-col text-gray-900'>
          {/* <label className='text-white mb-2'>Select the website</label> */}
          <select className='py-2 px-2 rounded-sm text-lg'>
            <option value='youtube' defaultValue>
              <img
                src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/132px-Instagram_logo_2016.svg.png'
                alt='logo'
              />{' '}
              Youtube
            </option>
            <option value='instagram'>Instagram</option>
          </select>
        </div>
        <input className='mt-4 py-1 px-2 ' type='text' placeholder='puneetko' />
      </div>
      <div className='flex items-center justify-center py-4 text-white text-xl w-1/2 bg-purple-600 mt-12'>
        Result
      </div>
    </div>
  );
};

export default Scrapper;
