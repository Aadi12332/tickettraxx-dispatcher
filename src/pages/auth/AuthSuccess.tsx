import AuthLayout from "../../layouts/AuthLayout";
import PasswordUpdatedSuccess from "./PasswordUpdatedSuccess";
import SuccessImg from "../../assets/images/SuccessIcon.png";

const AuthSuccess = () => {
  return (
    <AuthLayout>
      <PasswordUpdatedSuccess image={SuccessImg} />
    </AuthLayout>
  );
};

export default AuthSuccess;
