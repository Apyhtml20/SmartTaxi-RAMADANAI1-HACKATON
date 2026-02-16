export function Button({ className = "", variant = "default", ...props }) {
  const base =
    "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition";
  const styles =
    variant === "outline"
      ? "border border-gray-600 text-gray-200 hover:bg-gray-700"
      : "bg-yellow-500 text-black hover:bg-yellow-400";

  return <button className={`${base} ${styles} ${className}`} {...props} />;
}
