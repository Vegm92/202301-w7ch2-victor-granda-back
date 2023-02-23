import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import connectDataBase from "../../../database/connectDataBase";
import User from "../../../database/models/User";
import { type UserCredentials } from "../../../types";
import { app } from "../..";
import loginUser from "../../controllers/usersControllers";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await connectDataBase(server.getUri());
});

afterAll(async () => {
  await server.stop();
  await mongoose.connection.close();
});

afterEach(async () => {
  await User.deleteMany();
});

describe("Given a POST '/users/login' endpoint", () => {
  const mockUser: UserCredentials = {
    username: "Anna",
    password: "12345",
  };

  describe("When it receives a request with name 'Anna'", () => {
    test("Then it should respond with status 401 and a message 'Wrong Credentials'", async () => {
      const expectedStatus = 401;
      const expectedMessage = "Wrong Credentials";

      const response = await request(app)
        .post("/users/login")
        .send(mockUser)
        .expect(expectedStatus);

      expect(response.body).toHaveProperty("message", expectedMessage);
    });
  });
});
