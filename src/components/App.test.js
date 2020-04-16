import React from "react";
import App from "./App";
import { MemoryRouter } from "react-router-dom";

it("renders correctly", () => {
  const wrapper = mount(
    <MemoryRouter>
      <App
        cellSize={45}
        rowCount={15}
        colCount={15}
        bgImageLink={"mock/image/path.png"}
      />
    </MemoryRouter>
  );

  expect(wrapper).toMatchSnapshot();
});
