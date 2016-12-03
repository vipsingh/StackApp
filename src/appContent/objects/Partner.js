
export default class Custom{
  constructor(){
    this.OnFieldChangeSubscribers =[{field:'user', method:
      (value)=>{
        let that = this;
        return new Promise((resolve, reject)=>{
          setTimeout(function() {
            that.props.autofill('creditlimit', Number(value) * 100);
            resolve(true);
          },2000);
        });
      }},

      {field:'user', method:
        (value)=>{
          let that = this;
          return new Promise((resolve, reject)=>{
            setTimeout(function() {
              that.props.autofill('creditlimit', Number(value) * 200);
              resolve(true);
            },500);
          });
        }}
    ];
  }
}

//**Object Specific Form
// export class PartnerForm extends BaseEntityForm{
//   renderForm(schema){
//     let fields = schema.fields;
//     return(
//       <div>
//         <div className='row'>
//           <div className='col-sm-6 col-xs-12'>{this.renderField(fields.name)}</div>
//           <div className='col-sm-6 col-xs-12'>{this.renderField(fields.active)}</div>
//         </div>
//       </div>
//     )
//   }
// }
