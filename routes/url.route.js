const express=require("express");
const { generateShortenUrl, getRedirectUrl, getAnalytics } = require("../contollers/url.controller");

const router=express.Router();

router.post("/",generateShortenUrl);
router.get("/:shortId",getRedirectUrl);
router.get("/analystics/:shortId",getAnalytics);

module.exports=router;