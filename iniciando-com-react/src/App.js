import React from 'react';
import {Octokit} from '@octokit/rest';
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
    searchFor: "Usermame",
    erro: false,
    erro_msg : "",
    arrayRepo: [],
    repoSelecionado: "", 
    loadingScreen: true,
    searching: false,
    loadingReadMe: false,
    readme: "",
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        loadingFadeOut: true
      })

      setTimeout(() => {
        this.setState({
          loadingScreen: false
        })
      }, 1000) // mesmo tempo da animação
    }, 1500)
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
      // let repoNames = []

      // for (let key in repos){
      //   console.log(repos[key])
      //   repoNames.push(repos[key].name)
      // }
      this.setState({
        arrayRepo: repos,
        repoSelecionado: repos.length > 0 ? repos[0] : null, 
        searching: false
      })
      this.getReadMe(
        repos[0].owner.login,
        repos[0].name
      )
      //*/
    }catch(error){
      this.setState({
        error: true,
        searching: false
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
        // const repoNames = []

        // for (let key in repos_data){
        //   repoNames.push(repos_data[key]['name'])
        // }
        // this.setState({arrayRepo: repoNames})
        this.setState({
          arrayRepo: repos_data,
          repoSelecionado: repos_data.length > 0 ? repos_data[0] : null,
          searching: false
        })
        this.getReadMe(
          repos_data[0].owner.login,
          repos_data[0].name
        )
      }else{
        this.setState({erro : true, erro_msg : "Token não encontrado!", searching: false})
      }
      //*/
    }catch(error){
      this.setState({erro : true, erro_msg : "Acesso não autorizado ou token inexistente!", searching: false})
    }
  }

  getReadMe = async (owner, repo) => {
    this.setState({ loadingReadMe: true })
    try {
      const response = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/readme`
      )

      const readme = await response.json()

      const content = decodeURIComponent(
        escape(atob(readme.content))
      )

      this.setState({
        readme: content,
        loadingReadMe: false
      })

    } catch(error) {
      console.error(error)

      this.setState({
        readme: "README não encontrado.",
        loadingReadMe: false
      })
    }
  }

  getRadio = () => {
    this.setState({searching: true, repoSelecionado: null, readme: "", loadingReadMe: false})
    if(this.state.searchFor === "Usermame"){
      this.getGithubByName()
    }else if(this.state.searchFor === "Token"){
      this.getGithubByToken()
    }else{
      this.setState({erro : true, erro_msg:"Você deve selecionar seu método de busca!"})
    }
  }
  //*/

  criaComboRadio = () => {
    return (
      <>
        <input type="radio" name="radioOptions" className="radios" id="op1" value="Usermame" onChange={(evento => this.setState({searchFor: 'Usermame'}))} checked={this.state.searchFor === 'Usermame'}/>
        <label className={this.state.searchFor === 'Usermame' ? 'selected' : ''} htmlFor="op1">Nome</label>
        <input type="radio" name="radioOptions" className="radios" id="op2" value="Token" onChange={(evento => this.setState({searchFor: 'Token'}))} checked={this.state.searchFor === 'Token'}/>
        <label className={this.state.searchFor === 'Token' ? 'selected' : ''} htmlFor="op2">Token</label>
      </>
    )
  }

  criaComboBoxRepo = () => {
    const comboBoxOpcoes = this.state.arrayRepo && this.state.arrayRepo.length > 0 ? this.state.arrayRepo.map(opcao =>
      <option key={opcao.id} value={opcao.id}>
        {opcao.name}
      </option>
    ) : []

    return (
      <select
        className="form-control"
        value={this.state.repoSelecionado?.id || ''}
        onChange={(event) => {
          const repo = this.state.arrayRepo.find(
            r => r.id === Number(event.target.value)
          )

          this.setState({
            repoSelecionado: repo
          })
           this.getReadMe(
            repo.owner.login,
            repo.name
          )
        }}
      >
        {comboBoxOpcoes}
      </select>
    )
  }
  

  render(){
    return(
      <>
        {this.state.loadingScreen && (
          <div className="loading-screen">
            <div className="spinner"></div>
            <img src={'/load-icon.png'} alt="Carregando" className="load-icon" />
            <p>Carregando...</p>
          </div>
        )}

        <div id="img-fundo"  className={ this.state.loadingScreen ? "main-content hidden" : "main-content"}>
          {/* <header className="App-header">
            <div>
              <h1 className="custom-h1">Seja bem vindo!</h1>
            </div>
          </header> */}
          <div className="container-p">
            {this.state.erro &&
              (
                <div className="alert-content alert alert-dismissible alert-danger">
                  <button type="button" className="close" data-dismiss="alert" onClick={() => this.setState({erro: false})}>
                    &times;
                  </button>
                  <strong>Ocorreu um erro.</strong> {this.state.erro_msg}
                  </div>
              ) 
            }
            <div id="div-info1">
              <p className="custom-h1">GitPro Collector</p>
              <p className="description-p">Busque por repositórios no GitHub através de usuários ou Tokens pessoais fornecidos</p>
              <div className="form-group custom-form-1">
                <label id="label1" htmlFor="nome">Username ou Token: </label>
                <input id="nome" 
                  type="text" 
                  placeholder = "Ex: Sample13"
                  value={this.state.nome} 
                  name="nome" 
                  onChange={this.insercao_dados}
                  className="form-control" />
              </div>
              <div className="row radio-group">
                <label htmlFor="op0" style={{fontWeight: 'bold', width: '6em', margin: '0'}}>Boscar por: </label>
                {this.criaComboRadio()}
              </div>
              <button type="submit" className="btn btn-secondary btn-custom" onClick = {this.getRadio} disabled={this.state.searching}>
                {this.state.searching ? 'Buscando...' : 'Buscar'}
              </button>
            </div>
            <div id="div-info2">
              {this.state.searching || this.state.loadingReadMe ? (
                <div className="searching-content">
                  <img src={'/load-icon.png'} alt="Carregando" className="load-icon" />
                  <p>Carregando...</p>
                </div>
              ) : (
                this.state.repoSelecionado ? (
                <div className={"content-data-repo"}>
                  <div className="row-combo-box">
                    <h1>Repositório: </h1> {this.criaComboBoxRepo()}
                  </div>
                  <h5>Usuário: {this.state.repoSelecionado.owner.login}</h5>
                  <h5>Projeto: {this.state.repoSelecionado.name}</h5>
                  <h5 style={{color: 'white', marginTop: '1em'}}>Resumo: </h5>

                  <p>
                    {this.state.repoSelecionado.description || "Sem descrição"}
                  </p>

                  <p>
                    Linguagem: {this.state.repoSelecionado.language || "Não informada"}
                  </p>
                  <p>
                    Criado em: {new Date(this.state.repoSelecionado.created_at).toLocaleDateString()} às {new Date(this.state.repoSelecionado.created_at).toLocaleTimeString()}
                  </p>
                  <p>
                    Última atualização: {new Date(this.state.repoSelecionado.updated_at).toLocaleDateString()} às {new Date(this.state.repoSelecionado.updated_at).toLocaleTimeString()}
                  </p>

                  <a
                    href={this.state.repoSelecionado.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-success"
                  >
                    Ver no GitHub
                  </a>
                  <h5 style={{color: 'white', marginTop: '1em'}}>ReadMe do Projeto: </h5>
                  <pre className="readme-box">
                    {this.state.readme}
                  </pre>
                </div>
                ) : (
                  <div className="content-repo-nf">
                    <img src={'/not_found.png'} alt="Nenhum repositório encontrado" className="not-found-img" />
                    <h1>Nenhum repositório encontrado</h1>
                    <p>Este usuário ou token informado não possui repositórios ativos no momento.</p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default App;