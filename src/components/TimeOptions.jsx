import React from "react";
import { TfiTimer } from "react-icons/tfi";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TimeOptions = ({ selectedAmount, selectTime }) => {
  const isActiveTime = (amount) => selectedAmount === amount;

  const times = [
    {
      label: "1 Saac",
      amount: "$0.50",
      icon: (
        <svg
          className="w-12 h-12 mx-auto mb-2 text-pink-500"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6l4 2"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      ),
    },
    {
      label: "Unlimited",
      amount: "$1.00",
      icon: <TfiTimer className=" w-12 h-12 mx-auto mb-2 text-pink-500" />,
    },
  ];

  return (
    <div>
      <div className="py-6 text-center text-white rounded-b-lg shadow-lg bg-gradient-to-r from-pink-500 to-indigo-500">
        <h1 className="text-xl font-extrabold leading-tight">
          Danab - Java
          <br />
          Taleex
        </h1>
        <p className="text-sm font-light">Dooro Muddada kugu habboon</p>
      </div>

      <div className="flex justify-between gap-3 mt-6 ml-3 mr-3">
        {times.map((time, idx) => (
          <div
            key={idx}
            onClick={() => selectTime(time.amount)}
            className={`flex-1 relative text-center rounded-xl p-4 cursor-pointer shadow hover:scale-105 transition ${
              isActiveTime(time.amount)
                ? "border-2 border-pink-500 bg-white dark:bg-gray-700 active-time"
                : "bg-gray-100 dark:bg-gray-600"
            }`}
          >
            {time.icon}
            <p
              className={`text-base font-bold ${
                isActiveTime(time.amount) ? "text-pink-500" : ""
              }`}
            >
              {time.label}
            </p>
            <p
              className={`text-sm ${
                isActiveTime(time.amount)
                  ? "text-pink-400"
                  : "text-gray-600 dark:text-gray-300"
              }`}
            >
              {time.amount}
            </p>
            {isActiveTime(time.amount) && (
              <div className="absolute flex items-center justify-center w-5 h-5 border border-pink-500 rounded-full top-1 right-1">
                <FontAwesomeIcon
                  icon={faCheck}
                  className="text-xs text-pink-500"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimeOptions;
