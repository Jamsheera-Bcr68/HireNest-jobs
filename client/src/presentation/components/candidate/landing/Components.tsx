import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { useState } from 'react';


const mono = { fontFamily: "'JetBrains Mono', monospace" };
const display = { fontFamily: "'Fraunces', serif" };
const body = { fontFamily: "'Inter', sans-serif" };
type EyebrowProps = {
  children: ReactNode;
  tone?: string;
};
export function Eyebrow({ children, tone = 'ink' }: EyebrowProps) {
  const color =
    tone === 'gold' ? '#D2992B' : tone === 'paper' ? '#EDE7D6' : '#2F6F63';
  const mono = { fontFamily: "'JetBrains Mono', monospace" };
  return (
    <div
      className="inline-flex items-center gap-2 text-xs uppercase tracking-widest mb-4"
      style={{ ...mono, color, letterSpacing: '0.14em' }}
    >
      <span className="w-6 h-px" style={{ backgroundColor: color }} />
      {children}
    </div>
  );
}

type FeatureCardProps = {
  icon: LucideIcon;
  title: string;
  desc: string;
};
export function FeatureCard({ icon: Icon, title, desc }: FeatureCardProps) {
  const [hover, setHover] = useState(false);
  return (
    <div
      className="p-6 rounded-sm border cursor-default"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        borderColor: hover ? '#62309f' : '#E3DDCE',
        backgroundColor: '#FFFFFF',
        transform: hover ? 'translateY(-6px)' : 'translateY(0px)',
        boxShadow: hover
          ? '0 16px 32px -16px rgba(18,48,43,0.28)'
          : '0 0px 0px rgba(0,0,0,0)',
        transition:
          'transform 300ms ease, box-shadow 300ms ease, border-color 300ms ease',
      }}
    >
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center mb-5"
        style={{
          backgroundColor: hover ? '#62309f' : '#F0EDE0',
          transition: 'background-color 300ms ease', color:hover?'white':'#62309f'
        }}
      >
        <Icon
          size={18}
          strokeWidth={1.75}
          color={hover ? '#F7F4EC' : '#62309f'}
          style={{ transition: 'color 300ms ease' }}
        />
      </div>
      <h3
        className="text-lg mb-2"
        style={{ ...display, color: '#12302B', fontWeight: 600 }}
      >
        {title}
      </h3>
      <p
        className="text-sm leading-relaxed"
        style={{ ...body, color: 'rgba(18,48,43,0.68)' }}
      >
        {desc}
      </p>
    </div>
  );
}

type ButtonProps = {
  children: ReactNode;
  variant?: string;
  bg: string;
  color: string;
  borderColor?: string;
  className: string;
  style?: Object;
};
export function Button({
  children,
  variant = 'solid',
  bg,
  color,
  borderColor,
  className = '',
  style = {},
}: ButtonProps) {
  const [hover, setHover] = useState(false);
  const base = {
    backgroundColor:
      variant === 'outline' ? (hover ? borderColor : 'transparent') : bg,
    color: variant === 'outline' ? (hover ? '#F7F4EC' : color) : color,
    borderColor: borderColor || 'transparent',
    transform: hover ? 'translateY(-2px)' : 'translateY(0px)',
    boxShadow: hover
      ? '0 10px 20px -10px rgba(18,48,43,0.35)'
      : '0 0px 0px rgba(0,0,0,0)',
    filter: hover && variant === 'solid' ? 'brightness(1.08)' : 'brightness(1)',
    transition:
      'transform 220ms ease, box-shadow 220ms ease, filter 220ms ease, background-color 220ms ease, color 220ms ease',
  };
  return (
    <button
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={className}
      style={{ ...base, ...style }}
    >
      {children}
    </button>
  );
}

type TrackStepProps = {
  index: number;
  label: string;
  sub?: string;
  tone: string;
};
export function TrackStep({ index, label, sub, tone }: TrackStepProps) {
  const dot = tone === 'gold' ? '#D2992B' : '#2F6F63';
  const [hover, setHover] = useState(false);
  return (
    <div
      className="flex flex-col items-start min-w-[140px] cursor-default"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        transform: hover ? 'translateY(-3px)' : 'translateY(0px)',
        transition: 'transform 220ms ease',
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <span
          className="rounded-full"
          style={{
            backgroundColor: dot,
            width: hover ? 10 : 10,
            height: hover ? 10 : 10,
            boxShadow: hover ? `0 0 0 4px ${dot}33` : '0 0 0 0px transparent',
            transition: 'box-shadow 220ms ease',
          }}
        />
        <span
          style={{
            ...mono,
            fontSize: 11,
            color: hover ? '#12302B' : 'rgba(18,48,43,0.5)',
            transition: 'color 220ms ease',
          }}
        >
          {String(index).padStart(2, '0')}
        </span>
      </div>
      <p style={{ ...body, fontWeight: 600, color: '#12302B', fontSize: 14.5 }}>
        {label}
      </p>
      {sub && (
        <p
          style={{ ...body, fontSize: 12.5, color: 'rgba(18,48,43,0.55)' }}
          className="mt-0.5"
        >
          {sub}
        </p>
      )}
    </div>
  );
}

type WhyCardProps={
     index:number, title:string, desc:string
}
export function WhyCard({ index, title, desc }:WhyCardProps) {
  const [hover, setHover] = useState(false);
  return (
    <div
      className="cursor-default"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ transform: hover ? "translateY(-4px)" : "translateY(0px)", transition: "transform 250ms ease" }}
    >
      <span style={{ ...mono, fontSize: 11, color: "#D2992B" }}>
        {String(index).padStart(2, "0")}
      </span>
      <h3
        className="mt-2 mb-2 text-lg"
        style={{ ...display, fontWeight: 600, color: hover ? "#2F6F63" : "#12302B", transition: "color 250ms ease" }}
      >
        {title}
      </h3>
      <p className="text-sm" style={{ color: "rgba(18,48,43,0.65)" }}>
        {desc}
      </p>
    </div>
  );
}


 
export 
function CtaPanel({ prompt, children }:{prompt:string,children:ReactNode}) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="p-8 rounded-sm border cursor-default"
      style={{
        borderColor: hover ? "rgba(247,244,236,0.4)" : "rgba(247,244,236,0.15)",
        backgroundColor: hover ? "rgba(247,244,236,0.05)" : "transparent",
        transform: hover ? "translateY(-3px)" : "translateY(0px)",
        transition: "all 250ms ease",
      }}
    >
      <p className="mb-5 text-sm" style={{ color: "rgba(247,244,236,0.75)" }}>
        {prompt}
      </p>
      {children}
    </div>
  );
}

type TrustBadgeProps={
  icon: LucideIcon, label:string
}

export function TrustBadge({ icon: Icon, label }:TrustBadgeProps) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="flex items-center gap-2 px-4 py-2.5 rounded-full border text-sm cursor-default"
      style={{
        borderColor: hover ? "#303F9F" : "#E3DDCE",
        color: "#12302B",
        backgroundColor: hover ? "#F0EDE0" : "#FFFFFF",
        transform: hover ? "translateY(-2px)" : "translateY(0px)",
        transition: "all 220ms ease",
      }}
    >
      <Icon size={15} color="#2F6F63" />
      {label}
    </div>
  );
}


export function FooterLink({ children }:{children:ReactNode}) {
  const [hover, setHover] = useState(false);
  return (
    <li
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="cursor-pointer"
      style={{
        color: hover ? "#D2992B" : "rgba(247,244,236,0.7)",
        transform: hover ? "translateX(3px)" : "translateX(0px)",
        transition: "all 200ms ease",
      }}
    >
      {children}
    </li>
  );
}