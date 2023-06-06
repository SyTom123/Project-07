import { Button, Popconfirm, Tooltip, notification } from "antd"
import {  DeleteOutlined } from "@ant-design/icons";
import { deletePayment } from "../../services/paymentService";

function PurchaseDelete (props){
    const {item, onReload} = props;
    const [api, contextHolder] = notification.useNotification();
    const handleDelete = async ()=> {
        const result = await deletePayment (item.id, item);
        if(result) {
            api.success({
                message: "Delete product successfully",
                description: (
                  <>
                    You have just deleted payment <strong>{item.createAt}</strong>
                  </>
                ),
                placement: "bottomRight",
                duration: 3,
              });
              setTimeout(()=> {
                onReload();
              },800)
            
        }
        else {
            api.error({
              message: "Delete product not successfully",
              description: "System is wrong. Please try again",
              placement: "bottomRight",
              duration: 3,
            });
          }
    
    }
    return (
        <>
        {contextHolder}
        <Popconfirm
            title="Sure to delete?"
            onConfirm={ handleDelete}
          >
            <Tooltip placement="bottom" title={"Xoá bản ghi"}>
              <Button
                icon={<DeleteOutlined style={{ color: "red" }} />}
                ghost
              ></Button>
            </Tooltip>
          </Popconfirm>
        </>
    )
}
export default PurchaseDelete