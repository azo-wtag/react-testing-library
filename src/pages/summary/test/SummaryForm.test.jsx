import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SummaryForm from "../SummaryForm";

test("Proceed buton status based on checkbox", async () => {
  const user = userEvent.setup();
  render(<SummaryForm />);

  const termsCondtionCheckBox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  const proccedToPaymentButton = screen.getByRole("button", {
    name: /confirm order/i,
  });

  expect(termsCondtionCheckBox).not.toBeChecked();
  expect(proccedToPaymentButton).toBeDisabled();

  user.click(termsCondtionCheckBox);
  await waitFor(() => {
    expect(proccedToPaymentButton).toBeEnabled();
  });

  user.click(termsCondtionCheckBox);
  await waitFor(() => {
    expect(proccedToPaymentButton).toBeDisabled();
  });
});

test("Popover responds to hover", async () => {
  const user = userEvent.setup();
  render(<SummaryForm />);

  const nullPopover = screen.queryByText(/just hover/i);
  expect(nullPopover).not.toBeInTheDocument();

  const termsAndConditions = screen.getByText(/terms and conditions/i);
  user.hover(termsAndConditions);
  await waitFor(() => {
    screen.getByText(/terms and conditions/i);
  });

  await waitForElementToBeRemoved(() => {
    screen.queryByText(/just hover/i);
  });
});
