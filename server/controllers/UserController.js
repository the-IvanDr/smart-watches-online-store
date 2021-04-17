
exports.getData = async function (req, res) {
    console.log('getData: ', req.body);

    res.json({ message: "it's okay, but still isn't ready" });
}