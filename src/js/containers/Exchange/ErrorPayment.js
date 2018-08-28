import React from "react";
import { connect } from "react-redux";
import { getTranslate } from 'react-localize-redux'
import * as widgetOptions from "../../utils/widget-options"

@connect((store) => {
  const translate = getTranslate(store.locale)
  return {
    global: store.global,
    translate: translate
  }
})

export default class ErrorPayment extends React.Component {

  getErrorPayment = () => {
    return Object.keys(this.props.global.errorsPayment).map(key => {
      return <li key={key}>{this.props.global.errorsPayment[key]}</li>
    })
  };

  closeWidget() {
    widgetOptions.onClose()
    if (this.props.global.analytics) this.props.global.analytics.callTrack("backToWebsite")
  }
  

  render = () => {
    return (
      <div className={"error-payment-container"}>
        <div className={"error-payment"}>
          <div className={"error-payment__icon-container"}>
            <div className={"error-payment__icon"}></div>
            <div className={"error-payment__icon-text"}>{this.props.translate("transaction.error") || "Error"}!</div>
          </div>
          <div className={"error-payment__content"}>
            <div className={"container"}>
              <ul className={"error-payment__content-text error-payment__content-text--bold"}>{this.getErrorPayment()}</ul>
              <div className={"error-payment__content-text"}>
                {this.props.translate("transaction.contact_merchant")
                  || "Please contact your merchant for wrong params"}
              </div>
              <div className={"error-payment__content-button"}>
                <div className={"payment-gateway__hollow-button"} onClick={(e) => this.closeWidget()}>
                {this.props.translate("transaction.back_to_website") || "Back to Website"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  };
}