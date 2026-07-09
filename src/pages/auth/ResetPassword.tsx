import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import CommonInput from "../../components/common/CommonInput";
import { useNavigate } from "react-router-dom";
import AuthButton from "../../components/common/AuthButton";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  return (
    <AuthLayout>
      <Link
        to="/login"
        className="inline-flex items-center gap-2 mb-8 text-sm text-gray-300 hover:text-white transition-colors"
      >
        <ChevronLeft size={22} />
        <span className="text-white font-light">Back</span>
      </Link>

      <h2 className="text-xl sm:text-3xl font-bold mb-2 text-white mt-10">
        New Password
      </h2>

      <p className="text-text-gray text-sm font-light mb-8 leading-relaxed">
        Enter your registered email address. we'll send you a code to reset your
        password.
      </p>

      <div className="space-y-4">
        <CommonInput
          label="Enter New Password"
          placeholder="Password"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <AuthButton onClick={() => navigate("/auth-success")} className="mt-6">
          Save
        </AuthButton>
      </div>
    </AuthLayout>
  );
};

export default ResetPassword;
