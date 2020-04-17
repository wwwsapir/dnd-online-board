import GameMenu from "./gameMenu";

it("renders correctly with authToken", () => {
  const wrapper = shallow(
    <GameMenu
      onContinueSavedGame={() => {}}
      onStartANewGame={() => {}}
      onLogOut={() => {}}
      userName={"userName"}
      authToken={"authToken"}
      cancelRedirectFromMap={() => {}}
      isSmallerScreen={false}
    />
  );

  expect(wrapper).toMatchSnapshot();
});

it("renders correctly without authToken", () => {
  const wrapper = shallow(
    <GameMenu
      onContinueSavedGame={() => {}}
      onStartANewGame={() => {}}
      onLogOut={() => {}}
      userName={"userName"}
      authToken={""}
      cancelRedirectFromMap={() => {}}
      isSmallerScreen={false}
    />
  );

  expect(wrapper).toMatchSnapshot();
});

jest.mock("../services/getUserGameData");
it("game data check functionality (async)", async (done) => {
  const wrapper = shallow(
    <GameMenu
      onContinueSavedGame={() => {}}
      onStartANewGame={() => {}}
      onLogOut={() => {}}
      userName={"userName"}
      authToken={"authToken"}
      cancelRedirectFromMap={() => {}}
      isSmallerScreen={false}
    />
  );
  setTimeout(() => {
    wrapper.update();
    expect(wrapper.find("button").first().prop("disabled")).toEqual(false);
    done();
  });
});

it("start a new game click and warning menu opens (async)", (done) => {
  const wrapper = shallow(
    <GameMenu
      onContinueSavedGame={() => {}}
      onStartANewGame={() => {}}
      onLogOut={() => {}}
      userName={"userName"}
      authToken={"authToken"}
      cancelRedirectFromMap={() => {}}
      isSmallerScreen={false}
    />
  );

  setTimeout(() => {
    wrapper.update();
    wrapper.find("button").at(1).simulate("click");
    expect(wrapper).toMatchSnapshot();
    done();
  });
});

it("start a new game click and user approval functionality (async)", (done) => {
  const spyOnStartANewGame = sinon.spy();
  const wrapper = shallow(
    <GameMenu
      onContinueSavedGame={() => {}}
      onStartANewGame={spyOnStartANewGame}
      onLogOut={() => {}}
      userName={"userName"}
      authToken={"authToken"}
      cancelRedirectFromMap={() => {}}
      isSmallerScreen={false}
    />
  );

  setTimeout(() => {
    wrapper.update();
    wrapper.find("button").at(1).simulate("click");
    wrapper.find("button").at(2).simulate("click");
    expect(spyOnStartANewGame.calledOnce).toBe(true);
    done();
  });
});

it("start a new game click and user rejection functionality (async)", (done) => {
  const wrapper = shallow(
    <GameMenu
      onContinueSavedGame={() => {}}
      onStartANewGame={() => {}}
      onLogOut={() => {}}
      userName={"userName"}
      authToken={"authToken"}
      cancelRedirectFromMap={() => {}}
      isSmallerScreen={false}
    />
  );

  setTimeout(() => {
    wrapper.update();
    wrapper.find("button").at(1).simulate("click");
    wrapper.find("button").at(3).simulate("click");
    expect(wrapper).toMatchSnapshot();
    done();
  });
});

it("cancel redirect from map at mount functionality", () => {
  const spyCancelRedirectFromMap = sinon.spy();
  shallow(
    <GameMenu
      onContinueSavedGame={() => {}}
      onStartANewGame={() => {}}
      onLogOut={() => {}}
      userName={"userName"}
      authToken={"authToken"}
      cancelRedirectFromMap={spyCancelRedirectFromMap}
      isSmallerScreen={false}
    />
  );

  expect(spyCancelRedirectFromMap.calledOnce).toBe(true);
});

it("log out link click functionality", () => {
  const spyOnLogOut = sinon.spy();
  const wrapper = shallow(
    <GameMenu
      onContinueSavedGame={() => {}}
      onStartANewGame={() => {}}
      onLogOut={spyOnLogOut}
      userName={"userName"}
      authToken={"authToken"}
      cancelRedirectFromMap={() => {}}
      isSmallerScreen={false}
    />
  );

  wrapper.find("a").simulate("click");
  expect(spyOnLogOut.calledOnce).toBe(true);
});

it("continue game click functionality (async)", (done) => {
  const spyOnContinueSavedGame = sinon.spy();
  const wrapper = shallow(
    <GameMenu
      onContinueSavedGame={spyOnContinueSavedGame}
      onStartANewGame={() => {}}
      onLogOut={() => {}}
      userName={"userName"}
      authToken={"authToken"}
      cancelRedirectFromMap={() => {}}
      isSmallerScreen={false}
    />
  );

  setTimeout(() => {
    wrapper.update();
    wrapper.find("button").first().simulate("click");
    expect(spyOnContinueSavedGame.calledOnce).toBe(true);
    done();
  });
});
