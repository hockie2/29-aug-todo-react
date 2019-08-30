class List extends React.Component {
  constructor(){
    super();

    this.state = {
      word:"",
      list : [],
      validation : ""
    }
  }

  deleteItem(index){
    const spliceList = this.state.list;
    spliceList.splice(index, 1)
    this.setState({spliceList});
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
      // render the list with a map() here
      const list = this.state.list;
      const items = list.map((item, index)=>{

        return(
                <li key = {index+item} onClick={this.deleteItem.bind(this,index)}>{item}</li>
            )
      })

      // console.log("rendering");
      return (
        <div className="list">
            {this.state.validation}
            <form className="submit-form" onSubmit={(event) => { this.addItem(event) }}>
                <input onChange={(event)=>{this.inputHandler(event)}} value={this.state.word}/>
                <button type="submit">add item</button>
            </form>
            <ol>
                {items}
            </ol>
        </div>
      );
  }
}

ReactDOM.render(
    <List/>,
    document.getElementById('root')
);

