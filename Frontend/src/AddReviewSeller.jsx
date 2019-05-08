import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
let path = "http://localhost:4000/";

class UnconnectedAddReviewSeller extends Component {
  constructor(props) {
    super(props);
    this.state = {
      desc: "",
      ratingInput: "5"
    };
  }

  handleChangeDesc = event => {
    console.log("Desc", event.target.value);
    this.setState({ desc: event.target.value });
  };

  handleRadioChange = e => {
    let ratingInput = e.target.value;
    this.setState({ ratingInput });
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log("Add a revew to an item form submitted");
    let data = new FormData();
    data.append("review", this.state.desc);
    data.append("sellerId", this.props.sellerId);
    data.append("rating", this.state.ratingInput);
    fetch(path + "add-review-seller", {
      method: "POST",
      body: data,
      credentials: "include"
    })
      .then(x => {
        console.log("text", x);
        return x.text();
      })
      .then(responseBody => {
        let body = JSON.parse(responseBody);
        console.log("parsed body", body);
        if (body.success) {
          alert("Review Added");
          this.setState({ desc: "" });
          return;
        }
        alert("Please, make sure you wrote everything");
        return;
      });
  };

  render = () => {
    console.log("Props =>", this.props);
    return (
      <div className="form-box">
        <h2> Add a review for {this.props.name}</h2>
        <form onSubmit={this.handleSubmit}>
          <p>Comment: </p>
          <textarea
            rows="4"
            cols="50"
            name="textarea"
            value={this.state.desc}
            onChange={this.handleChangeDesc}
            required
          />
          <br />
          Rating:
          <section className="radioRow">
            <label>
              <input
                type="radio"
                name="review"
                value="1"
                checked={this.state.ratingInput === "1"}
                onChange={this.handleRadioChange}
              />
              1
            </label>
            <label>
              <input
                type="radio"
                name="review"
                value="2"
                checked={this.state.ratingInput === "2"}
                onChange={this.handleRadioChange}
              />
              2
            </label>
            <label>
              <input
                type="radio"
                name="review"
                value="3"
                checked={this.state.ratingInput === "3"}
                onChange={this.handleRadioChange}
              />
              3
            </label>
            <label>
              <input
                type="radio"
                name="review"
                value="4"
                checked={this.state.ratingInput === "4"}
                onChange={this.handleRadioChange}
              />
              4
            </label>
            <label>
              <input
                type="radio"
                name="review"
                value="5"
                checked={this.state.ratingInput === "5"}
                onChange={this.handleRadioChange}
              />
              5
            </label>
          </section>
          <input type="submit" value="Add" />
        </form>
      </div>
    );
  };
}

let AddReviewSeller = connect()(UnconnectedAddReviewSeller);
export default AddReviewSeller;