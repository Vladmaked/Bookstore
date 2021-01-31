module.exports = class APIFeatures {
  constructor(query, queryObj) {
    this.query = query;
    this.queryObj = queryObj;
  }

  filter() {
    const excludeKeys = ['page', 'sort', 'limit', 'fields'];
    const queryObj = { ...this.queryObj };

    excludeKeys.forEach((el) => delete queryObj[el]);

    let queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(/\b(gte|gt|lte|lt|ne)\b/g, (match) => `$${match}`);

    const transformedQuery = JSON.parse(queryString);

    for (let el in transformedQuery) {
      if (transformedQuery[el].includes(',')) {
        transformedQuery[el] = { $in: transformedQuery[el].split(',') };
      }
    }

    this.query = this.query.find(transformedQuery);

    return this;
  }

  sort() {
    let sortStr;
    if (this.queryObj.sort) {
      sortStr = this.queryObj.sort.split(',').join(' ');
    } else {
      sortStr = 'createdAt';
    }
    this.query = this.query.sort(sortStr);

    return this;
  }

  specifyFields() {
    if (this.queryObj.fields) {
      const fieldsToSelect = this.queryObj.fields.split(',').join(' ');
      this.query = this.query.select(fieldsToSelect);
    } else {
      this.query = this.query.select('-__v');
    }

    return this;
  }

  paginate() {
    const page = +this.queryObj.page || 1;
    const limit = +this.queryObj.limit || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
};
