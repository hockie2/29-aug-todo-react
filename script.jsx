class DoneList extends React.Component {

  render() {

        let doneItem = this.props.doneList.map((item, index)=>{
            return(
                    <li key={index}>{item}</li>
                )
        })

      return (
        <ol>
            {doneItem}
        </ol>
      );
  }
}


class Form extends React.Component {

  render() {

      return (
            <form className="submit-form input-group mb-3" onSubmit={(event) => { this.props.addItem(event) }}>
                <input className="form-control" onChange={(event)=>{this.props.input(event)}} value={this.props.word}/>
                <button type="submit" className="btn btn-primary">add item</button>
            </form>
      );
  }
}



class ToDoItem extends React.Component {

  render() {

     // render the list with a map() here
      const items = this.props.listItems.map((item, index)=>{

        return(
                <div className="item_wrapper"key = {index+item}>
                    <div><li>{item}</li></div>
                    <box-icon name='trash' onClick={()=>this.props.deleteItem(index)}/>
                </div>
            )
      })

      return (
        <div>
            { items }
        </div>
      );
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////
class ItemList extends React.Component {
  constructor(){
    super();
    this.inputHandler = this.inputHandler.bind( this );
    this.deleteItem = this.deleteItem.bind( this );
    this.addItem = this.addItem.bind( this );

    this.state = {
      word:"",
      list : [],
      validation : "",
      doneList : []
    }
  }

  deleteItem(index){
    const spliceList = this.state.list;

    const doneList = this.state.doneList;
    doneList.push(spliceList.splice(index, 1))

    this.setState({spliceList, doneList});
  }


  addItem(event){
    // debugger;
    this.setState({ word: " " });
    event.preventDefault();

    const pushList = this.state.list;
    const insertWord = this.state.word;

    pushList.push(insertWord);

  }

  inputHandler(event){
    // debugger;
    let currentValue = event.target.value.trim();
        // this.setState({word:currentValue});

    if(currentValue.length >= 0 && currentValue.length < 20){
        this.setState({word:currentValue});
        this.setState({ validation: "" })
        // console.log(currentValue.length)
    }
    else if (currentValue.length === 0 || currentValue.length >= 20){
        // this.setState({word:currentValue});
        this.setState({validation: "Please enter at least one character, but less than 20"})
    }
  }

  render() {


      // console.log("rendering");
      return (
        <div className="todoapp_wrapper">
                <div className="form_wrapper">
                    <Form input={this.inputHandler} addItem={this.addItem} word={this.state.word}/>
                    {this.state.validation}
                </div>
            <div className="list">
                <ol>
                    <ToDoItem listItems={this.state.list} deleteItem={this.deleteItem} addItem={this.addItem}/>
                </ol>
            </div>
            <div className="donelist">
                <h5>Done Tasks</h5>
                <DoneList doneList={this.state.doneList} />
            </div>
        </div>
      );
  }
}




class TodoApp extends React.Component {
  constructor(){
    super()
  }

  render() {
      return (
        <div>
            <ItemList />
        </div>
      );
  }
}



ReactDOM.render(
    <TodoApp/>,
    document.getElementById('root')
);
