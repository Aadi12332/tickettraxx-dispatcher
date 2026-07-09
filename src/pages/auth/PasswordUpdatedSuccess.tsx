import { useNavigate } from "react-router-dom";
import AuthButton from "../../components/common/AuthButton";

interface PasswordUpdatedSuccessProps {
  image?: string;
  title?: string;
  description?: string;
  buttonText?: string;
  redirectPath?: string;
}

const PasswordUpdatedSuccess = ({
  image,
  title = "Password Updated Successfully",
  description = "Your password has been updated successfully",
  buttonText = "Back to Login",
  redirectPath = "/login",
}: PasswordUpdatedSuccessProps) => {
  const navigate = useNavigate();

  return (
    <div
      className="
        w-full
        flex
        flex-col
        items-center
        text-center
      "
    >
      {/* Image */}
      {image && (
        <img
          src={image}
          alt="success"
          className="w-[100px] h-[135px] object-contain"
        />
      )}

      {/* Title */}
      <h2 className="text-xl sm:text-3xl font-bold mb-2 text-white mt-7">
        {title}
      </h2>

      {/* Description */}
      <p className="text-text-gray text-lg font-light mb-8 leading-relaxed">
        {description}
      </p>

      <AuthButton onClick={() => navigate(redirectPath)} className="mt-6">
        {buttonText}
      </AuthButton>
    </div>
  );
};

export default PasswordUpdatedSuccess;
