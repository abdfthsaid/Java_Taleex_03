import { FaRegCreditCard } from "react-icons/fa";
import { MdCheckCircle, MdError } from "react-icons/md";

export default function ProcessingModal({ status = "processing", onClose }) {
  const renderContent = () => {
    if (status === "processing") {
      return (
        <>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Processing Payment
          </h2>
          <p className="text-gray-400 text-sm mb-6">
            Please wait while we process your payment...
          </p>
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-500 border-t-transparent">
              <FaRegCreditCard className="text-purple-500 text-2xl mx-auto my-3" />
            </div>
          </div>
        </>
      );
    } else if (status === "success") {
      return (
        <>
          <MdCheckCircle className="text-green-500 text-5xl mx-auto mb-3" />
          <h2 className="text-xl font-semibold text-green-600 mb-2">Success</h2>
          <p className="text-gray-500 text-sm mb-4">Payment completed successfully!</p>
        </>
      );
    } else {
      return (
        <>
          <MdError className="text-red-500 text-5xl mx-auto mb-3" />
          <h2 className="text-xl font-semibold text-red-600 mb-2">Payment Failed</h2>
          <p className="text-gray-500 text-sm mb-4">Something went wrong. Try again.</p>
        </>
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-[90%] max-w-sm p-6 rounded-xl shadow-lg relative text-center">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
          onClick={onClose}
        >
          &times;
        </button>
        {renderContent()}
      </div>
    </div>
  );
}
// …………...processmodule