import { useSelector } from 'react-redux';
import config from '@/config/config';
// import { Divider } from 'antd';
import CommonLucideIcon from '@/common/Icons/CommonLucideIcon';
import { useEffect } from 'react';

const Profile = () => {
  const { loggedUser } = useSelector((state) => state.Uislice);
  const profileData = loggedUser.details;
  console.log('PROFILE', profileData);
  useEffect(() => {}, [loggedUser]);
  return (
    <div className="flex justify-center items-center bg-gray-100 mt-10">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        {/* Profile Image */}
        <div className="flex justify-center">
          <img
            src={`${config.imageUrl}/employees/${profileData.photo[0]?.name}`}
            alt="Profile"
            className="rounded-full w-32 h-32 border-4 border-indigo-500 object-cover"
          />
        </div>

        {/* Name, Username, and Role */}
        <div className="text-center mt-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            {profileData.name}
          </h2>
          <p className="text-sm text-gray-500">@{profileData.userName}</p>
          <p className="text-indigo-500 mt-2">{profileData.role}</p>
        </div>

        {/* <Divider plain style={{ borderColor: '#64748B' }}> */}
          <CommonLucideIcon
            name={'user-pen'}
            size={18}
            className={'text-primary'}
          />
        {/* </Divider> */}
        {/* Contact Info with aligned labels and values */}
        <div className="mt-4">
          {/* Wrapper for labels and values */}
          <div className="flex flex-col gap-2 w-[80%] mx-auto">
            <div className="flex">
              <span className="w-20 font-semibold text-gray-600">Email:</span>
              <span className="text-gray-600">{profileData.email}</span>
            </div>
            <div className="flex">
              <span className="w-20 font-semibold text-gray-600">Name:</span>
              <span className="text-gray-600">{profileData.name}</span>
            </div>
            <div className="flex">
              <span className="w-20 font-semibold text-gray-600">Phone:</span>
              <span className="text-gray-600">{profileData.phoneNo}</span>
            </div>
            <div className="flex">
              <span className="w-20 font-semibold text-gray-600">
                Location:
              </span>
              <span className="text-gray-600">{profileData.location}</span>
            </div>
          </div>
        </div>

        {/* Social Media Links (optional) */}
        <div className="mt-6 flex justify-center space-x-3">
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 hover:text-blue-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M4.98 3.5A2.5 2.5 0 107.5 6a2.5 2.5 0 00-2.5-2.5zM2.75 8.25h4.5V21h-4.5V8.25zM9 8.25h4.207v1.75h.09c.585-.928 2.013-1.907 4.153-1.907 4.05 0 4.797 2.665 4.797 6.131v6.521h-4.5v-5.796c0-1.38-.024-3.152-1.92-3.152-1.924 0-2.217 1.5-2.217 3.045V21h-4.5V8.25z"
                clipRule="evenodd"
              />
            </svg>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            className="text-blue-400 hover:text-blue-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0016.88 2a4.48 4.48 0 00-4.49 4.49c0 .35.03.69.1 1.02A12.72 12.72 0 013 3.1a4.48 4.48 0 001.39 6 4.4 4.4 0 01-2-.56v.05a4.48 4.48 0 003.59 4.4 4.36 4.36 0 01-1.19.16c-.29 0-.58-.03-.86-.08a4.48 4.48 0 004.18 3.11A9 9 0 013 19.5 12.66 12.66 0 009.28 21c8.03 0 12.42-6.66 12.42-12.44v-.57A8.89 8.89 0 0023 3z" />
            </svg>
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="text-gray-800 hover:text-gray-900"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M12 2a10 10 0 00-3.16 19.49c.5.09.68-.21.68-.47v-1.73c-2.78.6-3.37-1.35-3.37-1.35-.46-1.17-1.12-1.48-1.12-1.48-.92-.63.07-.61.07-.61 1.02.07 1.56 1.04 1.56 1.04.91 1.56 2.39 1.1 2.97.84.09-.66.36-1.1.66-1.35-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.26-.45-1.3.1-2.72 0 0 .84-.27 2.75 1.02a9.44 9.44 0 015 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.42.2 2.46.1 2.72.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.68-4.56 4.93.37.32.7.94.7 1.9v2.81c0 .27.18.57.68.47A10 10 0 0012 2z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Profile;
