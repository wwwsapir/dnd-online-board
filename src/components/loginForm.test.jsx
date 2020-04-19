import LoginForm from "./LoginForm";
import { MemoryRouter } from "react-router";

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
  wrapper
    .find("input")
    .first()
    .simulate("change", {
      target: { name: "email", value: "wwwsapir@gmail.com" },
    });
  wrapper
    .find("input")
    .at(1)
    .simulate("change", {
      target: { name: "password", value: "111111" },
    });
  wrapper.find("button").simulate("submit");
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
  wrapper
    .find("input")
    .first()
    .simulate("change", {
      target: { name: "email", value: "other@gmail.com" },
    });
  wrapper
    .find("input")
    .at(1)
    .simulate("change", {
      target: { name: "password", value: "111111" },
    });
  wrapper.find("button").simulate("submit");
  setTimeout(() => {
    wrapper.update();
    expect(wrapper).toMatchSnapshot();
    expect(spyOnLogin.called).toBe(false);
    done();
  });
});
