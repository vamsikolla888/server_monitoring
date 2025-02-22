const defaultFields = {
  created: {
    type: Date,
    default: Date.now(),
  },
  updated: {
    type: Date,
  },
  active: {
    type: Boolean,
    default: true
  }
}
export default defaultFields;