import {
  ToggleButton,
  Modal,
  Button,
  ToggleButtonGroup,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import API from "../../api/services/api";
import axios from "axios";
import "./payment.scss";
function PaymentModal({ showPayment, setShowPayment }) {
  const api = new API();
  const { value, setValue } = useState(14900);
  async function openPayModal(amt) {
    //Razorpay consider the amount in paise
    var options = {
      key: process.env.REACT_APP_razorpaytest_id || "rzp_test_Hqy8SPuxif3XKM",
      amount: 0, // 2000 paise = INR 20, amount in paisa
      name: "",
      description: "",
      order_id: "",
      handler: function (response) {
        console.log(response);
      },
      theme: {
        color: "#528ff0",
      },
    };
    axios
      .post(
        `https://yhwyjsf4yb.us-east-2.awsapprunner.com/payment?plan=${50000}`
      )
      .then((res) => {
        options.order_id = res.data.id;
        options.amount = res.data.amount;
        console.log(options);
        var rzp1 = new window.Razorpay(options);
        rzp1.open();
      })
      .catch((e) => console.log(e));
  }
  function onChangeHandeler(value) {
    setValue(value);
  }

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  });

  return (
    <Modal
      show={showPayment}
      onHide={() => {
        setShowPayment(false);
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Select Subscription</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ToggleButtonGroup
          type="radio"
          name="amount"
          defaultValue={14900}
          onChange={(e) => setValue(e.currentTarget.value)}
        >
          <div className="plans">
            <div>
              <h6>1 Months 149</h6>
              <ToggleButton id="tbg-btn-1" value={14900}>
                149 &#x20B9;
              </ToggleButton>
            </div>
            <div>
              <h6>3 Months 499</h6>
              <ToggleButton id="tbg-btn-2" value={49900}>
                499 &#x20B9;
              </ToggleButton>
            </div>
            <div>
              <h6>12 Months 999</h6>
              <ToggleButton id="tbg-btn-3" value={99900}>
                999 &#x20B9;
              </ToggleButton>
            </div>
          </div>
        </ToggleButtonGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => {
            openPayModal(value);
          }}
        >
          Pay
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            setShowPayment(false);
          }}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PaymentModal;
