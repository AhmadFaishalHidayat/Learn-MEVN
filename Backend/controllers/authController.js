export default class registerUser {
  static async registerUser(req, res) {
    res.status(200).json({ message: "Register User Done" });
  }
  static async loginUser(req, res) {
    res.status(200).json({ message: "Login User Done" });
  }
  static async logoutUser(req, res) {
    res.status(200).json({ message: "Logout User Done" });
  }
  static async getUser(req, res) {
    res.status(200).json({ message: "Get User Done" });
  }
}
