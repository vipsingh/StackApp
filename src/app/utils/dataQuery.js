import _ from 'lodash';

class ObjectQuery{
  constructor(object_name){
    this._statements = [];
    this.object_name = object_name;
    this.aggrigate = '';
  }
  select(columns){
    this._statements.push({
      grouping: 'select',
      columns
    });
    return this;
  }
  where(filters){
    this._statements.push({
      grouping: 'where',
      filters
    });
    return this;
  }
  limit(limit){
    this._statements.push({
      grouping: 'limit',
      limit
    });
    return this;
  }
  count(){
    this._statements.push({
      grouping: 'count'
    });
    this.aggrigate = 'count';
    return this;
  }
  sum(field){
    this._statements.push({
      grouping: 'sum',
      field
    });
    this.aggrigate = 'sum';
    return this;
  }
  max(field){
    this._statements.push({
      grouping: 'max',
      field
    });
    this.aggrigate = 'max';
    return this;
  }
  then(cb){
    return new Promise((resolve, reject)=>{

    }).then(cb);
  }

}

export default ObjectQuery;
