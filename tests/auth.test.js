const axios = require("axios");
const expect = require("chai").expect;

const config = require("../src/config");
const { removeUser } = require("../tests/services/userService");

// TODO
describe("Authentication", () => {
  let userId;
  describe("sign up", () => {
    it("should sign up successfully with email and password", async () => {
      let resp = await axios.post(
        "http://localhost:3001/auth/signup",
        {
          email: "test@email.com",
          password: "password",
        },
        {}
      );

      expect(resp).to.have.property("status", 200);
      expect(resp).to.have.nested.property("data.user");
      expect(resp).to.have.nested.property("data.token");
      // to ensure database is clean
      userId = resp.data.user._id;
    });

    it("should fail to sign up if missing email / password", async () => {
      try {
        let resp = await axios.post(
          "http://localhost:3001/auth/signup",
          {
            email: "test@email.com",
          },
          {}
        );
        expect(resp).to.have.property("status", 400);
      } catch (e) {
        expect(e).to.have.nested.property("response.status", 400);
      }
    });
  });

  describe("login", () => {
    it("should login if email and password match database", async () => {
      let resp = await axios.post(
        "http://localhost:3001/auth/login",
        {
          email: "test@email.com",
          password: "password",
        },
        {}
      );

      expect(resp).to.have.property("status", 200);
      expect(resp).to.have.nested.property("data.user");
      expect(resp).to.have.nested.property("data.token");
      // to ensure database is clean
      userId = resp.data.user._id;
    });

    it("should fail login if missing email / password", async () => {
      try {
        let resp = await axios.post(
          "http://localhost:3001/auth/login",
          {
            email: "test@email.com",
          },
          {}
        );
        expect(resp).to.have.property("status", 400);
      } catch (e) {
        expect(e).to.have.nested.property("response.status", 400);
      }
    });

    it("should fail login if email and password doesn't match", async () => {
      try {
        let resp = await axios.post(
          "http://localhost:3001/auth/login",
          {
            email: "test@email.com",
            password: "wrongpass",
          },
          {}
        );
        expect(resp).to.have.property("status", 500);
      } catch (e) {
        expect(e).to.have.nested.property("response.status", 500);
      }
    });
  });

  after(async function () {
    await removeUser(userId);
  });
});
