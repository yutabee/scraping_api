import { getWeather } from "../services/weather.service.js";

export const getResult = async (req, res, next) => {
  console.log(req.query);

  //latitude.longtitudeを受け取る->nullならば東京のものを入れる
  const latitude = req.query.latitude ?? 35.6785;
  const longitude = req.query.longitude ?? 139.6823;

  try {
    const result = await getWeather({latitude,longitude});
    return res.status(200).json({
      status: 200,
      data: result,
      message: "Successfully get Weather!",
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};
