import Card from '../models/Card.js';

const createCard = async (req, res) => {
  try {
    const {
      title,
      subtitle,
      description,
      phone,
      email,
      web,
      image,
      address
    } = req.body;

    const card = new Card({
      title,
      subtitle,
      description,
      phone,
      email,
      web,
      image,
      address,
      businessId: req.user.id
    });
    await card.save();

    res.status(201).json({ msg: 'Card created successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const getAllCards = async (req, res) => {
  try {
    const cards = await Card.find();
    res.json(cards);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const getMyCards = async (req, res) => {
  try {
    const cards = await Card.find({ businessId: req.user.id });
    res.json(cards);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const getCardById = async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) {
      return res.status(404).json({ msg: 'Card not found' });
    }
    res.json(card);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const updateCard = async (req, res) => {
  try {
    const {
      title,
      subtitle,
      description,
      phone,
      email,
      web,
      image,
      address
    } = req.body;

    let card = await Card.findById(req.params.id);
    if (!card) {
      return res.status(404).json({ msg: 'Card not found' });
    }

    // Check if the user is the creator
    if (card.businessId.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Access denied' });
    }

    card.title = title || card.title;
    card.subtitle = subtitle || card.subtitle;
    card.description = description || card.description;
    card.phone = phone || card.phone;
    card.email = email || card.email;
    card.web = web || card.web;
    card.image = image || card.image;
    card.address = address || card.address;

    await card.save();

    res.json({ msg: 'Card updated successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const patchCard = async (req, res) => {
  try {
    const {
      title,
      subtitle,
      description,
      phone,
      email,
      web,
      image,
      address
    } = req.body;

    let card = await Card.findById(req.params.id);
    if (!card) {
      return res.status(404).json({ msg: 'Card not found' });
    }

    // Check if the user is the creator
    if (card.businessId.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Access denied' });
    }

    if (title) card.title = title;
    if (subtitle) card.subtitle = subtitle;
    if (description) card.description = description;
    if (phone) card.phone = phone;
    if (email) card.email = email;
    if (web) card.web = web;
    if (image) card.image = image;
    if (address) card.address = address;

    await card.save();

    res.json({ msg: 'Card patched successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const deleteCard = async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) {
      return res.status(404).json({ msg: 'Card not found' });
    }

    // Check if the user is the creator or an admin
    if (card.businessId.toString() !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json({ msg: 'Access denied' });
    }

    await Card.deleteOne({ _id: req.params.id });
    res.json({ msg: 'Card deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

export default { createCard, getAllCards, getMyCards, getCardById, updateCard, patchCard, deleteCard };
