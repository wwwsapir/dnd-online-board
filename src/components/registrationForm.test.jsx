import RegistrationForm from "./RegistrationForm";
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
    .simulate("change", { target: { name: "userName", value: "wwwsapir" } });
  wrapper
    .find("input")
    .at(1)
    .simulate("change", {
      target: { name: "email", value: "wwwsapir@gmail.com" },
    });
  wrapper
    .find("input")
    .at(2)
    .simulate("change", {
      target: { name: "password", value: "111111" },
    });

  wrapper.find("button").simulate("submit");
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
  wrapper
    .find("input")
    .first()
    .simulate("change", { target: { name: "userName", value: "other" } });
  wrapper
    .find("input")
    .at(1)
    .simulate("change", {
      target: { name: "email", value: "other@gmail.com" },
    });
  wrapper
    .find("input")
    .at(2)
    .simulate("change", {
      target: { name: "password", value: "111111" },
    });
  wrapper.find("button").simulate("submit");
  setTimeout(() => {
    wrapper.update();
    expect(wrapper).toMatchSnapshot();
    expect(spyOnRegistered.called).toBe(false);
    done();
  });
});
