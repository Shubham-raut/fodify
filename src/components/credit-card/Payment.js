import React, { useState, useEffect } from "react";
import * as firebase from "firebase";
import "../../config/fire";
import swal from 'sweetalert';
import { useParams } from "react-router-dom";
import Styles from "./Styles";
import { Form, Field } from "react-final-form";
import Card from "./Card";
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
} from "./cardUtils";
import { withRouter } from 'react-router-dom';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Payment = (props) => {
  const { firebaseUid } = useParams();
  const [cartData, setCartData] = useState([]);
  const resData = localStorage.getItem("resData");

  useEffect(() => {
    if (firebaseUid) {
      firebase
        .database()
        .ref(firebaseUid)
        .on("value", (snapshot) => {
          if (snapshot.val()) {
            setCartData(Object.values(snapshot.val()))
          }
        });
    }
    else {
      resData ?
        props.history.push(`/restaurent${resData}`) :
        props.history.push(`/`)
    }
  }, [firebaseUid, resData, props]);

  const onSubmit = async (values) => {
    await sleep(300);
    firebase.database().ref(firebaseUid).remove();
    swal({
      title: "Great!",
      text: "Your order has been successfylly placed...",
      icon: "success",
    }).then((ok) => {
      ok && (resData ?
        props.history.push(`/restaurent${resData}`) :
        props.history.push(`/`))
    }
    )
  };

  const cancelOrder = () => {
    swal({
      title: "Are you sure?",
      text: "Do you really wana cancel the order?",
      icon: "info",
      buttons: true,
      dangerMode: true,
    })
      .then((ok) => {
        if (ok) {
          swal("Poof! Your order has been cancelled!", {
            icon: "success",
          }).then((ok) => {
            ok && (resData ?
              props.history.push(`/restaurent${resData}`) :
              props.history.push(`/`))
          }
          )
        } else {
          swal({
            text: "Your order is still waiting for your response!",
            icon: "info",
          });
        }
      });
  };

  let orderData;
  let cartItems;
  cartData.length
    ? (cartItems = cartData.map((value) => {
      return (
        <div key={value.dish_id} className="cart_item_card">
          <div className="cart_item_card_left">
            <div className="cart_item_name">{value.name}</div>
            <div className="cart_item_price">{value.price}</div>
          </div>
          <div className="cart_item_card_right">
            {/* <div className="cart_item_card_right_top"> */}
            <div>{value.quantity}</div>
            {/* </div> */}
            <div className="cart_item_card_right_bot">
              <i className="fa fa-inr" aria-hidden="true"></i>{" "}
              {parseInt(value.price) * parseInt(value.quantity)}
            </div>
          </div>
        </div>
      );
    }))
    : (cartItems = null
    );
  let totalItem = 0;
  let totalPrice = 0;

  for (let i in cartData) {
    totalPrice +=
      parseInt(cartData[i].price) *
      parseInt(cartData[i].quantity);
    totalItem += parseInt(cartData[i].quantity);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'safe', gap: '1em' }}>

      <h1 style={{ textAlign: "center" }}>Payment Gateway</h1>
      <div className="cartConatiner" style={{ position: 'relative', right: '0', alignSelf: 'center', width: '80%', marginTop: '0' }}>
        <div className="cart_title">Order Details</div>
        <div className="cart_totalItem">{totalItem} Items</div>
        <div className="cart_Items">{cartItems}</div>
        <div className="total_price">Total Price {totalPrice}</div>
      </div>

      <div className="cart_Items">{orderData}</div>
      <Styles>
        <Form
          onSubmit={onSubmit}
          render={({
            handleSubmit,
            form,
            submitting,
            pristine,
            values,
            active,
          }) => {
            return (
              <form onSubmit={handleSubmit}>
                <Card
                  number={values.number || ""}
                  name={values.name || ""}
                  expiry={values.expiry || ""}
                  cvc={values.cvc || ""}
                  focused={active}
                />
                <div>
                  <Field
                    name="number"
                    component="input"
                    type="text"
                    pattern="[\d| ]{16,22}"
                    placeholder="Card Number"
                    format={formatCreditCardNumber}
                  />
                </div>
                <div>
                  <Field
                    name="name"
                    component="input"
                    type="text"
                    placeholder="Name"
                  />
                </div>
                <div>
                  <Field
                    name="expiry"
                    component="input"
                    type="text"
                    pattern="\d\d/\d\d"
                    placeholder="Valid Thru"
                    format={formatExpirationDate}
                  />
                </div>
                <div>
                  <Field
                    name="cvc"
                    component="input"
                    type="text"
                    pattern="\d{3,4}"
                    placeholder="CVC"
                    format={formatCVC}
                  />
                </div>
                <div className="buttons">
                  <button type="submit" disabled={submitting}>
                    Submit
                </button>
                  <button
                    type="button"
                    onClick={form.reset}
                    disabled={submitting || pristine}
                  >
                    Reset
                </button>
                  <button
                    type="button"
                    onClick={cancelOrder}
                  >
                    Cancel
                    </button>
                </div>
              </form>
            );
          }}
        />
      </Styles>
    </div>
  );
}

export default withRouter(Payment);
