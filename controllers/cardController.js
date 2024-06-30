import Card from '../models/Card.js'; // Assuming you have a Card model defined

const createCard = async (req, res) => {
  try {
    const { title, description } = req.body;

    const card = new Card({ title, description, user: req.user.id });
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
    const { title, content } = req.body;

    let card = await Card.findById(req.params.id);
    if (!card) {
      return res.status(404).json({ msg: 'Card not found' });
    }

    card.title = title || card.title;
    card.content = content || card.content;
    await card.save();

    res.json({ msg: 'Card updated successfully' });
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

    await card.remove();
    res.json({ msg: 'Card deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

export default { createCard, getAllCards, getCardById, updateCard, deleteCard };
