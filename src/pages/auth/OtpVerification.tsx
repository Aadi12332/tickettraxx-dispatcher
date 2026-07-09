import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";

import AuthLayout from "../../layouts/AuthLayout";
import AuthButton from "../../components/common/AuthButton";

const OtpVerification = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const handleVerify = () => {
    console.log("OTP:", otp);
    navigate("/reset-password");
  };

  return (
    <AuthLayout>
      <Link
        to="/forgot-password"
        className="inline-flex items-center gap-2 mb-8 text-sm text-gray-300 hover:text-white transition-colors"
      >
        <ChevronLeft size={22} />
        <span className="text-white font-light">Back</span>
      </Link>

      <h2 className="text-xl sm:text-3xl font-bold mb-2 text-white mt-10">
        Enter OTP
      </h2>

      <p className="text-(--color-text-gray) text-sm font-light mb-8 leading-relaxed">
        We have share a code of your registered email address tomhenry@abc.com
      </p>

      <div className="my-5.5">
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={5}
          renderSeparator={<span className="w-5" />}
          renderInput={(props) => (
            <input
              {...props}
              className="
                sm:w-[60px]!
                sm:h-[60px]!
                w-[40px]!
                h-[40px]!
                sm:rounded-2xl rounded-[10px]
                border
                border-(--border-gray)
                bg-(--bg-black)
                text-white
               text-lg md:text-2xl
                font-semibold
                outline-none
                focus:border-primary
              "
            />
          )}
        />
      </div>
      <AuthButton onClick={handleVerify} className="mt-6">
        Verify
      </AuthButton>
    </AuthLayout>
  );
};

export default OtpVerification;
