import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import CommonInput from "./CommonInput";

interface Props {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const PasswordInput = ({ value, onChange, placeholder }: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <CommonInput
      label="Password"
      type={showPassword ? "text" : "password"}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rightIcon={
        showPassword ? (
          <EyeOff size={22} className="text-white" />
        ) : (
          <Eye size={22} className="text-white" />
        )
      }
      onRightIconClick={() => setShowPassword(!showPassword)}
    />
  );
};

export default PasswordInput;
