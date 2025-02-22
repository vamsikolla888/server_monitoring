import mongoose from 'mongoose';
import defaultFields from '../schemas/defaults';

/**
 * @type {mongoose.Schema}
 */
const ConfigWindowsFileServerSchema = mongoose.Schema({
  serverName: {
    type: String,
  },
  serverIpAddress: {
    type: String,
  },
  baseFolder: {
    type: String,
  },
  configurationLastUpdatedBy: {
    type: String,
  },
  ConfigurationLastUpdatedDate: {
    type: Date
  },
  ...defaultFields
})

ConfigWindowsFileServerSchema.statics = {

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
  }

}

export default mongoose.model('ConfigWindowsFileServer', ConfigWindowsFileServerSchema, "config_Windows_Fileserver");