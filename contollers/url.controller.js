const shortid = require('shortid');
const URL = require("../models/url.model")

//generating a short url
const generateShortenUrl = async (req, res) => {
    const body = req.body;

    if (!body.url) {
        return res.status(400).json({ error: "url is required" });
    }
    const shortID = shortid();
    await URL.create({
        shortId: shortID,
        redirectUrl: body.url,
        visitHistory: [],
        createdBy:req.user._id
    })
    return res.render("home",{
        id:shortID,
    });
}

//getting redirect url
const getRedirectUrl = async (req, res) => {
    const shortId = req.params.shortId;

    const entry = await URL.findOneAndUpdate(
        { shortId },
        {
            $push: { 
                visitHistory: {timestamp:Date.now()}
            }
        }
    );
    res.redirect(entry.redirectUrl);
}

//get analystics of short url
const getAnalytics=async (req,res)=>{
    const shortId=req.params.shortId;

    const result=await URL.findOne({shortId});
    return res.status(200).json({noOfVisits:result.visitHistory.length,analystics:result.visitHistory});
}

module.exports = {
    generateShortenUrl,
    getRedirectUrl,
    getAnalytics
}