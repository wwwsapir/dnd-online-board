export default async (authToken) => {
  return authToken === "authToken"
    ? await new Promise((resolve) => {
        resolve({ status: 200, body: "" });
      })
    : { status: 400, body: { error: { message: "Error" } } };
};
