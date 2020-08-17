import React from 'react';
//import logo from './logo.svg';
import './App.css';

//<img className="img-react" alt="img-react" src="https://media.bitdegree.org/storage/media/images/2018/10/The-Most-Essential-React-Interview-Questions.jpg"/>
//Sem usar o modo classe. também funciona.
/*
function App(props) {

  criaComboBox = () => {
    const estados_BR = ["-","AM","AC","BA","CE","PA"]
    const comboBoxOpcoes = estados_BR.map( opcao => <option>{opcao}</option>)
    return (
      <select>
        {comboBoxOpcoes}
      </select>
    )
  }
  
  return (
    <div>
        <header className="App-header">
          <div>
            <h1>Seja bem vindo ao iniciando meus estudos com react!</h1>
          </div>
        </header>
        <div id="div-info">
          <label for="nome">Nome:</label>
          <input id="nome" type="text" value={props.nome} onChange={insercao_dados} />
          <br/>
          {criaComboBox()}
          <h1>Olá {props.nome}</h1>
        </div>
      <footer>
      </footer>
    </div>
  );
}
*/
class App extends React.Component{

  state = {
    nome: "",
    data: ""
  }

  /*
  //essa forma se cria através de método construtor. Mas terá que criar um para cada função.

  constructor(){
    super()
    this.insercao_dados = this.insercao_dados.bind(this)
  }

  insercao_dados(evento){
    //Função que seta os valores do evento em state.
    this.setState({
      nome: evento.target.value,
      data: evento.target.value
    })
  }
   */ 

  insercao_dados = (evento) =>{
    
    this.setState({
      nome: evento.target.value
    })
  }

  criaComboBox = () => {
    const estados_BR = ["-","AM","AC","BA","CE","PA"]
    const comboBoxOpcoes = estados_BR.map( opcao => <option>{opcao}</option>)
    return (
      <select>
        {comboBoxOpcoes}
      </select>
    )
  }

  render(){
    return(
      <div>
        <header className="App-header">
          <div>
            <h1>Seja bem vindo ao iniciando meus estudos com react!</h1>
          </div>
        </header>
        <div id="div-info">
          <label for="nome">Nome:</label>
          <input id="nome" type="text" value={this.state.nome} onChange={this.insercao_dados} />
          {this.criaComboBox()}
          <h1>Olá {this.state.nome}</h1>
        </div>
      <footer>
      </footer>
    </div>
    )
  }
}

export default App;