import LoginForm from "./LoginForm";
import { MemoryRouter } from "react-router";
import "mutationobserver-shim";

it("renders correctly", () => {
  const wrapper = shallow(<LoginForm onLogin={() => {}} />);

  expect(wrapper).toMatchSnapshot();
});

jest.mock("../services/loginUser");
it("login button functionality - success (async)", async (done) => {
  const spyOnLogin = sinon.spy();
  const wrapper = mount(
    <MemoryRouter>
      <LoginForm onLogin={spyOnLogin} />
    </MemoryRouter>
  );

  const email = wrapper.find("input").first();
  email.getDOMNode().value = "wwwsapir@gmail.com";
  email.getDOMNode().dispatchEvent(new Event("input"));
  const password = wrapper.find("input").at(1);
  password.getDOMNode().value = "111111";
  password.getDOMNode().dispatchEvent(new Event("input"));

  wrapper.find("button").first().simulate("submit");
  wrapper.update();
  setTimeout(() => {
    wrapper.update();
    expect(wrapper).toMatchSnapshot();
    expect(spyOnLogin.calledOnce).toBe(true);
    done();
  });
});

it("login button functionality - failure (async)", async (done) => {
  const spyOnLogin = sinon.spy();
  const wrapper = mount(
    <MemoryRouter>
      <LoginForm onLogin={spyOnLogin} />
    </MemoryRouter>
  );

  const email = wrapper.find("input").first();
  email.getDOMNode().value = "other@gmail.com";
  email.getDOMNode().dispatchEvent(new Event("input"));
  const password = wrapper.find("input").at(1);
  password.getDOMNode().value = "111111";
  password.getDOMNode().dispatchEvent(new Event("input"));

  wrapper.find("button").first().simulate("submit");
  setTimeout(() => {
    wrapper.update();
    expect(wrapper).toMatchSnapshot();
    expect(spyOnLogin.called).toBe(false);
    done();
  });
});
