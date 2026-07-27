import { useParams } from "react-router-dom"
import MeetContainer from "../../components/user/MeetContainer";
import { useSelector } from "react-redux";
import type { RootState } from "../../../redux/store";

function MeetPage() {
    const {meetId}=useParams()

const {user}=useSelector((state:RootState)=>state.auth)
   
    
  return (
    <div>
        <MeetContainer meetId={meetId} role={user.role} />
      <h1> Hello this is your Interview Meeting page</h1>
    </div>
  )
}

export default MeetPage
