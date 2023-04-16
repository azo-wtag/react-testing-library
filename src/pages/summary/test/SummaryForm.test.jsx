import { render, screen, fireEvent } from "@testing-library/react";
import SummaryForm from "../SummaryForm";

test("Proceed buton status based on checkbox", () => {
  render(<SummaryForm />);

  const termsCondtionCheckBox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  const proccedToPaymentButton = screen.getByRole("button", {
    name: /confirm order/i,
  });

  expect(termsCondtionCheckBox).not.toBeChecked();
  expect(proccedToPaymentButton).toBeDisabled();

  fireEvent.click(termsCondtionCheckBox);
  expect(proccedToPaymentButton).toBeEnabled();

  fireEvent.click(termsCondtionCheckBox);
  expect(proccedToPaymentButton).toBeDisabled();
});
