import { Row, Col, Card } from "antd";
import { useEffect, useState } from "react";
import { getAllPayment } from "../../services/paymentService";
function DashBoard() {
  const [purchaseData, setPurchaseData] = useState([]);
  useEffect(() => {
    const getApi = async () => {
      const result = await getAllPayment();
      const option = {
        total: 0,
        completed: 0,
        onGoing: 0,
        cancel: 0
    }
      if (result) {
        option.total = result.length;
        result.forEach(item => {
            if(item.status === "completed") {
                option.completed ++;
            }
            else if (item.status === "onGoing") {
                option.onGoing ++;
            }
            else {
                option.cancel ++;
            }
        });
       
        setPurchaseData(option);
      }
    };
    getApi();
  }, []);

  return (
    <>
      <div className="dashBoard">
        {purchaseData && (
          <Row>
            <Col xxl={8} xl={8} lg={8} md={8} sm={8} sx={22}>
              <Card title="Payment">
                <p>Total: <strong>{ purchaseData.total} </strong></p>
                <p>Completed: <strong>{ purchaseData.completed} </strong></p>
                <p>On going: <strong>{ purchaseData.onGoing} </strong></p>
                <p>Cancel: <strong>{ purchaseData.cancel} </strong></p>
              </Card>
            </Col>
          </Row>
        )}
      </div>
    </>
  );
}
export default DashBoard;
