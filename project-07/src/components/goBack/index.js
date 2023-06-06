import { Button } from "antd";
import { useNavigate } from "react-router-dom";

function GoBack () {
    const navigate = useNavigate();
    const handleClick = ()=> {
        navigate(-1);
    }
    return (
        <>
            <Button danger type="primary" onClick={handleClick}>Back</Button>
        </>
    )
}
export default GoBack;