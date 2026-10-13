import { SideBox } from './ReusableComponents';

const SideBar = () => {
  return (
    <div className="sidebar w-1/6 pt-4  h-screen mt-0 ">
      <SideBox text="DashBoard" isActive={false} />
      <SideBox text="Profile" isActive={true} />
      <SideBox text="Saved Jobs" isActive={false} />
      <SideBox text="Applied Jobs" isActive={false} />
      <SideBox text="Applications" isActive={false} />
      <SideBox text="Interviews" isActive={false} />
      <SideBox text="Notifications" isActive={false} />
      <SideBox text="Messages" isActive={false} />

      <SideBox text="Logout" isActive={false} />
      <p className="sidebox"> changePassword</p>
    </div>
  );
};
export default SideBar;
