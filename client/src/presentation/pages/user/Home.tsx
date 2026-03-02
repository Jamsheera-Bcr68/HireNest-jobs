import SideBar from '../../components/common/SideBar';
import Header from '../../components/common/Header';
import { useSelector } from 'react-redux';

// const Home: React.FC = () => {
//   const auth=useSelector(state=>state)
//   const navigate=useNavigate()

// console.log('from home ',auth);

//   return (
//     <div>
//       {/* Header */}
//       <header style={styles.header}>
//         <h1 style={styles.logo}>HireNest</h1>

//         <nav style={styles.nav}>
//           <span style={styles.navItem}>Jobs</span>
//           <span style={styles.navItem}>Companies</span>
//           <span style={styles.navItem}>Profile</span>
//           <span onClick={()=>navigate('/register')} style={styles.navItem}>SignUp</span>
//           <span onClick={()=>navigate('/login')} style={styles.navItem}>Login</span>
//         </nav>

//         <div style={styles.userSection}>
//           <span style={styles.welcome}>Welcome, User 👋</span>
//           <button style={styles.logoutBtn}>Logout</button>
//         </div>
//       </header>

//       {/* Body content (optional) */}
//       <main style={styles.main}>
//         <h2>Login Successful 🎉</h2>
//         <p>This is a demo home page to show authentication is working.</p>
//       </main>
//     </div>
//   );
// };

// const styles: { [key: string]: React.CSSProperties } = {
//   header: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: "16px 32px",
//     backgroundColor: "#1e293b",
//     color: "#ffffff",
//   },
//   logo: {
//     margin: 0,
//     fontSize: "24px",
//   },
//   nav: {
//     display: "flex",
//     gap: "20px",
//   },
//   navItem: {
//     cursor: "pointer",
//   },
//   userSection: {
//     display: "flex",
//     alignItems: "center",
//     gap: "12px",
//   },
//   welcome: {
//     fontSize: "14px",
//   },
//   logoutBtn: {
//     padding: "6px 12px",
//     backgroundColor: "#ef4444",
//     border: "none",
//     borderRadius: "4px",
//     color: "#fff",
//     cursor: "pointer",
//   },
//   main: {
//     padding: "40px",
//     textAlign: "center",
//   },
// };
const Home = () => {
  const user = useSelector((state: any) => state.auth.user);
  console.log('from home page', user);

  //  const { user } = useSelector((state: any) =>state. auth);
  //  console.log("isAuthentcated from home", user);

  return (
    <>
      <Header />
    </>
  );
};
export default Home;
