import ForgotPasswordForm from "./ForgotPasswordForm";
import { MemoryRouter } from "react-router-dom";
// Note: I use this specific test file as a test template for other tests creation, so there are lot of redundant comments here.

// Shallow rendering test
it("renders correctly - shallow", () => {
  const wrapper = shallow(
    <ForgotPasswordForm
    // prop={prop hard coded value}
    // function_prop={() => empty/test function}
    />
  );

  expect(wrapper).toMatchSnapshot();
});

// Test send click functionality (async)
jest.mock("../services/sendResetPasswordEmail");
it("handles Send click correctly", async (done) => {
  const wrapper = mount(
    <MemoryRouter>
      <ForgotPasswordForm />
    </MemoryRouter>
  );
  expect(wrapper.find("label").first().text()).toEqual(
    "A message with a link to reset your password will be sent to this email address."
  );
  wrapper
    .find("input")
    .first()
    .simulate("change", {
      target: { name: "email", value: "wwwsapir@gmail.com" },
    });
  wrapper.find("button").simulate("submit");
  setTimeout(() => {
    wrapper.update();
    expect(wrapper.find("label").first().text()).toEqual(
      "Reset message sent to email address!"
    );
    done();
  });
});

// Deep html inner elements rendering test
// it("renders correctly - render", () => {
//   const wrapper = render(<ForgotPasswordFor />);

//   expect(wrapper).toMatchSnapshot();
// });

// Specific inner elements value test
// it("renders correctly - mount", () => {
//   const wrapper = mount(<ForgotPasswordForm />);

//   // *here we can grab a specific DOM element and check its value

//   expect(wrapper).toMatchSnapshot();
// });

// Trigget some clicks and check the values in elements or that a prop function was called
// it("calls prop function on click", () => {
//   const spy = sinon.spy();
//   const wrapper = mount(
//     <ForgotPasswordForm
//     functionProp={spy}
//     />
//   );

//   wrapper.find("div").first().simulate("click");

//   expect(spy.calledOnce).toBe(true);
// });
