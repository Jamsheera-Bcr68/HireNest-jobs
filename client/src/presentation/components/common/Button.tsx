// import { useNavigate } from 'react-router-dom';
// export const Button = () => {
//   const navigate = useNavigate();
//   return (
//     <div className="flex justify-center mt-4">
//       <button
//         onClick={() => navigate('/')}
//         className=
//       >
//         Back To home
//       </button>
//     </div>
//   );
// };

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'info';
  size?: 'sm' | 'md' | 'lg';
  color?: 'white' | 'indigo-600' | 'black';
};

export const Button = ({
  children,
  onClick,
  variant = 'secondary',
  color = 'indigo-600',
  size = 'md',
}: ButtonProps) => {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const variantClasses = {
    info: `px-4 py-1 bg-teal-400  text-${color} rounded`,
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-black hover:bg-gray-300',
  };

  return (
    <button
      onClick={onClick}
      className={`rounded-2xl font-medium transition duration-200 ${sizeClasses[size]} ${variantClasses[variant]}`}
    >
      {children}
    </button>
  );
};
