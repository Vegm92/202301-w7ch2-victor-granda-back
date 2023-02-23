import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import connectDataBase from "../../../database/connectDataBase";
import User from "../../../database/models/User";
import { type UserCredentials } from "../../../types";
import { app } from "../..";

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
    password: "123456789",
    avatar: "asdfghjkl",
    email: "qwertyui@ghjkl.com",
  };
  const loginUrl = "/users/login";

  describe("When it receives a request with name 'Anna'", () => {
    beforeAll(async () => {
      await User.create(mockUser);
    });

    test("Then it should respond with status 401 and a message 'Wrong Credentials'", async () => {
      const expectedStatus = 401;
      const expectedMessage = 'error: "Wrong credentials"';

      const response = await request(app)
        .post(loginUrl)
        .send(mockUser)
        .expect(200);

      expect(response.body).toHaveProperty("message", expectedMessage);
    });
  });

  describe("When it recieves a request with name 'Anna'", () => {
    test("Then it should respond with status code 200 and a object in its body with property `token`", async () => {
      jwt.sign = jest.fn().mockImplementation(() => ({
        token: "qwertyuiop1234567890",
      }));

      const expectedCodeStatus = 200;
      const user = await User.create(mockUser);

      const response = await request(app)
        .post(loginUrl)
        .send(mockUser)
        .expect(expectedCodeStatus);

      expect(response.body).toHaveProperty("token");
    });
  });
});
