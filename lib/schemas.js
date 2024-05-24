const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const TeamSchema = new Schema({
  name: {
    type: String,
    required: true,
  }
});

const EmployeeSchema = new Schema({
  name: {
    first: {
      type: String,
      required: true,
    },
    last: {
      type: String,
      required: true,
    }
  },
  team: {
    type: Schema.Types.ObjectId,
    ref: "Team",
  },
  image: {
    type: String,
    default: 'images/user.png',
  },
  address: {
    lines: {
      type: [String]
    },
    postal: {
      type: String,
    }
  }
})