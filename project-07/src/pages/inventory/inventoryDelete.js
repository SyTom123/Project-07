import { Button, notification, Popconfirm, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { deleteProduct } from "../../services/productService";

function InventoryDelete({ record, onReload }) {
  const [api, contextHolder] = notification.useNotification();
  const handleDelete = async (id, record) => {
    const result = await deleteProduct(id);
    if (result) {
      api.success({
        message: "Delete product successfully",
        description: (
          <>
            You have just deleted <strong>{record.title}</strong>
          </>
        ),
        placement: "bottomRight",
        duration: 3,
      });
      
      setTimeout(() => {
        onReload();
      }, 800);
    } else {
      api.error({
        message: "Delete product not successfully",
        description: "System is wrong. Please try again",
        placement: "bottomRight",
        duration: 3,
      });
    }
  };

  return (
    <>
      {contextHolder}
      <Popconfirm
        title="Sure to delete?"
        onConfirm={() => handleDelete(record.id, record)}
      >
        <Tooltip placement="bottom" title={"Xoá bản ghi"}>
          <Button
            icon={<DeleteOutlined style={{ color: "red" }} />}
            ghost
          ></Button>
        </Tooltip>
      </Popconfirm>
    </>
  );
}
export default InventoryDelete;
