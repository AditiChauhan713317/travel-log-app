import { Link } from "react-router-dom";
import { useCreateContext } from "../CreateContext";
import { useNavigate } from "react-router-dom";

function NavBar() {

    const {setShowCreate, setEdit_log} = useCreateContext();
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/');
        setEdit_log(false); // make sure no prev data gets pre-filled in the form
        setShowCreate(true);
    }

    
    return (
        <div className="nav custom-shadow flex justify-start gap-3 p-2 mx-3 mt-1 border rounded-xl bg-[#e5a5a1]  text-lg mb-4 ">
            <Link to='/about' className="hover:bg-[#2e8fff81] p-1 rounded-xl cursor-pointer">About</Link>
            <Link to='/' className="hover:bg-[#2e8fff81] p-1 rounded-xl cursor-pointer" >My Logs</Link>
            <button className="hover:bg-[#2e8fff81] p-1 rounded-xl cursor-pointer" onClick={handleClick}>Create</button>
            
        </div>
    )

}
export default NavBar;
