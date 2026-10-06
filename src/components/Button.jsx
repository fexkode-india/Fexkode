import { Link } from "react-router-dom";

function Button({ children, to, variant = "primary" }) {
  const base =
    "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300";

  const variants = {
    primary:
      "bg-electric text-white hover:bg-blue-500 hover:shadow-glow hover:-translate-y-0.5 active:scale-95",
    secondary:
      "border border-white/15 text-white hover:border-cyan/40 hover:bg-white/5 hover:-translate-y-0.5 active:scale-95",
  };

  return (
    <Link
      to={to}
      className={`${base} ${variants[variant]}`}
    >
      {children}
    </Link>
  );
}

export default Button;