import React from 'react';
import {Octokit} from '@octokit/rest'
//import Nav from './components/nav'
//import logo from './logo.svg';

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
    //data: "",
    erro: false,
    erro_msg : "",
    arrayRepo: ["Nome do Repositório"]
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

    const dados = evento.target.value
    const campos = evento.target.name
    
    this.setState({
      [campos]: dados
    })
  }

  ///*
  getGithubByName = async () => {
    this.setState({erro : false, arrayRepo: []})
    const name = this.state.nome
    if(!name){
      this.setState({erro : true, erro_msg : "Entrada vazia. Por favor digite um nome de usuário!"})
      return []
    }
    try{
      const repos = await fetch("https://api.github.com/users/"+name+"/repos",{method: "GET"})
      .then(repos => repos.json())
      console.log(repos)
      if(repos.message === "Not Found"){
        this.setState({erro : true, erro_msg : "Usuário não encontrado!"})
      }
      ///*
      let repoNames = []

      for (let key in repos){
        repoNames.push(repos[key].name)
      }
      this.setState({arrayRepo: repoNames})
      //*/
    }catch(error){
      this.setState({
        error: true
      })
    }
  }
  //*/
  ///*
   getGithubByToken = async () => {
    this.setState({erro : false, arrayRepo: []})
    const token = this.state.nome
    const octokit = new Octokit({auth: token, })
    if(!octokit){
      return []
    }
    try{
      const repos = await octokit.request("GET /user/repos")
      //.then(repos => repos.json())
      //console.log(repos)
      if(repos['status']===200){
        const repos_data = repos['data']
        console.log(repos_data)
        ///*
        const repoNames = []

        for (let key in repos_data){
          repoNames.push(repos_data[key]['name'])
        }
        this.setState({arrayRepo: repoNames})
      }else{
        this.setState({erro : true, erro_msg : "Token não encontrado!"})
      }
      //*/
    }catch(error){
      this.setState({erro : true, erro_msg : "Acesso não autorizado ou token inexistente!"})
    }
  }

  getRadio = () => {
    if(document.getElementById('op1').checked){
      this.getGithubByName()
    }else if(document.getElementById('op2').checked){
      this.getGithubByToken()
    }else{
      this.setState({erro : true, erro_msg:"Você deve selecionar seu método de busca!"})
    }
  }
  //*/
  criaComboBoxRepo = () => { 
    const array = this.state.arrayRepo
    const comboBoxOpcoes = array.map( opcao => <option>{opcao}</option>)
    return (
      <select className="form-control">
        {comboBoxOpcoes}
      </select>
    )
  }

  render(){
    return(
      <div id="img-fundo">
        <header className="App-header">
          <div>
            <h1 className="custom-h1">Seja bem vindo!</h1>
          </div>
        </header>
        <div>
          <div id="div-info1">
            {this.state.erro &&
              (
                <div className="alert alert-dismissible alert-danger">
                  <button type="button" className="close" data-dismiss="alert">
                    &times;
                  </button>
                  <strong>Ocorreu um erro.</strong> {this.state.erro_msg}
                  </div>
              ) 
            }
            <div className="row">
              <div className="col-md-4"></div>
              <div className="col-md-4">
                <div className="form-group">
                  <label id="label1" htmlFor="nome">Username ou Token: </label>
                  <input id="nome" 
                          type="text" 
                          placeholder = "Ex: Sample13"
                          value={this.state.nome} 
                          name="nome" 
                          onChange={this.insercao_dados}
                          className="form-control" />
                </div>
              </div>
              <div className="col-md-4"></div>
            </div>
            <div className="row">
              <div className="col-md-4"></div>
              <div className="col-md-2">
                <label htmlFor="op1">Buscar por Nome: </label>
                <input type="radio" name="radioOptions" className="radios" id="op1" value="Usermame"/>
              </div>
              <div className="col-md-2">
                <label htmlFor="op2">Buscar por Token: </label>
                <input type="radio" name="radioOptions" className="radios" id="op2" value="Token"/>
              </div>
              <div className="col-md-4"></div>
            </div>
            <div className="row">
              <div className="col-md-4"></div>
              <div className="col-md-4">
                <div className="form-group">
                  <label id="label1" htmlFor="criarcombobox">Repositórios: </label>
                  <div id="criarcombobox"> {this.criaComboBoxRepo()}</div>
                </div>
              </div>
              <div className="col-md-4"></div>
            </div>
            <div className="row">
              <div className="col-md-4"></div>
              <div className="col-md-4"> 
              <br/>
              <button type="submit" className="btn btn-success " onClick = {this.getRadio}> Buscar</button>
              </div>
              <div className="col-md-4"></div>
            </div>
            <br/>
          </div>
        </div>
      <footer>
      </footer>
    </div>
    )
  }
}

export default App;