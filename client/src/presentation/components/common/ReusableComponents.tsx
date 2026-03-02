import { type ISidebarProps } from '../../../constants/interfaces/SidebarProps';
export const SideBox = ({ text, isActive }: ISidebarProps) => {
  let classname = isActive
    ? 'w-4/5 ml-5 h-10 grid place-items-center mt-4 sidebox sidebox-active'
    : 'w-4/5 ml-5 h-10 grid place-items-center mt-4 sidebox';
  return <div className={classname}>{text}</div>;
};
