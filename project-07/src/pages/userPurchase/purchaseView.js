import { Button, Tooltip } from "antd"
import { Link } from "react-router-dom"
import { getCookie } from "../../helpers/cookie";
import { EyeOutlined } from "@ant-design/icons";

function PurchasesView ({item}) {
    const tokenAdmin = getCookie("tokenAdmin");
    return (
        <>
            <Tooltip placement="top" title="Click to view detail">
                <Link to= { tokenAdmin ? (`/admin/previewAPayment/${item.id}`): (`/previewAPayment/${item.id}`)}>
                <Button
                    icon={
                    <EyeOutlined style={{ color: "#108ee9" }} />
                    }
                    type="ghost"
                ></Button>
                </Link>
            </Tooltip>
        </>
    )
}
export default PurchasesView