// // ── Sample data – replace with your API response ──────────────────────────

// // ── Icon map by notification type ─────────────────────────────────────────
// const TYPE_CONFIG = {
//   job_match: {
//     bg: '#E6F1FB',
//     color: '#185FA5',
//     icon: (
//       <svg
//         width="18"
//         height="18"
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="2"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       >
//         <rect x="2" y="7" width="20" height="14" rx="2" />
//         <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
//       </svg>
//     ),
//   },
//   application: {
//     bg: '#EAF3DE',
//     color: '#3B6D11',
//     icon: (
//       <svg
//         width="18"
//         height="18"
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="2"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       >
//         <polyline points="20 6 9 17 4 12" />
//       </svg>
//     ),
//   },
//   message: {
//     bg: '#FAEEDA',
//     color: '#854F0B',
//     icon: (
//       <svg
//         width="18"
//         height="18"
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="2"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       >
//         <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
//       </svg>
//     ),
//   },
//   alert: {
//     bg: '#FAECE7',
//     color: '#993C1D',
//     icon: (
//       <svg
//         width="18"
//         height="18"
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="2"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       >
//         <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
//         <path d="M13.73 21a2 2 0 0 1-3.46 0" />
//       </svg>
//     ),
//   },
// };

// // ── Bell SVG ──────────────────────────────────────────────────────────────
// // function BellIcon() {
// //   return (
// //     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //       <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
// //       <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
// //     </svg>
// //   );
// // }

// // ── Single notification row ────────────────────────────────────────────────
// function NotificationItem({ notification, onMarkRead, onDelete }) {
//   const cfg = TYPE_CONFIG[notification.type] || TYPE_CONFIG.alert;
//   return (
//     <div
//       style={{
//         display: 'flex',
//         gap: '12px',
//         padding: '14px 16px',
//         borderBottom: '1px solid #F0F0F0',
//         background: notification.isRead ? '#fff' : '#EFF6FF',
//         position: 'relative',
//         alignItems: 'flex-start',
//         transition: 'background 0.15s',
//       }}
//     >
//       {/* Type icon */}
//       <div
//         style={{
//           width: 38,
//           height: 38,
//           borderRadius: 10,
//           background: cfg.bg,
//           color: cfg.color,
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           flexShrink: 0,
//           marginTop: 2,
//         }}
//       >
//         {cfg.icon}
//       </div>

//       {/* Text */}
//       <div style={{ flex: 1, minWidth: 0 }}>
//         <p
//           style={{
//             margin: '0 0 2px',
//             fontSize: 13,
//             fontWeight: 600,
//             color: '#1A1A2E',
//             lineHeight: 1.4,
//           }}
//         >
//           {notification.title}
//         </p>
//         <p
//           style={{
//             margin: '0 0 5px',
//             fontSize: 12,
//             color: '#6B7280',
//             lineHeight: 1.5,
//             whiteSpace: 'nowrap',
//             overflow: 'hidden',
//             textOverflow: 'ellipsis',
//           }}
//         >
//           {notification.description}
//         </p>
//         <span style={{ fontSize: 11, color: '#9CA3AF' }}>
//           {notification.time}
//         </span>
//       </div>

//       {/* Unread dot */}
//       {!notification.isRead && (
//         <div
//           style={{
//             width: 8,
//             height: 8,
//             borderRadius: '50%',
//             background: '#2563EB',
//             flexShrink: 0,
//             marginTop: 6,
//           }}
//         />
//       )}

//       {/* Actions */}
//       <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
//         {!notification.isRead && (
//           <button
//             onClick={() => onMarkRead(notification.id)}
//             title="Mark as read"
//             style={{
//               width: 28,
//               height: 28,
//               borderRadius: 7,
//               border: '1px solid #E5E7EB',
//               background: '#fff',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               cursor: 'pointer',
//               color: '#2563EB',
//             }}
//           >
//             <svg
//               width="14"
//               height="14"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2.5"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <polyline points="20 6 9 17 4 12" />
//             </svg>
//           </button>
//         )}
//         <button
//           onClick={() => onDelete(notification.id)}
//           title="Delete"
//           style={{
//             width: 28,
//             height: 28,
//             borderRadius: 7,
//             border: '1px solid #E5E7EB',
//             background: '#fff',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             cursor: 'pointer',
//             color: '#EF4444',
//           }}
//         >
//           <svg
//             width="14"
//             height="14"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           >
//             <polyline points="3 6 5 6 21 6" />
//             <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
//             <path d="M10 11v6" />
//             <path d="M14 11v6" />
//             <path d="M9 6V4h6v2" />
//           </svg>
//         </button>
//       </div>
//     </div>
//   );
// }

// // ── Notification dropdown panel ────────────────────────────────────────────
// export function NotificationPanel({ notifications, onClose }:{notifications:any[],onClose:()=>void}) {

//   //   return (
//   //     <>
//   //       {/* Backdrop */}
//   //       <div
//   //         onClick={onClose}
//   //         style={{ position: "fixed", inset: 0, zIndex: 40 }}
//   //       />

//   //       {/* Panel */}
//   //       <div style={{
//   //         position: "absolute",
//   //         top: "calc(100% + 10px)",
//   //         right: 0,
//   //         width: 380,
//   //         background: "#fff",
//   //         borderRadius: 14,
//   //         border: "1px solid #E5E7EB",
//   //         boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
//   //         zIndex: 50,
//   //         overflow: "hidden",
//   //         animation: "dropIn 0.18s cubic-bezier(.34,1.4,.64,1)",
//   //       }}>
//   //         {/* Header */}
//   //         <div style={{
//   //           padding: "14px 16px",
//   //           borderBottom: "1px solid #F0F0F0",
//   //           display: "flex",
//   //           alignItems: "center",
//   //           justifyContent: "space-between",
//   //         }}>
//   //           <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
//   //             <span style={{ fontSize: 15, fontWeight: 700, color: "#1A1A2E" }}>Notifications</span>
//   //             {unreadCount > 0 && (
//   //               <span style={{
//   //                 background: "#EFF6FF", color: "#2563EB",
//   //                 fontSize: 11, fontWeight: 600,
//   //                 padding: "2px 8px", borderRadius: 99,
//   //               }}>
//   //                 {unreadCount} new
//   //               </span>
//   //             )}
//   //           </div>
//   //           <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
//   //             {unreadCount > 0 && (
//   //               <button
//   //                 onClick={onMarkAll}
//   //                 style={{
//   //                   fontSize: 12, color: "#2563EB", background: "none",
//   //                   border: "none", cursor: "pointer", fontWeight: 600, padding: 0,
//   //                 }}
//   //               >
//   //                 Mark all as read
//   //               </button>
//   //             )}
//   //             <button
//   //               onClick={onClose}
//   //               style={{
//   //                 width: 28, height: 28, borderRadius: 7,
//   //                 border: "1px solid #E5E7EB", background: "#fff",
//   //                 display: "flex", alignItems: "center", justifyContent: "center",
//   //                 cursor: "pointer", color: "#6B7280",
//   //               }}
//   //             >
//   //               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
//   //                 <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
//   //               </svg>
//   //             </button>
//   //           </div>
//   //         </div>

//   //         {/* List */}
//   //         <div style={{ maxHeight: 420, overflowY: "auto" }}>
//   //           {notifications.length === 0 ? (
//   //             <div style={{ textAlign: "center", padding: "3rem 1rem", color: "#9CA3AF" }}>
//   //               <div style={{ fontSize: 36, marginBottom: 8 }}>🔔</div>
//   //               <p style={{ margin: 0, fontSize: 13 }}>No notifications yet</p>
//   //             </div>
//   //           ) : (
//   //             notifications.map(n => (
//   //               <NotificationItem
//   //                 key={n.id}
//   //                 notification={n}
//   //                 onMarkRead={onMarkRead}
//   //                 onDelete={onDelete}
//   //               />
//   //             ))
//   //           )}
//   //         </div>

//   //         {/* Footer */}
//   //         {notifications.length > 0 && (
//   //           <div style={{
//   //             padding: "10px 16px",
//   //             borderTop: "1px solid #F0F0F0",
//   //             textAlign: "center",
//   //           }}>
//   //             <button style={{
//   //               fontSize: 12, color: "#2563EB", background: "none",
//   //               border: "none", cursor: "pointer", fontWeight: 600,
//   //             }}>
//   //               View all notifications →
//   //             </button>
//   //           </div>
//   //         )}
//   //       </div>
//   //     </>
//   //   );
//   return (
//     <>
//       {/* Backdrop */}
//       <div onClick={onClose} className="fixed inset-0 z-40" />

//       {/* Panel */}
//       <div
//         className="
//        fixed
//         top-[calc(100%+10px)]
//         right-0
//         w-[380px]
//         bg-white
//         rounded-[14px]
//         border border-gray-200
//         shadow-2xl
//         z-50
//         overflow-hidden
//         animate-in
//       "
//       >
//         {/* Header */}
//         <div
//           className="
//           px-4 py-[14px]
//           border-b border-gray-100
//           flex items-center justify-between
//         "
//         >
//           <div className="flex items-center gap-2">
//             <span className="text-[15px] font-bold text-[#1A1A2E]">
//               Notifications
//             </span>

//             {unreadCount > 0 && (
//               <span
//                 className="
//                 bg-blue-50 text-blue-600
//                 text-[11px]
//                 font-semibold
//                 px-2 py-[2px]
//                 rounded-full
//               "
//               >
//                 {unreadCount} new
//               </span>
//             )}
//           </div>

//           <div className="flex items-center gap-2">
//             {unreadCount > 0 && (
//               <button
//                 onClick={onMarkAll}
//                 className="
//                 text-[12px]
//                 text-blue-600
//                 font-semibold
//                 hover:text-blue-700
//                 transition-colors
//               "
//               >
//                 Mark all as read
//               </button>
//             )}

//             <button
//               onClick={onClose}
//               className="
//               w-7 h-7
//               rounded-[7px]
//               border border-gray-200
//               bg-white
//               flex items-center justify-center
//               text-gray-500
//               hover:bg-gray-100
//               transition
//             "
//             >
//               <svg
//                 width="14"
//                 height="14"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2.5"
//                 strokeLinecap="round"
//               >
//                 <line x1="18" y1="6" x2="6" y2="18" />
//                 <line x1="6" y1="6" x2="18" y2="18" />
//               </svg>
//             </button>
//           </div>
//         </div>

//         {/* List */}
//         <div className="max-h-[420px] overflow-y-auto">
//           {notifications.length === 0 ? (
//             <div className="text-center py-12 px-4 text-gray-400">
//               <div className="text-4xl mb-2">🔔</div>

//               <p className="text-[13px]">No notifications yet</p>
//             </div>
//           ) : (
//             notifications.map((n) => (
//               <NotificationItem
//                 key={n.id}
//                 notification={n}
//                 onMarkRead={onMarkRead}
//                 onDelete={onDelete}
//               />
//             ))
//           )}
//         </div>

//         {/* Footer */}
//         {notifications.length > 0 && (
//           <div
//             className="
//             px-4 py-[10px]
//             border-t border-gray-100
//             text-center
//           "
//           >
//             <button
//               className="
//               text-[12px]
//               text-blue-600
//               font-semibold
//               hover:text-blue-700
//               transition-colors
//             "
//             >
//               View all notifications →
//             </button>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

// // // ── Main exported component ────────────────────────────────────────────────
// // export default function NotificationBell({ datas, isOpen, onClose }) {
// //   const [notifications, setNotifications] = useState(datas);

// //   // ── Handlers (wire these to your API calls) ──────────────────────────────
// //   const handleMarkRead = (id) => {
// //     setNotifications((prev) =>
// //       prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
// //     );
// //     // TODO: call your API → PATCH /notifications/:id/read
// //   };

// //   const handleDelete = (id) => {
// //     setNotifications((prev) => prev.filter((n) => n.id !== id));
// //     // TODO: call your API → DELETE /notifications/:id
// //   };

// //   const handleMarkAll = () => {
// //     setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
// //     // TODO: call your API → POST /notifications/mark-all-read
// //   };

// //   // ────────────────────────────────────────────────────────────────────────
// //   return (
// //     <>
// //       <style>{`
// //         @keyframes dropIn {
// //           from { opacity: 0; transform: scale(0.92) translateY(-8px); }
// //           to   { opacity: 1; transform: scale(1)    translateY(0);    }
// //         }
// //       `}</style>

// //       <div style={{ position: 'relative', display: 'inline-block' }}>
// //         {/* Bell button
// //         <button
// //           onClick={() => setIsOpen(prev => !prev)}
// //           aria-label="Notifications"
// //           style={{
// //             position: "relative",
// //             width: 44, height: 44,
// //             borderRadius: 12,
// //             border: "1px solid #E5E7EB",
// //             background: isOpen ? "#EFF6FF" : "#fff",
// //             display: "flex", alignItems: "center", justifyContent: "center",
// //             cursor: "pointer",
// //             color: isOpen ? "#2563EB" : "#374151",
// //             transition: "background 0.15s, color 0.15s",
// //           }}
// //         >

// //           {unreadCount > 0 && (
// //             <span style={{
// //               position: "absolute", top: -5, right: -5,
// //               background: "#EF4444", color: "#fff",
// //               fontSize: 10, fontWeight: 700,
// //               borderRadius: 99, minWidth: 18, height: 18,
// //               padding: "0 4px",
// //               display: "flex", alignItems: "center", justifyContent: "center",
// //               border: "2px solid #fff",
// //             }}>
// //               {unreadCount}
// //             </span>
// //           )}
// //         </button> */}

// //         {/* Dropdown panel */}
// //         {isOpen && (
// //           <NotificationPanel
// //             notifications={notifications}
// //             onMarkRead={handleMarkRead}
// //             onDelete={handleDelete}
// //             onMarkAll={handleMarkAll}
// //             onClose={onClose}
// //           />
// //         )}
// //       </div>
// //     </>
// //   );
// // }
import { Trash2, X, Bell, CheckCheck } from 'lucide-react';
import { type NotificationType } from '../../../types/notification.type';
import { useState } from 'react';

type Props = {
  notifications: NotificationType[];
  onClose: () => void;
  onMarkRead: (id: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onMarkAll: () => void;
  onTabChange: (tab: 'new' | 'all') =>void;
};

// const TYPE_CONFIG = {
//   job_match: {
//     bg: "bg-blue-100",
//     color: "text-blue-700",
//     icon: <Briefcase size={18} />,
//   },
//   application: {
//     bg: "bg-green-100",
//     color: "text-green-700",
//     icon: <Check size={18} />,
//   },
//   message: {
//     bg: "bg-yellow-100",
//     color: "text-yellow-700",
//     icon: <MessageSquare size={18} />,
//   },
//   alert: {
//     bg: "bg-red-100",
//     color: "text-red-700",
//     icon: <Bell size={18} />,
//   },
// };

function NotificationItem({
  notification,
  onMarkRead,
  onDelete,
}: {
  notification: NotificationType;
  onMarkRead: (id: string) => Promise<void>;
  onDelete: (id: string ) => Promise<void>;
}) {
  // const cfg =
  //   TYPE_CONFIG[notification.type] || TYPE_CONFIG.alert;

  return (
    <div
      className={`
        flex gap-3 px-4 py-4  ml-2 rounded-2xl  border-b border-gray-100
        transition-colors
        ${notification.isRead ? 'bg-white' : 'bg-blue-50'}
      `}
    >
      {/* Icon */}
      {/* <div
        className={`
          w-10 h-10 rounded-xl flex items-center justify-center shrink-0
       
        `}
        //    ${cfg.bg} ${cfg.color}
        // {cfg.icon}
      >
       
      </div> */}

      {/* Content */}
      <div className="flex-1  min-w-0">
        <p className="text-[13px]  font-semibold text-[#1A1A2E] leading-5">
          {notification.title}
        </p>

        <p className="text-[12px] text-gray-500 mt-1 ">
          {notification.message}
        </p>

        <span className="text-[11px] text-gray-400 mt-1 inline-block">
          {notification.time}
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-start gap-1 shrink-0">
        {!notification.isRead && (
          <>
            <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 mr-1" />

            <button
              onClick={() => {
                console.log('from Notification', notification);

                onMarkRead(notification.id);
              }}
              className="
                w-7 h-7 rounded-md border border-gray-200
                flex items-center justify-center
                hover:bg-blue-100
                text-blue-600 transition
              "
              title="Mark as Read"
            >
              <CheckCheck size={14} />
            </button>
          </>
        )}

        <button
          onClick={() => onDelete(notification.id)}
          className="
            w-7 h-7 rounded-md border border-gray-200
            flex items-center justify-center
            hover:bg-red-50
            text-red-500 transition
          "
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}

export default function NotificationModal({
  notifications,
  onClose,
  onMarkRead,
  onTabChange,

   onDelete,
  onMarkAll,
}: Props) {
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const [activeTab, setActiveTab] = useState<'new' | 'all'>('new');

  return (
    <>
      {/* Backdrop */}
      <div onClick={onClose} className="fixed inset-0 z-40" />

      {/* Modal */}
      <div
        className="
          absolute right-0 top-[calc(100%+10px)]
          w-[380px]
          bg-white
          border border-gray-200
          rounded-2xl
          shadow-2xl
          overflow-hidden
          z-50
          animate-in fade-in zoom-in-95 duration-200
        "
      >
        {/* Header */}
        <div
          className="
            flex items-center justify-between
            px-4 py-4 border-b border-gray-100
          "
        >
          <div className=" items-center gap-2">
            <h3 className="text-[15px] font-bold text-[#1A1A2E]">
              Notifications
            </h3>
            <div>
              <span
                onClick={() => {
                  setActiveTab('new');
                  onTabChange('new');
                }}
                className={`
    cursor-pointer
    px-2 py-[2px]
    rounded-xl
    text-[11px]
    font-semibold
    ${
      activeTab === 'new'
        ? 'bg-blue-50 text-blue-600'
        : 'bg-gray-50 text-gray-600'
    }
  `}
              >
                New
                {unreadCount > 0 && activeTab == 'new' && ` (${unreadCount})`}
              </span>
              <span
                onClick={() => {
                  setActiveTab('all');
                  onTabChange('all');
                }}
                className={`px-2 py-[2px]
                  rounded-xl
                 p-2
                  text-blue-600
                  text-[11px]
                  font-semibold
                  cursor-pointer
                  ml-3
                    ${activeTab == 'all' ? ' bg-blue-50 text-blue-600' : ' bg-gray-50 text-black-600'}
                  `}
              >
                All
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                onClick={onMarkAll}
                className="
                  text-[12px]
                  font-semibold
                  text-blue-600
                  hover:text-blue-700
                  p-1
                  rounded-xl
                  transition
                  hover:bg-blue-50
                "
              >
                Mark all as read
              </button>
            )}

            <button
              onClick={onClose}
              className="
                w-7 h-7 rounded-md
                border border-gray-200
                flex items-center justify-center
                hover:bg-gray-100
                text-gray-500
                transition
              "
            >
              <X size={14} />
            </button>
          </div>
        </div>

        {/* Notifications */}
        <div className="max-h-[420px] overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="py-14 px-4 text-center">
              <Bell size={36} className="mx-auto text-gray-300 mb-3" />

              <p className="text-[13px] text-gray-400">No new notifications</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onMarkRead={onMarkRead}
                 onDelete={onDelete}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}
