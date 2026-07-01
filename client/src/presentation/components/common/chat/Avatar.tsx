export function Avatar({ name, size = "w-12 h-12" }:{name:string,size:string}) {
  return (
    <div
      className={`${size} } rounded-full flex items-center justify-center text-white font-semibold shrink-0 select-none`}
    >
      <span className="text-sm">{getInitials(name)}</span>
    </div>
  );
}

function getInitials(name:string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

