import { Modal, Button, Form, FormCheck } from "react-bootstrap";
import { useState, useEffect, useCallback } from "react";
import API from "../../api/services/api";
import axios from "axios";
import "./payment.scss";
const script = document.createElement("script");
script.src = "https://checkout.razorpay.com/v1/checkout.js";
    
function PaymentModal({ showPayment, setShowPayment, setSkipCount }) {
  const api = new API();
  const [value, setValue] = useState(false);
  async function openPayModal(amt) {
    //Razorpay consider the amount in paise
    document.body.appendChild(script);
    var options = {
      timeout: 100,
      key: process.env.REACT_APP_razorpaytest_id || "rzp_test_Hqy8SPuxif3XKM",
      amount: 0, // 2000 paise = INR 20, amount in paisa
      name: "",
      description: "",
      order_id: "",
      handler: function (response) {
        // console.log(response);
      },
      theme: {
        color: "#528ff0",
      },
    };
    axios
      .post(
        `https://yhwyjsf4yb.us-east-2.awsapprunner.com/payment?plan=${value}`
      )
      .then((res) => {
        options.order_id = res.data.id;
        options.amount = res.data.amount;
        // console.log(options);
        var rzp1 = new window.Razorpay(options);
        rzp1.open();
      })
      .catch((e) => console.log(e));
  }
  // function onChangeHandler(amount) {
  //   console.log(amount);
  //   // e.preventDefault();
  //   setValue(amount);
  // }

  // console.log(value);

  useEffect(() => {
    document.body.appendChild(script);
  });

  return (
    <Modal
      show={showPayment}
      onHide={() => {
        setShowPayment(false);
        setSkipCount(0);
        document.body.removeChild(script);
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Select Subscription</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>
          Hey! You are not Allowed More than two skips on regular plans. Why not
          join subscription and skip songs as you like
        </h5>
        <hr />
        <Form>
          <Form.Check
            inline
            label="&#8377; 99 - Starter Monthly Plan"
            name="group1"
            type="radio"
            id={`inline-radio-1`}
            onClick={(e) => {
              setValue(e.target.value);
            }}
            value={9900}
          />
          <Form.Check
            inline
            label="&#8377; 299 - 3 Month Plan"
            name="group1"
            type="radio"
            id={`inline-radio-2`}
            onClick={(e) => {
              setValue(e.target.value);
            }}
            value={29900}
          />
          <Form.Check
            inline
            label="&#8377; 999 - Yearly Plan"
            type="radio"
            id={`inline-radio-3`}
            onClick={(e) => {
              setValue(e.target.value);
            }}
            value={99900}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          disabled={!value}
          variant="primary"
          onClick={() => {
            openPayModal();
          }}
        >
          Pay
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            setShowPayment(false);
            setSkipCount(0);
            document.body.removeChild(script);
          }}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PaymentModal;
