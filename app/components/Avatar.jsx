import { user } from "../lib/data";

function initials(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function Avatar({
  name = user.name,
  size = "h-10 w-10 text-sm",
  showStatus = true,
  available = true,
  rounded = "rounded-xl",
}) {
  return (
    <span className="relative inline-flex shrink-0">
      <span
        className={`${size} ${rounded} bg-slate-900 text-white flex items-center justify-center font-bold tracking-tight select-none`}
        aria-hidden="true"
      >
        {initials(name)}
      </span>
      {showStatus ? (
        <span
          className={`absolute -right-1 -bottom-1 h-3 w-3 rounded-full border-2 border-white ${
            available ? "bg-green-500" : "bg-slate-400"
          }`}
          aria-hidden="true"
        />
      ) : null}
    </span>
  );
}
