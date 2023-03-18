const Resource = require('../model/resource.model');
const mongoose = require('mongoose')

const getResources = async () => {
    const resources = await Resource.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: {
          path: "$user",
        },
      },
      {
        $sort: {
            date: -1
        }
      }
    ]);
    return resources;
}


const FilteredResources = async (year, branch) => {
    let matchFilter = {};
    if (year.length) {
      matchFilter["year"] = { $in: year.map((year) => Number(year)) };
    }
    if (branch.length) {
      matchFilter["branch"] = { $in: branch };
    }

    const data = await Resource.aggregate([
      {
        $match: matchFilter,
      },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: {
          path: "$user",
        },
      },
    ]);

    return data;
}

const getResourceById = async (id) => {
    const resource = await Resource.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(id)
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: {
          path: "$user",
        },
      },
    ]);
    return resource;
}

module.exports = {
    getResources,
    FilteredResources, 
    getResourceById
}