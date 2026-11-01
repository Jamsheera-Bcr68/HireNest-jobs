type Props = {
  title: string;
  error?: string;
};
// function AuthForms({ error, title }: Props) {
//   return (
//     <div className="text-center  mb-5">
//       <div className="flex items-center justify-center gap-3 mb-2">
//         {/* HireNest Logo */}
//         <div className="w-10 h-10  rounded-full text-fuchsia-700 flex items-center justify-center shadow-sm">
//           <img
//             className="w-10 h-10 rounded-full bg-fuchsia-700 flex items-center border-fuchsia-600 justify-center shadow-sm"
//             src="/6.jpg"
//             alt=""
//           />
//           {/* <span className=" font-bold text-lg">HN</span> */}
//         </div>

//         <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
//       </div>

//       {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
//     </div>
//   );
// }
function AuthForms({ error, title }: Props) {
  return (
    <div className="mb-6 text-center">
      <div className="mb-2 flex items-center justify-center gap-3">
        <img
          src="/6.jpg"
          alt="HireNest"
          width={40}
          height={40}
          className="h-10 w-10 shrink-0 rounded-full object-cover shadow-sm ring-2 ring-fuchsia-200"
        />

        <h1 className="min-w-0 text-balance text-2xl font-bold text-gray-900 sm:text-3xl">
          {title}
        </h1>
      </div>

      {error && (
        <p role="alert" className="mt-2 break-words text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

export default AuthForms;
