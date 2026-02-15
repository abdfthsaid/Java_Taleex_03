import axios from "axios";
import React, { useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import ProcessingModal from "./ProcessingModal";

const PaymentSection = ({ selectedAmount, selectedMethod, selectMethod }) => {
  const [showProcessing, setShowProcessing] = useState(false);
  const [processingStatus, setProcessingStatus] = useState("processing");
  const [errorMessage, setErrorMessage] = useState("");
  const [reason, setReason] = useState("");
  const [batteryInfo, setBatteryInfo] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [phone, setPhone] = useState("");
  const [agree1, setAgree1] = useState(true);

  const [errors, setErrors] = useState({});

  const handlePayment = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const number = phone;
    const amount = parseFloat(selectedAmount.replace("$", ""));
    let isSuccess = false;

    try {
      const blacklistCheck = await axios.get(
        `https://phase2backeend-ptsd.onrender.com/api/blacklist/check/${number}`,
        { validateStatus: () => true }
      );

      if (blacklistCheck.data?.isBlacklisted) {
        setProcessingStatus("failed");
        setReason("BLACKLISTED");
        setErrorMessage(
          "Macamiil waxa kugu maqan battery hore fadlan soo celi midkaas"
        );
        setIsSubmitting(false);
        return;
      }

      // ✅ KEEP STATION 03
      const res = await axios.post(
        "https://phase2backeend-ptsd.onrender.com/api/pay/03",
        {
          phoneNumber: number,
          amount: amount,
        },
        { validateStatus: () => true }
      );

      const data = res.data;

      if (res.status === 200 && data.success === true) {
        setProcessingStatus("success");
        setBatteryInfo({ battery_id: data.battery_id, slot_id: data.slot_id });
        isSuccess = true;
      } else if (data.error) {
        setProcessingStatus("failed");
        const errorMsg = data.error;

        if (errorMsg.includes("No available battery")) {
          setReason("NO_BATTERY_AVAILABLE");
          setErrorMessage(
            "Ma jiro baytari diyaar ah hadda, fadlan mar kale isku day"
          );
        } else if (errorMsg.includes("already have an active rental")) {
          setReason("ALREADY_RENTED");
          setErrorMessage(
            "Waxaad hore u haysataa battery, fadlan soo celi midkaas ka hor intaadan mid kale kireysanin"
          );
        } else if (errorMsg.includes("battery is already rented")) {
          setReason("BATTERY_TAKEN");
          setErrorMessage(
            "Battery-gan waa la kireystay, fadlan mar kale isku day"
          );
        } else if (errorMsg.includes("Payment not approved")) {
          setReason("PAYMENT_FAILED");
          setErrorMessage("Lacag bixinta ma dhicin, fadlan hubi numberkaaga");
        } else if (
          errorMsg.includes("blocked") ||
          errorMsg.includes("blacklist")
        ) {
          setReason("BLACKLISTED");
          setErrorMessage(
            "Macamiil waxa kugu maqan battery hore fadlan soo celi midkaas"
          );
        } else {
          setReason("PAYMENT_FAILED");
          setErrorMessage(errorMsg);
        }
      } else {
        setProcessingStatus("failed");
        setReason("unknown_error");
        setErrorMessage("Khalad dhacay, fadlan mar kale isku day");
      }

      if (!isSuccess) {
        setIsSubmitting(false);
      }
    } catch (err) {
      setProcessingStatus("failed");
      setReason("network_error");
      setErrorMessage("Network error, please try again.");
      setIsSubmitting(false);
    }

    if (isSuccess) {
      setTimeout(() => {
        setShowProcessing(false);
        setProcessingStatus("processing");
        setReason("");
        setErrorMessage("");
        setBatteryInfo(null);
        setPhone("");
        setAgree1(false);
        setIsSubmitting(false);
        setErrors({});
        selectMethod(null);
      }, 3000);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!phone || phone.length < 7) {
      newErrors.phone = "Fadlan gali number sax ah (ugu yaraan 7 digit)";
    }
    if (!agree1) {
      newErrors.agree1 = "Fadlan ogolow shuruudaha koowaad";
    }
    return newErrors;
  };

  const handlePay = () => {
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setShowProcessing(true);
      setProcessingStatus("processing");
      handlePayment();
    }
  };

  return (
    <>
      {showProcessing && (
        <ProcessingModal
          status={processingStatus}
          errorMessage={errorMessage}
          reason={reason}
          batteryInfo={batteryInfo}
          onClose={() => setShowProcessing(false)}
        />
      )}

      {/* Modern Styled Checkbox */}
      <div className="mx-3 mt-5">
        <div
          onClick={() => setAgree1(!agree1)}
          className={`flex items-center gap-3 p-3 transition-all duration-200 border-2 cursor-pointer rounded-xl ${
            agree1
              ? "border-pink-400 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 dark:border-pink-500"
              : "border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-600 hover:border-pink-200 dark:hover:border-pink-700"
          } ${errors.agree1 ? "border-red-400 dark:border-red-500" : ""}`}
        >
          <div
            className={`flex items-center justify-center w-6 h-6 rounded-md border-2 transition-all duration-200 ${
              agree1
                ? "bg-gradient-to-r from-pink-500 to-purple-500 border-pink-500"
                : "border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700"
            }`}
          >
            {agree1 && (
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
              Waan ogolahay
            </span>
            <a
              href="/rules.html"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-xs font-medium text-pink-500 underline transition hover:text-pink-600 dark:text-pink-400 dark:hover:text-pink-300"
            >
              📜 Shuruudaha iyo xeerarka isticmaalka Danab
            </a>
          </div>
        </div>

        {errors.agree1 && (
          <p className="mt-1 ml-1 text-xs text-red-500">{errors.agree1}</p>
        )}
      </div>
    </>
  );
};

export default PaymentSection;
