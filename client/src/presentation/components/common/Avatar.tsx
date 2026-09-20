import { useSelector } from "react-redux";
import type { RootState } from "../../../redux/store";


interface CompanyAvatarProps {
  name?: string | null;
  logoUrl?: string | null;
  className?: string;
  imageClassName?: string;
    item:'company'|'candidate'
}

export function Avatar({
  name,
  item,
  logoUrl,
  className = "",
  imageClassName = "",
}: CompanyAvatarProps) {
  const getInitials = (name?: string | null) => {
    if (!name?.trim()) return "C";

    const words = name.trim().split(/\s+/);

    if (words.length === 1) {
      return words[0].slice(0, 2).toUpperCase();
    }

    return `${words[0][0]}${words[1][0]}`.toUpperCase();
  };
const role=useSelector((state:RootState)=>state.auth.user).role
  const initials = getInitials(name);

   const baseUrl = import.meta.env.VITE_BACKEND_URL;

  return (
    <div
      className={`flex shrink-0 items-center justify-center overflow-hidden  ${role=='admin'?'bg-indigo-100 text-indigo-600':'bg-fuchsia-100 text-fuchsia-600'}  font-bold  ${className}`}
    >
      {logoUrl ? (
        <img
          src={`${baseUrl}${logoUrl}`}
          alt={`${name ??item=='company'?'Company Logo':'Candidate'} `}
          className={`h-full w-full object-cover ${imageClassName}`}
        />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
}