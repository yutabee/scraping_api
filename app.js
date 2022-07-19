import express from "express";
import { omikujiRouter } from "./routes/omikuji.route.js";
import { jankenRouter } from "./routes/janken.route.js";
import { weatherRouter } from "./routes/weather.route.js";
import { scrapingRouter } from "./routes/scraping.route.js";
import { todayRouter } from "./routes/today.route.js";

const app = express();
// POSTでデータを受け取るために必要
app.use(express.urlencoded({ extended: true }));
// JSONデータを使用するために必要
app.use(express.json());

app.use("/", express.static("static"));

const port = 3001;

app.get("/", (req, res) => {
  res.json({
    uri: "/",
    message: "Hello Node.js!",
  });
});

//おみくじAPI
app.use("/omikuji", (req, res) => omikujiRouter(req, res));
//じゃんけんAPI
app.use("/janken", (req, res) => jankenRouter(req, res));

//お天気API
app.use("/weather", (req, res) => weatherRouter(req, res));

//スクレイピングAPI
app.use("/scraping", (req, res) => scrapingRouter(req, res));
app.use("/today", (req, res) => todayRouter(req, res));


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
