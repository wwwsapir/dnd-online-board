export default async (resetData) => {
  return resetData.email === "wwwsapir@gmail.com"
    ? await new Promise((resolve) => {
        resolve({ status: 200, body: "Sent successfully!" });
      })
    : { status: 400, body: { error: { message: "Error" } } };
};
