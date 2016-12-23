import _ from 'lodash';

class Builder{
  constructor(){
    this._statements = [];
    this.and = this;
    this._method = 'select';
  }
  select(columns){
    this._statements.push({
      grouping: 'select',
      columns
    });
    return this;
  }
  where(column, operator, value){
    return this;
  }
  orWhere(){
    return this;
  }
}

export default Builder;
