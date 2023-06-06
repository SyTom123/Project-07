import { Button, Tooltip } from "antd"
import { Link } from "react-router-dom"
import {  EyeOutlined } from "@ant-design/icons";
function InventoryView ({record}){
    return (
        <>
            <Tooltip placement="bottom" title={"Xem thông tin chi tiết"}>
            <Link to={`/admin/singleProduct/${record.id}`}>
              <Button ghost >
                <EyeOutlined style={{ color: "#3f87f5" }} />
              </Button>
            </Link>
          </Tooltip>
        </>
    )
}
export default InventoryView