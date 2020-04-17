export default async (loginData) => {
  return loginData.email === "wwwsapir@gmail.com"
    ? await new Promise((resolve) => {
        resolve({
          status: 200,
          body: { authToken: "authToken", userName: "wwwsapir" },
        });
      })
    : { status: 400, body: { error: { message: "Error" } } };
};
