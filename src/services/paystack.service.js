import axios from "axios";

export const sendPayout = async ({ amount, account_number, bank_code }) => {
  const res = await axios.post(
    "https://api.paystack.co/transfer",
    {
      source: "balance",
      amount: amount * 100,
      recipient: {
        type: "nuban",
        name: "Survico User",
        account_number,
        bank_code,
        currency: "NGN"
      }
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET}`,
        "Content-Type": "application/json"
      }
    }
  );

  return res.data;
};
