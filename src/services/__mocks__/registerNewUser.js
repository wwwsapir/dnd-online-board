export default async (userData) => {
  return userData.userName === "wwwsapir"
    ? await new Promise((resolve) => {
        resolve({
          status: 200,
          body: "registered successfully!",
        });
      })
    : { status: 400, body: { error: { message: "Error" } } };
};
