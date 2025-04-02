const Custumer = require("../model/Custumer");


const custumerGetAll = async (req, res) => {
    try {
      const customers = await Custumer.find();
      res.render('dashboard/costumerList', { customers: customers }); // Doğru dosya adı
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
const costumerAdd = async (req, res) => {
  try {
    const costumer = new Custumer(req.body);
    await costumer.save();
    res.render('dashboard/costumerAdd', { message: 'Customer added successfully' }); // Doğru dosya adı
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = {custumerGetAll,costumerAdd};