const request = require("supertest");
const app = require("../../app");

//get test
describe("Test Get /launches", () => {
  test("It should respond with 200 success", async () => {
    const response = await request(app)
      .get("/launches")
      .expect("Content-Type", /json/)
      .expect(200);
  });
});

//post test
describe("Test POST /launch", () => {
  const completeLaunchData = {
    mission: "hihi haha",
    rocket: "ABC_123",
    target: "mars",
    launchDate: "January 4, 2028 ",
  };
  const launchDataWithInvalidDate = {
    mission: "hihi haha",
    rocket: "ABC_123",
    target: "mars",
    launchDate: "asd ",
  };

  const launchDataWithoutDate = {
    mission: "hihi haha",
    rocket: "ABC_123",
    target: "mars",
  };

  //upload data test
  test("It should respond with 201 success", async () => {
    const response = await request(app)
      .post("/launches")
      .send(completeLaunchData)
      .expect("Content-Type", /json/)
      .expect(201);

    const requestDate = new Date(completeLaunchData.launchDate).valueOf();
    const responseDate = new Date(response.body.launchDate).valueOf();

    expect(responseDate).toBe(requestDate);
    expect(response.body).toMatchObject(launchDataWithoutDate);
  });

  //error test
  test("It should catch missing required properties", async () => {
    const response = await request(app)
      .post("/launches")
      .send(launchDataWithoutDate)
      .expect("Content-Type", /json/)
      .expect(400);
    expect(response.body).toStrictEqual({
      error: "Missing required launch property",
    });
  });

  //date error test
  test("It should catch invalid date", async () => {
    const response = await request(app)
      .post("/launches")
      .send(launchDataWithInvalidDate)
      .expect("Content-Type", /json/)
      .expect(400);
    expect(response.body).toStrictEqual({
      error: "Invalid launch date",
    });
  });
});
