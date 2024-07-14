import React from 'react';
import { useNotificationContext } from '../context/NotificationContext';

function NotificationIcon() {
  const { notifications } = useNotificationContext();
  const notificationCount = notifications.length;

  return (
    <div className="relative m-2 inline-flex">
      {notificationCount > 0 && (
        <div className="absolute bottom-auto left-auto right-0 top-0 z-10 inline-block -translate-y-1/2 translate-x-2/4 rotate-0 skew-x-0 skew-y-0 scale-x-75 scale-y-75 rounded-full bg-pink-700 p-1.5 text-xs"> {/* Modifiqué el padding y el tamaño del texto */}
          <span className="text-white">{notificationCount}</span>
        </div>
      )}
      <div className="flex items-center justify-center rounded-lg bg-black p-2 text-white shadow-lg dark:text-gray-200">
        <span className="[&>svg]:h-5 [&>svg]:w-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path
              fillRule="evenodd"
              d="M5.25 9a6.75 6.75 0 0 1 13.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 1 1-7.48 0 24.585 24.585 0 0 1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </div>
    </div>
  );
}

export default NotificationIcon;
