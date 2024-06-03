import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import "./App.css";

function App() {
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    queryType: "",
    message: "",
    permission: false,
  });

  const rules = {
    email: {
      validate: (value) =>
        checkEmail(value) ? "" : "Please enter a valid email address",
    },
    queryType: {
      validate: (value) => (value ? "" : "Please select a query type"),
    },
    permission: {
      validate: (value) =>
        value ? "" : "To submit this form,please consent to being contacted",
    },
  };
  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "permission") {
      value = !formData.permission;
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = validateForm(formData);

    setErrors(newErrors);
    const existsErrors = Object.values(newErrors).every(
      (error) => error === "",
    );
    if (existsErrors) {
      setSubmitted(true);
    }
  };
  const validateForm = (formData) => {
    return Object.fromEntries(
      Object.entries(formData).map(([property, value]) => [
        property,
        rules[property]?.validate(value) ||
          (value ? "" : "This field is required"),
      ]),
    );
  };
  const checkEmail = (email) => {
    const regExp =
      /[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}/;
    return regExp.test(email);
  };
  return (
    <>
      <div
        className={`${submitted ? "" : "hidden"} relative top-5 mx-4 rounded-lg bg-teal-900 p-6 text-white sm:mx-auto sm:max-w-md`}
      >
        <p className="text-lg font-bold">
          <FontAwesomeIcon icon={faCircleCheck} /> Message sent
        </p>
        <span className="text-gray-100">
          Thanks for completing the form.We'll be in touch soon
        </span>
      </div>
      <form
        onSubmit={handleSubmit}
        className="mx-4 my-4 rounded-lg bg-white p-5 shadow-md sm:container sm:mx-auto sm:max-w-lg"
      >
        <header className="mb-3">
          <h1 className="text-3xl">Contact Us</h1>
        </header>
        <div className="lg:flex lg:gap-2">
          <div className="my-3 flex w-full flex-col gap-3">
            <label className="text-gray-500" htmlFor="firstname ">
              First Name *
            </label>
            <input
              className={`${errors.firstName ? "border-red-500 focus:outline-red-600" : ""} rounded-lg border border-black px-2 py-2 focus:outline-green-700`}
              type="text"
              name="firstName"
              id="firstname"
              value={formData.firstName}
              onChange={handleChange}
            />
            {errors && <span className="text-red-500">{errors.firstName}</span>}
          </div>
          <div className="my-3 flex w-full flex-col gap-3">
            <label className="text-gray-500" htmlFor="lastname">
              Last Name *
            </label>
            <input
              className={`${errors.lastName ? "border-red-500 focus:outline-red-600" : ""} rounded-lg border border-black px-2 py-2 focus:outline-green-700`}
              type="text"
              id="lastname"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
            {errors && <span className="text-red-500">{errors.lastName}</span>}
          </div>
        </div>
        <div className="my-3 flex flex-col gap-3">
          <label className="text-gray-500" htmlFor="email">
            Email Address *
          </label>
          <input
            className={`${errors.email ? "border-red-500 focus:outline-red-600" : ""} rounded-lg border border-black px-2 py-2 focus:outline-green-700`}
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors && <span className="text-red-500">{errors.email}</span>}
        </div>

        <div className="my-3">
          <p className="text-gray-500">Query Type *</p>
          <div className="lg:flex lg:gap-4">
            <div
              className={`${formData.queryType === "enquiry" ? "bg-green-50" : ""} my-4 flex w-full items-center rounded-lg border border-black p-3`}
            >
              <input
                className="mr-3 h-5 w-5 cursor-pointer accent-emerald-600"
                type="radio"
                id="enquiry"
                name="queryType"
                value="enquiry"
                checked={formData.queryType === "enquiry"}
                onChange={handleChange}
              />
              <label className="text-gray-900" htmlFor="enquiry">
                General Enquiry
              </label>
            </div>
            <div
              className={`${formData.queryType === "request" ? "bg-green-50" : ""} my-4 flex w-full items-center rounded-lg border border-black p-3`}
            >
              <input
                className="mr-3 h-5 w-5 cursor-pointer accent-emerald-600"
                type="radio"
                name="queryType"
                id="request"
                value="request"
                checked={formData.queryType === "request"}
                onChange={handleChange}
              />
              <label className="text-gray-900" htmlFor="request">
                {" "}
                Support Request
              </label>
            </div>{" "}
          </div>
          {errors && <p className="text-red-500">{errors.queryType}</p>}
        </div>
        <div className="my-3 flex flex-col gap-3">
          <label className="text-gray-500" htmlFor="message">
            Message *
          </label>
          <textarea
            className={`${errors.message ? "border-red-500 focus:outline-red-600" : ""} rounded-lg border border-black px-2 py-2 focus:outline-green-700`}
            name="message"
            id="message"
            cols={8}
            rows={8}
            value={formData.message}
            onChange={handleChange}
          ></textarea>
          {errors && <span className="text-red-500">{errors.message}</span>}
        </div>
        <div className="my-9 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <input
              className="´ h-4 w-4 cursor-pointer accent-emerald-700"
              type="checkbox"
              id="consent"
              name="permission"
              value={formData.permission}
              checked={formData.permission}
              onChange={handleChange}
            />
            <label className="text-gray-900" htmlFor="consent">
              I consent to being contacted by the team *
            </label>
          </div>
          {errors && <span className="text-red-500">{errors.permission}</span>}
        </div>

        <button
          className="w-full rounded-xl bg-emerald-700 p-3 font-bold text-white hover:bg-emerald-700"
          type="submit"
        >
          Submit
        </button>
      </form>
    </>
  );
}

export default App;
