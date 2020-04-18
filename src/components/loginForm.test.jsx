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
    .simulate("change", { target: { value: "wwwsapir@gmail.com" } });
  wrapper.find("button").simulate("submit");
  expect(wrapper.find("button").first().prop("disabled")).toEqual(true);
  setTimeout(() => {
    wrapper.update();
    expect(wrapper).toMatchSnapshot();
    expect(spyOnLogin.calledOnce).toBe(true);
    done();
  });
});

it("login button functionality - failure (async)", async (done) => {
  const wrapper = mount(
    <MemoryRouter>
      <LoginForm onLogin={() => {}} />
    </MemoryRouter>
  );
  wrapper
    .find("input")
    .first()
    .simulate("change", { target: { value: "other_email" } });
  wrapper.find("button").simulate("submit");
  expect(wrapper.find("button").first().prop("disabled")).toEqual(true);
  setTimeout(() => {
    wrapper.update();
    expect(wrapper).toMatchSnapshot();
    done();
  });
});
