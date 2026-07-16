interface SectionTitleProps {
  title: string;
  className?: string;
}

const SectionTitle = ({ title, className = "" }: SectionTitleProps) => {
  return (
    <h2
      className={`
        text-sm
        min-h-[33px]
        flex items-center
        md:text-base
        xl:text-[1.1vw]
        // xl:text-base
        font-semibold
        text-black
        font-archivo
       lg:text-nowrap
        ${className}
      `}
    >
      {title}
    </h2>
  );
};

export default SectionTitle;
