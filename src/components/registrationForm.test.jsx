import RegistrationForm from "./RegistrationForm";
import { MemoryRouter } from "react-router";
import "mutationobserver-shim";

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
  const userName = wrapper.find("input").first();
  userName.getDOMNode().value = "wwwsapir";
  userName.getDOMNode().dispatchEvent(new Event("input"));
  const email = wrapper.find("input").at(1);
  email.getDOMNode().value = "wwwsapir@gmail.com";
  email.getDOMNode().dispatchEvent(new Event("input"));
  const password = wrapper.find("input").at(2);
  password.getDOMNode().value = "111111";
  password.getDOMNode().dispatchEvent(new Event("input"));

  wrapper.find("button").first().simulate("submit");
  setTimeout(() => {
    wrapper.update();
    expect(wrapper).toMatchSnapshot();
    expect(spyOnRegistered.calledOnce).toBe(true);
    done();
  });
});

it("register button functionality - failure (async)", async (done) => {
  const spyOnRegistered = sinon.spy();
  const wrapper = mount(
    <MemoryRouter>
      <RegistrationForm onRegistered={spyOnRegistered} />
    </MemoryRouter>
  );
  const userName = wrapper.find("input").first();
  userName.getDOMNode().value = "other";
  userName.getDOMNode().dispatchEvent(new Event("input"));
  const email = wrapper.find("input").at(1);
  email.getDOMNode().value = "other@gmail.com";
  email.getDOMNode().dispatchEvent(new Event("input"));
  const password = wrapper.find("input").at(2);
  password.getDOMNode().value = "111111";
  password.getDOMNode().dispatchEvent(new Event("input"));

  wrapper.find("button").first().simulate("submit");
  setTimeout(() => {
    wrapper.update();
    expect(wrapper).toMatchSnapshot();
    expect(spyOnRegistered.called).toBe(false);
    done();
  });
});
