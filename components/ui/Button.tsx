import Link from "next/link";

const Button = ({ title }: { title: string }) => {
  return (
    <Link href="/map">
      <button className="relative inline-flex h-12 overflow-hidden rounded-lg p-[2px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
        <span className="text-lg inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-slate-950 px-10 py-1 font-medium text-white backdrop-blur-3xl">
          {title}
        </span>
      </button>
    </Link>
  );
};

export default Button;
