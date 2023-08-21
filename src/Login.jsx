import { BeaconContext, useBeaconContext } from "./beaconProvider";
const Login = ()=>{
    const {connectBeacon} = useBeaconContext();
    return(
        <button onClick={connectBeacon}>
            Login
        </button>
    )
}
export default Login;