import mongoose from 'mongoose'

/**
 * @type {mongoose.Schema}
 */
const ConfigDocumentLibraryWindowsServer = mongoose.Schema({
  name: String,
  type: {
    type: String,
    enum: ['file','dir']
  },
  path: String,
  relativePath: {
    type: String,
  },
  isRoot: {
    type: Boolean,
    default: false
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'File'
  },
  size: {
    type: String,
  },
  noOfFiles: {
    type: Number,
    default: 0
  },
  serverName: {
    type: String,
  },
  serverIp: {
    type: String,
  },
  diskName: {
    type: String,
  },
  active: {
    type: Boolean,
    default: true
  }
})

ConfigDocumentLibraryWindowsServer.statics = {

  /**
   * 
   * @param {import("mongoose").Document} doc 
   * @returns 
   */
  async saveDocument(doc) {
    return await doc.save();
  },

  /**
   * 
   * @param {String} _id 
   * @returns { import("mongoose").QueryWithHelpers }
   */
  async get(_id){
    return await this.findById(_id);
  },

  /**
   * 
   * @param {*} query 
   * @returns 
   */
  async list(query){
    return await this.find(query.filter)
                .sort(query.sort)
                .skip((query.page - 1) * query.limit)
                .limit(query.limit);
  },

  async totalCount(query){
    return await this.find(query.filter).countDocuments();
  },

  async softRemoveDocument(_id) {
    return await this.findByIdAndUpdate(_id, { active: false }, { new: true });
  }

}

export default mongoose.model('ConfigDocumentLibraryWindowsServer', ConfigDocumentLibraryWindowsServer, "configDocumentLibraryWindowsServer");