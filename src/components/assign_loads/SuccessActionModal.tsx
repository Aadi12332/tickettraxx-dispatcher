import CheckCircleIcon from "../../assets/images/successimg.png";

interface Props {
  open: boolean;
  title: string;
  description?: string;
}

export default function SuccessActionModal({
  open,
  title,
  description = "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/40 flex items-center justify-center p-4">
      <div className="w-full max-w-[600px] bg-white rounded-2xl px-10 py-7 text-center">
        <img
          src={CheckCircleIcon}
          alt=""
          className="w-32 mx-auto mb-6"
        />

        <h2 className="text-[24px] font-semibold text-[#34C759]">
          {title}
        </h2>

        <p className="mt-4 text-[16px] text-[#222]">
          {description}
        </p>
      </div>
    </div>
  );
}