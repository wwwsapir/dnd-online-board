import RegistrationForm from "./registrationForm";
import { MemoryRouter } from "react-router";

it("renders correctly", () => {
  const wrapper = shallow(<RegistrationForm onRegistered={() => {}} />);

  expect(wrapper).toMatchSnapshot();
});

jest.mock("../services/registerNewUser");
it("register button functionality - success (async)", async (done) => {
  const spyOnRegistered = sinon.spy();
  const wrapper = mount(
    <MemoryRouter>
      <RegistrationForm onRegistered={spyOnRegistered} />
    </MemoryRouter>
  );
  wrapper
    .find("input")
    .first()
    .simulate("change", { target: { value: "wwwsapir" } });
  wrapper.find("button").simulate("submit");
  expect(wrapper.find("button").first().prop("disabled")).toEqual(true);
  setTimeout(() => {
    wrapper.update();
    expect(wrapper).toMatchSnapshot();
    expect(spyOnRegistered.calledOnce).toBe(true);
    done();
  });
});

it("register button functionality - failure (async)", async (done) => {
  const wrapper = mount(
    <MemoryRouter>
      <RegistrationForm onRegistered={() => {}} />
    </MemoryRouter>
  );
  wrapper
    .find("input")
    .first()
    .simulate("change", { target: { value: "other_username" } });
  wrapper.find("button").simulate("submit");
  expect(wrapper.find("button").first().prop("disabled")).toEqual(true);
  setTimeout(() => {
    wrapper.update();
    expect(wrapper).toMatchSnapshot();
    done();
  });
});
