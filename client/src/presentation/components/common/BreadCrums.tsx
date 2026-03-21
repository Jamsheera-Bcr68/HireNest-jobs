const candidate = {
  name: 'alen',
};
function BreadCrums() {
  return (
    <div className="bg-white border-b border-slate-200 px-6 py-3 flex items-center gap-2 text-sm text-slate-500">
      <button className="hover:text-slate-800 transition-colors">Admin</button>
      <span>›</span>
      <button className="hover:text-slate-800 transition-colors">
        User Management
      </button>
      <span>›</span>
      <button className="hover:text-slate-800 transition-colors">
        Candidates
      </button>
      <span>›</span>
      <span className="text-slate-800 font-medium">{candidate.name}</span>
    </div>
  );
}

export default BreadCrums;
