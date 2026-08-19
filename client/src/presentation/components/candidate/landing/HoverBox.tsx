import { useState, type ReactNode } from "react";

type Props={
  children:ReactNode,
  className:string
  dark?:boolean
}
export function HoverBox({ children, className = "", dark = false }:Props) {
  const [hover, setHover] = useState(false);
  const border = dark ? "rgba(247,244,236,0.15)" : "#E3DDCE";
  const borderHover = dark ? "#D2992B" : "#2F6F63";
  const bgColor = dark ? "rgba(247,244,236,0.04)" : "#FFFFFF";
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`rounded-sm border flex items-center justify-center cursor-default ${className}`}
      style={{
        borderColor: hover ? borderHover : border,
        backgroundColor: bgColor,
        transform: hover ? "scale(1.015)" : "scale(1)",
        boxShadow: hover
          ? dark
            ? "0 20px 40px -20px rgba(0,0,0,0.5)"
            : "0 20px 40px -20px rgba(18,48,43,0.25)"
          : "0 0px 0px rgba(0,0,0,0)",
        transition: "transform 300ms ease, box-shadow 300ms ease, border-color 300ms ease",
      }}
    >
      {children}
    </div>
  );
}