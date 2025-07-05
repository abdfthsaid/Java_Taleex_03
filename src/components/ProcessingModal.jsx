// import { useEffect } from "react";
// import { FaRegCreditCard } from "react-icons/fa";
// import { MdCheckCircle, MdError } from "react-icons/md";

// function ErrorMessage({ color, title, children }) {
//   // Midabka icon-ka iyo cinwaanka (h2)
//   const iconColor = color === "red" ? "text-red-500" : "text-yellow-500";
//   const titleColor = color === "red" ? "text-red-600" : "text-yellow-600";

//   return (
//     <>
//       <MdError className={`mx-auto mb-3 text-5xl ${iconColor}`} />
//       <h2 className={`mb-2 text-xl font-semibold ${titleColor}`}>
//         {title}
//       </h2>
//       {children && (
//         <p className="mb-4 text-sm text-gray-500">
//           {children}
//         </p>
//       )}
//     </>
//   );
// }

// export default function ProcessingModal({
//   status = "processing",
//   errorMessage,
//   reason,
//   batteryInfo,
//   onClose,
// }) {
//   useEffect(() => {
//     if (reason === "no_battery") {
//       const timer = setTimeout(() => {
//         onClose();
//       }, 2000);
//       return () => clearTimeout(timer);
//     }
//   }, [reason, onClose]);

//   const renderContent = () => {
//     if (status === "processing") {
//       return (
//         <>
//           <h2 className="mb-2 text-xl font-semibold text-gray-800">
//             Processing Payment
//           </h2>
//           <p className="mb-6 text-sm text-gray-400">
//             Please wait while we process your payment...
//           </p>
//           <div className="flex items-center justify-center">
//             <div className="w-16 h-16 border-4 border-purple-500 rounded-full animate-spin border-t-transparent">
//               <FaRegCreditCard className="mx-auto my-3 text-2xl text-purple-500" />
//             </div>
//           </div>
//         </>
//       );
//     }

//     if (status === "success") {
//       return (
//         <>
//           <MdCheckCircle className="mx-auto mb-3 text-5xl text-green-500" />
//           <h2 className="mb-2 text-xl font-semibold text-green-600">Success</h2>
//           <p className="mb-2 text-sm text-gray-500">
//             Payment completed successfully!
//           </p>
//           {batteryInfo && (
//             <p className="text-sm text-gray-600">
//               🔓 Battery <strong>{batteryInfo.battery_id}</strong> unlocked from Slot{" "}
//               <strong>{batteryInfo.slot_id}</strong>.
//             </p>
//           )}
//         </>
//       );
//     }

//     // Halkan waxaan isticmaalnaa ErrorMessage component-ka
//     return errorMessage === "no_battery" ? (
//       <ErrorMessage color="yellow" title="Ma jiro baytari diyaar ah">
//         Waqtigan la joogo ma jiro powerbank buuxa oo ≥ 60%. Fadlan isku day mar dambe.
//       </ErrorMessage>
//     ) : (
//       <ErrorMessage color="red" title="Payment Failed">
//         {errorMessage || "Something went wrong. Try again."}
//       </ErrorMessage>
//     );
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="bg-white w-[90%] max-w-sm p-6 rounded-xl shadow-lg relative text-center">
//         <button
//           className="absolute text-xl text-gray-500 top-3 right-3 hover:text-black"
//           onClick={onClose}
//         >
//           &times;
//         </button>
//         {renderContent()}
//       </div>
//     </div>
//   );
// }

import { useEffect } from "react";
import { FaRegCreditCard } from "react-icons/fa";
import { MdCheckCircle, MdError } from "react-icons/md";

export default function ProcessingModal({
  status = "processing",
  errorMessage,
  batteryInfo,
  onClose,
}) {
  // ⏱️ Auto-close if it's the "no battery" error
  useEffect(() => {
    if (errorMessage === "No available battery ≥ 60%") {
      const timer = setTimeout(() => {
        onClose();
      }, 2000); // 2 seconds

      return () => clearTimeout(timer);
    }
  }, [errorMessage, onClose]);

  const renderContent = () => {
    if (status === "processing") {
      return (
        <>
          <h2 className="mb-2 text-xl font-semibold text-gray-800">
            Processing Payment
          </h2>
          <p className="mb-6 text-sm text-gray-400">
            Please wait while we process your payment...
          </p>
          <div className="flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-purple-500 rounded-full animate-spin border-t-transparent">
              <FaRegCreditCard className="mx-auto my-3 text-2xl text-purple-500" />
            </div>
          </div>
        </>
      );
    }

    if (status === "success") {
      return (
        <>
          <MdCheckCircle className="mx-auto mb-3 text-5xl text-green-500" />
          <h2 className="mb-2 text-xl font-semibold text-green-600">Success</h2>
          <p className="mb-2 text-sm text-gray-500">
            Payment completed successfully!
          </p>
          {batteryInfo && (
            <p className="text-sm text-gray-600">
              🔓 Battery <strong>{batteryInfo.battery_id}</strong> unlocked from Slot{" "}
              <strong>{batteryInfo.slot_id}</strong>.
            </p>
          )}
        </>
      );
    }

    if (errorMessage === "No available battery ≥ 60%") {
      return (
        <>
          <MdError className="mx-auto mb-3 text-5xl text-yellow-500" />
          <h2 className="mb-2 text-xl font-semibold text-yellow-600">
            Ma jiro baytari diyaar ah
          </h2>
          <p className="mb-4 text-sm text-gray-500">
            Waqtigan la joogo ma jiro powerbank buuxa oo diyaar ah. Fadlan isku day mar dambe.
          </p>
        </>
      );
    }

    return (
      <>
        <MdError className="mx-auto mb-3 text-5xl text-red-500" />
        <h2 className="mb-2 text-xl font-semibold text-red-600">
          Payment Failed
        </h2>
        <p className="mb-4 text-sm text-gray-500">
          {errorMessage || "Something went wrong. Try again."}
        </p>
      </>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-[90%] max-w-sm p-6 rounded-xl shadow-lg relative text-center">
        <button
          className="absolute text-xl text-gray-500 top-3 right-3 hover:text-black"
          onClick={onClose}
        >
          &times;
        </button>
        {renderContent()}
      </div>
    </div>
  );
}
