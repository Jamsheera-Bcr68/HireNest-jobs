import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../../shared/toast/useToast';
import { adminService } from '../../../services/apiServices/adminService';
import { logout } from '../../../redux/authSlice';
import type { StateType } from '../../../constants/types/user';

function Header({
  title,
  sidebarOpen,
  setSidebarOpen,
}: {
  title: string;
  sidebarOpen: boolean;
  setSidebarOpen: (state: boolean) => void;
}) {
  const { user } = useSelector((state: StateType) => state.auth);
  console.log('admin headr ', user);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const HandleLogout = async () => {
    console.log('form logout function');
    try {
      const data = await adminService.logout();
      console.log(data);
      showToast({ msg: data.message, type: 'success' });

      dispatch(logout());
      navigate('/admin/login');
    } catch (error: any) {
      console.log(error);
      showToast({
        msg: error.response.data.message || error.message,
        type: 'error',
      });
    }
  };
  return (
    <header className="bg-white sticky top-0 w-full flex-1 border-b border-slate-200 px-6 py-4 flex items-center justify-between ">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-slate-500 hover:text-slate-700 text-xl"
        >
          ☰
        </button>
        <div>
          <h1 className="text-xl font-bold text-slate-800">Admin {title}</h1>
          {/* <p className="text-sm text-slate-500">
            Monday, March 2, 2026 · Platform Overview
          </p> */}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-emerald-700 text-xs font-semibold px-3 py-1.5 rounded-xl">
          <button
            onClick={HandleLogout}
            className="w-9 h-5 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors"
          >
            Logout
          </button>
        </div>
        <div className="relative">
          <button className="w-9 h-9 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors">
            🔔
          </button>

          {/* <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
            7
          </span> */}
        </div>
        <div className="w-9 h-9 bg-indigo-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
          SA
        </div>
      </div>
    </header>
  );
}

export default Header;
