import { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";

const api = "https://bank-server-1-jf4n.onrender.com"; // ✅ Added API variable

export default function Withdraw() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isValid, setIsValid] = useState(false);

  // Validate form inputs
  const validateForm = () => {
    const amountToWithdraw = parseFloat(withdrawAmount);
    if (!email.trim() || !password.trim() || isNaN(amountToWithdraw) || amountToWithdraw <= 0) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    const amountToWithdraw = parseFloat(withdrawAmount);

    if (isNaN(amountToWithdraw) || amountToWithdraw <= 0) {
      setErrorMessage("Please enter a valid withdrawal amount.");
      return;
    }

    try {
      // ✅ Using `api` variable with port 8080
      const response = await axios.post(`${api}/withdraw`, { email, password, amount: amountToWithdraw });

      setSuccessMessage(`Successfully withdrawn $${amountToWithdraw}. Your new balance is $${response.data.newBalance}`);

      setWithdrawAmount("");
      setIsValid(false);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Withdrawal failed. Please try again.");
    }
  };

  return (
    <div className="background">
      <h1 className="register-heading">WITHDRAWL</h1>

      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

      <Form className="custom-form" onSubmit={handleSubmit}>
        <Form.Group className="mb-3 custom-form-group">
          <Form.Label className="custom-label">Email address</Form.Label>
          <Form.Control
            className="custom-input"
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              validateForm();
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3 custom-form-group">
          <Form.Label className="custom-label">Password</Form.Label>
          <Form.Control
            className="custom-input"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              validateForm();
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3 custom-form-group">
          <Form.Label className="custom-label">Amount</Form.Label>
          <Form.Control
            className="custom-input"
            type="number"
            placeholder="Enter withdrawal amount"
            value={withdrawAmount}
            onChange={(e) => {
              setWithdrawAmount(e.target.value);
              validateForm();
            }}
          />
        </Form.Group>

        <Button className="custom-button" variant="primary" type="submit" disabled={!isValid}>
          Withdraw
        </Button>
      </Form>
    </div>
  );
}
