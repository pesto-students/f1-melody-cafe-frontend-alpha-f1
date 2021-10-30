import {
  Modal,
  Button,
} from "react-bootstrap";
import { Radio, RadioGroup} from 'react-radio-group'
import { useState, useEffect, useCallback } from "react";
import API from "../../api/services/api";
import axios from "axios";
import "./payment.scss";
function PaymentModal({ showPayment, setShowPayment }) {
  const api = new API();
  const [ value, setValue ] = useState(9900);
  async function openPayModal(amt) {
    //Razorpay consider the amount in paise
    var options = {
      timeout: 100,
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
        `https://yhwyjsf4yb.us-east-2.awsapprunner.com/payment?plan=${amt}`
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
  function onChangeHandeler(amount) {
    setValue(amount);
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
      <RadioGroup name="plans"  selectedValue={value} onChange={(e) => onChangeHandeler(e)}>
   <div>
       <Radio value={9900} />99
   </div>
   <div>
       <Radio value={29900} />299
   </div>
   <div>
       <Radio value={99900}  />999
   </div>
</RadioGroup>
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
